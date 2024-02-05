"""
image_file_util.py
------------------

This module contains utility functions for handling image files.

Imports:
    - Various services and models related to images and imaging events.
    - Various standard library modules for handling files and directories.

Functions:
    - archiveUploads(request: ImagingEventRequest) -> dict: Archives uploaded image files and returns a dictionary with the paths to the archived files.

"""
from fastapi import UploadFile
from datetime import datetime
from pathlib import Path
import os
import zipfile
import copy
import shutil

from main.services.app_settings import settings
from main.services.imaging_events_service import ImagingEventService
from main.services.images_service import ImageService
from main.services.vehicles_service import VehicleService
from main.models.imaging_event_models import ImagingEventRequest, ImagingEventRequestOrthoImage
from main.database.db_models import ImageCollection, Image, ImagingEvent, Sensor
import main.image_processing.resize as ResizeImageService

    
def archiveUploads(request: ImagingEventRequest):
    """
    Archives uploaded image files.

    Parameters:
        request (ImagingEventRequest): An object containing information about an imaging event, including associated image files.

    Returns:
        dict: A dictionary with the paths to the archived files. The keys in the dictionary are "zip", "panel_zip", and "orthos", corresponding to regular images, panel images, and ortho images, respectively.
    """
    response = {}
    if request.images_zipfile:
        archive_path = archiveZipFile(request.images_zipfile)
        response["zip"] = archive_path
    if request.images_panel_zipfile:
        archive_path = archiveZipFile(request.images_panel_zipfile)
        response["panel_zip"] = archive_path
    if request.ortho_images and len(request.ortho_images) > 0:
        archive_paths = archiveOrthos(request.ortho_images)
        response["orthos"] = archive_paths

    return response
    # TODO add others to archive

def archiveZipFile(zip_file:UploadFile):
    """
    Archives a zip file containing image files.

    Parameters:
        zip_file (UploadFile): The zip file to be archived.

    Returns:
        Path: The path to the archived zip file.

    Raises:
        NotADirectoryError: If the output path does not exist and cannot be created.
    """
    timestamp = str(datetime.now()).replace(' ', '_').replace(':', '-').replace('.', '-')
    out_path = Path(settings.image_archive_dir) / f"archive_{timestamp}"
    out_path.mkdir(parents=True, exist_ok=True)
    if not out_path.is_dir():
        raise NotADirectoryError()
    out_file_path = out_path / zip_file.filename
    out_file_path.touch()

    content = zip_file.file.read()

    with out_file_path.open(mode='wb') as out_file:
        out_file.write(content)

    return out_file_path

def archiveOrthos(ortho_files: list[ImagingEventRequestOrthoImage]):
    timestamp = str(datetime.now()).replace(' ', '_').replace(':', '-').replace('.', '-')
    out_path = Path(settings.image_archive_dir) / f"archive_{timestamp}"
    out_path.mkdir(parents=True, exist_ok=True)
    if not out_path.is_dir():
        raise NotADirectoryError()
    
    out_file_paths = []
    for ortho_file in ortho_files:
        out_file_path = out_path / ortho_file.ortho_image_file.filename
        out_file_path.touch()
        content = ortho_file.ortho_image_file.file.read()
        with out_file_path.open(mode='wb') as out_file:
            out_file.write(content)
        out_file_paths.append(out_file_path)

    return out_file_paths

def extractZipFile(zip_file_path: str | os.PathLike, output_dir: str | os.PathLike) -> list[Path]:
    images = []
    output = Path(output_dir)
    zip_file = zipfile.ZipFile(file=zip_file_path)
    zip_file.extractall(path=output)

    for file_info in zip_file.infolist():
        file_name = output / file_info.filename
        if file_name.is_file():
            images.append(file_name)

    return images

def sortAndStitchImages(imaging_event: ImagingEvent, sensor: Sensor, zip_path: str):

    image_dir = Path(settings.image_storage_dir) / imaging_event.getEventFilePath() / "raw_images"
    image_paths_temp = extractZipFile(zip_file_path=zip_path, output_dir=image_dir)

    for band in sensor.bands:
        band_image_paths = []
        image_paths = copy.deepcopy(image_paths_temp)
        for image_path in image_paths:
            file_name = image_path.name.replace(image_path.suffix, "")
            if file_name.endswith(band.image_suffix):
                band_image_paths.append(image_path)
                image_paths_temp.remove(image_path)

        if len(band_image_paths) > 0:
            new_image_collection = ImageCollection(name=band.name,
                                                    description=band.description,
                                                    imaging_event_id=imaging_event.id)
            ImageService.saveImageCollection(collection=new_image_collection)

            ImageService.saveImages(collection=new_image_collection, images=band_image_paths, sensor_id=sensor.id, sensor_band_id=band.id)

            ortho_dir = Path(settings.image_storage_dir) / imaging_event.getEventFilePath() / f"ortho{band.image_suffix}.png"
            thumbnail_dir = Path(settings.image_storage_dir) / imaging_event.getEventFilePath() / f"ortho{band.image_suffix}_thumb.png"
            ImagingEventService.triggerImageStitching(images=band_image_paths, out_path=ortho_dir)

            ImageService.saveOrthoImage(collection=new_image_collection, ortho_image_path=ortho_dir, sensor_id=sensor.id, sensor_band_id=band.id)


def sortOrthos(imaging_event: ImagingEvent, sensor: Sensor, ortho_paths: list[str], ortho_details: list[ImagingEventRequestOrthoImage]):

    for i in range(len(ortho_paths)):
        local_path = ortho_paths[i]
        band_name = ortho_details[i].band_type
        band = VehicleService.getSensorBandFromName(sensor_band_name=band_name, sensor_id=sensor.id)
        new_image_collection = ImageCollection(name=band.name,
                                        description=band.description,
                                        imaging_event_id=imaging_event.id)
        ImageService.saveImageCollection(collection=new_image_collection)

        # copy from upload archive to working directory
        ortho_dir = Path(settings.image_storage_dir) / imaging_event.getEventFilePath()
        ortho_dir.mkdir(parents=True, exist_ok=True)
        ortho_new_path = ortho_dir / f"ortho{band.image_suffix}.png"
        ortho_new_path.touch()
        shutil.copy(local_path, ortho_new_path)

        # generate thumbnail
        (calc_width, multiplier) = ResizeImageService.calculateThumbnailWidthAndMultiplier(ortho_new_path)
        
        process_step = "thumb"
        thumbnail_path = renameOutfile(ortho_new_path, process_step)
        (height, width) = ResizeImageService.resizeImage(input_image=ortho_new_path, outfile_path=thumbnail_path, width=calc_width)

        thumbnail = Image(name=thumbnail_path.name,
                          description=thumbnail_path.name,
                          image_collection_id=new_image_collection.id,
                          height=height,
                          width= width,
                          image_scale_factor=multiplier,
                          local_path=str(thumbnail_path),
                          process_step=process_step,
                          sensor_band_id=band.id,
                          sensor_id=sensor.id)
        thumbnail = ImageService.saveImage(image=thumbnail)

        ImageService.saveOrthoImage(collection=new_image_collection, 
                                    ortho_image_path=ortho_new_path, 
                                    ortho_thumbnail_id=thumbnail.id,
                                    sensor_id=sensor.id, 
                                    sensor_band_id=band.id)


def renameOutfile(outfile: str, process_step_name: str):
    outfile_path = Path(outfile)
    return outfile_path.parent / f"{outfile_path.stem}_{process_step_name}{outfile_path.suffix}"