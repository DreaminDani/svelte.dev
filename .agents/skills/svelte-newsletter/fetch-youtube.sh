#!/usr/bin/env bash
# Fetches recent "This Week in Svelte" episodes using YouTube Data API v3.
#
# Usage:
#   bash fetch-youtube.sh [since_iso]
#
# Examples:
#   bash fetch-youtube.sh
#   bash fetch-youtube.sh 2026-05-24T20:19:00Z
#
# Required env var:
#   YOUTUBE_API_KEY

set -euo pipefail

SINCE_ISO="${1:-}"
API_KEY="${YOUTUBE_API_KEY:-}"

if [[ -z "$API_KEY" ]]; then
    echo "Missing YOUTUBE_API_KEY."
    echo "Set it in your environment (or .env.local) and retry."
    exit 1
fi

api_get() {
    local url="$1"
    curl -sS "$url"
}

# Prefer forHandle when available.
channel_payload="$(api_get "https://www.googleapis.com/youtube/v3/channels?part=id,contentDetails,snippet&forHandle=@SvelteSociety&key=$API_KEY")"

channel_id="$(python3 -c "
import json,sys
payload=json.loads(sys.stdin.read())
items=payload.get('items', [])
print(items[0].get('id','') if items else '')
" <<< "$channel_payload")"

if [[ -z "$channel_id" ]]; then
    # Fallback search if handle lookup fails.
    search_payload="$(api_get "https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&maxResults=5&q=Svelte%20Society&key=$API_KEY")"
    channel_id="$(python3 -c "
import json,sys
payload=json.loads(sys.stdin.read())
items=payload.get('items', [])
print(items[0].get('id',{}).get('channelId','') if items else '')
" <<< "$search_payload")"
fi

if [[ -z "$channel_id" ]]; then
    echo "Unable to resolve Svelte Society channel ID via YouTube API."
    exit 1
fi

channel_details="$(api_get "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=$channel_id&key=$API_KEY")"
uploads_playlist="$(python3 -c "
import json,sys
payload=json.loads(sys.stdin.read())
items=payload.get('items', [])
if not items:
    print('')
else:
    print(items[0].get('contentDetails',{}).get('relatedPlaylists',{}).get('uploads',''))
" <<< "$channel_details")"

if [[ -z "$uploads_playlist" ]]; then
    echo "Unable to resolve uploads playlist for channel $channel_id."
    exit 1
fi

videos_payload="$(api_get "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=$uploads_playlist&maxResults=50&key=$API_KEY")"

python3 -c "
import datetime as dt
import json
import re
import sys

since_raw = sys.argv[1]
payload = json.loads(sys.stdin.read())
items = payload.get('items', [])

since_dt = None
if since_raw:
    try:
        since_dt = dt.datetime.fromisoformat(since_raw.replace('Z', '+00:00'))
    except Exception:
        pass

episodes = []
for item in items:
    snippet = item.get('snippet', {})
    title = snippet.get('title', '')
    if 'this week in svelte' not in title.lower():
        continue

    published = snippet.get('publishedAt', '')
    video_id = item.get('contentDetails', {}).get('videoId', '')
    if not video_id:
        resource = snippet.get('resourceId', {})
        video_id = resource.get('videoId', '')
    if not video_id:
        continue

    published_dt = None
    if published:
        try:
            published_dt = dt.datetime.fromisoformat(published.replace('Z', '+00:00'))
        except Exception:
            published_dt = None

    if since_dt and published_dt and published_dt <= since_dt:
        continue

    m = re.search(r'ep\\.?\\s*(\\d+)', title, re.IGNORECASE)
    episode_num = m.group(1) if m else None

    topic = 'Changelog'
    dash_parts = re.split(r'[—-]', title, maxsplit=1)
    if len(dash_parts) > 1 and dash_parts[1].strip():
        topic = dash_parts[1].strip()

    episodes.append((published_dt or dt.datetime.min.replace(tzinfo=dt.timezone.utc), episode_num, topic, video_id))

episodes.sort(key=lambda x: x[0])

print('# This Week in Svelte episodes')
if since_raw:
    print(f'# Since: {since_raw}')
print('')

if not episodes:
    print('No matching episodes found in the fetched range.')
    sys.exit(0)

for _, ep, topic, video_id in episodes:
    if ep:
        print(f'- [Ep. {ep}](https://www.youtube.com/watch?v={video_id}) - {topic}')
    else:
        print(f'- [Episode](https://www.youtube.com/watch?v={video_id}) - {topic}')
" "$SINCE_ISO" <<< "$videos_payload"
