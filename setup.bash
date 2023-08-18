#!/bin/bash

# Function to create the required directories
create_directories() {
  mkdir -p $VOLUME_PATH/node_modules
  mkdir -p $VOLUME_PATH/dist
  mkdir -p $VOLUME_PATH/.nuxt
}

# Function to build and run the Docker container
run_docker_container() {
    echo "$VOLUME_PATH"
  # Step 1: Build the Docker image
  docker build -t my-node-app -f "$DOCKERFILE_PATH" .

  # Step 2: Run the Docker container and link the volume
  docker run -it -v "$1:/app" my-node-app sh -c "cd /app && yarn install && echo 'yarn install completed!'"
}

# Define the path to the Dockerfile
DOCKERFILE_PATH="docker/setup-node/Dockerfile"

# Check if the volume path argument is provided
if [ -z "$1" ]; then
  # If no volume path is provided, use the current working directory
  VOLUME_PATH="$(pwd)"
else
  # If a volume path is provided, append it to the current working directory
  VOLUME_PATH="$(realpath "$(pwd)/$1")"
fi

# Create the required directories
create_directories

# Run the Docker container with the specified volume path
run_docker_container "$VOLUME_PATH"
