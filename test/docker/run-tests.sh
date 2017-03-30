#!/bin/bash

set -e

PROJECT=pingeon
CONTAINER=$PROJECT"_app_1"

# Build environment and run ci scripts
docker-compose -f test/docker/docker-compose.yml -p $PROJECT up -d --build --force-recreate

# Check status
docker attach $CONTAINER

# Clean everything up
docker-compose -f test/docker/docker-compose.yml -p $PROJECT kill
docker-compose -f test/docker/docker-compose.yml -p $PROJECT rm -f
