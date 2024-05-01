# This is a Sketch of the final implementation of the ImageFileServiceClass 
# and the AWS_CloudStorageBackend class.

# refactoring image_file_util as a service?
from typing import List, Union, Dict, Generator
from pathlib import Path
import subprocess
import re
import os
import uuid
from fastapi import UploadFile, HTTPException
from datetime import datetime
from botocore.paginate import PageIterator

# here we will import all the functioality from image_file_util.py
from main.services.image_file_util import (
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

from botocore.exceptions import ClientError
from multiprocessing import Pool
from boto3 import client
from main.services.app_settings import DIRECTORY, settings
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
        response = archiveUploads(request=request)

        return response
    
    def archive_zip_file(self, zip_file: UploadFile) -> Path:
        # Implementation for archiving zip file locally
        zip_path = archiveZipFile(zip_file=zip_file)

        return zip_path

    def archive_orthos(self, ortho_files: List[ImagingEventRequestOrthoImage]) -> List[Path]:
        # Implementation for archiving orthos locally
        response = archiveOrthos(ortho_files=ortho_files)

        return response

    def extract_zip_file(self, zip_file_path: Union[str, os.PathLike], output_dir: Union[str, os.PathLike]) -> List[Path]:
        # Implementation for extracting zip file locally
        response = extractZipFile(zip_file_path=zip_file_path, output_dir=output_dir)

        return response

    def save_file(self, file_path, file_content):
        # Implementation for saving file locally
        timestamp = str(datetime.now()).replace(' ', '_').replace(':', '-').replace('.', '-')
        out_dir = Path(settings.image_storage_dir) / f"storage_{timestamp}"
        out_dir.mkdir(parents=True, exist_ok=True)
        if not out_dir.is_dir():
            raise NotADirectoryError(f'The path {out_dir} is not a directory')
        out_file_path = out_dir / file_path
        out_file_path.touch()

        with out_file_path.open(mode='wb') as out_file:
            out_file.write(file_content)
        
        return None # figure out return type

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

class AWS_CloudStorageAccount():
    def __init__(self, settings):
        self.client = client(
            's3',
            region_name=settings.aws_region,
            aws_access_key_id=settings.aws_access_key_id,
            aws_secret_access_key=settings.aws_secret_access_key
        )
        super().__init__()

    def list_buckets(self):
        # Implementation of listing all buckets associated with an AWS account
        return self.client.list_buckets()
    
    def create_bucket(self, bucket_name: str, ACL: str):
        """Create a new bucket in the associated AWS account

        Args:
            bucket_name (_type_): _description_
            ACL (str, optional): _description_. Defaults to 'private'.

        Raises:
            ValueError: _description_

        Returns:
            _type_: _description_
        """
        ACL_list = ['private', 'public-read', 'public-read-write', 'authenticated-read']
        if ACL not in ACL_list:
            raise ValueError(f'Argument for Access Control List must be one of {ACL_list}')
        try:
            buckets = [b['Name'] for b in self.list_buckets()['Buckets']]
            if bucket_name in buckets:
                raise HTTPException(status_code=400, detail="Bucket already exists and is owned by you.")
            response = self.client.create_bucket(ACL=ACL, Bucket=bucket_name)
            return response
        except ClientError as e:
            error_code = e.response['Error']['Code']
            if error_code == 'BucketAlreadyOwnedByYou':
                raise HTTPException(status_code=400, detail="Bucket already exists and is owned by you.")
            elif error_code == 'BucketAlreadyExists':
                raise HTTPException(status_code=409, detail="Bucket name already in use globally.")
            else:
                raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")

    def delete_bucket(self, bucket_name):
        """Delete a bucket in the associated AWS account.

        Args:
            bucket_name (_type_): _description_

        Raises:
            ValueError: _description_

        Returns:
            _type_: _description_
        """
        buckets = [b['Name'] for b in self.list_buckets()['Buckets']]
        if bucket_name not in buckets:
            raise HTTPException(status_code=400, detail=f"Bucket {bucket_name} does not exist. Please select a bucket from {buckets} for deletion.")
        try:
            response = self.client.delete_bucket(Bucket=bucket_name)
            return response
        except ClientError as e:
            error_code = e.response['Error']['Code']
            if error_code == 'BucketNotEmpty':
                raise HTTPException(status_code=400, detail="Bucket is not empty. Please remove contents before deleting.")
            else:
                raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")
        
        
class AWS_CloudStorageBackend(CloudStorageBackend):
    # initialize the AWS client
    def __init__(self, settings, bucket_name):

        self.client = client(
            's3',
            region_name=settings.aws_region,
            aws_access_key_id=settings.aws_access_key_id,
            aws_secret_access_key=settings.aws_secret_access_key,
        )
        self.bucket_name = bucket_name
        #self.client.create_bucket(Bucket=self.bucket_name)
        super().__init__()
    
    def access_bucket(self):
        """_summary_

        Returns:
            _type_: _description_
        """
        return self.client.get_bucket_acl(Bucket=self.bucket_name)
    
    def list_objects(self, truncate: bool=True, max_keys: int=1000, prefix: str='', page_size: int=1000, page_number: int=0) -> Union[dict, PageIterator]:
        """List objects in an S3 Bucket

        Args:
            truncate (bool, optional): Whether or not to paginate the results. Defaults to True.
            max_keys (int, ): The total number of keys to restrict the results to (When truncate=True). Defaults to 1000.
            prefix (str, optional): Prefix for filtering the results. Defaults to ''.
            page_size (int): Maximum number of objects to return per page. Integer between 1 and 1000. Defaults to max page size of 1000.

        Returns:
            Union[dict, PageIterator]: Returns a dictionary of the results or a PageIterator
        """
        if truncate:
            response = self.client.list_objects_v2(Bucket=self.bucket_name, Prefix=prefix, MaxKeys=max_keys)
            if type(response) == type(None):
                raise HTTPException(status_code=400, detail=f"The search parameters '{prefix}' returned no results")
            return response
        else:
            response = self.client.list_objects_v2(Bucket=self.bucket_name, Prefix=prefix, MaxKeys=max_keys)
            if type(response) == type(None):
                raise HTTPException(status_code=400, detail=f"The search parameters '{prefix}' returned no results")
            tokens = []
            if page_number==0:
                return response
            else:
                while True:
                    if "NextContinuationToken" in response:
                        token = response["NextContinuationToken"]
                        tokens.append(token)
                        response = self.client.list_objects_v2(Bucket=self.bucket_name, ContinuationToken=token)
                        if tokens.index(token) + 1 == page_number:
                            return response
                    else:
                        break

            # paginator = self.client.get_paginator('list_objects_v2')
            # pages = paginator.paginate(
            #     Bucket=self.bucket_name, 
            #     Prefix=prefix,
            #     PaginationConfig={
            #         'PageSize': page_size}
            # )
            # current_page = 0
            # for page in pages:
            #     print(current_page, page_number)
            #     if current_page == page_number:
            #         return page

            # return pages[page]
    
    # def paginator(self, page_iterator: PageIterator) -> Generator:
    #     """Takes a PageIterator object for an S3 bucket and yields response pages

    #     Args:
    #         page_iterator (PageIterator): A paginated representation of S3 bucket objects.

    #     Returns:
    #         dict: A dictionary of the contents of one page of the paginated results.

    #     Yields:
    #         Generator[List]: An generator that yields a list of s3 object dictionaries.
    #     """
    #     for page in page_iterator:
    #         yield page['Contents']

    def save_image_to_bucket(self, file_path: str, key: str) -> dict:
        # Implementation for saving file in cloud storage
        try:
            self.client.upload_file(Filename=file_path, Bucket=self.bucket_name, Key=key)
            return {'s3_key': key}
        except ClientError as e:
            return {'message': e}

    def download_image_from_bucket(self, file_path: str, key: str, exists_ok=True):
        # Implementation for downloading a file from a bucket to local storage in settings.image_storage
        # Construct new file path relative to storage dir
        datestamp = str(datetime.date.today()).replace(' ', '_').replace(':', '-').replace('.', '-')
        out_path = Path(settings.image_storage_dir) / f"s3_download_{datestamp}"
        out_path.mkdir(parents=True, exist_ok=True)
        if not out_path.is_dir():
            raise NotADirectoryError()
        out_path = out_path / os.path.basename(key)
        if not exists_ok and os.path.exists(out_path):
            return {'message': f'File already exists at specified path {out_path}'}
        try: 
            self.client.download_file(Bucket=self.bucket_name, Key=key, Filename=out_path)
            return {'local_path': out_path}
        except ClientError as e:
            return {'message': e}
    
    def download_images_from_bucket(self, keys: str):
        # Implementation for downloading multiple files from s3 to server-side storage
        task_db_id = str(uuid.uuid64())
        cmd = ['python', 'main/services/download_s3_files.py', self.bucket_name] + keys
        process = subprocess.Popen(cmd)

        return {'task_db_id': task_db_id}

    def retrieve_file(self, file_path):
        # Implementation for retrieving file from cloud storage
        pass



    def list_bucket_objects(self):
        # Implementation to list all objects in a bucket
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

# use_cloud_storage = True 

# if use_cloud_storage:
#     storage_backend = CloudStorageBackend()
# else:
#     storage_backend = LocalStorageBackend()

# we will create a "singleton" (pseudo) and export it 
# on the client side we do
# from image_file_util_refactor (or whatever is called) import ImageFileUtil
#ImageFileUtil = ImageFileService(storage_backend=storage_backend)
# ImageFileService = ImageFileServiceClass(storage_backend=storage_backend)   
