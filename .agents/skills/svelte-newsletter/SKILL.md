---
name: svelte-newsletter
description: >
  Research and draft the monthly "What's new in Svelte" newsletter, or update an existing
  draft with new content. Use this skill when asked to research, draft, update, or help write
  the Svelte newsletter. It pulls changelog entries from sveltejs/* GitHub repositories,
  cross-references svelte.dev documentation, fetches community content from Reddit and Discord,
  and curates the Community Showcase section. Invoke with /svelte-newsletter.
allowed-tools: web_fetch, shell
---

# Svelte Newsletter Research Skill

You are helping Dani Sandoval write the monthly "What's new in Svelte" newsletter - a blog post
published on svelte.dev that covers new features, bug fixes, and community highlights from the
Svelte ecosystem.

## Overview

The newsletter has two major halves:

1. **Changelog section** - New features from sveltejs/\* GitHub repositories, written as
   human-readable bullet points with version numbers, docs links, and PR links.
2. **Community Showcase** - Curated apps, learning resources, and libraries sourced from
   Reddit (r/sveltejs), Discord (Svelte server), YouTube (Svelte Society, This Week in Svelte),
   and Svelte Radio.

See `newsletter-structure.md` for the exact output format.
See `repositories.md` for the list of repos and where to find their CHANGELOGs.
See `showcase-guide.md` for curation criteria and sourcing instructions.
See `voice-and-tone.md` for writing style, word choices, and anti-AI-ism rules.
See `mcp-setup.md` for Reddit/Discord API setup and token handling.

---

## Step-by-Step Research Workflow

### Phase 1: Determine the date range

Ask the user what month/year the newsletter is for. The date range starts on the 1st of the
previous month and runs through today (or the end of that month if it has already passed).

**If a draft already exists** for this month in `apps/svelte.dev/content/blog/`, switch to
the **Update Workflow** below instead of starting from scratch.

It is completely normal to draft the newsletter mid-month. For example, on April 18th you would
draft the "May 2026" newsletter covering April 1 – April 18. The remaining days can be added
later before publishing on May 1st using the Update Workflow.

Check `apps/svelte.dev/content/blog/` for the most recent `whats-new-in-svelte-*.md` file to
see what was already covered. The date range is a guideline, not a hard cutoff - items from
the prior month that were missed or not included in the previous newsletter should still be
included if they are worth mentioning. Compare against the last published newsletter to catch
anything that slipped through.

### Phase 2: Changelog research

For each repository listed in `repositories.md`:

1. **Fetch the CHANGELOG** - Use GitHub raw URLs, releases pages, or the GitHub REST API. You can
   fetch CHANGELOGs directly via `curl`:
   ```
   curl -s https://raw.githubusercontent.com/sveltejs/svelte/main/packages/svelte/CHANGELOG.md
   ```
   You can also browse the releases page on GitHub (e.g., https://github.com/sveltejs/svelte/releases).
2. **Filter for features** - Only include entries with a `feat:` prefix in the conventional
   commits. Skip `fix:`, `chore:`, `refactor:`, etc. unless they represent a notable breaking
   change or significant behavioral improvement that users should know about.
3. **Write human-readable summaries** - Transform each `feat:` entry into a clear, concise
   bullet point. Don't just copy the commit message - explain what the feature means for users.
4. **Add version info** - Bold the package name and version: `**svelte@5.54.0**`
5. **Link to the PR** - `[#17951](https://github.com/sveltejs/svelte/pull/17951)`
6. **Cross-reference documentation** - Add a `[Docs](https://svelte.dev/docs/...)` link
   that points at the most specific section possible. Do NOT guess the anchor.

   The docs live locally at `apps/svelte.dev/content/docs/` with sections:
   - `svelte/` - Svelte compiler, runtime, template syntax
   - `kit/` - SvelteKit framework
   - `cli/` - sv CLI tool
   - `ai/` - AI/MCP tools

   **How to derive a Docs URL (in order of preference):**

   a. **Check the PR diff for docs file changes.** Open `https://github.com/sveltejs/<repo>/pull/<N>/files`
   and look for any `documentation/docs/**/*.md` changes. The filename (minus the numeric
   prefix and `.md`) is the URL slug, and any added/changed `##`/`###` heading is the anchor.
   Example: a change to `documentation/docs/20-core-concepts/70-environment-variables.md` adding
   `## Explicit environment variables` becomes
   `https://svelte.dev/docs/kit/environment-variables#Explicit-environment-variables`.

   b. **If the PR has no docs file changes,** grep the local docs for the right header instead
   of guessing:

   ```
   grep_search includePattern=apps/svelte.dev/content/docs/kit/**/*.md  query="^## |^### "
   ```

   Then map filename → slug and pick the closest matching header.

   c. **As a last resort,** check the source code in the PR for hardcoded `svelte.dev/docs/...`
   URLs (error messages, JSDoc `@see`, etc.) - these are authoritative.

   **Anchor convention on svelte.dev:** headings preserve case, spaces become `-`, and child
   headings are prefixed with the parent's name. Examples:
   - `## query` → `#query`
   - `### Refreshing queries` (under `## query`) → `#query-Refreshing-queries`
   - `### Multiple submit buttons` (under `## form`) → `#form-Multiple-submit-buttons`
   - `### precompress` (under `## Options`) → `#Options-precompress`

   **If you cannot find a specific, verified section, omit the Docs link entirely** rather
   than linking to a guessed anchor or a too-generic page. A missing link is better than a
   broken or misleading one.

   **PR fetching tip:** GitHub's `/files` pages are huge. Fetch ONE PR at a time and use a
   targeted query like "documentation/docs file changes, headers added" to keep the diff
   focused, or rely on `gh pr diff <N> -R sveltejs/<repo> -- '*.md'` in a terminal.

