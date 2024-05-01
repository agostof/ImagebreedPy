from pydantic import BaseModel, Field
from datetime import datetime
from typing import Annotated, List, Optional
from fastapi import UploadFile, File, Form, Request

class BucketInfo(BaseModel):
    name: str=Field(..., alias='Name')
    creation_date: datetime=Field(..., alias='CreationDate')

class BucketList(BaseModel):
    buckets: List[BucketInfo]=Field(..., alias='Buckets')

class S3Object(BaseModel):
    path: str = Field(..., alias="Key")
    last_modified: datetime =Field(..., alias="LastModified")
    size: int=Field(..., alias='Size')
    storage_class: str=Field(..., alias='StorageClass')

    class Config:
        populate_by_name = False

class ObjectList(BaseModel):
    metadata: dict=Field(..., alias="ResponseMetadata")
    # data: Optional[List[S3Object]]=Field(..., alias='Contents')
    Contents: Optional[List[S3Object]]=None
