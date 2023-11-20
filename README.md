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

Coming Soon!
