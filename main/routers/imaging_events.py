from fastapi import APIRouter, Request, Depends, status
from fastapi.responses import FileResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pathlib import Path

from main.services.images_service import ImageService

# Remove later
from main.services.app_settings import DIRECTORY, settings
from boto3 import client

security = HTTPBearer()
router = APIRouter(prefix="/imagingevents")

@router.get('/', status_code=status.HTTP_200_OK)
async def get_imaging_event_metadata_summaries(
    imagingEventDbId: str,
    imagingEventName: str,
    observationUnitDbId: str,
    observationDbId: str,
    descriptiveOntologyTerm: str,
    commonCropName: str,
    programDbId: str,
    externalReferenceId: str,
    externalReferenceSource: str,
    page: int,
    pageSize: int,
    Authorization: HTTPAuthorizationCredentials=Depends(security)
):
    return None

@router.post('/', status_code=status.HTTP_201_CREATED)
async def create_new_imaging_event_metadata(
    request: Request,
    Authorization: HTTPAuthorizationCredentials=Depends(security)
):
    return None

@router.get('/{imagingEventDbId}', status_code=status.HTTP_200_OK)
async def get_imaging_event_metadata_summary(
    imagingEventDbId: str,
    Authorization: HTTPAuthorizationCredentials=Depends(security)
):
    return None

@router.put('/{imagingEventDbId}', status_code=status.HTTP_200_OK)
async def update_imaging_event_metadata(
    imagingEventDbId: str,
    Authorization: HTTPAuthorizationCredentials=Depends(security)
): 
    return None