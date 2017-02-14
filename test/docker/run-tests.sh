#!/bin/bash

# If script wasn't run in Jenkins set default tag
if [ -z "$BUILD_TAG" ]
then
  BUILD_TAG="test-1"
fi

# Prepare project and container names for proper status check
PROJECT=`echo $BUILD_TAG | sed "s/\-//g"`
CONTAINER=$PROJECT"_app_1"

# Build environment and run ci scripts
docker-compose -f test/docker/docker-compose.yml -p $PROJECT up --abort-on-container-exit --build

# Status check
exit $(docker wait $CONTAINER)
