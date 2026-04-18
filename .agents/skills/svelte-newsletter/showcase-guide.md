# Showcase Curation Guide

This document describes what belongs in each section of the Community Showcase and how to
source content.

## Apps & Sites built with Svelte

### What qualifies

- Deployed, working applications or websites built with Svelte/SvelteKit
- Must be accessible via a public URL (or have a compelling demo/video)
- Open source projects are great but not required — link to GitHub when available
- Games, tools, platforms, SaaS products, creative projects, portfolios — all welcome
- Personal sites are fine if they have something visually or technically interesting

### What does NOT qualify

- Starter templates, boilerplates, or scaffolding tools (those go in Libraries)
- Projects that are just "Hello World" or tutorial follow-alongs
- Sites that are down or broken
- Duplicate submissions from previous newsletters

### Formatting

Prefer the real/deployed URL over the GitHub URL. If both exist, link the name to the real
URL and put GitHub in parentheses at the end. If only a GitHub URL exists, use that as the
main link.

```markdown
- [App Name](https://deployed-url.com) is a short description ([GitHub](https://github.com/...))
- [App Name](https://github.com/user/repo) is a short description when no deployed URL exists
```

### Description style

- Present tense: "is", "lets you", "provides", "helps"
- Focus on what the app DOES, not how it's built
- One sentence, concise but descriptive
- Don't start every description with "A" — vary the sentence structure

---

## Learning Resources

### Sub-sections (in order)

#### _Featuring Svelte Contributors and Ambassadors_

Content authored by or prominently featuring Svelte contributors and ambassadors goes in
this section.

**How to identify ambassadors:** If Discord MCP is configured, read the `#svelte-ambassadors`
channel to get the current list of active ambassadors. Otherwise, use the historical list
below — it is based on people who have consistently appeared in this section across past
newsletters.

| Name                   | Also known as        | Role                                   |
| ---------------------- | -------------------- | -------------------------------------- |
| Rich Harris            |                      | Svelte creator, Vercel                 |
| Simon Holthausen       | dummdidumm           | Svelte core team                       |
| Paolo Ricciuti         |                      | Svelte Ambassador, Mainmatter          |
| Stanislav Khromov      | Code with Stanislav  | Svelte Ambassador                      |
| Joy of Code            | JoyofCode            | Svelte Ambassador                      |
| Scott Tolinski         | Syntax               | Svelte Ambassador                      |
| Tan Li Hau             | Li Hau Tan, lihautan | Svelte core team                       |
| Puru VJ                | puruvj               | Svelte contributor                     |
| Dominik G              | dominikg             | Svelte core team, vite-plugin-svelte   |
| Kev                    | Svelte Society       | Community organizer                    |
| Ben Davis              |                      | Svelte Ambassador                      |
| Elliot Johnson         |                      | Svelte contributor                     |
| Brittney Postma        |                      | Svelte Society                         |
| Antony                 |                      | Svelte Radio, Svelte Society           |
| Kevin Åberg Kultalahti |                      | Svelte Radio                           |
| Geoff Rich             |                      | Svelte contributor                     |
| GHOST                  | ghostdevv            | Svelte core team                       |
| Jason Lengstorf        | CodeTV               | Community (if Svelte-specific content) |

This list may not be exhaustive. If you find content by someone not listed here who appears
to be a Svelte contributor or ambassador, include them in this section and note it for the
user to confirm.

#### _This Week in Svelte_

Always present. YouTube show on the Svelte Society channel. Format:

```markdown
- [Ep. 132](https://www.youtube.com/watch?v=VIDEO_ID) — Topic or "Changelog"
```

#### _Svelte Radio_

Only include when new episodes exist in the date range. Podcast at svelteradio.com. Format:

```markdown
- [Episode Title](https://www.svelteradio.com/episodes/slug) by Svelte Radio
```

#### _Svienna_ or other meetup groups

Only when recordings exist for that month.

#### _To Read_

Blog posts and written tutorials from community members (not contributors/ambassadors).

#### _To Watch/Read_

Videos and mixed content from community members (not contributors/ambassadors).

### What qualifies as a Learning Resource

- Tutorials, courses, or how-to guides about Svelte/SvelteKit
- Conference talks or meetup recordings featuring Svelte
- Blog posts analyzing Svelte features, patterns, or architecture
- Podcast episodes about Svelte
- Videos demonstrating Svelte techniques

### What does NOT qualify

- Posts that just mention Svelte in passing
- Generic web dev content that happens to use Svelte
- Content older than the date range (unless it was just discovered/released)

---

## Libraries, Tools & Components

### What qualifies

- New packages published to npm (or other registries)
- Significant version updates to existing packages (v2, v3, major rewrites)
- Developer tools, VS Code extensions, CLI utilities
- Component libraries, UI kits, animation libraries
- Svelte-specific adapters, plugins, or integrations
- Build tools or Vite plugins for Svelte

### What does NOT qualify

- Minor patch releases or bug-fix-only updates
- Forks of existing libraries with minimal changes
- Packages that are abandoned or have zero documentation
- Packages already featured in a recent newsletter (within ~3 months)

### Formatting

```markdown
- [Library Name](url) is/provides a short one-sentence description
```

### Sub-grouping

When there are many entries (8+), group them with italic headers:

```markdown
_UI Components and Animations_
_State Management_
_Plugins, Compilers and Runtimes_
_Icon Libraries_
_Everything Else_
```

Use groupings that make sense for the current month's content. Don't force categories.

---

## Sourcing content

### Reddit (r/sveltejs)

- Sort by "top" for the month
- Include posts with **20+ upvotes**
- Each post should be categorized into one of the three showcase sections
- Self-promotion posts are fine if the project is real and interesting
- Check the linked URL to verify the project is still live
- Skip: questions, bug reports, "looking for feedback" with no demo, memes

### Discord (Svelte server)

- **#site-showcase** → mostly Apps & Sites
- **#library-announcements** → Libraries, Tools & Components
- **#resources** → Learning Resources
- Look for posts with reactions/engagement as a quality signal
- Some overlap with Reddit is expected — deduplicate

### YouTube / Podcasts

- **Svelte Society** YouTube channel — This Week in Svelte episodes, meetup recordings
- **Svelte Radio** at svelteradio.com — podcast episodes
- Check for Svelte conference talks if a conference happened that month
