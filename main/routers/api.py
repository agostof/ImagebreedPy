from fastapi import APIRouter, Request, UploadFile, File, Form, Depends
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
from typing import Annotated

from main.services.models import AnalyticsRequest, AnalyticsResponse, AnalysisQueryRequest
from main.services.vehicles import VehicleRequest
from main.services.settings import DIRECTORY
from main.services.auth import User, getCurrentUser

templates = Jinja2Templates(directory=DIRECTORY + "html/")
router = APIRouter(prefix="/api")


@router.get("/drone_rover/drone_rover_top")
async def get_drone_rover_top(current_user: User = Depends(getCurrentUser)):
    MOCK_droneRoverEvents = [
        ["imaging event 1", "rover", "description", "2022-10-10", "", "EarthSense", "test_trial1", "test_trial1"],
        ["imaging event 2", "rover", "description 2", "2023-10-10", "", "EarthSense", "test_trial1", "test_trial1"],
    ]
    return JSONResponse(content={"data": MOCK_droneRoverEvents})

@router.get("/drone_imagery/raw_drone_imagery_top")
async def get_raw_drone_imagery_top(current_user: User = Depends(getCurrentUser)):
    MOCK_droneImageryEvents = [
        ["imaging event 1", "drone", "description", "2022-10-10", "", "EarthSense", "test_trial1", "test_trial1"],
        ["imaging event 2", "drone", "description 2", "2023-10-10", "", "EarthSense", "test_trial1", "test_trial1"],
    ]
    return JSONResponse(content={"data": MOCK_droneImageryEvents})

@router.get("/drone_rover/processed_plot_point_cloud_count")
async def get_processed_plot_point_cloud_count(current_user: User = Depends(getCurrentUser)):
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
async def get_raw_drone_imagery_plot_image_count(current_user: User = Depends(getCurrentUser)):
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
async def get_vehicle(vehicle_id: str, current_user: User = Depends(getCurrentUser)):
    MOCK_vehicles = {
            "r123": {"properties":
              {"batteries":
                {"default_battery":
                  {"usage":0,"obsolete":0}
                }
              },
            "description":"test rover 1 desc",
            "name":"test rover 1",
            "vehicle_id": "r123"
            },
            "r456": {"properties":
              {"batteries":
                {"default_battery":
                  {"usage":0,"obsolete":0}
                }
              },
            "description":"test rover 2 desc",
            "name":"test rover 2",
            "vehicle_id": "r456"
            },
            "d123": {"properties":
              {"batteries":
                {"default_battery":
                  {"usage":0,"obsolete":0}
                }
              },
            "description":"test drone 1 desc",
            "name":"test drone 1",
            "vehicle_id": "d123"
            },
            "d456": {"properties":
              {"batteries":
                {"default_battery":
                  {"usage":0,"obsolete":0}
                }
              },
            "description":"test drone 2 desc",
            "name":"test drone 2",
            "vehicle_id": "d456"
            },
    }
    vehicle = {}
    if(vehicle_id in MOCK_vehicles):
        vehicle = MOCK_vehicles[vehicle_id]
    else:
        vehicle = {"properties":
            {"batteries": {"default_battery": {"usage":0,"obsolete":0} } },
            "description":"New Drone Description",
            "name":"New Drone",
            "vehicle_id": "newDrone"}
    return JSONResponse(content={"vehicles": [vehicle], "success":1})


@router.get("/drone_imagery/drone_runs")
async def get_drone_runs(select_checkbox_name: str, field_trial_ids: str, disable: int = 0, is_rover: int = 0, current_user: User = Depends(getCurrentUser)):
    MOCK_droneRuns = [
        ["", "imaging event 1", "rover", "description", "2022-10-10", "", "EarthSense", "test_trial1", "test_trial1"],
        ["", "imaging event 2", "rover", "description 2", "2023-10-10", "", "EarthSense", "test_trial1", "test_trial1"],
    ]
    return JSONResponse(content={"data": MOCK_droneRuns})

@router.get("/drone_imagery/imaging_vehicles")
async def get_imaging_vehicles():
    MOCK_vehicles = [
        ["Vehicle_1", "rover description", "EarthSense", "95%"],
        ["Vehicle_2", "drone description", "EarthSense", "85%"],
    ]
    return JSONResponse(content={"data": MOCK_vehicles})


@router.get("/drone_imagery/check_field_trial_ids")
async def get_check_field_trial_ids(field_trial_ids: str, current_user: User = Depends(getCurrentUser)):
    MOCK_fieldTrialIds = {
        "field_trial_names": [field_trial_ids],
        "html": "The "+field_trial_ids+" field trial has planting date: 2023-November-01 and NOAA Station ID: GHCND:USC00300331.",
        "can_proceed": 1
    }
    return JSONResponse(content=MOCK_fieldTrialIds)


@router.get("/drone_imagery/upload_drone_imagery_check_drone_name")
async def get_check_drone_name(drone_run_name: str, current_user: User = Depends(getCurrentUser)):
    MOCK_checkDroneName = {
        "success": drone_run_name,
        "error": ""
    }
    return JSONResponse(content=MOCK_checkDroneName)

@router.get("/drone_imagery/export_drone_runs")
async def get_export_drone_runs(drone_run_project_ids: str, field_trial_id: str, current_user: User = Depends(getCurrentUser)):
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
    rover_run_field_trial_id: Annotated[str, Form()],
    current_user: User = Depends(getCurrentUser)
    ):
    print(upload_drone_rover_zipfile_lidar_earthsense_collections)
    print(rover_run_company_id)
    return templates.TemplateResponse("drone_rover.html", {"request": request, "id": id})

@router.post("/drone_imagery/new_imaging_vehicle")
async def post_new_imaging_vehicle(request: VehicleRequest, current_user: User = Depends(getCurrentUser)):
    print(request)
    return JSONResponse(content={"error": "", "success": "true", "new_vehicle_id": request.vehicle_name + "_12345"})

@router.post("/drone_imagery/new_imaging_vehicle_rover")
async def post_new_imaging_vehicle_rover(request: VehicleRequest, current_user: User = Depends(getCurrentUser)):
    print(request)
    return JSONResponse(content={"error": "", "success": "true", "new_vehicle_id": request.vehicle_name + "_12345"})

@router.post("/drone_imagery/upload_drone_imagery")
async def post_upload_drone_imagery(
    request: Request, current_user: User = Depends(getCurrentUser),
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
async def post_calculate_analytics(request: AnalyticsRequest, current_user: User = Depends(getCurrentUser)) -> AnalyticsResponse:
    print(request)
    response = AnalyticsResponse(
        analytics_protocol_id="apid123", 
        unique_accessions=["ac123", "ac456"],
        unique_plots=["plot1", "plot2"], 
        unique_traits=["trait123", "trait456"])
    return response

@router.post("/drone_imagery/analysis_query")
async def post_analysis_query (request: AnalysisQueryRequest, current_user: User = Depends(getCurrentUser)):
    print(request)
    return JSONResponse(content={"error": "", "success": "true", "file": "https://brapi.org"})