7. **Note breaking changes** - If a feature includes breaking changes, call them out explicitly.

Format each entry like:

```
- Description of the feature (**package@version**, [Docs](url), [#PR](github_url))
```

### Phase 3: Community Showcase research

**Important: Do NOT fetch individual showcase item URLs.** There will be dozens of apps,
libraries, and sites - fetching each one would blow up the context window and trigger
excessive permission prompts. Instead, write descriptions based on the context available
from the source (Reddit post title/body, Discord message, GitHub repo description). Use
`TODO` placeholders for anything you're unsure about, and let the user verify or refine
descriptions manually afterward.

**Exception - resolving URLs:** It's OK to fetch a Reddit or Discord post to find the real
deployed URL for a project (deployed URL > GitHub URL > Reddit link as a last resort). Just
don't fetch the project website itself for description content.

**Final output URL rule:** In the newsletter draft, do not link to Reddit/Discord when a
canonical URL exists (deployed site, GitHub repo, docs page, package page, video page, etc.).
Only keep Reddit/Discord links when:

- there is no better public URL, or
- the conversation itself is the resource being highlighted.

Only fetch from these **source pages** (Reddit, Discord, YouTube, Svelte Radio) - never
from the individual project URLs linked within them.

#### Reddit (r/sveltejs)

Reddit no longer issues script-app OAuth credentials, and anonymous JSON / RSS / `curl`
requests are blocked at the edge or behind a JS bot wall. The only working path is the
bundled headless-browser fetcher (Playwright + a persistent logged-in profile).

First-time setup (one-off):

```bash
cd .agents/skills/svelte-newsletter
npm install
npx playwright install chromium
REDDIT_BROWSER_HEADED=1 node fetch-reddit-browser.mjs 5
# A Chromium window opens. Sign in to reddit.com (as u/sveltenewsletter or your main).
# The profile is saved to ~/.cache/svelte-newsletter/reddit-profile.
```

Normal monthly run (headless, reuses the saved profile):

```bash
node .agents/skills/svelte-newsletter/fetch-reddit-browser.mjs 25 > /tmp/reddit-<yyyy-mm>.md
```

The script outputs markdown to stdout with title, link, author, score, comment count, post
body, and up to 3 top comments per post (OP-authored comments are tagged `(OP)`). See
`mcp-setup.md` for env vars and troubleshooting.

Filter to posts with **20+ upvotes**. Categorize each post as:

- **App/Site** - A deployed project or demo
- **Library/Tool** - A package, component library, or developer tool
- **Learning Resource** - A tutorial, blog post, video, or course
- **Not relevant** - Meta posts, questions, memes, job postings

#### Discord (Svelte server)

Use Discord HTTP endpoints with a bot token (see `mcp-setup.md`) and read messages from:

- `#site-showcase` - Apps & Sites (sometimes Libraries)
- `#library-announcements` - Libraries, Tools & Components
- `#resources` - Learning Resources (blog posts, videos)

Important implementation detail: these are forum-style channels. Do not only read the parent
channel directly. Enumerate thread IDs first (active + archived), then fetch thread messages.
When possible, use the thread starter message as the source of truth for links and context.

When scanning thread messages, prefer canonical links in this order:

1. Deployed app/site URL
2. GitHub/package/docs URL
3. Discord thread URL (last resort)

If Discord API access succeeds but community extraction is incomplete (for example, you cannot
confidently resolve thread links/titles), explicitly report that to the user before finalizing.

If content fields come back empty, enable Message Content Intent for the bot application.
If API access is not available, ask the user to paste content from these channels or provide
a text file with the messages.

