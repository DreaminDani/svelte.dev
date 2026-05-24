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

No authentication is required. Run the `fetch-reddit.sh` script included in this skill's
directory:

```bash
bash .agents/skills/svelte-newsletter/fetch-reddit.sh
```

Or fetch the JSON API directly:

```
https://www.reddit.com/r/sveltejs/top/.json?t=month&limit=100
```

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

# active threads (good for forum channels)
curl -s -H "Authorization: Bot $DISCORD_BOT_TOKEN" \
  https://discord.com/api/v10/guilds/<GUILD_ID>/threads/active

# read recent messages from a thread/channel
curl -s -H "Authorization: Bot $DISCORD_BOT_TOKEN" \
  "https://discord.com/api/v10/channels/<CHANNEL_OR_THREAD_ID>/messages?limit=100"
```

Target channels for this skill:

- `#site-showcase`
- `#library-announcements`
- `#resources`

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
