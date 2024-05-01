import os
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, Response, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

import mimetypes
mimetypes.add_type('text/javascript', '.js')

from main.services.app_settings import DIRECTORY, settings
from main.services.auth_utils import AuthUtils

app = FastAPI()

from main.routers import breeders, ajax, api, api_standard_process
from main.routers import s3_cloud_storage, images, image_collections, imaging_events, image_mutations
app.include_router(breeders.router)
app.include_router(ajax.router)
app.include_router(api.router)
app.include_router(api_standard_process.router)
app.include_router(s3_cloud_storage.router)
app.include_router(images.router)
app.include_router(image_collections.router)
app.include_router(image_mutations.router)
app.include_router(imaging_events.router)

templates = Jinja2Templates(directory=DIRECTORY + "html/")

@app.get("/", response_class=HTMLResponse)
async def breeders_tool_box_drone_rover(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "id": id})

@app.get("/login")
async def breeders_tool_box_drone_rover(request: Request):
    return RedirectResponse(AuthUtils.getOAuthLoginURL(redirectURI=str(request.url) + '/redirect'))

@app.get("/login/redirect")
async def breeders_tool_box_drone_rover(request: Request):
    return templates.TemplateResponse("redirect.html", {"request": request, "id": id})

@app.get("/favicon.ico")
async def favicon():
    favicon_path = os.path.join(DIRECTORY, "favicon.ico")
    with open(favicon_path, "rb") as fp:
        content = fp.read()
    return Response(content=content, media_type="image/x-icon")

app.mount("/js", StaticFiles(directory=DIRECTORY + 'js/'), name="static-js")
app.mount("/css", StaticFiles(directory=DIRECTORY + 'css/'), name="static-css")
app.mount("/img", StaticFiles(directory=DIRECTORY + 'img/'), name="static-img")
app.mount("/fonts", StaticFiles(directory=DIRECTORY + 'fonts/'), name="static-fonts")

app.mount("/images", StaticFiles(directory=settings.image_storage_dir), name="imagebreed-images")

print("app loaded")
