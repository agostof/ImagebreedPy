from fastapi import APIRouter, Request, UploadFile, File, Form, Depends
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from typing import Annotated
import time

from main.database.db_models import Vehicle, DRONE, ROVER, ImagingEvent
from main.models.analytics_models import AnalyticsRequest, AnalyticsResponse, AnalysisQueryRequest
from main.models.imaging_event_models import ImageRequest, RotateImageRequest, CropImageRequest, ThresholdImageRequest, PlotPolygonTemplateRequest, PlotPolygonPreviewRequest, StandardProcessRequest
from main.services.vehicles_service import VehicleRequest, VehicleService
from main.services.imaging_events_service import ImagingEventService, ImagingEventRequest
from main.services.images_service import ImageService
from main.services.app_settings import DIRECTORY
from main.services.auth_utils import User, AuthUtils

templates = Jinja2Templates(directory=DIRECTORY + "html/")
router = APIRouter(prefix="/api")

@router.get("/verifytoken")
async def get_verifytoken(current_user: User = Depends(AuthUtils.getCurrentUser)):
    return JSONResponse(content= {"username": current_user.username})


@router.get("/drone_imagery/get_field_trial_drone_run_projects_in_same_orthophoto")
async def get_field_trial_drone_run_projects_in_same_orthophoto(current_user: User = Depends(AuthUtils.getCurrentUser)):
    MOCK_drone_run_projects = {
        "drone_run_project_ids": ["test"],
        "drone_run_project_names": ["test"],
        "drone_run_field_trial_ids": ["test"],
        "drone_run_field_trial_names": ["test"],
        "drone_run_all_field_trial_names": ["layout1"],
        "drone_run_all_field_trial_layouts": {"layout1": 
                                                {'output':
                                                    [
                                                        ['germplasm name', 'other data'],
                                                        ['Germplasm Name 1', 'other data'],
                                                    ],
                                                'trial_name': "trial name"
                                                }
                                            },
    }
    return JSONResponse(content= MOCK_drone_run_projects)

@router.get("/drone_imagery/get_image")
async def get_image( image_id:str = None, current_user: User = Depends(AuthUtils.getCurrentUser)):
    image_data = ImageService.getImageMetadata(image_id=image_id)
    image_response = {
        "image_url": image_data.local_path,
        "image_width": image_data.width,
        "image_height": image_data.height
    }
    return JSONResponse(content=image_response)

@router.get("/drone_imagery/get_weeks_after_planting_date")
async def get_weeks_after_planting_date(current_user: User = Depends(AuthUtils.getCurrentUser), drone_run_project_id:str = None):
    MOCK_weeksAfter = [{
        "trial_name": "trial name",
        "planting_date": "yesterday",
        "drone_run_date": "today",
        "time_ontology_week_term": "week",
        "time_ontology_day_term": "day",
    }]
    return JSONResponse(content=MOCK_weeksAfter)

@router.get("/drone_rover/get_collection")
async def get_collection(current_user: User = Depends(AuthUtils.getCurrentUser), drone_run_project_id:str = None, collection_number:str = None):
    MOCK_collection = {
        "tracker": {
            "start_range" : "1",
            "stop_range" : "1",
            "start_column" : "3",
            "stop_column" : "4",
        },
        "field": {
            "range_min" : "5",
            "range_max" : "6",
            "column_min" : "7",
            "column_max" : "8",
            "name": "Field Name",
            "rows_per_column": "9",
            "plot_length": "10",
            "row_width": "11",
            "planting_spacing": "12",
            "crop_name": "Crop Name",
        }
    }
    return JSONResponse(content={"run_info": MOCK_collection})

@router.get("/drone_rover/rover_vehicles")
async def get_drone_rover_vehicles(current_user: User = Depends(AuthUtils.getCurrentUser)):
    rovers = VehicleService.getVehicles(includeDrones=False, includeRovers=True)
    droneRoverEvents = []

    for rover in rovers:
        rover_row = [rover.vehicle_name, rover.vehicle_description, rover.private_company_id, rover.battery_names]
        droneRoverEvents.append(rover_row)

    return JSONResponse(content={"data": droneRoverEvents})

