#!/bin/bash

source /app_settings.env

echo "Copying settings to env..."
cp /app_settings.env /.env

# Function to create directory if it doesn't exist
create_directory() {
    local DIR=$1
    if [ ! -d "${DIR}" ]; then
        echo "Creating directory: ${DIR}"
        mkdir -pv "${DIR}"
    fi
}

# Check if IMAGE_STORAGE_DIR exists or create it
if [ ! -d "${IMAGE_STORAGE_DIR}" ]; then
    if [[ "${CREATE_DIRS}" == "true" ]]; then
        create_directory "${IMAGE_STORAGE_DIR}"
    else
        echo "Error: Directory specified in IMAGE_STORAGE_DIR does not exist."
        exit 1
    fi
fi

# Check if IMAGE_ARCHIVE_DIR exists or create it
if [ ! -d "${IMAGE_ARCHIVE_DIR}" ]; then
    if [[ "${CREATE_DIRS}" == "true" ]]; then
        create_directory "${IMAGE_ARCHIVE_DIR}"
    else
        echo "Error: Directory specified in IMAGE_ARCHIVE_DIR does not exist."
        exit 1
    fi
fi

echo "Directories verified/created."

echo "Loading app"

python -m uvicorn main.app:app --port 8000 --reload


