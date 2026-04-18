# Voice & Tone Guide

This document defines how the newsletter should sound. The goal is to match the voice of the
existing newsletters written by Dani Sandoval. Read this before writing any draft copy.

## The short version

Write like you're telling a knowledgeable friend about this month's updates over coffee. Be
direct, be specific, let the work speak for itself.

## Word and phrase choices

**Use these freely:**

- "check out" (not "explore" or "discover")
- "let's dive in" / "let's jump into"
- "is now" / "now available"
- "lets you" / "allows you to"
- "For all the features and bugfixes, see the CHANGELOG"
- "See you next month!" / "That's it for this month!"
- "Feel free to let us know if we missed anything"
- "lots of" / "tons of" (sparingly)
- "coming in hot" (when a month is packed)

**Never use these -- they are AI-isms or corporate speak:**

- "exciting" / "amazing" / "incredible"
- "delightful" / "elegant" / "beautiful"
- "powerful" / "robust" / "seamless" / "cutting-edge"
- "leverage" (say "use")
- "It's worth noting" / "Notably"
- "delve" / "dive deep" (but "dive in" is fine as a transition)
- "crucial" / "vital" / "essential" (just say what it does)
- "foster" / "facilitate" / "empower"
- "comprehensive" / "holistic"
- "In conclusion" / "To summarize"
- "Absolutely" / "Certainly"

## Punctuation rules

- **Dashes:** Never use em dashes (`—`) or en dashes (`–`). Always use a space, hyphen, space
  (`-`) for asides and added context. This is a hard rule - it's how every newsletter has
  been written and it should stay that way.
- **Oxford comma:** Don't use it. Write "Svelte, SvelteKit and the CLI" not "Svelte,
  SvelteKit, and the CLI".
- **Exclamation points:** OK for greetings and one or two moments of genuine enthusiasm. Not
  every sentence.
- **Colons:** Good for introducing lists and sections.
- **Semicolons:** Don't use them. Break into two sentences instead.
- **Parentheses:** Use for version numbers, GitHub links, and brief clarifications:
  `(**3.48.0**, [Docs](link))`
- **Emoji:** Light use is fine for greetings and sign-offs. Don't sprinkle them throughout.

## Sentence structure

- **Default to short, declarative sentences.** 8-15 words is the sweet spot.
- **Active voice always.** "SvelteKit now supports" not "Support has been added for."
- **Lead with what changed, not filler.** Start with the feature or the project name.
- **One idea per sentence.** If you need a comma and "and" to connect two ideas, split them.
- **Fragments are OK for emphasis** but use them rarely: "Expect bugs!"

## How to write changelog items

Each item should be a full sentence in active voice that explains what users can now do and
why it matters. Include the version number in bold and link to docs/PRs when available.

**Version number format:** Only prefix the package name when the section contains a mix of
packages. In a "What's new in SvelteKit" section, just use `**2.57.0**`. In a combined
"What's new in Svelte and SvelteKit" section, use `**kit@2.56.0**` and `**svelte@5.55.0**`.

**Docs links:** Link to relevant svelte.dev docs pages AND external documentation when
relevant (e.g. a TypeScript release blog post for TypeScript support changes).

**Breaking changes:** Use `breaking:` prefix inline when there are just one or two. When
there are many breaking changes in one package, group them under a bold sub-bullet like
`**Remote Function Breaking Changes (2.56.0)**` with an indented list below. Never use
`Breaking (package):` with the package in parentheses - it looks bad.

**Ordering:** Default to oldest version first within a section. Exception: if breaking
changes are grouped as sub-bullets, put that group at the end of the section so the list
doesn't awkwardly have bullets, then sub-bullets, then more bullets.

**Changelog footer:** Each changelog section gets its own footer paragraph linking to the
relevant CHANGELOGs. If sections are combined, use one combined footer. If split, each
section gets its own.

Good:

```
- The `{#key}` block is now available to key arbitrary content on an expression (**3.38.0**)
- `$derived.call` is now `$derived.by` -- breaking change (**5.0.0-next.54**, [Docs](link))
- The new `handleError` hook lets you send data to an error tracking service (**1.0.0-next.524**)
```

Bad:

```
- Added exciting new {#key} block functionality (too vague, uses "exciting")
- A powerful new error handling hook has been introduced (passive voice, uses "powerful")
- It's worth noting that $derived.call has been renamed (filler phrase, passive voice)
```

## How to write showcase items

Format: `[Name](url)` followed by a one-sentence description starting with a verb. Keep it
short - one sentence max. Don't pad descriptions with stats, feature lists, or marketing
copy.

**URL priority:** deployed URL > GitHub URL > Reddit link (last resort). It's OK to fetch a
Reddit/Discord post to find the real deployed URL, but don't fetch the project itself for
description content.

**Previously featured items:** If a library or app was featured in a past newsletter and has
a notable update, it's OK to include it again. Note when it was last featured:
`(last featured in December 2024) has been updated to support Svelte 5`

**Link text for learning resources:** Always use the exact title of the video or blog post as
the link text, followed by "by Author Name" (or channel name). The author/channel comes from
whoever published it, not who is featured in it.

```
- [Paolo Ricciuti - Svelte, TMCP](url) by devtools-fm
- [How to Build Forms in SvelteKit](url) by Joy of Code
```

**When items don't fit neatly:** If you're not sure whether something is an app, a library,
or a learning resource, default to Apps & Sites. The user can move it later.

**Don't duplicate:** If a link appears in the intro paragraph, don't repeat it in the
showcase. If an app has a companion blog post, list them separately - the app in Apps & Sites
and the blog post in Learning Resources.

Good:

```
- [Plantarium](https://plantarium.dev) is a tool for the procedural generation of 3D plants
- [Who Are My Representatives?](https://whoaremyrepresentatives.us/) helps US residents find
  info on their congressional representatives
```

Bad:

```
- Check out this amazing tool called Plantarium (preamble, "amazing")
- Plantarium - An exciting and powerful 3D plant generation tool (adjective soup)
```

## Section transitions

Use momentum-based transitions that move the reader forward:

- "Now let's jump into this month's changes..."
- "Let's dive in!"
- "Before we jump in..."
- "Lots to showcase too... so let's dive in!"
- "But that's just the new features!"
- "That's it for this month!"

Use horizontal rules (`---`) between major section groups. Never use clunky transitions like
"Moving on to..." or "Let's now discuss..."

## Openings and closings

**Openings** should be casual and direct. 1-3 short sentences that summarize overall what
happened without getting into too much detail. The intro is also a good spot for highlighting
links that don't fit in the showcase (like awards, external features, conference
announcements). Don't over-explain these - just mention and link. End with a transition:

- "Big month, bigger showcase... so let's dive in!"
- "Happy September, y'all!"
- "Now let's get to the news"

**Closings** should be brief and inviting:

- "That's it for this month. See you next time!"
- "Feel free to let us know if we missed anything on Reddit or Discord"

Never close with an inspirational message or motivational quote.

## General principles

1. **Assume the reader is competent.** Don't over-explain basics.
2. **Let the work speak for itself.** Link to it, describe what it does, move on.
3. **Be specific, not superlative.** "Adds hot module reloading" beats "adds an amazing
   developer experience improvement."
4. **Credit people by name** when you can identify the author.
5. **Stay neutral on quality.** List what exists, don't editorialize about whether it's good.
6. **If you're not sure how to phrase something, look at the previous newsletters** in
   `apps/svelte.dev/content/blog/` for precedent.
