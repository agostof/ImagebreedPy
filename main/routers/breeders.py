from fastapi import APIRouter, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse

from main.services.app_settings import DIRECTORY
from main.services.vehicles_service import VehicleService

templates = Jinja2Templates(directory=DIRECTORY + "html/")
router = APIRouter(prefix="/breeders")

@router.get("/drone_rover", response_class=HTMLResponse)
async def breeders_tool_box_drone_rover(request: Request):
    context = {"request": request, "id": id}
    return templates.TemplateResponse("drone_rover.html", context=context)

@router.get("/drone_imagery", response_class=HTMLResponse)
async def breeders_toolbox_drone_imagery(request: Request):
    sensors = VehicleService.getSensors()
    context = {
        "request": request,
        "sensor_options": sensors, 
        "trial_name": "Breeding Trial 1",
        "trial_id": "123",
        "drone_run_project_name": "Drone Run ABC",
        "drone_run_date": "Jan 01, 2023",
        "drone_run_base_date": "Jan 02, 2023?",
        "drone_run_type": "High Res",
        "drone_run_project_description": "This is a description of the drone run",
        "drone_run_camera_rig": "Standard RGB Camera",
        "drone_run_averaged_temperature_gdd": "20 days",
        "drone_run_averaged_precipitation_sum": "30 in",
        "days_after_planting_string": "25 days",
        "private_company_id": "private_company_id",
        "private_company_is_private": "true",
        "drone_run_band_project_name": "Band 1 Red",
        "drone_run_band_project_description": "Band 1 Red Description",
        "drone_run_band_project_type": "Band 1 Red Type"
        }
    return templates.TemplateResponse("drone_imagery.html", context=context)


@router.get("/drone_imagery_standard_process", response_class=HTMLResponse)
async def breeders_drone_imagery_standard_process(request: Request, drone_run_project_id:str = None):
    sensors = VehicleService.getSensors()
    context = {
        "request": request, 
        "drone_run_project_id": drone_run_project_id
        }
    return templates.TemplateResponse("drone_imagery_standard_process.html", context=context)

