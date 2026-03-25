#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Configuration
CONTAINER_NAME="sveapanel-landing-dev"
IMAGE_NAME="$1"  # Passed as argument
VITE_API_URL="${2:-https://api.sveapanelen.se/v1/}"  # Second arg or default
PORT=3047

echo "Starting dev deployment for $IMAGE_NAME..."
echo "VITE_API_URL: $VITE_API_URL"

# 1. Pull the new image (pushed by action to GHCR)
echo "Pulling new image..."
docker pull "$IMAGE_NAME"

# 2. Capture the ID of the currently running image (before we stop the container)
OLD_IMAGE_ID=""
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    OLD_IMAGE_ID=$(docker inspect --format='{{.Image}}' $CONTAINER_NAME 2>/dev/null || true)
fi

# 3. Check if container exists and is running
if [ "$(docker ps -q -f name=$CONTAINER_NAME)" ]; then
    echo "Stopping existing container..."
    docker stop $CONTAINER_NAME
    echo "Removing existing container..."
    docker rm $CONTAINER_NAME
elif [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    # Container exists but is stopped
    echo "Removing stopped container..."
    docker rm $CONTAINER_NAME
else
    echo "No existing container found. Proceeding to start."
fi

# 4. Run the new container
echo "Starting new container..."
docker run -d \
  --name "$CONTAINER_NAME" \
  --restart unless-stopped \
  -e VITE_API_URL="$VITE_API_URL" \
  -p $PORT:80 \
  "$IMAGE_NAME"

# 5. Cleanup ONLY the specific old image we just replaced
if [ -n "$OLD_IMAGE_ID" ]; then
    # Get the ID of the new image we just started
    NEW_IMAGE_ID=$(docker inspect --format='{{.Id}}' "$IMAGE_NAME" 2>/dev/null || true)
    
    # Only delete if the old image is different from the new one
    if [ "$OLD_IMAGE_ID" != "$NEW_IMAGE_ID" ]; then
        echo "Cleaning up old image version ($OLD_IMAGE_ID)..."
        # || true suppresses error if image is still in use by another container
        docker rmi "$OLD_IMAGE_ID" || true
    else
        echo "New image is same as old image. Skipping cleanup."
    fi
fi

echo "Dev deployment successful!"
