from fastapi import APIRouter, Request, Depends, status
from fastapi.responses import FileResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pathlib import Path

from main.services.images_service import ImageService

# Remove later
from main.services.app_settings import DIRECTORY, settings
from boto3 import client

security = HTTPBearer()
router = APIRouter(prefix="/imageCollections")

@router.get('/', status_code=status.HTTP_200_OK)
async def get_image_collection_metadata_summaries(
    imageCollectionDbId: str,
    imageCollectionName: str,
    observationUnitDbId: str,
    observationDbId: str,
    descriptiveOntologyTerm: str,
    programDbId: str,
    externalReferenceId: str,
    externalReferenceSource: str,
    page: int,
    pageSize: int,
    Authorization: HTTPAuthorizationCredentials=Depends(security)
):
    return None

@router.post('/', status_code=status.HTTP_201_CREATED)
async def create_image_collection_metadata(
    request: Request,
    Authorization: HTTPAuthorizationCredentials=Depends(security)
):
    return None

@router.get('/{imageCollectionDbId}', status_code=status.HTTP_200_OK)
async def get_image_collection_metadata_summary(
    imageCollectionDbId: str,
    Authorization: HTTPAuthorizationCredentials=Depends(security)
):
    return None

@router.put('/{imageCollectionDbId}', status_code=status.HTTP_201_CREATED)
async def update_image_collection_metadata(
    imageCollectionDbId: str,
    Authorization: HTTPAuthorizationCredentials=Depends(security)
):
    return None