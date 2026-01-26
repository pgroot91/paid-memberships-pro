#!/bin/bash
# Run Cypress tests in a Docker container connected to wp-env network

# Arguments:
# $1 = Docker network to attach Cypress to
# $2 = Base URL for WordPress test site
# $3 = Browser to run tests in (chrome/firefox)
# $4 = Path to Cypress config file (optional)

NETWORK="$1"
BASE_URL="$2"
BROWSER="$3"
CONFIG_FILE="${4:-cypress.config.js}"  # default to cypress.config.js

# Pull the latest Cypress Docker image if not already available
docker pull cypress/included:latest

# Run Cypress
docker run --rm \
    --network "$NETWORK" \
    -e CYPRESS_BASE_URL="$BASE_URL" \
    -v "$PWD":/e2e \
    -w /e2e \
    cypress/included:latest \
    --browser "$BROWSER" \
    --config-file "$CONFIG_FILE"

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
    echo "✅ Cypress tests completed successfully!"
else
    echo "❌ Cypress tests failed!"
fi

exit $EXIT_CODE
