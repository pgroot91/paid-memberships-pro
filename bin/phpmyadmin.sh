#!/bin/bash
# Start phpMyAdmin connected to wp-env MySQL containers

# Arguments:
# $1 = Docker network to attach phpMyAdmin to
# $2 = Network ID or prefix used for MySQL container names
# $3 = Container prefix/project name

NETWORK="$1"
NETWORK_ID="$2"
PREFIX="$3"

# Stop and remove existing container if it exists
if [ "$(docker ps -aq -f name=${PREFIX}-phpmyadmin)" ]; then
    echo "Stopping existing phpMyAdmin container..."
    docker stop "${PREFIX}-phpmyadmin" 2>/dev/null
    docker rm "${PREFIX}-phpmyadmin" 2>/dev/null
fi

# Start phpMyAdmin container
docker run -d \
    --name "${PREFIX}-phpmyadmin" \
    --network "$NETWORK" \
    -p 8080:80 \
    -e PMA_HOSTS="${PREFIX}-mysql-1,${PREFIX}-tests-mysql-1" \
    -e PMA_VERBOSES="Development,Test" \
    -e PMA_USER=root \
    -e PMA_PASSWORD=password \
    phpmyadmin/phpmyadmin

echo ""
echo "✅ phpMyAdmin started successfully!"
echo "Web UI: http://localhost:8080"
echo "Network: $NETWORK"
echo "Containers accessible: ${PREFIX}-mysql-1, ${PREFIX}-tests-mysql-1"
