from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

from main.services.settings import DIRECTORY

templates = Jinja2Templates(directory=DIRECTORY + "html/")
router = APIRouter(prefix="/breeders")

@router.get("/drone_rover", response_class=HTMLResponse)
async def breeders_tool_box_drone_rover(request: Request):
    print("STATIC_PAGE: drone_rover")
    return templates.TemplateResponse("drone_rover.html", {"request": request, "id": id})

@router.get("/drone_imagery", response_class=HTMLResponse)
async def breeders_toolbox_drone_imagery(request: Request):
    print("STATIC_PAGE: drone_imagery")
    return templates.TemplateResponse("drone_imagery.html", {"request": request, "id": id})