@router.get("/drone_rover/drone_rover_top")
async def get_drone_rover_top(current_user: User = Depends(AuthUtils.getCurrentUser)):
    imaging_events = ImagingEventService.getImagingEventTableRows(vehicleType=ROVER)
    return JSONResponse(content={"data": imaging_events})

@router.get("/drone_imagery/raw_drone_imagery_top")
async def get_raw_drone_imagery_top(current_user: User = Depends(AuthUtils.getCurrentUser)):
    imaging_events = ImagingEventService.getImagingEventTableRows(vehicleType=DRONE)
    return JSONResponse(content={"data": imaging_events})

@router.get("/drone_rover/processed_plot_point_cloud_count")
async def get_processed_plot_point_cloud_count(current_user: User = Depends(AuthUtils.getCurrentUser)):
    MOCK_pointCloudCount = {
        "pc123":{
            "total_plot_point_cloud_count": 10,
            "cn123": 3,
            "cn456": 3,
            "cn789": 4,
        },
        "pc456":{
            "total_plot_point_cloud_count": 10,
            "cn234": 3,
            "cn567": 3,
            "cn890": 4,
        }
    }
    return JSONResponse(content={"data": MOCK_pointCloudCount})

@router.get("/drone_imagery/raw_drone_imagery_plot_image_count")
async def get_raw_drone_imagery_plot_image_count(current_user: User = Depends(AuthUtils.getCurrentUser)):
    MOCK_imageCount = {
        "pc123":{
            "total_plot_point_cloud_count": 10,
            "cn123": 3,
            "cn456": 3,
            "cn789": 4,
        },
        "pc456":{
            "total_plot_point_cloud_count": 10,
            "cn234": 3,
            "cn567": 3,
            "cn890": 4,
        }
    }
    return JSONResponse(content={"data": MOCK_imageCount})


@router.get("/drone_imagery/get_vehicle")
async def get_vehicle(vehicle_id: str, current_user: User = Depends(AuthUtils.getCurrentUser)):
    response = {"vehicles": [], "success":1}
    if vehicle_id :
        vehicle_db = VehicleService.getVehicle(vehicle_id=vehicle_id)
        if vehicle_db:
            vehicle = VehicleService.convertToAPIResponse(vehicle=vehicle_db)
            response["vehicles"].append(vehicle)
        else:
            response["success"] = 0
    else :
        response["success"] = 0
    return JSONResponse(content=response)


@router.get("/drone_imagery/drone_runs")
async def get_drone_runs(select_checkbox_name: str, field_trial_ids: str, disable: int = 0, is_rover: int = 0, current_user: User = Depends(AuthUtils.getCurrentUser)):
    imaging_events = []
    if is_rover:
        imaging_events = ImagingEventService.getImagingEventTableRows(vehicleType=ROVER)
    else:
        imaging_events = ImagingEventService.getImagingEventTableRows(vehicleType=DRONE)
    for event_row in imaging_events:
        event_row.insert(0, f"<input type='checkbox' name='{select_checkbox_name}'>")
    return JSONResponse(content={"data": imaging_events})


@router.get("/drone_imagery/drone_run_bands")
async def get_drone_runs(select_checkbox_name: str, drone_run_project_id: str, current_user: User = Depends(AuthUtils.getCurrentUser)):
    MOCK_imagery_bands = [
        ["Imaging Event Band Name", "Band Description", "Band Type", "Imaging Event Name", "Imaging Event Description", "Imaging Event Date", "Field Trial Name", "Field Trial Description"],
        ["Imaging Event Band Name", "Band Description", "Band Type", "Imaging Event Name", "Imaging Event Description", "Imaging Event Date", "Field Trial Name", "Field Trial Description"]
    ]

    for band in MOCK_imagery_bands:
        band.insert(0, f"<input type='checkbox' name='{select_checkbox_name}'>")
    return JSONResponse(content={"data": MOCK_imagery_bands})

