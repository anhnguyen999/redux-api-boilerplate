#!/bin/bash
docker login -u="$DOCKER_HUB_USER" -p="$DOCKER_HUB_PASS"
docker tag $REPO/$APP_NAME:$TAG "$REPO/$APP_NAME:latest"
docker push $REPO/$APP_NAME:$TAG