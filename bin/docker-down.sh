#!/bin/bash
# Stop and remove Mailpit, phpMyAdmin, and wp-env containers

container_name_prefix=$(basename "$PWD")

# Helper function to stop & remove a container if it exists
stop_remove_container() {
    local name="$1"
    if [ "$(docker ps -aq -f name="^${name}$")" ]; then
        echo "Stopping container: $name"
        docker stop "$name" >/dev/null 2>&1
        echo "Removing container: $name"
        docker rm "$name" >/dev/null 2>&1
    else
        echo "Container $name does not exist. Skipping."
    fi
}

# Stop/remove supporting containers
stop_remove_container "${container_name_prefix}-phpmyadmin"
stop_remove_container "${container_name_prefix}-mailpit"

# Stop wp-env
echo "Stopping wp-env..."
wp-env stop

echo "✅ Environment stopped and cleaned up!"
