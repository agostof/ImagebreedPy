from fastapi import APIRouter, Depends, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse

from main.services.settings import DIRECTORY
from main.services.auth import User, AuthUtils
from main.services.vehicles import VehicleService
from main.services.analytics import AnalyticsService
from main.services.brapi import BrAPI

templates = Jinja2Templates(directory=DIRECTORY + "html/")
router = APIRouter(prefix="/ajax")

@router.get("/html/select/private_companies")
async def get_private_companies(request: Request, current_user: User = Depends(AuthUtils.getCurrentUser)):
    token = AuthUtils.getAccessToken(request)
    privateCompanies = BrAPI.getProgramSummaries(token=token)

    return JSONResponse(content={"options": privateCompanies})

@router.get("/html/select/trials")
async def get_trials( request: Request, private_company_id: str = None, current_user: User = Depends(AuthUtils.getCurrentUser)):
    token = AuthUtils.getAccessToken(request=request)
    trials = BrAPI.getStudySummaries(private_company_id, token=token)

    return JSONResponse(content={"options": trials})

@router.get("/html/select/imaging_event_vehicles_rovers")
async def get_imaging_event_vehicles_rovers(current_user: User = Depends(AuthUtils.getCurrentUser)):
    rovers = VehicleService.getVehicleSummaries(includeDrones= False, includeRovers= True)

    return JSONResponse(content={"options": rovers})

@router.get("/html/select/imaging_event_vehicles")
async def get_imaging_event_vehicles(current_user: User = Depends(AuthUtils.getCurrentUser)):
    drones = VehicleService.getVehicleSummaries(includeDrones= True, includeRovers= False)

    return JSONResponse(content={"options": drones})

@router.get("/html/select/breeding_programs")
async def get_breeding_programs(request: Request, current_user: User = Depends(AuthUtils.getCurrentUser)):
    token = AuthUtils.getAccessToken(request)
    programs = BrAPI.getProgramSummaries(token=token)
    
    return JSONResponse(content={"options": programs})

@router.get("/html/select/years")
async def get_years(request: Request, current_user: User = Depends(AuthUtils.getCurrentUser)):
    token = AuthUtils.getAccessToken(request)
    brapi_seasons = BrAPI.getSeasons(token=token)
    years = []

    for season in brapi_seasons.result.data:
        years.append({
            "name": f"{season.seasonName} - {season.year}",
            "id": season.seasonDbId
            })
    return JSONResponse(content={"options": years})

@router.get("/html/select/models")
async def get_models(current_user: User = Depends(AuthUtils.getCurrentUser)):
    models = AnalyticsService.getAnalysisModelSummaries()
    return JSONResponse(content={"options": models})

@router.get("/html/select/traits")
async def get_traits(request: Request, current_user: User = Depends(AuthUtils.getCurrentUser)):
    token = AuthUtils.getAccessToken(request)
    traits = BrAPI.getTraitSummaries(token=token)
    
    return JSONResponse(content={"options": traits})

@router.get("/html/select/drone_imagery_plot_polygon_types")
async def get_drone_imagery_plot_polygon_types(current_user: User = Depends(AuthUtils.getCurrentUser)):
    MOCK_polygonTypes = [{
        "name": "basic drone_imagery_plot_polygon_types",
        "id": "pp123"
    },{
        "name": "advanced drone_imagery_plot_polygon_types",
        "id": "pp456"
    }]
    return JSONResponse(content={"options": MOCK_polygonTypes})

@router.get("/html/select/genotyping_protocol")
async def get_genotyping_protocol(current_user: User = Depends(AuthUtils.getCurrentUser)):
    MOCK_genotypingProtocol = [{
        "name": "basic protocol",
        "id": "gp123"
    },{
        "name": "advanced protocol",
        "id": "gp456"
    }]
    return JSONResponse(content={"options": MOCK_genotypingProtocol})
