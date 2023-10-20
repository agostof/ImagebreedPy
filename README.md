# Imagebreed-FastAPI

This attemps to implement Imagebreed's functionality using Python.

This app servers static content downloaded from the Imagebreed app. It is currently setup to capture and forward requests in a Man-In-The-Middle fashion. Static content is served from the [site_root](site_root) directory.

## Starting server

Make sure to have the dependencies installed (use of an enviroment recomended):
pip install -r requirements-locked.txt

```bash
# assuming pyenv virtual environment adjust as needed
pyenv activate ImageBreed
python -m uvicorn app:app  --port 8000 --reload
```

