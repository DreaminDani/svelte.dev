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

The description should be a short (under ~100 chars), comma-separated list of the top 2-3
highlights. No Oxford comma. Keep it punchy - just the highlights, no full sentences.

Example: `'Svelte CLI Community Add-ons, TypeScript 6.0 support in SvelteKit'`

## Body structure

### 1. Intro paragraph

1-3 short sentences of editorial context. Summarize overall what happened without getting into
too much detail. This is also a good place to highlight links that don't fit in the showcase
(awards, external features, conference announcements) - just mention and link, don't
over-explain. End with a transition like "Let's dive in!" or "Big month, bigger showcase...
so let's dive in!"

Don't duplicate intro links in the showcase - if something is mentioned in the intro, it
doesn't need to appear again in To Read or Apps & Sites.

### 2. Changelog section

The changelog section can be **one combined section or multiple separate sections** depending
on how many features there are. The groupings are:

1. **Svelte** - the compiler and runtime (`sveltejs/svelte`)
2. **SvelteKit** - SvelteKit core + all adapters (`sveltejs/kit` - includes adapter-node,
   adapter-vercel, adapter-netlify, adapter-cloudflare, etc.)
3. **Language Tools, Ecosystem & CLI** - language server, sv CLI, ai-tools, vite-plugin-svelte

**When to combine vs separate:**

- If there are only a few changes total (fewer than ~3-4 per group), combine everything into
  one section: `## What's new in Svelte and SvelteKit`
- If any one group has 3-4+ changes, split into separate sections:
- `## What's new in Svelte`
- `## What's new in SvelteKit`
- (Language tools/CLI items can be grouped with SvelteKit or get their own header like
  `## What's new in SvelteKit, Svelte CLI and Language Tools`)

**Important for SvelteKit:** Check ALL packages under `packages/` in the kit repo - not just
`packages/kit/CHANGELOG.md`. Adapter changes (node, vercel, netlify, cloudflare, etc.) are
grouped with SvelteKit, not in a separate section.

Each feature is a bullet point:

```markdown
- Description of what changed (**package@version**, [Docs](https://svelte.dev/docs/...), [#PR](https://github.com/sveltejs/repo/pull/NUMBER))
```

#### Formatting rules

- **Version**: Bold the version number. Only prefix the package name when the section
  contains mixed packages. In a dedicated "What's new in SvelteKit" section, use `**2.57.0**`.
  In a combined section, use `**kit@2.56.0**`, `**svelte@5.55.0**`, `**sv@0.12.6**`.
- **Docs link**: When a relevant docs page exists on svelte.dev or externally (e.g. a
  TypeScript release blog post) - `[Docs](url)`
- **PR link**: Always include - `[#17951](https://github.com/sveltejs/svelte/pull/17951)`
- Multiple links can appear: `[Docs](url), [#PR](url)`
- For adapter-specific changes, prefix with the adapter name: `Node:`, `Vercel:`, `Netlify:`
- For breaking changes with few items, use `breaking:` prefix inline. For many breaking
  changes in one package, group under a bold sub-bullet:
  `**Remote Function Breaking Changes (2.56.0)**` with indented items below. Never use
  `Breaking (Package):` with the package in parentheses.

#### Changelog footer

Each changelog section gets its own footer linking to the relevant CHANGELOGs. If sections
are combined into one, use one combined footer. If split into separate sections, each gets
its own footer.

Combined example:

```markdown
For a full list of changes - including all the important bugfixes that went into the releases this month - check out the Svelte compiler's [CHANGELOG](https://github.com/sveltejs/svelte/blob/main/packages/svelte/CHANGELOG.md) and the SvelteKit / Adapter [CHANGELOGs](https://github.com/sveltejs/kit/tree/main/packages).
```

Split example (after SvelteKit section):

```markdown
Looking for more details on the many bug fixes and performance optimizations from this month? Check out the SvelteKit / Adapter [CHANGELOGs](https://github.com/sveltejs/kit/tree/main/packages).
```

#### Item ordering

Default to oldest version first within a section. Exception: if breaking changes are grouped
as sub-bullets, put that group at the end so the list flows naturally (bullets, then the
sub-bullet group at the end - not bullets, sub-bullets, then more bullets).

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

- [Exact Video/Post Title](url) by Channel or Author Name
- [Exact Video/Post Title](url) by Channel or Author Name

_This Week in Svelte_

- [Ep. 132](https://www.youtube.com/watch?v=VIDEO_ID) - Topic
- [Ep. 133](https://www.youtube.com/watch?v=VIDEO_ID) - Topic

_Svelte Radio_

- [Episode Title](https://www.svelteradio.com/episodes/slug) by Svelte Radio

_To Read_

- [Article Title](url) by Author Name

_To Watch_

- [Video Title](url) by Author Name
```

Use separate _To Read_ and _To Watch_ sections based on content type - _To Read_ for blog
posts and written tutorials, _To Watch_ for videos. Only use the combined _To Watch/Read_
header when there are very few items total and they're mixed. Don't label something "To
Watch" if it's a blog post, or vice versa.

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
- Don't include starter templates/boilerplates in Apps & Sites - those go in Libraries if at all
