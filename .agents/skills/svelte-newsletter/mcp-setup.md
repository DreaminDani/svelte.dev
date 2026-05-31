# Community API Setup Guide

This guide explains how to source GitHub, Reddit, and Discord data using HTTP endpoints.
It intentionally uses direct API calls.

## GitHub

Fetch CHANGELOGs directly via `curl` or `web_fetch`:

```bash
# Svelte CHANGELOG
curl -s https://raw.githubusercontent.com/sveltejs/svelte/main/packages/svelte/CHANGELOG.md

# SvelteKit CHANGELOG
curl -s https://raw.githubusercontent.com/sveltejs/kit/main/packages/kit/CHANGELOG.md

# Browse releases pages
# https://github.com/sveltejs/svelte/releases
# https://github.com/sveltejs/cli/releases
# https://github.com/sveltejs/language-tools/releases
# https://github.com/sveltejs/ai-tools/releases
```

---

## Reddit

**Reddit's Data API is closed to new clients.** As of 2026 you cannot create new
script-app OAuth credentials, anonymous `/r/<sub>/top/.json` returns 403, and even
authenticated `curl` hits a JS bot challenge. The reliable path is to drive a real
Chromium via Playwright using a persistent profile that's logged in once.

The fetcher lives at `.agents/skills/svelte-newsletter/fetch-reddit-browser.mjs`.

### First-time setup

```bash
cd .agents/skills/svelte-newsletter
npm install                     # installs playwright (skill-local; not in pnpm workspace)
npx playwright install chromium # downloads the browser

# Headed run; sign in to reddit.com when the window opens.
REDDIT_BROWSER_HEADED=1 node fetch-reddit-browser.mjs 5
```

The browser profile is saved to `~/.cache/svelte-newsletter/reddit-profile` and reused
on subsequent runs. You should not need to log in again unless Reddit invalidates the
session (rare; usually months).

Recommended: log in as `u/sveltenewsletter` (or whatever account you own for the
newsletter) so any future write actions are attributable to that account.

### Normal use

```bash
# Headless. Default 25 posts; pass any number as the first arg.
node .agents/skills/svelte-newsletter/fetch-reddit-browser.mjs 25 > /tmp/reddit-<yyyy-mm>.md
```

Output is markdown on stdout (progress goes to stderr). For each post you get:

- Title, permalink, author, score, comment count, posted date
- The post body (truncated to ~1200 chars)
- Up to 3 top comments (truncated to ~500 chars each), with `(OP)` tagged when the
  author matches the post's author

### Env vars

| Var                          | Default    | Purpose                                                                    |
| ---------------------------- | ---------- | -------------------------------------------------------------------------- |
| `REDDIT_BROWSER_HEADED`      | unset      | Set to `1` to open a visible browser window (needed for first-time login). |
| `REDDIT_TIMEFRAME`           | `month`    | One of `hour`, `day`, `week`, `month`, `year`, `all`.                      |
| `REDDIT_SUBREDDIT`           | `sveltejs` | Subreddit to scrape (without `r/`).                                        |
| `REDDIT_COMMENTS_PER_POST`   | `3`        | Number of top comments to capture per post.                                |
| `REDDIT_INTER_POST_DELAY_MS` | `1500`     | Delay between post page visits to avoid hammering.                         |

### Troubleshooting

- **"Not logged in and running headless"**: re-run with `REDDIT_BROWSER_HEADED=1` once
  and log in.
- **Empty post body**: the post is a link/media post rather than a text post. Expected.
- **Hung on a post**: Reddit occasionally serves a JS challenge mid-session. Re-run; it
  resolves itself.
- **"Please wait for verification" stuck**: your profile expired. Delete
  `~/.cache/svelte-newsletter/reddit-profile` and redo the headed login.
- **Want to scrape another subreddit / longer timeframe**: use the env vars above.

---

## YouTube

Preferred: use YouTube Data API v3 with an API key for reliable episode discovery.

```bash
export YOUTUBE_API_KEY='...'
bash .agents/skills/svelte-newsletter/fetch-youtube.sh

# Optional: only episodes after a cutoff
bash .agents/skills/svelte-newsletter/fetch-youtube.sh 2026-05-24T20:19:00Z
```

Repository-local option:

```bash
echo 'YOUTUBE_API_KEY="..."' >> .env.local
set -a && source .env.local && set +a
```

If YouTube web pages redirect to sign-in/challenge screens, prefer API output over page scraping.

---

## Discord HTTP API

Discord sourcing uses a bot token plus the Discord REST API.

### Step 1: Create a Discord bot

