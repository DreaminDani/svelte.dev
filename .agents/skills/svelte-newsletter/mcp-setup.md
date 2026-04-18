# MCP Server Setup Guide

This guide explains how to set up optional MCP servers for Reddit and Discord integration.
These are not required — the skill works with fallback approaches — but they provide a
smoother experience.

## Reddit: reddit-mcp-buddy

**Zero-config, no authentication required.**

### Setup

Add to your Copilot CLI MCP config (`~/.copilot/mcp-config.json`), or use `/mcp add`:

```json
{
	"mcpServers": {
		"reddit": {
			"command": "npx",
			"args": ["-y", "reddit-mcp-buddy"]
		}
	}
}
```

### Available tools

- `browse_subreddit` — Browse posts from a subreddit with sort/time filters
- `search_reddit` — Search for posts across Reddit
- `get_post_details` — Get full details and comments for a specific post

### Usage in the skill

```
browse_subreddit(subreddit="sveltejs", sort="top", time="month")
```

### Fallback (no MCP)

Run the `fetch-reddit.sh` script included in this skill's directory:

```bash
bash .agents/skills/svelte-newsletter/fetch-reddit.sh
```

Or fetch the JSON API directly:

```
https://www.reddit.com/r/sveltejs/top/.json?t=month&limit=100
```

---

## Discord: discord-mcp

**Requires a one-time Discord bot token setup.**

### Step 1: Create a Discord bot

1. Go to https://discord.com/developers/applications
2. Click "New Application" — name it something like "Newsletter Bot"
3. Go to the "Bot" tab
4. Click "Reset Token" and copy the token — save it securely
5. Under "Privileged Gateway Intents", enable:
   - **Message Content Intent**
6. Go to the "OAuth2" tab
7. Under "Scopes", select `bot`
8. Under "Bot Permissions", select:
   - Read Messages/View Channels
   - Read Message History
9. Copy the generated URL and open it to invite the bot to the Svelte Discord server
   (you'll need "Manage Server" permission, or ask an admin to add it)

### Step 2: Configure the MCP server

Add to your Copilot CLI MCP config (`~/.copilot/mcp-config.json`), or use `/mcp add`:

```json
{
	"mcpServers": {
		"discord": {
			"command": "npx",
			"args": ["-y", "discordmcp"],
			"env": {
				"DISCORD_TOKEN": "your_bot_token_here"
			}
		}
	}
}
```

Alternatively, using Docker:

```json
{
	"mcpServers": {
		"discord": {
			"command": "docker",
			"args": [
				"run",
				"--rm",
				"-i",
				"-e",
				"DISCORD_TOKEN=your_bot_token_here",
				"saseq/discord-mcp:latest"
			]
		}
	}
}
```

### Available tools

- `read-messages` — Read recent messages from a channel
- `send-message` — Send a message to a channel (not needed for research)

### Usage in the skill

```
read-messages(channel="community-showcase", limit=100)
read-messages(channel="library-announcements", limit=100)
read-messages(channel="resources", limit=100)
```

### Fallback (no MCP)

If the Discord MCP is not set up, provide the content manually:

1. Open Discord and navigate to the Svelte server
2. Open each relevant channel (#community-showcase, #library-announcements, #resources)
3. Scroll through posts from the current month
4. Copy and paste relevant posts into a text file
5. Tell the agent to read that file for Discord content

### Verification

After setting up either MCP server, verify it's working:

1. Start or restart Copilot CLI
2. Run `/mcp` to see configured servers
3. The server should appear in the list with a "connected" status
