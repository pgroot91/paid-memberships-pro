#!/bin/bash
# Start Mailpit for email testing with wp-env

# Find the wp-env network (matches 32-char hash + _default)
WPENV_NETWORK=$(docker network ls --format '{{.Name}}' | grep -E '^[a-f0-9]{32}_default$' | head -n 1)

if [ -z "$WPENV_NETWORK" ]; then
    echo "Error: Could not find wp-env network. Make sure wp-env is running."
    echo "Run: npx @wordpress/env start"
    exit 1
fi

echo "Found wp-env network: $WPENV_NETWORK"

# Stop existing Mailpit if running
if [ "$(docker ps -aq -f name=paid-memberships-pro-mailpit)" ]; then 
    echo "Stopping existing Mailpit container..."
    docker stop paid-memberships-pro-mailpit 2>/dev/null
    docker rm paid-memberships-pro-mailpit 2>/dev/null
fi

# Start Mailpit container
echo "Starting Mailpit..."
docker run -d \
    --name paid-memberships-pro-mailpit \
    --network "$WPENV_NETWORK" \
    -p 8025:8025 \
    -p 1025:1025 \
    -e MP_SMTP_AUTH_ACCEPT_ANY=1 \
    -e MP_SMTP_AUTH_ALLOW_INSECURE=1 \
    axllent/mailpit:latest

# Wait a few seconds to ensure Mailpit is healthy
echo "Waiting for Mailpit to become ready..."
for i in {1..10}; do
    if curl -s http://localhost:8025 > /dev/null; then
        echo "Mailpit is ready!"
        break
    fi
    sleep 1
done

echo ""
echo "✅ Mailpit started successfully!"
echo ""
echo "Web UI:    http://localhost:8025"
echo "SMTP:      localhost:1025"
echo "Container: paid-memberships-pro-mailpit"
echo "Network:   $WPENV_NETWORK"
echo ""
echo "WordPress will now send emails to Mailpit automatically."
