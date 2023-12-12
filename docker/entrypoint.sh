#!/bin/bash

#foreground magenta
HGLT="\e[35m"
GREEN="\e[32m"
RED="\e[31m"
RST="\e[0m"

# We will check if any requiered app settings are missing. Will try to
# inform the user about what is missnig, then exit.
echo "Checking if env variables are set for appilication config settings..."
APP_REQ_SETTINGS=(OIDC_ISSUER OIDC_CLIENT_ID DB_URI BRAPI_BASE_URL IMAGE_STORAGE_DIR IMAGE_ARCHIVE_DIR)
APP_REQ_MISSING=0
APP_REQ_MISSING_NAME=()
for VAR in "${APP_REQ_SETTINGS[@]}"; do
    if [ -z "${!VAR}" ]; then
        echo -e "Error: APP setting: ${HGLT}${VAR}${RST} is ${RED}NOT SET${RST} on environment."
	APP_REQ_MISSING=1
	APP_REQ_MISSING_NAME+=("${VAR}")
    else
	 echo -e "APP setting: ${HGLT}${VAR}${RST} ${GREEN}SET${RST}."
    fi
done

# Exit if any required environment variables are unset
if [ $APP_REQ_MISSING -eq 1 ]; then
    echo "ERROR. One or more required environment variables are unset:"
    for M in "${APP_REQ_MISSING_NAME[@]}";
    do
	echo -e "${RED}MISSING: $M${RST}."
    done
    echo "Please check your configuration. And try again. Exiting."
    exit 1
fi


APP_OPTIONAL_SETTINGS=(DEBUG CREATE_DIRS)
for VAR in "${APP_OPTIONAL_SETTINGS[@]}"; do
    if [ ! -z "${!VAR}" ]; then
        echo -e "Optional APP setting: ${HGLT}${VAR}${RST} ${GREEN}SET${RST}."
    fi
done


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


if [[ "${INIT_DB}" == "true" ]]; then
    echo "initialize database"
    python -m main.database.db --drop --init --data
    echo "database initialized"
fi

echo "Loading app"

python -m uvicorn main.app:app --host 0.0.0.0 --port 8000 --reload


