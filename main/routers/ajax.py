from fastapi import APIRouter, Depends, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse

from main.services.settings import DIRECTORY
from main.services.auth import User, getCurrentUser, getAccessToken
from main.services.vehicles import getVehicleSummaries
from main.services.brapi import getStudySummaries

templates = Jinja2Templates(directory=DIRECTORY + "html/")
router = APIRouter(prefix="/ajax")

@router.get("/html/select/private_companies")
async def get_private_companies(current_user: User = Depends(getCurrentUser)):
    MOCK_privateCompanies = [{
        "name": "test company",
        "id": "123"
    },{
        "name": "test company 2",
        "id": "456"
    }]
    return JSONResponse(content={"options": MOCK_privateCompanies})

@router.get("/html/select/trials")
async def get_trials( request: Request, current_user: User = Depends(getCurrentUser)):
    token = getAccessToken(request)
    trials = getStudySummaries(token=token)
    MOCK_trials = [{
        "name": "test trial 1",
        "id": "t123"
    },{
        "name": "test trial 2",
        "id": "t456"
    }]
    return JSONResponse(content={"options": trials})

@router.get("/html/select/imaging_event_vehicles_rovers")
async def get_imaging_event_vehicles_rovers(current_user: User = Depends(getCurrentUser)):
    rovers = getVehicleSummaries(includeDrones= False, includeRovers= True)

    return JSONResponse(content={"options": rovers})

@router.get("/html/select/imaging_event_vehicles")
async def get_imaging_event_vehicles(current_user: User = Depends(getCurrentUser)):
    drones = getVehicleSummaries(includeDrones= True, includeRovers= False)

    return JSONResponse(content={"options": drones})

@router.get("/html/select/breeding_programs")
async def get_breeding_programs(current_user: User = Depends(getCurrentUser)):
    MOCK_breedingPrograms = [{
        "name": "test Breeding Program 1",
        "id": "bp123"
    },{
        "name": "test Breeding Program 2",
        "id": "bp456"
    }]
    return JSONResponse(content={"options": MOCK_breedingPrograms})

@router.get("/html/select/years")
async def get_years(current_user: User = Depends(getCurrentUser)):
    MOCK_years = [{
        "name": "2020",
        "id": "2020"
    },{
        "name": "2021",
        "id": "2021"
    }]
    return JSONResponse(content={"options": MOCK_years})

@router.get("/html/select/models")
async def get_models(current_user: User = Depends(getCurrentUser)):
    MOCK_years = [{
        "name": "basic model",
        "id": "m123"
    },{
        "name": "advanced model",
        "id": "m456"
    }]
    return JSONResponse(content={"options": MOCK_years})

@router.get("/html/select/traits")
async def get_traits(current_user: User = Depends(getCurrentUser)):
    MOCK_traits = [{
        "name": "basic trait",
        "id": "t123"
    },{
        "name": "advanced trait",
        "id": "t456"
    }]
    return JSONResponse(content={"options": MOCK_traits})

@router.get("/html/select/drone_imagery_plot_polygon_types")
async def get_drone_imagery_plot_polygon_types(current_user: User = Depends(getCurrentUser)):
    MOCK_polygonTypes = [{
        "name": "basic drone_imagery_plot_polygon_types",
        "id": "pp123"
    },{
        "name": "advanced drone_imagery_plot_polygon_types",
        "id": "pp456"
    }]
    return JSONResponse(content={"options": MOCK_polygonTypes})

@router.get("/html/select/genotyping_protocol")
async def get_genotyping_protocol(current_user: User = Depends(getCurrentUser)):
    MOCK_genotypingProtocol = [{
        "name": "basic protocol",
        "id": "gp123"
    },{
        "name": "advanced protocol",
        "id": "gp456"
    }]
    return JSONResponse(content={"options": MOCK_genotypingProtocol})