@router.get("/drone_imagery/imaging_vehicles")
async def get_imaging_vehicles(current_user: User = Depends(AuthUtils.getCurrentUser)):
    drones = VehicleService.getVehicles(includeDrones=True, includeRovers=False)
    dronesResponse = []

    for drone in drones:
        drone_row = [drone.vehicle_name, drone.vehicle_description, drone.private_company_id, drone.battery_names]
        dronesResponse.append(drone_row)

    return JSONResponse(content={"data": dronesResponse})


@router.get("/drone_imagery/check_field_trial_ids")
async def get_check_field_trial_ids(field_trial_ids: str, current_user: User = Depends(AuthUtils.getCurrentUser)):
    MOCK_fieldTrialIds = {
        "field_trial_names": [field_trial_ids],
        "html": "The "+field_trial_ids+" field trial has planting date: 2023-November-01 and NOAA Station ID: GHCND:USC00300331.",
        "can_proceed": 1
    }
    return JSONResponse(content=MOCK_fieldTrialIds)


@router.get("/drone_imagery/upload_drone_imagery_check_drone_name")
async def get_check_drone_name(drone_run_name: str, current_user: User = Depends(AuthUtils.getCurrentUser)):
    MOCK_checkDroneName = {
        "success": drone_run_name,
        "error": ""
    }
    return JSONResponse(content=MOCK_checkDroneName)

@router.get("/drone_imagery/export_drone_runs")
async def get_export_drone_runs(drone_run_project_ids: str, field_trial_id: str, current_user: User = Depends(AuthUtils.getCurrentUser)):
    MOCK_exportRuns = {
        "imaging_events_spreadsheet": "https://brapi.org",
        "orthoimage_zipfile": "https://brapi.org",
        "geojson_zipfile": "https://brapi.org",
        "geojson_gps_zipfile": "https://brapi.org",
        "error": ""
    }
    return JSONResponse(content=MOCK_exportRuns)

@router.get("/drone_imagery/get_image_for_saving_gcp")
async def get_image_for_saving_gcp(drone_run_project_id: str, current_user: User = Depends(AuthUtils.getCurrentUser)):
    MOCK_exportRuns = {
        "saved_gcps_full": "https://brapi.org",
        "gcps_array": "https://brapi.org",
        "error": ""
    }
    return JSONResponse(content=MOCK_exportRuns)

@router.get("/drone_imagery/get_project_md_image")
async def get_project_md_image(drone_run_band_project_id: str, current_user: User = Depends(AuthUtils.getCurrentUser)):
    MOCK_md_image = {
        "data": [
            {
                "image_id": "1"
            }
        ]
    }
    return JSONResponse(content=MOCK_md_image)

@router.get("/drone_imagery/brighten_image")
async def get_brighten_image(image_id: str, current_user: User = Depends(AuthUtils.getCurrentUser)):
    MOCK_bright_image = {
        "brightened_image_id": "1"
    }
    return JSONResponse(content=MOCK_bright_image)

@router.get("/drone_imagery/retrieve_parameter_template")
async def get_parameter_template(plot_polygons_template_projectprop_id: str, current_user: User = Depends(AuthUtils.getCurrentUser)):
    MOCK_parameter_template = {
        "parameter": {"thingy":"1"}
    }
    return JSONResponse(content=MOCK_parameter_template)



# POST ENDPOINTS

@router.post("/drone_rover/upload_drone_rover")
async def post_upload_drone_rover(
    request: Request,
    upload_drone_rover_zipfile_lidar_earthsense_collections: Annotated[UploadFile, File()],
    rover_run_company_id: Annotated[str, Form()],
    rover_run_field_trial_id: Annotated[str, Form()]):
    print(upload_drone_rover_zipfile_lidar_earthsense_collections)
    print(rover_run_company_id)
    return templates.TemplateResponse("drone_rover.html", {"request": request, "id": id})

