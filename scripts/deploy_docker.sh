#!/bin/bash
docker login -u="$DOCKER_HUB_USER" -p="$DOCKER_HUB_PASS"
docker tag $REPO/$APP_NAME "$REPO/$APP_NAME:$TRAVIS_TAG"
docker push $REPO/$APP_NAME:$TRAVIS_TAG
docker push $REPO/$APP_NAME