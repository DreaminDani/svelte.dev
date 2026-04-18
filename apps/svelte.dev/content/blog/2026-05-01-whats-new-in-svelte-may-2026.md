---
title: "What's new in Svelte: May 2026"
description: "Svelte hits 'adopt' on the Thoughtworks Radar, TypeScript 6 in SvelteKit, and sv CLI's public API"
author: Dani Sandoval
authorURL: https://dreamindani.com
---

This month, SvelteKit's remote functions API gets TypeScript 6 support, smarter form submissions, and a few breaking changes worth reviewing if you're using queries or commands. The `sv` CLI also got a stable public API. And Svelte was added to the [Thoughtworks Technology Radar](https://www.thoughtworks.com/radar/languages-and-frameworks/summary/svelte) at the **'adopt'** level - the highest recommendation tier.

Let's dive in!

## What's new in Svelte and SvelteKit

- SvelteKit now supports TypeScript 6.0 (**kit@2.56.0**, [#15595](https://github.com/sveltejs/kit/pull/15595))
- Remote function queries now use `hydratable` for transport, enabling richer data types in query results (**kit@2.56.0**, [#15533](https://github.com/sveltejs/kit/pull/15533))
- Remote `form` fields can now specify a default value using `field.as(type, value)`, reducing boilerplate for pre-populated forms (**kit@2.56.0**, [Docs](https://svelte.dev/docs/kit/remote-functions), [#15577](https://github.com/sveltejs/kit/pull/15577))
- Breaking (kit): Remote queries now require calling `.run()` explicitly and can no longer be awaited outside of component render, making data loading intent clearer and more predictable (**kit@2.56.0**, [#15533](https://github.com/sveltejs/kit/pull/15533))
- Breaking (kit): Client-driven query refreshes have been reworked, object keys in remote function cache entries are now sorted for stability, and command-triggered query refresh failures are now isolated per-query (**kit@2.56.0**, [#15562](https://github.com/sveltejs/kit/pull/15562), [#15570](https://github.com/sveltejs/kit/pull/15570))
- The `submit` callback in enhanced `form` remote functions now returns a boolean indicating whether the submission passed validation (**kit@2.57.0**, [Docs](https://svelte.dev/docs/kit/remote-functions), [#15530](https://github.com/sveltejs/kit/pull/15530))
- Community add-ons in `sv add` are now clearly labeled as **experimental**, helping users distinguish stable official add-ons from community contributions (**sv@0.14.0**, [Docs](https://svelte.dev/docs/cli/community), [#1020](https://github.com/sveltejs/cli/pull/1020))
- Project templates created with `sv create` now use Vite 8 and TypeScript 6 by default (**sv@0.15.0**, [#1005](https://github.com/sveltejs/cli/pull/1005), [#1055](https://github.com/sveltejs/cli/pull/1055))
- The `sv` CLI now has an explicit public API with a stability contract - the `create()` function signature changed to `create({ cwd, ...options })` (the old `create(cwd, options)` form is deprecated), and several file utilities have moved to `@sveltejs/sv-utils` (**sv@0.15.0**, [Docs](https://svelte.dev/docs/cli/sv-create), [#1046](https://github.com/sveltejs/cli/pull/1046))

For a full list of changes - including all the important bugfixes that went into the releases this month - check out the Svelte compiler's [CHANGELOG](https://github.com/sveltejs/svelte/blob/main/packages/svelte/CHANGELOG.md) and the SvelteKit / Adapter [CHANGELOGs](https://github.com/sveltejs/kit/tree/main/packages).

---

## Community Showcase

### Apps & Sites built with Svelte

- [Nineties Tape Recorder](https://www.reddit.com/r/sveltejs/comments/1sdeoiu/recreated_my_nineties_tape_recorder_in_svelte/) is a browser recreation of a Tascam Porta 03 four-track tape recorder, with working controls and recording functionality
- [Kumamap](https://kumamap.com/en) is a bear incident map for Japan tracking 129k+ incidents, running on SvelteKit + Cloudflare Workers and recently featured on Japanese national TV with 226K monthly active users
- [Prikkert](https://prikkert.nl/en) is a free, open source, no-account scheduling poll app (Doodle alternative) built with SvelteKit remote functions - always free, no ads, no tracking, and data auto-deletes when you're done ([GitHub](https://github.com/Quinten/prikkert))
- [Achtually](https://achtually.com/) is a structured real-time debate app with turn-based rounds, timers, and spectator reactions - each debate room runs as its own Cloudflare Durable Object instance
- [Overshoot](https://overshoot.dev) is an interactive exploration of Disney's 12 Principles of Animation, built with Svelte and GSAP by a motion designer
- [Scapedle](https://scapedle.com/) is an open source RuneScape-themed word guessing game ([GitHub](https://github.com/asbedb/Scapedle))
- [moocup](https://moocup.jaydip.me/) is a screenshot tool converted from React to Svelte - the author documented the migration process in a [companion blog post](https://www.jaydip.me/blog/hello-svelte)
- [7-segment display](https://svelte.dev/playground/45c281d60012463592c2120e534b2d93?version=5.55.1) is a Svelte playground recreation of the classic segmented display style from 80s/90s digital devices

### Learning Resources

_Featuring Svelte Contributors and Ambassadors_

- [Svelte, Remote Functions, TMCP, and Custom Renderers](https://youtu.be/2r25fPn95M8) by Paolo Ricciuti - covers remote functions, the typed MCP protocol, and custom renderer APIs

_This Week in Svelte_

- [Ep. 137](https://www.youtube.com/watch?v=KepF0I5iLb0) - Changelog
- [Ep. 138](https://www.youtube.com/watch?v=YwKsLJ5p-uQ) - Changelog
- [Ep. 139](https://www.youtube.com/watch?v=6muvGbGOG7E) - Changelog, Imperative interfaces

_To Read_

- [Svelte reaches 'adopt' on the Thoughtworks Technology Radar](https://www.thoughtworks.com/radar/languages-and-frameworks/summary/svelte) - Thoughtworks added Svelte to their radar at the highest recommendation tier
- [How we Rewrote 130K Lines from React to Svelte in Two Weeks](https://strawberrybrowser.com/blog/react-to-svelte) by the Strawberry Browser team - a post-mortem on using coding agents and strict Svelte rules to migrate a full browser UI to Svelte 5 runes, with 2x performance gains

### Libraries, Tools & Components

_UI Components and Animations_

- [SvelteDnD](https://github.com/thisux/sveltednd) is a drag-and-drop library for Svelte 5, rewritten with runes-native state management
- [Blossom color picker](https://www.reddit.com/r/sveltejs/comments/1sc5885/blossom_color_picker_ui_built_with_svelte/) is a flower-style color picker UI component with multi-layer fixed colors, an arc saturation slider, and animated open/close interactions, available for Svelte, Vue, React, and vanilla JS
- [phantom-ui](https://www.reddit.com/r/sveltejs/comments/1seesc4/skeleton_loader_that_generates_itself_from_your/) is a zero-config skeleton loader Web Component (8kb) that reads your actual DOM to generate shimmer blocks automatically - no manual skeleton layout needed
- [Svelte Spell UI](https://www.reddit.com/r/sveltejs/comments/1say0s3/i_ported_21_new_animations_components_svelte/) provides 21 animation components ported to Svelte, installable via the shadcn-svelte CLI
- [Svileo](https://www.reddit.com/r/sveltejs/comments/1sbgc9j/svileo_physicsbased_toast_component_for_svelte/) is a physics-based toast notification component for Svelte, inspired by Sileo's spring animations

_State Management_

- [Stately](https://github.com/selfagency/stately) is a Pinia-inspired state management library for Svelte 5 with a familiar `defineStore()` API, direct mutation ergonomics, SSR-safe patterns, and a plugin system for persistence, history, and async orchestration

_Utilities and Integrations_

- [Sveltia I18n](https://github.com/sveltia/sveltia-i18n) is an i18n library powered by Svelte 5 Runes and Unicode MessageFormat 2, supporting complex pluralization and selection patterns beyond simple variable interpolation
- [sveltekit-openapi-rpc](https://www.reddit.com/r/sveltejs/comments/1s3qczx/i_built_a_package_that_generates_sveltekit_remote/) generates SvelteKit remote functions from OpenAPI/Swagger specs, reducing boilerplate when integrating with API-first backends
- [svelte-effect-runtime](https://ser.barekey.dev/) is a Vite plugin that adds full native Effect.ts execution to SvelteKit, for both client and server, under the remote functions API ([GitHub](https://github.com/usebarekey/svelte-effect-runtime))

_Developer Tools_

- [svelte-check-native](https://github.com/harshmandan/svelte-check-native) is a Rust + tsgo-powered Svelte type checker offering up to 15× speedup over the standard `svelte-check`, designed for use in CI/CD and with AI coding agents

That's it for this month! Let us know if we missed anything on [Reddit](https://www.reddit.com/r/sveltejs/) or [Discord](https://discord.gg/svelte).

Until next time 👋🏼!