@router.post("/drone_imagery/new_imaging_vehicle")
async def post_new_imaging_vehicle(request: VehicleRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    vehicle:Vehicle = VehicleService.saveVehicle(vehicleReq=request, vehicle_type=DRONE)
    return JSONResponse(content={"error": "", "success": "true", "new_vehicle_id": vehicle.id})

@router.post("/drone_imagery/new_imaging_vehicle_rover")
async def post_new_imaging_vehicle_rover(request: VehicleRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    vehicle:Vehicle = VehicleService.saveVehicle(vehicleReq=request, vehicle_type=ROVER)
    return JSONResponse(content={"error": "", "success": "true", "new_vehicle_id": vehicle.id})

@router.post("/drone_imagery/upload_drone_imagery")
async def post_upload_drone_imagery(request: Request):

    await request._get_form()
    imaging_event_request = ImagingEventRequest(http_form_request=request)

    available_uploads = ImagingEventService.archiveUploads(request=imaging_event_request)

    sensor = VehicleService.getSensorFromName(imaging_event_request.camera_info)

    new_imaging_event = ImagingEvent(name=imaging_event_request.drone_run_name, 
                                     description=imaging_event_request.drone_run_description,
                                     vehicle_id=imaging_event_request.vehicle_id,
                                     event_type=imaging_event_request.drone_run_type,
                                     timestamp=imaging_event_request.drone_run_date,
                                     sensor_id=sensor.id, 
                                     trial_name=imaging_event_request.drone_run_field_trial_id,
                                     trial_description=imaging_event_request.drone_run_field_trial_id,
                                     )
    ImagingEventService.saveImagingEvent(event=new_imaging_event)

    time.sleep(1)
    return templates.TemplateResponse("drone_imagery.html", {"request": request, "id": id})
    # return RedirectResponse(url="/breeders/drone_imagery")

@router.post("/drone_imagery/rotate_image")
async def post_rotate_image(request: RotateImageRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request)
    time.sleep(1)
    return JSONResponse(content={"error": "", "rotated_image_id": "1"})

@router.post("/drone_imagery/crop_image")
async def post_crop_image(request: CropImageRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request)
    time.sleep(1)
    return JSONResponse(content={"error": "", "cropped_image_id": "1"})

@router.post("/drone_imagery/denoise")
async def post_denoise(request: ImageRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request)
    time.sleep(1)
    return JSONResponse(content={"error": "", "denoised_image_id": "1"})


@router.post("/drone_imagery/remove_background_percentage_save")
async def post_remove_background_percentage_save(request: ThresholdImageRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request)
    time.sleep(1)
    return JSONResponse(content=[{"removed_background_image_id": "1"}])


@router.post("/drone_imagery/save_plot_polygons_template")
async def post_save_plot_polygons_template(request: PlotPolygonTemplateRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request)
    time.sleep(1)
    return JSONResponse(content={"error": "", "success": "true"})


@router.post("/drone_imagery/preview_plot_polygons")
async def post_preview_plot_polygons(request: PlotPolygonPreviewRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request)
    time.sleep(1)
    return JSONResponse(content={"error": "", "plot_polygon_preview_urls": ["/img/USDANIFAlogo.png"], "plot_polygon_preview_image_sizes": [[200, 200]]})


@router.post("/drone_imagery/check_maximum_standard_processes")
async def post_check_maximum_standard_processes(current_user: User = Depends(AuthUtils.getCurrentUser)):
    time.sleep(1)
    return JSONResponse(content={"error": "", "success": "true"})


@router.post("/drone_imagery/standard_process_apply")
async def post_standard_process_apply(request: StandardProcessRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request)
    time.sleep(1)
    return JSONResponse(content={"error": "", "success": "true"})

@router.post("/drone_imagery/calculate_analytics")
async def post_calculate_analytics(request: AnalyticsRequest, current_user: User = Depends(AuthUtils.getCurrentUser)) -> AnalyticsResponse:
    print(request)
    response = AnalyticsResponse(
        analytics_protocol_id="apid123", 
        unique_accessions=["ac123", "ac456"],
        unique_plots=["plot1", "plot2"], 
        unique_traits=["trait123", "trait456"])
    return response

@router.post("/drone_imagery/analysis_query")
async def post_analysis_query (request: AnalysisQueryRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request)
    return JSONResponse(content={"error": "", "success": "true", "file": "https://brapi.org"})
