# MCP Server Setup Guide

This guide explains how to set up MCP servers for GitHub, Reddit, and Discord integration.

## GitHub: github-mcp-server

The GitHub MCP server is **built into Copilot CLI** - no setup needed if you're using it there.

If you're using a different agent (Claude Code, Cursor, OpenCode, etc.), add the official
GitHub MCP server:

```json
{
	"mcpServers": {
		"github": {
			"command": "npx",
			"args": ["-y", "@modelcontextprotocol/server-github"],
			"env": {
				"GITHUB_PERSONAL_ACCESS_TOKEN": "your_github_pat_here"
			}
		}
	}
}
```

Create a personal access token at https://github.com/settings/tokens with `repo` (read)
scope. This enables `get_file_contents`, `list_commits`, `search_code`, and other tools
used to fetch CHANGELOGs and PRs.

**Fallback (no MCP):** Fetch CHANGELOGs directly via curl or web_fetch:

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

- `browse_subreddit` - Browse posts from a subreddit with sort/time filters
- `search_reddit` - Search for posts across Reddit
- `get_post_details` - Get full details and comments for a specific post

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
2. Click "New Application" - name it something like "Newsletter Bot"
3. Go to the "Bot" tab
4. Click "Reset Token" and copy the token - save it securely
5. Under "Privileged Gateway Intents", enable:

- **Message Content Intent**

6. Go to the "OAuth2" tab
7. Under "Scopes", select `bot`
8. Under "Bot Permissions", select these and nothing else:

- **View Channels** (General Permissions) - to see the channels
- **Read Message History** (Text Permissions) - to read past messages
- **Send Messages** (Text Permissions) - to post newsletter drafts or PR links

The permissions integer should be **68608**.

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

- `read-messages` - Read recent messages from a channel
- `send-message` - Send a message to a channel (not needed for research)

### Usage in the skill

```
read-messages(channel="site-showcase", limit=100)
read-messages(channel="library-announcements", limit=100)
read-messages(channel="resources", limit=100)
```

### Fallback (no MCP)

If the Discord MCP is not set up, provide the content manually:

1. Open Discord and navigate to the Svelte server
2. Open each relevant channel (#site-showcase, #library-announcements, #resources)
3. Scroll through posts from the current month
4. Copy and paste relevant posts into a text file
5. Tell the agent to read that file for Discord content

### Verification

After setting up either MCP server, verify it's working:

1. Start or restart Copilot CLI
2. Run `/mcp` to see configured servers
3. The server should appear in the list with a "connected" status