#### Recurring content sources

Always check these sources for the current month:

1. **This Week in Svelte** - YouTube show on the Svelte Society channel.
   Prefer API script: `bash .agents/skills/svelte-newsletter/fetch-youtube.sh`
   (requires `YOUTUBE_API_KEY`; see `mcp-setup.md`).
   Fallback via web_fetch: `https://www.youtube.com/@SvelteSociety/videos`
   List each episode with number and title:

   ```

   ```

- [Ep. 132](https://www.youtube.com/watch?v=VIDEO_ID) - Topic

```

2. **Svelte Radio** - Podcast at svelteradio.com.
Fetch via web_fetch: `https://www.svelteradio.com/episodes`
List episodes published in the date range.

3. **Svelte Society YouTube** - Meetup recordings (Svelte London, Svienna, etc.)

### Phase 4: Classify learning resources

Learning resources should be grouped under these sub-sections (in order):

1. **_Featuring Svelte Contributors and Ambassadors_** - Content by known contributors.
See `showcase-guide.md` for the full list of known contributors/ambassadors.
Any content authored by or prominently featuring these people goes here.

2. **_This Week in Svelte_** - Always present. List episode numbers.

3. **_Svelte Radio_** - Only if new episodes exist in the date range.

4. **_Svienna (Svelte Society Vienna)_** or other meetup groups - Only if recordings exist.

5. **_To Read_** - Blog posts and written tutorials from the community.

6. **_To Watch/Read_** - Videos and mixed content from the community.

Not all sub-sections need to appear every month - only include ones with content.

### Phase 5: Assemble the newsletter draft

Using the template in `newsletter-structure.md`, assemble the full newsletter draft.
**Read `voice-and-tone.md` before writing any copy.** Match Dani's voice - casual, direct,
no corporate speak or AI-isms. When in doubt, check the previous newsletters for precedent.
The output should be a complete markdown file ready to save as:

```

apps/svelte.dev/content/blog/YYYY-MM-01-whats-new-in-svelte-MONTH-YYYY.md

```

### Phase 6: Review and verify

Before presenting the draft:

1. Verify docs links and PR links are well-formed (correct repo, correct PR number). Each
   `[Docs](...)` anchor must be one you derived from a PR docs diff, a local docs grep, or
   an in-source URL - not a guess. If you cannot verify it, drop the Docs link.
2. Do NOT fetch individual showcase item URLs - leave those for the user to verify
3. Ensure no duplicate items between sections
4. Check that version numbers are accurate
5. Confirm the date in the filename and frontmatter matches the target month
6. Review against the most recent 2-3 newsletters for tone and style consistency
7. Check all copy against `voice-and-tone.md` - no AI-isms, no corporate speak, active voice
8. Confirm showcase links use canonical destinations and not Reddit/Discord source links unless
   one of the exceptions above applies
9. If Reddit/Discord/YouTube sources were partially blocked, explicitly list those gaps and ask
   the user for manual links before claiming the showcase pass is complete
10. Prefer authenticated/API-backed data sources (Reddit auth + YouTube API key) before using
   brittle web page scraping

---

## Update Workflow

Use this workflow when a draft already exists for the current month and the user wants to
add anything new since the draft was written. This is the typical late-month flow - the
initial draft is written mid-month, then updated closer to publish date.

### Step 1: Read the existing draft

Read the current draft from `apps/svelte.dev/content/blog/`. Identify:

- The date range already covered (check the most recent changelog versions and showcase items)
- What's already included so you don't duplicate anything

### Step 2: Research new content

Run the same research from Phases 2-4 but with a narrower date range - from roughly where
the existing draft left off through today. For changelogs, look at versions newer than the
newest version already in the draft. For Reddit/Discord, look at posts newer than what's
already listed.

### Step 3: Present additions

Don't rewrite the whole newsletter. Instead, present the new items grouped by where they
belong in the existing draft:

```

## New changelog items

### For "What's new in SvelteKit" section:

- new item 1
- new item 2

### For "What's new in Svelte" section:

- new item 3

## New showcase items

### Apps & Sites:

- new app 1

### Learning Resources:

- new resource 1

### Libraries:

- new library 1

## Updated sections

### This Week in Svelte:

- [Ep. 140](url) - Topic (add after Ep. 139)

```

### Step 4: Apply updates

After the user confirms which additions to include, insert them into the existing draft in
the correct locations. Follow the same ordering rules (oldest first for changelogs, breaking
changes at end, similar libraries clustered together). Re-check the frontmatter description
to see if the highlights have changed.

### Step 5: Review

Run the same Phase 6 review checks on the updated draft.
```
