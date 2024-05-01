from fastapi import APIRouter, Request, Depends, status
from fastapi.responses import FileResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pathlib import Path

from main.services.images_service import ImageService

# Remove later
from main.services.app_settings import DIRECTORY, settings
from boto3 import client

security = HTTPBearer()
router = APIRouter(prefix="/imagemutations")

@router.get('/', status_code=status.HTTP_200_OK)
async def get_filtered_image_mutations(
    page: int,
    pageSize: int,
    Authorization: HTTPAuthorizationCredentials=Depends(security)
):
    return None