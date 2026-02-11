#!/bin/bash
# Setup WordPress E2E environment with supporting containers

container_name_prefix=$(basename "$PWD")

# Start wp-env
wp-env start
if [ $? -ne 0 ]; then
  echo "wp-env failed to start. Exiting."
  exit 1
fi

# Find test WordPress container
wp_container=$(docker ps --format "{{.ID}} {{.Names}}" | grep "\-tests-wordpress-1" | awk '{print $1}')
if [ -z "$wp_container" ]; then
  echo "Cannot find WordPress container. Exiting."
  exit 1
fi

# Detect network
network=$(docker inspect "$wp_container" --format '{{range $k,$v := .NetworkSettings.Networks}}{{$k}}{{end}}')
if [ -z "$network" ]; then
  echo "Cannot detect network of WordPress container. Exiting."
  exit 1
fi
network_id=${network%_default}

echo "Detected WordPress network: $network"

# Wait for MySQL
echo "Waiting for MySQL..."
for i in {1..30}; do
  docker exec "$wp_container" bash -c 'mysqladmin ping -h tests-mysql-1 -u root -ppassword' &>/dev/null
  if [ $? -eq 0 ]; then
    echo "MySQL is ready"
    break
  fi
  sleep 2
done

# Start supporting containers
bash ./bin/phpmyadmin.sh "$network" "$network_id" "$container_name_prefix"
bash ./bin/mailpit.sh "$network" "$container_name_prefix"
# Optional: bash ./bin/postfix.sh "$network" "$container_name_prefix"

# Wait for Mailpit
echo "Waiting for Mailpit..."
for i in {1..10}; do
  if curl -s http://localhost:8025 > /dev/null; then
    echo "Mailpit is ready"
    break
  fi
  sleep 1
done

echo "✅ E2E environment is ready!"
