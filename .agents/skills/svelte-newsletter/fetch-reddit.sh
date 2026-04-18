#!/usr/bin/env bash
# Fetches top posts from r/sveltejs for the past month via Reddit's public JSON API.
# No authentication required.
#
# Usage: bash fetch-reddit.sh [min_upvotes]
#   min_upvotes: Minimum score to include (default: 20)

set -euo pipefail

MIN_SCORE="${1:-20}"
URL="https://www.reddit.com/r/sveltejs/top/.json?t=month&limit=100"

echo "# Top r/sveltejs posts (${MIN_SCORE}+ upvotes, past month)"
echo ""

curl -s -H "User-Agent: svelte-newsletter-skill/1.0" "$URL" \
  | python3 -c "
import json, sys

data = json.load(sys.stdin)
min_score = int(sys.argv[1])

for child in data['data']['children']:
    post = child['data']
    score = post.get('ups', 0)
    if score < min_score:
        continue

    title = post.get('title', '').replace('|', '\\|')
    url = post.get('url', '')
    permalink = 'https://www.reddit.com' + post.get('permalink', '')
    selftext = post.get('selftext', '')[:200].replace('\n', ' ').strip()
    flair = post.get('link_flair_text', '') or ''
    author = post.get('author', '')
    num_comments = post.get('num_comments', 0)
    is_self = post.get('is_self', False)

    print(f'## [{title}]({permalink})')
    print(f'- **Score**: {score} | **Comments**: {num_comments} | **Author**: u/{author}')
    if flair:
        print(f'- **Flair**: {flair}')
    if not is_self and url:
        print(f'- **Link**: {url}')
    if selftext:
        print(f'- **Preview**: {selftext}...')
    print()
" "$MIN_SCORE"
