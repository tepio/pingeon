#!/bin/sh

set -e

BUILD_TYPE=${BUILD_TYPE:-'commit'}
ECR_PATH=093525834944.dkr.ecr.us-east-1.amazonaws.com/tep/pingeon
GIT=git@github.com:tepio/pingeon.git

if [ $BUILD_TYPE = 'commit' ]
then

    if [ -z "$REPOSITORY_TAG" ] || [ -z "$GIT_COMMIT" ]
    then
        echo "[ERROR] Specify REPOSITORY_TAG and GIT_COMMIT. Example: BUILD_TYPE='commit' REPOSITORY_TAG='test' GIT_COMMIT='git_commit_hash'./build.sh"
        exit 1
    fi


else

    if [ ! $BUILD_TYPE = 'release' ]
    then
        echo "[ERROR] BUILD_TYPE should be 'release' or 'commit'"
        exit 1
    fi

    if [ -z "$REPOSITORY_TAG" ] 
    then
        echo "[ERROR] Specify REPOSITORY_TAG Example: BUILD_TYPE='release' REPOSITORY_TAG='v0.0.1' ./build.sh"
        exit 1
    fi

    GIT_COMMIT=$REPOSITORY_TAG;
fi

eval $(aws ecr get-login --region us-east-1 --no-include-email)

rm -rf ./_build/.cache/
git clone $GIT ./_build/.cache/
cd ./_build/.cache/
git checkout $GIT_COMMIT
docker build -t $ECR_PATH:$REPOSITORY_TAG ../
docker push $ECR_PATH:$REPOSITORY_TAG
