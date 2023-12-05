from fastapi import APIRouter, Depends
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
import time

from main.models.imaging_event_models import ImageRequest, RotateImageRequest, CropImageRequest, ThresholdImageRequest, PlotPolygonTemplateRequest, PlotPolygonPreviewRequest, StandardProcessRequest
from main.services.images_service import ImageService
from main.services.app_settings import DIRECTORY
from main.services.auth_utils import User, AuthUtils
import main.image_processing.rotate as ImageRotateService
import main.image_processing.crop as ImageCropService
import main.image_processing.denoise as ImageDenoiseService

templates = Jinja2Templates(directory=DIRECTORY + "html/")
router = APIRouter(prefix="/api")

@router.get("/drone_imagery/brighten_image")
async def get_brighten_image(image_id: int, current_user: User = Depends(AuthUtils.getCurrentUser)):

    return JSONResponse(content={"brightened_image_id": image_id})

@router.get("/drone_imagery/retrieve_parameter_template")
async def get_parameter_template(plot_polygons_template_projectprop_id: str, current_user: User = Depends(AuthUtils.getCurrentUser)):
    MOCK_parameter_template = {
        "parameter": {"thingy":"1"}
    }
    return JSONResponse(content=MOCK_parameter_template)

# POST ENDPOINTS

@router.post("/drone_imagery/rotate_image")
async def post_rotate_image(request: RotateImageRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request)
    image = ImageService.getImageMetadata(request.image_id)
    
    await ImageRotateService.rotateImage(input_image=image.thumbnail_path, outfile_path=image.thumbnail_path, angle=request.angle)

    return JSONResponse(content={"error": "", "rotated_image_id": request.image_id})

@router.post("/drone_imagery/crop_image")
async def post_crop_image(request: CropImageRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request) 
    image = ImageService.getImageMetadata(request.image_id)
    ImageCropService.cropToPolygon(input_image=image.thumbnail_path, 
                                   outfile_path=image.thumbnail_path,
                                   polygon_json=[request.polygon])

    return JSONResponse(content={"error": "", "cropped_image_id": request.image_id})

@router.post("/drone_imagery/denoise")
async def post_denoise(request: ImageRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request)
    image = ImageService.getImageMetadata(request.image_id)
    ImageDenoiseService.denoiseImage(input_image=image.thumbnail_path, 
                                   outfile_path=image.thumbnail_path)
    return JSONResponse(content={"error": "", "denoised_image_id": request.image_id})


@router.post("/drone_imagery/remove_background_percentage_save")
async def post_remove_background_percentage_save(request: ThresholdImageRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request)
    return JSONResponse(content=[{"removed_background_image_id": request.image_id}])


@router.post("/drone_imagery/save_plot_polygons_template")
async def post_save_plot_polygons_template(request: PlotPolygonTemplateRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request)
    return JSONResponse(content={"error": "", "success": "true"})


@router.post("/drone_imagery/preview_plot_polygons")
async def post_preview_plot_polygons(request: PlotPolygonPreviewRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request)
    image = ImageService.getImageMetadata(image_id=request.image_id)
    MOCK_image_thumb = image.getWebPath()
    return JSONResponse(content={"error": "", 
                                 "plot_polygon_preview_urls": [MOCK_image_thumb, MOCK_image_thumb, MOCK_image_thumb, MOCK_image_thumb, MOCK_image_thumb, MOCK_image_thumb, MOCK_image_thumb], 
                                 "plot_polygon_preview_image_sizes": [[200, 200]]})


@router.post("/drone_imagery/check_maximum_standard_processes")
async def post_check_maximum_standard_processes(current_user: User = Depends(AuthUtils.getCurrentUser)):
    time.sleep(1)
    return JSONResponse(content={"error": "", "success": "true"})


@router.post("/drone_imagery/standard_process_apply")
async def post_standard_process_apply(request: StandardProcessRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request)
    time.sleep(1)
    return JSONResponse(content={"error": "", "success": "true"})
