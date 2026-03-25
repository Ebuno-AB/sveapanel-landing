#!/bin/sh
set -e

# Only substitute VITE_API_URL, leave nginx $variables alone
envsubst '${VITE_API_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/default.conf

# Execute the original nginx entrypoint
exec /docker-entrypoint.sh "$@"
