---
name: svelte-newsletter
description: >
  Research and draft the monthly "What's new in Svelte" newsletter. Use this skill when asked to
  research, draft, or help write the Svelte newsletter. It pulls changelog entries from sveltejs/*
  GitHub repositories, cross-references svelte.dev documentation, fetches community content from
  Reddit and Discord, and curates the Community Showcase section. Invoke with /svelte-newsletter.
allowed-tools: web_fetch, shell
---

# Svelte Newsletter Research Skill

You are helping Dani Sandoval write the monthly "What's new in Svelte" newsletter — a blog post
published on svelte.dev that covers new features, bug fixes, and community highlights from the
Svelte ecosystem.

## Overview

The newsletter has two major halves:

1. **Changelog section** — New features from sveltejs/\* GitHub repositories, written as
   human-readable bullet points with version numbers, docs links, and PR links.
2. **Community Showcase** — Curated apps, learning resources, and libraries sourced from
   Reddit (r/sveltejs), Discord (Svelte server), YouTube (Svelte Society, This Week in Svelte),
   and Svelte Radio.

See `newsletter-structure.md` for the exact output format.
See `repositories.md` for the list of repos and where to find their CHANGELOGs.
See `showcase-guide.md` for curation criteria and sourcing instructions.
See `mcp-setup.md` for optional Reddit/Discord MCP server setup.

---

## Step-by-Step Research Workflow

### Phase 1: Determine the date range

Ask the user what month/year the newsletter is for. The date range starts on the 1st of the
previous month and runs through today (or the end of that month if it has already passed).

It is completely normal to draft the newsletter mid-month. For example, on April 18th you would
draft the "May 2026" newsletter covering April 1 – April 18. The remaining days can be added
later before publishing on May 1st.

Check `apps/svelte.dev/content/blog/` for the most recent `whats-new-in-svelte-*.md` file to
see what was already covered. The date range is a guideline, not a hard cutoff — items from
the prior month that were missed or not included in the previous newsletter should still be
included if they are worth mentioning. Compare against the last published newsletter to catch
anything that slipped through.

### Phase 2: Changelog research

For each repository listed in `repositories.md`:

1. **Fetch the CHANGELOG** — If using Copilot CLI, the GitHub MCP server is built in — use
   its `get_file_contents` tool. If using another agent or tool, see `mcp-setup.md` for how
   to add the GitHub MCP server, or fall back to fetching CHANGELOGs directly via the GitHub
   REST API or `curl`:
   ```
   curl -s https://raw.githubusercontent.com/sveltejs/svelte/main/packages/svelte/CHANGELOG.md
   ```
   You can also browse the releases page on GitHub (e.g., https://github.com/sveltejs/svelte/releases).
2. **Filter for features** — Only include entries with a `feat:` prefix in the conventional
   commits. Skip `fix:`, `chore:`, `refactor:`, etc. unless they represent a notable breaking
   change or significant behavioral improvement that users should know about.
3. **Write human-readable summaries** — Transform each `feat:` entry into a clear, concise
   bullet point. Don't just copy the commit message — explain what the feature means for users.
4. **Add version info** — Bold the package name and version: `**svelte@5.54.0**`
5. **Link to the PR** — `[#17951](https://github.com/sveltejs/svelte/pull/17951)`
6. **Cross-reference documentation** — Check if there's a relevant docs page on svelte.dev.
   The docs live locally at `apps/svelte.dev/content/docs/` with sections:
   - `svelte/` — Svelte compiler, runtime, template syntax
   - `kit/` — SvelteKit framework
   - `cli/` — sv CLI tool
   - `ai/` — AI/MCP tools
     If a relevant docs page exists, add a `[Docs](https://svelte.dev/docs/...)` link.
7. **Note breaking changes** — If a feature includes breaking changes, call them out explicitly.

Format each entry like:

```
- Description of the feature (**package@version**, [Docs](url), [#PR](github_url))
```

### Phase 3: Community Showcase research

**Important: Do NOT fetch individual showcase item URLs.** There will be dozens of apps,
libraries, and sites — fetching each one would blow up the context window and trigger
excessive permission prompts. Instead, write descriptions based on the context available
from the source (Reddit post title/body, Discord message, GitHub repo description). Use
`TODO` placeholders for anything you're unsure about, and let the user verify or refine
descriptions manually afterward.

Only fetch from these **source pages** (Reddit, Discord, YouTube, Svelte Radio) — never
from the individual project URLs linked within them.

#### Reddit (r/sveltejs)

If the `reddit-mcp-buddy` MCP server is configured, use its `browse_subreddit` tool:

```
browse_subreddit(subreddit="sveltejs", sort="top", time="month")
```

Otherwise, run the `fetch-reddit.sh` script in this skill's directory:

```bash
bash .agents/skills/svelte-newsletter/fetch-reddit.sh
```

Or fetch manually via web_fetch:

```
https://www.reddit.com/r/sveltejs/top/.json?t=month&limit=100
```

Filter to posts with **20+ upvotes**. Categorize each post as:

- **App/Site** — A deployed project or demo
- **Library/Tool** — A package, component library, or developer tool
- **Learning Resource** — A tutorial, blog post, video, or course
- **Not relevant** — Meta posts, questions, memes, job postings

#### Discord (Svelte server)

If the Discord MCP is configured (see `mcp-setup.md`), read messages from:

- `#site-showcase` — Apps & Sites (sometimes Libraries)
- `#library-announcements` — Libraries, Tools & Components
- `#resources` — Learning Resources (blog posts, videos)

If Discord MCP is not available, ask the user to paste content from these channels or provide
a text file with the messages.

#### Recurring content sources

Always check these sources for the current month:

1. **This Week in Svelte** — YouTube show on the Svelte Society channel.
   Fetch via web_fetch: `https://www.youtube.com/@SvelteSociety/videos`
   List each episode with number and title:

   ```
   - [Ep. 132](https://www.youtube.com/watch?v=VIDEO_ID) — Topic
   ```

2. **Svelte Radio** — Podcast at svelteradio.com.
   Fetch via web_fetch: `https://www.svelteradio.com/episodes`
   List episodes published in the date range.

3. **Svelte Society YouTube** — Meetup recordings (Svelte London, Svienna, etc.)

### Phase 4: Classify learning resources

Learning resources should be grouped under these sub-sections (in order):

1. **_Featuring Svelte Contributors and Ambassadors_** — Content by known contributors.
   See `showcase-guide.md` for the full list of known contributors/ambassadors.
   Any content authored by or prominently featuring these people goes here.

2. **_This Week in Svelte_** — Always present. List episode numbers.

3. **_Svelte Radio_** — Only if new episodes exist in the date range.

4. **_Svienna (Svelte Society Vienna)_** or other meetup groups — Only if recordings exist.

5. **_To Read_** — Blog posts and written tutorials from the community.

6. **_To Watch/Read_** — Videos and mixed content from the community.

Not all sub-sections need to appear every month — only include ones with content.

### Phase 5: Assemble the newsletter draft

Using the template in `newsletter-structure.md`, assemble the full newsletter draft.
The output should be a complete markdown file ready to save as:

```
apps/svelte.dev/content/blog/YYYY-MM-01-whats-new-in-svelte-MONTH-YYYY.md
```

### Phase 6: Review and verify

Before presenting the draft:

1. Verify docs links and PR links are well-formed (correct repo, correct PR number)
2. Do NOT fetch individual showcase item URLs — leave those for the user to verify
3. Ensure no duplicate items between sections
4. Check that version numbers are accurate
5. Confirm the date in the filename and frontmatter matches the target month
6. Review against the most recent 2-3 newsletters for tone and style consistency
