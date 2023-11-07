from fastapi import APIRouter
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse, HTMLResponse, JSONResponse
from fastapi import Request
import requests
import os
import main.services.utils as utils

templates = Jinja2Templates(directory=utils.DIRECTORY + "breeders")
router = APIRouter(prefix="/ajax")


@router.get("/user/login_button_html")
async def get_login_button_html():
    return JSONResponse(content={"logged_in": ""})

@router.get("/html/select/private_companies")
async def get_private_companies():
    MOCK_privateCompanies = [{
        "name": "test company",
        "id": "123"
    },{
        "name": "test company 2",
        "id": "456"
    }]
    return JSONResponse(content={"options": MOCK_privateCompanies})

@router.get("/html/select/trials")
async def get_trials():
    MOCK_trials = [{
        "name": "test trial 1",
        "id": "t123"
    },{
        "name": "test trial 2",
        "id": "t456"
    }]
    return JSONResponse(content={"options": MOCK_trials})

@router.get("/html/select/imaging_event_vehicles_rovers")
async def get_imaging_event_vehicles_rovers():
    MOCK_rovers = [{
        "name": "test rover 1",
        "id": "r123"
    },{
        "name": "test rover 2",
        "id": "r456"
    }]
    return JSONResponse(content={"options": MOCK_rovers})

@router.get("/html/select/imaging_event_vehicles")
async def get_imaging_event_vehicles():
    MOCK_drones = [{
        "name": "test drone 1",
        "id": "d123"
    },{
        "name": "test drone 2",
        "id": "d456"
    }]
    return JSONResponse(content={"options": MOCK_drones})

@router.get("/html/select/breeding_programs")
async def get_breeding_programs():
    MOCK_breedingPrograms = [{
        "name": "test Breeding Program 1",
        "id": "bp123"
    },{
        "name": "test Breeding Program 2",
        "id": "bp456"
    }]
    return JSONResponse(content={"options": MOCK_breedingPrograms})

@router.get("/html/select/years")
async def get_years():
    MOCK_years = [{
        "name": "2020",
        "id": "2020"
    },{
        "name": "2021",
        "id": "2021"
    }]
    return JSONResponse(content={"options": MOCK_years})

@router.get("/html/select/models")
async def get_models():
    MOCK_years = [{
        "name": "basic model",
        "id": "m123"
    },{
        "name": "advanced model",
        "id": "m456"
    }]
    return JSONResponse(content={"options": MOCK_years})

@router.get("/html/select/traits")
async def get_traits():
    MOCK_traits = [{
        "name": "basic trait",
        "id": "t123"
    },{
        "name": "advanced trait",
        "id": "t456"
    }]
    return JSONResponse(content={"options": MOCK_traits})

@router.get("/html/select/drone_imagery_plot_polygon_types")
async def get_drone_imagery_plot_polygon_types():
    MOCK_polygonTypes = [{
        "name": "basic drone_imagery_plot_polygon_types",
        "id": "pp123"
    },{
        "name": "advanced drone_imagery_plot_polygon_types",
        "id": "pp456"
    }]
    return JSONResponse(content={"options": MOCK_polygonTypes})

@router.get("/html/select/genotyping_protocol")
async def get_genotyping_protocol():
    MOCK_genotypingProtocol = [{
        "name": "basic protocol",
        "id": "gp123"
    },{
        "name": "advanced protocol",
        "id": "gp456"
    }]
    return JSONResponse(content={"options": MOCK_genotypingProtocol})



@router.get("/{path:path}")
async def read_ajax_api(path: str, in_request: Request):
    url = f'{utils.UPSTREAM_HOST}/ajax/{path}'
    print("AJAX CATCHALL", url, in_request.query_params)
    print("AJAX CATCHALL HEADERS", in_request.headers)
    app_cookies = utils.dump_cookies(in_request)
    print("APP_COOKIES", app_cookies)
    
    print("AJAX API", path)
    ajax_api_path = os.path.join("ajax", path)
    print("REDIRECTING TO", ajax_api_path)
    
    return HTMLResponse(content=f"ajax call not found", status_code=404)


print("break point")