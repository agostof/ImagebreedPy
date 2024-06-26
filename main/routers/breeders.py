from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

from main.services.app_settings import DIRECTORY
from main.services.auth_utils import User, AuthUtils
from main.services.vehicles_service import VehicleService
from main.services.imaging_events_service import ImagingEventService
from main.services.brapi_service import BrAPI

templates = Jinja2Templates(directory=DIRECTORY + "html/")
router = APIRouter(prefix="/breeders")

@router.get("/drone_rover", response_class=HTMLResponse)
async def breeders_tool_box_drone_rover(request: Request):
    context = {"request": request, "id": id}
    return templates.TemplateResponse("drone_rover.html", context=context)

@router.get("/drone_imagery", response_class=HTMLResponse)
async def breeders_toolbox_drone_imagery(request: Request):
    imaging_events = ImagingEventService.getImagingEventDetails()
    context = {
        "request": request,
        "imaging_events": imaging_events,
        "drone_run_base_date": "Jan 02, 2023?",
        "drone_run_averaged_temperature_gdd": "20 days",
        "drone_run_averaged_precipitation_sum": "30 in",
        "days_after_planting_string": "25 days",
        "private_company_id": "private_company_id",
        "private_company_is_private": "true",
        "drone_run_band_project_type": "Band 1 Red Type"
        }
    return templates.TemplateResponse("drone_imagery.html", context=context)

@router.get("/drone_imagery_upload", response_class=HTMLResponse)
async def breeders_toolbox_drone_imagery(request: Request):
    token = AuthUtils.getAccessToken(request)
    sensors = VehicleService.getSensors()
    programs = BrAPI.getProgramSummaries(token=token)
    
    context = {
        "request": request,
        "sensor_options": sensors,
        "company_options": programs
        }
    return templates.TemplateResponse("drone_imagery_upload.html", context=context)


@router.get("/drone_imagery_standard_process", response_class=HTMLResponse)
async def breeders_drone_imagery_standard_process(request: Request, drone_run_project_id:str = None):
    sensors = VehicleService.getSensors()
    context = {
        "request": request, 
        "drone_run_project_id": drone_run_project_id
        }
    return templates.TemplateResponse("drone_imagery_standard_process.html", context=context)

