#!/bin/bash


# for testing
# docker run --rm -it -v ${PWD}/example.env:/app_settings.env --entrypoint /bin/bash imgbreedpy

# to persist the image data
# docker run --rm -it -v ${PWD}/example.env:/app_settings.env -e "CREATE_DIRS=true" -v ${PWD}/data:/imagebreed  imgbreedpy


docker run --rm -it -v ${PWD}/example.env:/app_settings.env -e "CREATE_DIRS=true" imgbreedpy
