#!/usr/bin/env node
// Browser-driven fetcher for top r/sveltejs posts.
//
// Reddit blocks anonymous JSON and curl-based requests behind a JS bot
// challenge, so we drive a real Chromium via Playwright using a persistent
// profile. Log in once; subsequent runs reuse the saved session.
//
// Usage:
//   node fetch-reddit-browser.mjs [limit]            # default 25
//   REDDIT_BROWSER_HEADED=1 node fetch-reddit-browser.mjs  # show the window (needed for first-time login)
//
// First-time setup:
//   1) cd .agents/skills/svelte-newsletter && npm install && npx playwright install chromium
//   2) REDDIT_BROWSER_HEADED=1 node fetch-reddit-browser.mjs
//      A browser window opens. Sign in to reddit.com (as u/sveltenewsletter or your main).
//      The profile is saved to ~/.cache/svelte-newsletter/reddit-profile so future runs are headless.

import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const limit = Number(process.argv[2] ?? 25);
const timeframe = process.env.REDDIT_TIMEFRAME ?? 'month';
const subreddit = process.env.REDDIT_SUBREDDIT ?? 'sveltejs';
const headed = process.env.REDDIT_BROWSER_HEADED === '1';
const commentsPerPost = Number(process.env.REDDIT_COMMENTS_PER_POST ?? 3);
const interPostDelayMs = Number(process.env.REDDIT_INTER_POST_DELAY_MS ?? 1500);

const USER_DATA = join(homedir(), '.cache', 'svelte-newsletter', 'reddit-profile');
mkdirSync(USER_DATA, { recursive: true });

const log = (...args) => process.stderr.write(args.join(' ') + '\n');

const ctx = await chromium.launchPersistentContext(USER_DATA, {
	headless: !headed,
	viewport: { width: 1280, height: 900 },
	// Use a real-looking UA; Reddit's bot wall is less hostile to non-default UAs.
	userAgent:
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
});

try {
	const page = ctx.pages()[0] ?? (await ctx.newPage());

	const listingUrl = `https://www.reddit.com/r/${subreddit}/top/?t=${timeframe}`;
	log(`navigating to ${listingUrl}`);
	await page.goto(listingUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });

	// Detect login state. Logged-out shreddit shows a "Log In" button.
	const loggedIn = await isLoggedIn(page);
	if (!loggedIn) {
		if (!headed) {
			log(
				'Not logged in and running headless. Re-run with REDDIT_BROWSER_HEADED=1 to log in once.'
			);
			process.exitCode = 2;
			await ctx.close();
			process.exit();
		}
		log('Please log in to reddit.com in the open window (5 min timeout)...');
		await page.waitForFunction(() => !document.querySelector('a[href*="/login"][href*="dest="]'), {
			timeout: 5 * 60 * 1000
		});
		await page.goto(listingUrl, { waitUntil: 'domcontentloaded', timeout: 45000 });
	}

	await page.waitForSelector('shreddit-post', { timeout: 20000 });

	// Auto-scroll until we have at least `limit` posts (or stop making progress).
	let posts = await page.locator('shreddit-post').all();
	let stagnant = 0;
	while (posts.length < limit && stagnant < 3) {
		const before = posts.length;
		await page.mouse.wheel(0, 6000);
		await page.waitForTimeout(900);
		posts = await page.locator('shreddit-post').all();
		if (posts.length === before) stagnant++;
		else stagnant = 0;
	}
	posts = posts.slice(0, limit);
	log(`found ${posts.length} posts on listing`);

	const metas = [];
	for (const post of posts) {
		const [title, permalink, author, score, commentCount, createdTs] = await Promise.all([
			post.getAttribute('post-title'),
			post.getAttribute('permalink'),
			post.getAttribute('author'),
			post.getAttribute('score'),
			post.getAttribute('comment-count'),
			post.getAttribute('created-timestamp')
		]);
		if (!title || !permalink) continue;
		metas.push({ title, permalink, author, score, commentCount, createdTs });
	}

	const results = [];
	for (const [i, meta] of metas.entries()) {
		const url = `https://www.reddit.com${meta.permalink}`;
		log(`  [${i + 1}/${metas.length}] ${meta.title.slice(0, 70)}`);
		const p = await ctx.newPage();
		try {
			await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 });
			await p.waitForSelector('shreddit-post', { timeout: 15000 });

			const body = (
				await p
					.locator("shreddit-post [slot='text-body']")
					.first()
					.innerText({ timeout: 3000 })
					.catch(() => '')
			).trim();

			const comments = [];
			const haveComments = await p
				.waitForSelector('shreddit-comment', { timeout: 8000 })
				.then(() => true)
				.catch(() => false);
			if (haveComments) {
				const commentEls = await p.locator('shreddit-comment').all();
				for (const c of commentEls) {
					if (comments.length >= commentsPerPost) break;
					const cAuthor = await c.getAttribute('author');
					if (!cAuthor || cAuthor === 'AutoModerator') continue;
					const cBody = (
						await c
							.locator("[slot='comment']")
							.first()
							.innerText({ timeout: 2000 })
							.catch(() => '')
					).trim();
					if (!cBody) continue;
					comments.push({ author: cAuthor, body: cBody });
				}
			}

			results.push({ ...meta, url, body, comments });
		} catch (err) {
			log(`  ! failed ${url}: ${err.message}`);
			results.push({ ...meta, url, body: '', comments: [] });
		} finally {
			await p.close();
			if (interPostDelayMs > 0) await new Promise((r) => setTimeout(r, interPostDelayMs));
		}
	}

	printMarkdown(results, { subreddit, timeframe });
} finally {
	await ctx.close();
}

function truncate(text, max) {
	if (!text) return '';
	return text.length > max ? text.slice(0, max).trimEnd() + '…' : text;
}

async function isLoggedIn(page) {
	// Heuristics: the "Log In" CTA disappears, and an account drawer / username pill is present.
	try {
		const loginCta = await page.locator('a[href*="/login"][href*="dest="]').count();
		if (loginCta > 0) return false;
		return true;
	} catch {
		return false;
	}
}

function printMarkdown(results, { subreddit, timeframe }) {
	const today = new Date().toISOString().slice(0, 10);
	const out = [];
	out.push(`# Top r/${subreddit} posts (${timeframe})`);
	out.push('');
	out.push(`Fetched ${results.length} posts on ${today}.`);
	out.push('');
	for (const r of results) {
		out.push('---');
		out.push('');
		out.push(`## ${r.title}`);
		out.push('');
		out.push(`- **Link:** ${r.url}`);
		if (r.author) out.push(`- **Author:** u/${r.author}`);
		const meta = [];
		if (r.score) meta.push(`${r.score} pts`);
		if (r.commentCount) meta.push(`${r.commentCount} comments`);
		if (r.createdTs) meta.push(r.createdTs.slice(0, 10));
		if (meta.length) out.push(`- **Stats:** ${meta.join(' · ')}`);
		out.push('');
		if (r.body) {
			out.push('**Post body:**');
			out.push('');
			out.push(truncate(r.body, 1200));
			out.push('');
		}
		if (r.comments.length) {
			out.push('**Top comments:**');
			out.push('');
			for (const c of r.comments) {
				const tag = c.author === r.author ? ' (OP)' : '';
				const body = truncate(c.body, 500).replace(/\n/g, '\n> ');
				out.push(`> **u/${c.author}${tag}**`);
				out.push(`>`);
				out.push(`> ${body}`);
				out.push('');
			}
		}
	}
	process.stdout.write(out.join('\n') + '\n');
}
