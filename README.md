# Imagebreed-FastAPI

This project attempts to implement Imagebreed's functionality using Python.

## Project Install

This project requires Python 3.

After checking out the project into a working directory, use the following commands to get setup and running:

```bash
# setup virtual python environment
$> python -m venv .venv

# activate the virtual environment
$> source .venv/Scripts/activate

# install dependencies
$> pip install -r requirements-locked.txt

# copy and edit the .env file (or set environment variables)
$> cp example.env .env
$> vim .env

# initialize the database
# add the `--data` option to include test data
$> python -m main.database.db --drop --init

# run the server
$> python -m uvicorn main.app:app --port 8000 --reload
```

## Docker Install

A basic docker-compose file is provided. Please edit or create the environment settings file: `.env`. It is recommended to use the provided [example.env](example.env) file as a template.
Make sure to set the `DB_USER` and `DB_PASSWORD` environment variables on the `.env` file.
```bash
DB_USER=postgres
DB_PASSWORD=test
```
If the following variables are not set, the container will not start:
```bash
OIDC_ISSUER
OIDC_CLIENT_ID
DB_URI
BRAPI_BASE_URL
IMAGE_STORAGE_DIR
IMAGE_ARCHIVE_DIR
```
The following variables are optional:
```bash
# creates the image storage and archive directories
CREATE_DIRS=true
# enable DB initialization 
INIT_DB=true

```
You will need to set `CREATE_DIRS` to `true` if you want the docker container to create the image storage directories on the host machine.

Once you have set the applications settings in the `.env` file, you can run:
```bash
docker-compose up
```
*Technical Note.* Please note that the default `env_file` on `docker-compose.yml` is set to `.env` file. Please change this to your own .env file, **if needed**. The variables defined on the .env file will also be available inside the docker container of imgbreedpy. Use `docker-compose config` to check which variables are set or extrapolated. If you need to set additional variables, you can do so by adding them to the `environment` section of the `imgbreedpy` service on  `docker-compose.yml`.
> Warning: Changing the value of env_file to a value different than .env will prevent the docker-compose command from retrieving the values of DB_USER and DB_PASSWORD from the environment (unless defined explicitly). This will cause the container to fail to start.

Please note that you might need to run `docker-compose up --build` if you make changes to the [Dockerfile](docker/Dockerfile).

>Note: The docker-compose file is not intended for production use. Please use for for testing and development purposes only.

