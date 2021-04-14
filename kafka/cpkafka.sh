#!/bin/bash
# run this on your local workspace

# Download or copy the contents of the Confluent Platform all-in-one Docker Compose file
curl --silent --output docker-compose.yml \
https://raw.githubusercontent.com/confluentinc/cp-all-in-one/6.1.1-post/cp-all-in-one/docker-compose.yml


# Start Confluent Platform with the -d option to run in detached mode
docker-compose up -d


# Navigate to the Control Center web interface at http://localhost:9021
# It may take a minute or two for Control Center to come online.

docker-compose ps