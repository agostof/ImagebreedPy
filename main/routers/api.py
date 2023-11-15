from fastapi import APIRouter, Request, UploadFile, File, Form, Depends
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from typing import Annotated

from main.services.models import AnalyticsRequest, AnalyticsResponse, AnalysisQueryRequest
from main.services.vehicles import VehicleRequest, VehicleService
from main.services.settings import DIRECTORY
from main.services.auth import User, AuthUtils
from main.database.models import Vehicle, DRONE, ROVER

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
async def get_image(current_user: User = Depends(AuthUtils.getCurrentUser), image_id:str = None):
    MOCK_image = {
        "image_url": f"https://brapi.org/{image_id}",
        "image_width": 200,
        "image_height": 200
    }
    return JSONResponse(content=MOCK_image)

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
    MOCK_droneRoverEvents = [
        ["imaging event 1", "rover", "description", "2022-10-10", "", "EarthSense", "test_trial1", "test_trial1"],
        ["imaging event 2", "rover", "description 2", "2023-10-10", "", "EarthSense", "test_trial1", "test_trial1"],
    ]
    return JSONResponse(content={"data": MOCK_droneRoverEvents})

@router.get("/drone_imagery/raw_drone_imagery_top")
async def get_raw_drone_imagery_top(current_user: User = Depends(AuthUtils.getCurrentUser)):
    MOCK_droneImageryEvents = [
        ["imaging event 1", "drone", "description", "2022-10-10", "", "EarthSense", "test_trial1", "test_trial1"],
        ["imaging event 2", "drone", "description 2", "2023-10-10", "", "EarthSense", "test_trial1", "test_trial1"],
    ]
    return JSONResponse(content={"data": MOCK_droneImageryEvents})

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
    MOCK_droneRuns = [
        ["", "imaging event 1", "rover", "description", "2022-10-10", "", "EarthSense", "test_trial1", "test_trial1"],
        ["", "imaging event 2", "rover", "description 2", "2023-10-10", "", "EarthSense", "test_trial1", "test_trial1"],
    ]
    return JSONResponse(content={"data": MOCK_droneRuns})

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
async def post_upload_drone_imagery(
    request: Request,
    upload_drone_images_zipfile: Annotated[UploadFile, File()] = None,
    upload_drone_images_panel_zipfile: Annotated[UploadFile, File()] = None,
    drone_run_band_stitched_ortho_report: Annotated[UploadFile, File()] = None,
    drone_run_band_stitched_ortho_image_1: Annotated[UploadFile, File()] = None,
    drone_run_band_stitched_ortho_image_2: Annotated[UploadFile, File()] = None,
    drone_run_band_stitched_ortho_image_3: Annotated[UploadFile, File()] = None,
    drone_run_band_stitched_ortho_image_4: Annotated[UploadFile, File()] = None,
    drone_run_band_stitched_ortho_image_5: Annotated[UploadFile, File()] = None,
    drone_run_band_stitched_ortho_image_6: Annotated[UploadFile, File()] = None,
    drone_run_band_stitched_ortho_image_7: Annotated[UploadFile, File()] = None,
    drone_run_band_stitched_ortho_image_8: Annotated[UploadFile, File()] = None,
    drone_run_band_stitched_ortho_image_9: Annotated[UploadFile, File()] = None,
    drone_run_band_stitched_ortho_image_10: Annotated[UploadFile, File()] = None,
    drone_run_band_stitched_ortho_image_11: Annotated[UploadFile, File()] = None,
    drone_run_band_stitched_ortho_image_odm: Annotated[UploadFile, File()] = None,
    drone_run_band_stitched_ortho_image_agisoft: Annotated[UploadFile, File()] = None,
    private_company_id: Annotated[str, Form()] = "",
    drone_run_name: Annotated[str, Form()] = "",
    ):
    print(drone_run_band_stitched_ortho_report)
    print(private_company_id)
    return templates.TemplateResponse("drone_imagery.html", {"request": request, "id": id})

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
