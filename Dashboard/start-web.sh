#!/usr/bin/env bash
# Launches the opencode web interface used by the dashboard's session links.
# Links point at http://127.0.0.1:4096/... (see sessions.json baseUrl).

PORT="${PORT:-4096}"
URL="http://127.0.0.1:$PORT"

if curl -s -o /dev/null --max-time 2 "$URL"; then
  echo "opencode web already running at $URL"
  xdg-open "$URL" 2>/dev/null || true
  exit 0
fi

# Start unsecured (remove password vars) so the browser can open session links directly.
env -u OPENCODE_SERVER_PASSWORD -u OPENCODE_SERVER_USERNAME \
  nohup opencode web --port "$PORT" >/dev/null 2>&1 &

echo "Starting opencode web at $URL ..."
for i in 1 2 3 4 5 6 7 8 9 10; do
  sleep 1
  if curl -s -o /dev/null --max-time 2 "$URL"; then
    echo "Ready: $URL"
    xdg-open "$URL" 2>/dev/null || true
    exit 0
  fi
done
echo "Timed out waiting for $URL — check the opencode web logs." >&2
exit 1
