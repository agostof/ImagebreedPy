from fastapi import APIRouter, Request, status, Response, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import FileResponse, JSONResponse
from fastapi.security import HTTPBearer
from pathlib import Path
from botocore import UNSIGNED
from botocore.config import Config
from typing import Optional

from main.services.images_service import ImageService
from main.services.image_file_service import AWS_CloudStorageAccount, AWS_CloudStorageBackend
from main.services.auth_utils import User, AuthUtils

# Remove later
from main.services.app_settings import DIRECTORY, settings
from boto3 import client, Session, resource
from main.models.s3_models import ObjectList, S3Object, BucketInfo, BucketList

aws_account = AWS_CloudStorageAccount(settings)
aws_bucket = AWS_CloudStorageBackend(settings, settings.aws_s3_bucket) #default bucket account

router = APIRouter(prefix="/s3")

# Account level api calls
@router.get('/buckets', status_code=status.HTTP_200_OK)
async def get_s3_bucket_list():
    response = aws_account.list_buckets()
    
    return BucketList(**response)

@router.post('/buckets/{bucket_name}', status_code=status.HTTP_201_CREATED)
async def create_s3_bucket(bucketName: str='imagebreed-bucket', ACL: str='private'):
    response = aws_account.create_bucket(bucket_name=bucketName, ACL=ACL)

    return response

@router.delete('/buckets/{bucket_name}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_s3_bucket(bucketName: str=None):
    response = aws_account.delete_bucket(bucket_name=bucketName)

    return response

# Bucket level api calls
@router.get('/buckets/{bucket_name}', status_code=status.HTTP_200_OK)
async def get_bucket_acl_policy(bucketName: str):
    aws_bucket = AWS_CloudStorageBackend(settings, bucket_name=bucketName)
    response = aws_bucket.access_bucket()
    
    return response

@router.get('/objects/{bucket_name}', status_code=status.HTTP_200_OK)
async def get_s3_bucket_object_metadata(bucketName: str=settings.aws_s3_bucket, truncate: bool=True, filter_prefix: str='', max_keys: int=1000, page_size: int=1000, page_number: int=0):
    aws_bucket = AWS_CloudStorageBackend(settings, bucket_name=bucketName)
    response = aws_bucket.list_objects(
        truncate=truncate,
        max_keys=max_keys,
        prefix=filter_prefix, 
        page_size=page_size,
        page_number=page_number
    )
    # return response
    return ObjectList(**response)

@router.post('/objects/', status_code=status.HTTP_201_CREATED)
async def upload_file_to_s3_bucket(filePath: str, key: str, bucketName: str=settings.aws_s3_bucket):
    aws_bucket = AWS_CloudStorageBackend(settings, bucket_name=bucketName)
    response = aws_bucket.save_image_to_bucket(file_path=filePath, key=key)

    return response






# List all objects
# @router.get('/objects')
# async def get_objects():
#     s3_client = client(
#         's3',
#         region_name=settings.aws_region,
#         aws_access_key_id=settings.aws_access_key_id,
#         aws_secret_access_key=settings.aws_secret_access_key
#     )

#     response = s3_client.list_objects()

#     return response
