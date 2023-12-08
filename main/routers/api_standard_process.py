from fastapi import APIRouter, Depends, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import JSONResponse
import time
from pathlib import Path
import asyncio
import shutil

from main.models.imaging_event_models import ImageRequest, RotateImageRequest, CropImageRequest, ThresholdImageRequest, PlotPolygonTemplateRequest, PlotPolygonPreviewRequest, StandardProcessRequest
from main.services.images_service import ImageService
from main.services.app_settings import DIRECTORY
from main.services.auth_utils import User, AuthUtils
import main.image_processing.resize as ImageResizeService
import main.image_processing.rotate as ImageRotateService
import main.image_processing.crop as ImageCropService
import main.image_processing.denoise as ImageDenoiseService
from main.services.image_file_util import renameOutfile

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
    process_step = "rotated"
    image = ImageService.getImage(request.image_id)

    outfile_path = renameOutfile(image.local_path, process_step)
    
    ImageRotateService.rotateImage(input_image=image.local_path, outfile_path=outfile_path, angle=request.angle)

    new_image = ImageService.saveModifiedImage(original_image=image, new_image_path=outfile_path, process_step_name=process_step)

    return JSONResponse(content={"error": "", "rotated_image_id": new_image.id})

@router.post("/drone_imagery/crop_image")
async def post_crop_image(request: CropImageRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request) 
    process_step = "cropped"
    image = ImageService.getImage(request.image_id)
    
    outfile_path = renameOutfile(image.local_path, process_step)

    (height, width) = ImageCropService.cropToPolygon(input_image=image.local_path, 
                                   outfile_path=outfile_path,
                                   polygon_json=[request.polygon])

    new_image = ImageService.saveModifiedImage(original_image=image, new_image_path=outfile_path, process_step_name=process_step, height=height, width=width)

    return JSONResponse(content={"error": "", "cropped_image_id": new_image.id})

@router.post("/drone_imagery/denoise")
async def post_denoise(request: ImageRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request)
    process_step = "denoised"
    image = ImageService.getImage(request.image_id)

    outfile_path = renameOutfile(image.local_path, process_step)
    
    ImageDenoiseService.denoiseImage(input_image=image.local_path, 
                                   outfile_path=outfile_path)
    
    new_image = ImageService.saveModifiedImage(original_image=image, new_image_path=outfile_path, process_step_name=process_step)

    return JSONResponse(content={"error": "", "denoised_image_id": new_image.id})


@router.post("/drone_imagery/remove_background_percentage_save")
async def post_remove_background_percentage_save(request: ThresholdImageRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request)
    return JSONResponse(content=[{"removed_background_image_id": request.image_id}])


@router.post("/drone_imagery/save_plot_polygons_template")
async def post_save_plot_polygons_template(request: PlotPolygonTemplateRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request)
    process_step = "plot_thumbnail"
    image = ImageService.getImage(request.image_id)

    for plot_name, polygon in request.stock_polygons.items():
            
        file_suffix = f"{process_step}_{plot_name}"
        
        outfile_path = renameOutfile(image.local_path, file_suffix)

        (height, width) = ImageCropService.cropToPolygon(input_image=image.local_path, 
                                    outfile_path=outfile_path,
                                    polygon_json=[polygon])

        ImageService.saveModifiedImage(original_image=image, new_image_path=outfile_path, process_step_name=process_step, height=height, width=width)


    return JSONResponse(content={"error": "", "success": "true"})


@router.post("/drone_imagery/preview_plot_polygons")
async def post_preview_plot_polygons(request: PlotPolygonPreviewRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request)
    input_image = ImageService.getImage(image_id=request.image_id)
    images = ImageService.getImages(image_collection_id=input_image.image_collection_id, process_step_name="plot_thumbnail")
    plot_polygon_preview_urls = []
    plot_polygon_preview_image_sizes = []
    for image in images:
        plot_polygon_preview_urls.append(image.getWebPath())
        plot_polygon_preview_image_sizes.append([image.width, image.height])

    return JSONResponse(content={"error": "", 
                                 "plot_polygon_preview_urls": plot_polygon_preview_urls, 
                                 "plot_polygon_preview_image_sizes": plot_polygon_preview_image_sizes})


@router.post("/drone_imagery/check_maximum_standard_processes")
async def post_check_maximum_standard_processes(current_user: User = Depends(AuthUtils.getCurrentUser)):
    time.sleep(1)
    return JSONResponse(content={"error": "", "success": "true"})


@router.post("/drone_imagery/standard_process_apply")
async def post_standard_process_apply(request: StandardProcessRequest, current_user: User = Depends(AuthUtils.getCurrentUser)):
    print(request)

    asyncio.create_task(runStandardProcess(request=request))

    return JSONResponse(content={"error": "", "success": "true"})

async def runStandardProcess(request: StandardProcessRequest):

    for collection_id in request.apply_drone_run_band_project_ids:
        # Get the location of the uploaded ortho image
        original_image = ImageService.getImage(image_collection_id=int(collection_id), process_step_name="original")
        scale_factor = original_image.thumbnail.image_scale_factor
        
        # Copy to preserve the original, modify the copy moving forward
        input_image_path = renameOutfile(original_image.local_path, "input")
        shutil.copy(original_image.local_path, input_image_path)
        input_image = ImageService.saveModifiedImage(original_image=original_image, new_image_path=input_image_path, process_step_name="input")

        # Rotate the ortho
        print(f"start rotate: {input_image.name}")
        ImageRotateService.rotateImage(input_image=input_image.local_path, 
                                       outfile_path=input_image.local_path, 
                                       angle=request.rotate_angle)
        
        # Crop to the relevant area
        print(f"start crop: {input_image.name}")
        field_polygon = ImageResizeService.multiplyPolygon(polygon = request.field_crop_polygon, multiplier=scale_factor)
        (height, width) = ImageCropService.cropToPolygon(input_image=input_image.local_path, 
                                    outfile_path=input_image.local_path,
                                    polygon_json=[field_polygon])
        
        # Remove noise
        print(f"start denoise: {input_image.name}")
        ImageDenoiseService.denoiseImage(input_image=input_image.local_path, 
                                    outfile_path=input_image.local_path)
        
        # Cut out plot level images
        print(f"start plot crop: {input_image.name}")
        polygons = request.polygon_template_metadata[0].drone_imagery_plot_generated_polygons
        for trial_name, plot_names in request.polygons_to_plot_names.items():
            for polygon_index, plot_name in plot_names.items():
                print(f"plot name: {trial_name} - {plot_name}")
                polygon = polygons[int(polygon_index)]
                polygon = ImageResizeService.multiplyPolygon(polygon = polygon, multiplier=scale_factor)
                file_suffix = f"plot_{plot_name}"
                
                outfile_path = renameOutfile(input_image.local_path, file_suffix)

                (height, width) = ImageCropService.cropToPolygon(input_image=input_image.local_path, 
                                            outfile_path=outfile_path,
                                            polygon_json=[polygon])

                ImageService.saveModifiedImage(original_image=input_image, 
                                               new_image_path=outfile_path, 
                                               process_step_name="plot", 
                                               height=height, width=width)
        print(f"standard process complete")