1. Go to https://discord.com/developers/applications
2. Click "New Application" - name it something like "Newsletter Bot"
3. Go to the "Bot" tab
4. Click "Reset Token" and copy the token - save it securely
5. Under "Privileged Gateway Intents", enable **Message Content Intent**
   (recommended, otherwise message content can be empty)

6. Go to the "OAuth2" tab
7. Under "Scopes", select `bot`
8. Under "Bot Permissions", select these and nothing else:

- **View Channels** (General Permissions) - to see the channels
- **Read Message History** (Text Permissions) - to read past messages
- **Send Messages** (Text Permissions) - to post newsletter drafts or PR links

The permissions integer should be **68608**.

9. Copy the generated URL and open it to invite the bot to the Svelte Discord server
   (you'll need "Manage Server" permission, or ask an admin to add it)

### Step 2: Provide token to shell (recommended)

Do not read tokens from `~/.copilot/*` files. Use a dedicated environment variable.

Preferred env var name:

```bash
export DISCORD_BOT_TOKEN='your_bot_token_here'
```

Repository-local option (recommended for this workspace):

```bash
# .env.local is gitignored in this repo
echo 'DISCORD_BOT_TOKEN="your_bot_token_here"' >> .env.local
# Optional community-source API auth
# echo 'REDDIT_CLIENT_ID="..."' >> .env.local
# echo 'REDDIT_CLIENT_SECRET="..."' >> .env.local
# echo 'REDDIT_USER_AGENT="svelte-newsletter-skill/1.0"' >> .env.local
# echo 'YOUTUBE_API_KEY="..."' >> .env.local
set -a && source .env.local && set +a
```

Or use a local ignored file and source it:

```bash
echo "export DISCORD_BOT_TOKEN='your_bot_token_here'" >> ~/.zshrc.local
source ~/.zshrc.local
```

Other good options:

- Use `direnv` with a local `.envrc` (kept out of git)
- Use a secrets manager CLI (for example 1Password `op`, Bitwarden, or Doppler) and export at runtime

Token hygiene:

- Never commit tokens to the repo
- Never paste tokens into docs or terminal logs
- Rotate immediately if a token is exposed

### Step 3: Read channel data with HTTP endpoints

Use these endpoints:

```bash
# verify token
curl -s -H "Authorization: Bot $DISCORD_BOT_TOKEN" \
  https://discord.com/api/v10/users/@me

# list bot guilds
curl -s -H "Authorization: Bot $DISCORD_BOT_TOKEN" \
  https://discord.com/api/v10/users/@me/guilds?limit=200

# list channels in guild
curl -s -H "Authorization: Bot $DISCORD_BOT_TOKEN" \
  https://discord.com/api/v10/guilds/<GUILD_ID>/channels

# active threads (required for forum channels)
curl -s -H "Authorization: Bot $DISCORD_BOT_TOKEN" \
  https://discord.com/api/v10/guilds/<GUILD_ID>/threads/active

# archived public threads for a forum parent channel
curl -s -H "Authorization: Bot $DISCORD_BOT_TOKEN" \
  "https://discord.com/api/v10/channels/<FORUM_PARENT_CHANNEL_ID>/threads/archived/public?limit=100"

# read recent messages from a thread/channel
curl -s -H "Authorization: Bot $DISCORD_BOT_TOKEN" \
  "https://discord.com/api/v10/channels/<CHANNEL_OR_THREAD_ID>/messages?limit=100"
```

Target channels for this skill:

- `#site-showcase`
- `#library-announcements`
- `#resources`

Known Svelte server IDs can change over time, but in this run they resolved to forum channels
(type 15). Treat them as forum parents and enumerate thread IDs before reading content.

Practical extraction pattern:

1. Resolve target forum parent channel IDs by name.
2. Fetch active guild threads.
3. Fetch archived public threads for each target forum parent.
4. Filter threads by `create_timestamp` against your newsletter cutoff.
5. Fetch each thread's starter message context and extract canonical links.

Starter-message note: `messages?limit=1` can return a recent reply instead of the original post.
Prefer reading multiple messages and using the starter post when available.

### Fallback (manual)

If API access is not available, provide the content manually:

1. Open Discord and navigate to the Svelte server
2. Open each relevant channel (#site-showcase, #library-announcements, #resources)
3. Scroll through posts from the current month
4. Copy and paste relevant posts into a text file
5. Tell the agent to read that file for Discord content

### Troubleshooting

If message content is empty:

1. Enable Message Content Intent in Discord Developer Portal
2. Re-invite the bot to the server after updating intents
3. Retry API calls with `users/@me` first, then channel/thread reads

If thread reads work but content looks noisy/incomplete:

1. Confirm you're reading thread IDs (not only forum parent channel IDs)
2. Fetch more than one message per thread and select the starter post
3. Prefer embedded canonical links over CDN attachment URLs when available
