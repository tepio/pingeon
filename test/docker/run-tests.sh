#!/bin/bash

set -e

# Build environment and run ci scripts
docker-compose -f test/docker/docker-compose.yml up -d --build

# See the output from the scripts
docker attach app

# Clean everything up
docker-compose -f test/docker/docker-compose.yml kill
docker-compose -f test/docker/docker-compose.yml rm -f
