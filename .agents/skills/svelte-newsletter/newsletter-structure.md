# Newsletter Structure Reference

This document defines the exact structure and formatting conventions for the "What's new in
Svelte" newsletter.

## File naming

```
apps/svelte.dev/content/blog/YYYY-MM-01-whats-new-in-svelte-MONTH-YYYY.md
```

Example: `2026-05-01-whats-new-in-svelte-may-2026.md`

The date is always the 1st of the month. The month name is lowercase.

## Frontmatter

```yaml
---
title: "What's new in Svelte: May 2026"
description: 'Brief summary of highlights, comma separated'
author: Dani Sandoval
authorURL: https://dreamindani.com
---
```

The description should be a short (under ~100 chars) summary of the top 2-3 highlights.

## Body structure

### 1. Intro paragraph

1-3 sentences of editorial context. Mention any major announcements, events, or ecosystem
milestones. End with a transition like "Let's dive in!" or "So let's have a look..."

### 2. Changelog section

The section header varies slightly depending on content:

- `## What's new in Svelte and SvelteKit` — when both have features
- `## What's new in Svelte` / `## What's new in SvelteKit` — separate sections when there's
  a lot of content

Each feature is a bullet point:

```markdown
- Description of what changed (**package@version**, [Docs](https://svelte.dev/docs/...), [#PR](https://github.com/sveltejs/repo/pull/NUMBER))
```

#### Formatting rules

- **Version**: Bold with package name — `**svelte@5.54.0**`, `**kit@2.54.0**`, `**sv@0.12.6**`
- **Docs link**: Only when a relevant svelte.dev docs page exists — `[Docs](url)`
- **PR link**: Always include — `[#17951](https://github.com/sveltejs/svelte/pull/17951)`
- Multiple links can appear: `[Docs](url), [#PR](url)`
- For adapter-specific changes, prefix with the adapter name: `Node:`, `Vercel:`, `Netlify:`
- For Svelte CLI changes, use `**sv@version**`
- For language tools, use `**language-server@version**` or `**svelte-language-server@version**`
- For breaking changes, note explicitly: "Breaking (Package):" or "A breaking change in..."

#### Changelog footer

End the changelog section with a paragraph linking to the full CHANGELOGs:

```markdown
For a full list of changes - including all the important bugfixes that went into the releases this month - check out the Svelte compiler's [CHANGELOG](https://github.com/sveltejs/svelte/blob/main/packages/svelte/CHANGELOG.md) and the SvelteKit / Adapter [CHANGELOGs](https://github.com/sveltejs/kit/tree/main/packages).
```

### 3. Horizontal rule

```markdown
---
```

### 4. Community Showcase

```markdown
## Community Showcase
```

#### Apps & Sites built with Svelte

```markdown
### Apps & Sites built with Svelte

- [App Name](https://deployed-url.com) is a short description ([GitHub](https://github.com/...))
- [App Name](https://github.com/user/repo) is a short description when no deployed URL exists
```

#### Learning Resources

```markdown
### Learning Resources

_Featuring Svelte Contributors and Ambassadors_

- [Title](url) by Author Name
- [Title](url) by Author Name (format note like "video" if needed)

_This Week in Svelte_

- [Ep. 132](https://www.youtube.com/watch?v=VIDEO_ID) — Topic
- [Ep. 133](https://www.youtube.com/watch?v=VIDEO_ID) — Topic

_Svelte Radio_

- [Episode Title](https://www.svelteradio.com/episodes/slug) by Svelte Radio

_To Read_

- [Article Title](url) by Author Name
```

#### Libraries, Tools & Components

```markdown
### Libraries, Tools & Components

- [Library Name](url) is/provides a short description
```

Sometimes sub-grouped with italic headers when there are many entries:

```markdown
_UI Components and Animations_

- ...

_State Management_

- ...
```

### 5. Closing

```markdown
That's it for this month! Let us know if we missed anything on [Reddit](https://www.reddit.com/r/sveltejs/) or [Discord](https://discord.gg/svelte).

Until next time 👋🏼!
```

## Style notes

- Use present tense: "is", "provides", "lets you"
- Keep descriptions to one sentence per item
- For apps: describe what it does, not how it's built
- For libraries: describe what it provides to the developer
- Link to GitHub repos with `[open source](url)` or `([GitHub](url))` inline when available
- Don't include starter templates/boilerplates in Apps & Sites — those go in Libraries if at all
