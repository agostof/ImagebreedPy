# This is a Sketch of the final implementation of the ImageFileServiceClass 
# and the AWS_CloudStorageBackend class.

# refactoring image_file_util as a service?
from typing import List, Union
from pathlib import Path
import os
from fastapi import UploadFile
# here we will import all the functioality from image_file_util.py
from image_file_util import (
    ImagingEventRequest,
    ImagingEventRequestOrthoImage,
    ImagingEvent,
    Sensor,
    archiveUploads,
    archiveZipFile,
    archiveOrthos,
    extractZipFile,
    sortAndStitchImages,
    sortOrthos,
    renameOutfile,

)

#from storage_backends import StorageBackend
from abc import ABC, abstractmethod
class StorageBackend(ABC):
    @abstractmethod
    def archive_uploads(self, request: ImagingEventRequest) -> dict:
        """
        Archives uploaded image files based on the request details.

        Parameters:
            request (ImagingEventRequest): An object containing information about an imaging event, including associated image files.

        Returns:
            dict: A dictionary with keys such as "zip", "panel_zip", and "orthos" indicating the type of archived files and their paths.
        """
        pass

    @abstractmethod
    def archive_zip_file(self, zip_file: UploadFile) -> Path:
        """
        Archives a zip file containing image files.

        Parameters:
            zip_file (UploadFile): The zip file to be archived.

        Returns:
            Path: The path to the archived zip file.
        """
        pass

    @abstractmethod
    def archive_orthos(self, ortho_files: List[ImagingEventRequestOrthoImage]) -> List[Path]:
        """
        Archives orthographic image files.

        Parameters:
            ortho_files (List[ImagingEventRequestOrthoImage]): A list of orthomosaic file information to be archived.

        Returns:
            List[Path]: A list of paths to the archived orthographic image files.
        """
        pass

    @abstractmethod
    def extract_zip_file(self, zip_file_path: Union[str, os.PathLike], output_dir: Union[str, os.PathLike]) -> List[Path]:
        """
        Extracts a zip file to the specified output directory.

        Parameters:
            zip_file_path (Union[str, os.PathLike]): The path to the zip file to be extracted.
            output_dir (Union[str, os.PathLike]): The directory where the contents of the zip file should be extracted.

        Returns:
            List[Path]: A list of paths to the extracted files.
        """
        pass


# Implement specific storage backends
class LocalStorageBackend(StorageBackend):
    def archive_uploads(self, request: ImagingEventRequest) -> dict:
        # Implementation for archiving uploads locally
        pass
    def archive_zip_file(self, zip_file: UploadFile) -> Path:
        # Implementation for archiving zip file locally
        pass

    def archive_orthos(self, ortho_files: List[ImagingEventRequestOrthoImage]) -> List[Path]:
        # Implementation for archiving orthos locally
        pass

    def extract_zip_file(self, zip_file_path: Union[str, os.PathLike], output_dir: Union[str, os.PathLike]) -> List[Path]:
        # Implementation for extracting zip file locally
        pass

    def save_file(self, file_path, file_content):
        # Implementation for saving file locally
        pass

    def retrieve_file(self, file_path):
        # Implementation for retrieving local file
        pass

class CloudStorageBackend(StorageBackend):
    def archive_uploads(self, request: ImagingEventRequest) -> dict:
        # Implementation for archiving uploads in cloud storage
        # (or for processing files and storing the result in cloud storage)
        pass

    def archive_zip_file(self, zip_file: UploadFile) -> Path:
        # Implementation for archiving zip file in cloud storage 
        # (or for processing files and storing the result in cloud storage)
        pass
    
    def archive_orthos(self, ortho_files: List[ImagingEventRequestOrthoImage]) -> List[Path]:
        # Implementation for archiving orthos in cloud storage
        pass

    def extract_zip_file(self, zip_file_path: Union[str, os.PathLike], output_dir: Union[str, os.PathLike]) -> List[Path]:
        # Implementation for extracting zip file in cloud storage 
        # Might not be needed, only change this if different from local extraction
        pass

    def save_file(self, file_path, file_content):
        # Implementation for saving file in cloud storage
        pass

    def retrieve_file(self, file_path):
        # Implementation for retrieving file from cloud storage
        pass


class AWS_CloudStorageBackend(CloudStorageBackend):
    # initialize the AWS client
    def __init__(self, bucket_name):
        self.client = boto3.client('s3')
        #self.bucket_name = 'my_bucket'
        #self.client.create_bucket(Bucket=self.bucket_name)
        super().__init__()

    def access_bucket(self, bucket_name):
        return self.client.get_bucket_acl(Bucket=bucket_name)
    
    def create_bucket(self, bucket_name):
        return self.client.create_bucket(Bucket=bucket_name)


    def save_file(self, file_path, file_content):
        # Implementation for saving file in cloud storage
        pass
    
    def retrieve_file(self, file_path):
        # Implementation for retrieving file from cloud storage
        pass

# Image file utility class that uses the specified storage backend

class ImageFileServiceClass:
    def __init__(self, storage_backend: StorageBackend):
        self.storage = storage_backend

    def archive_uploads(self, request: ImagingEventRequest) -> dict:
        # Logic to archive uploads, potentially utilizing self.storage
        return self.storage.archive_uploads(request)

    def archive_zip_file(self, zip_file: UploadFile) -> Path:
        # Directly interact with self.storage to archive a zip file
        return self.storage.archive_zip_file(zip_file)

    def archive_orthos(self, ortho_files: List[ImagingEventRequestOrthoImage]) -> List[Path]:
        # Archive orthographic images, potentially utilizing self.storage
        return self.storage.archive_orthos(ortho_files)

    def extract_zip_file(self, zip_file_path: Union[str, os.PathLike], output_dir: Union[str, os.PathLike]) -> List[Path]:
        # This might directly use self.storage or handle zip file extraction if it's more about processing than storage
        return self.storage.extract_zip_file(zip_file_path, output_dir)

    def sort_and_stitch_images(self, imaging_event: ImagingEvent, sensor: Sensor, zip_path: str):
        # Domain-specific logic for sorting and stitching images
        return sortAndStitchImages(imaging_event, sensor, zip_path)

    def sort_orthos(self, imaging_event: ImagingEvent, sensor: Sensor, ortho_paths: List[str], ortho_details: List[ImagingEventRequestOrthoImage]):
        # Domain-specific logic for sorting orthos
        return sortOrthos(imaging_event, sensor, ortho_paths, ortho_details)

    def rename_outfile(self, outfile: str, process_step_name: str) -> Path:
        # Utility method for renaming output files, part of the processing logic
        return renameOutfile(outfile, process_step_name)


# We need to modify the Application-wide configuration to select the storage backend
# We need to add these options to the configuration file
# and make sure they are loaded by the application

# AWS_CLOUD_STORAGE=True
# AWS_S3_BUCKET='my_bucket'
# AWS_REGION='us-west-2'
# AWS_ACCESS_KEY_ID='aws_access_key_id'
# AWS_SECRET_ACCESS_KEY='my_secret'
# AWS_SESSION_TOKEN=your_session_token_here # Optional, only if using temporary credentials
# LOCAL_STORAGE=False

use_cloud_storage = True 

if use_cloud_storage:
    storage_backend = CloudStorageBackend()
else:
    storage_backend = LocalStorageBackend()

# we will create a "singleton" (pseudo) and export it 
# on the client side we do
# from image_file_util_refactor (or whatever is called) import ImageFileUtil
#ImageFileUtil = ImageFileService(storage_backend=storage_backend)
ImageFileService = ImageFileServiceClass(storage_backend=storage_backend)   
