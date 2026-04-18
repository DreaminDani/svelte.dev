# Svelte Repositories Reference

These are the sveltejs/\* GitHub repositories to monitor for changelog entries each month.

## Primary repositories

### sveltejs/svelte

- **What it is**: The Svelte compiler and runtime
- **CHANGELOG location**: `packages/svelte/CHANGELOG.md`
- **URL**: https://github.com/sveltejs/svelte/blob/main/packages/svelte/CHANGELOG.md
- **Version format in newsletter**: `**svelte@5.54.0**`
- **Docs section**: `svelte/` — https://svelte.dev/docs/svelte/

### sveltejs/kit

- **What it is**: SvelteKit framework + official adapters (node, vercel, netlify, cloudflare, auto, static)
- **CHANGELOG location**: Multiple — each package has its own CHANGELOG.md under `packages/`
  - `packages/kit/CHANGELOG.md` — SvelteKit core
  - `packages/adapter-node/CHANGELOG.md`
  - `packages/adapter-vercel/CHANGELOG.md`
  - `packages/adapter-netlify/CHANGELOG.md`
  - `packages/adapter-cloudflare/CHANGELOG.md`
  - `packages/adapter-cloudflare-workers/CHANGELOG.md`
  - `packages/adapter-auto/CHANGELOG.md`
  - `packages/adapter-static/CHANGELOG.md`
- **URL**: https://github.com/sveltejs/kit/tree/main/packages
- **Version formats in newsletter**:
  - `**kit@2.54.0**` — SvelteKit core
  - `**adapter-node@5.5.0**` or `**sveltejs/adapter-node@5.5.0**` — adapters
  - `**adapter-vercel@6.3.1**` or `**sveltejs/adapter-vercel@6.3.1**`
  - `**adapter-netlify@6.0.0**`
- **Docs section**: `kit/` — https://svelte.dev/docs/kit/

### sveltejs/cli

- **What it is**: The `sv` CLI tool for creating and managing SvelteKit projects
- **CHANGELOG location**: Check releases page — https://github.com/sveltejs/cli/releases
- **Version format in newsletter**: `**sv@0.12.6**`
- **Docs section**: `cli/` — https://svelte.dev/docs/cli/

## Secondary repositories

These are checked less frequently but should be included when they have notable changes.

### sveltejs/language-tools

- **What it is**: Svelte language server, svelte2tsx, VS Code extension
- **CHANGELOG location**: Releases page — https://github.com/sveltejs/language-tools/releases
- **Version formats in newsletter**:
  - `**language-server@0.17.28**` or `**svelte-language-server@0.17.28**`
  - `**svelte2tsx@0.7.23**`
  - `**language-tools@109.7.0**` (VS Code extension version)
- **Note**: Sometimes mentioned inline with Svelte features: `**svelte@5.53.0/svelte-language-server@0.17.28**`

### sveltejs/ai-tools

- **What it is**: Svelte MCP server and AI tooling
- **CHANGELOG location**: Releases page — https://github.com/sveltejs/ai-tools/releases
- **Version format in newsletter**: `**mcp@0.1.16**`
- **Docs section**: `ai/` — https://svelte.dev/docs/ai/

### sveltejs/vite-plugin-svelte

- **What it is**: Vite integration for Svelte
- **CHANGELOG location**: Check releases page — https://github.com/sveltejs/vite-plugin-svelte/releases
- **Version format in newsletter**: `**vite-plugin-svelte@version**`

## How to find features

1. Open the CHANGELOG or releases page for each repo
2. Look for entries dated within the newsletter's date range
3. Filter for `feat:` prefixed commits (conventional commits format)
4. Also look for entries marked as "BREAKING" or containing breaking changes
5. Skip `fix:`, `chore:`, `refactor:`, `perf:`, `docs:` unless they represent a significant
   user-facing change worth highlighting
6. **For the `kit` repo, check ALL packages under `packages/`** — this is critical. Adapter
   changes (node, vercel, netlify, cloudflare, etc.) are just as important as core SvelteKit
   changes. Each adapter has its own CHANGELOG.md. Don't just check `packages/kit/CHANGELOG.md`.
