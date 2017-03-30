#!/bin/bash

# If script wasn't run in Jenkins set default tag
if [ -z "$JOB_NAME" ]
then
  JOB_NAME="test-1"
fi

# Prepare project and container names for proper status check
PROJECT=`echo $JOB_NAME | sed "s/\-//g"`
CONTAINER=$PROJECT"_app_1"

# Build environment and run ci scripts
docker-compose -f test/docker/docker-compose.yml -p $PROJECT up -d --build --force-recreate

# Check status
docker attach $CONTAINER

# Clean everything up
docker-compose -f test/docker/docker-compose.yml -p $PROJECT kill
docker-compose -f test/docker/docker-compose.yml -p $PROJECT rm -f
