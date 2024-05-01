from fastapi import APIRouter, Request, Depends, status
from fastapi.responses import FileResponse
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pathlib import Path

from main.services.images_service import ImageService

# Remove later
from main.services.app_settings import DIRECTORY, settings
from boto3 import client

security = HTTPBearer()
router = APIRouter(prefix="/images")

@router.get("/{image_id}/{file_name}", response_class=FileResponse)
async def breeders_tool_box_drone_rover(request: Request, image_id: int):
    image_metadata = ImageService.getImage(image_id=image_id)
    image_path = Path(image_metadata.local_path)
    image_type = f"image/{image_path.suffix[1:]}"
    if image_path.is_file():
        return FileResponse(path=image_path, media_type=image_type)
    else:
        return FileResponse(status_code=404)


# image metadata api calls
@router.get('/', status_code=status.HTTP_200_OK)
async def get_image_metadata_summaries(
    imageDbId: str,
    imageName: str,
    observationUnitDbId: str,
    observationDbId: str,
    descriptiveOntologyTerm: str,
    commonCropName: str,
    programDbId: str,
    externalReferenceId: str,
    externalReferenceSource: str,
    page: int,
    pageSize: int,
    Authorization: HTTPAuthorizationCredentials = Depends(security)
):
    return None

@router.post('/', status_code=status.HTTP_201_CREATED)
async def create_new_image_metadata(
    resquest: Request,
    Authorization: HTTPAuthorizationCredentials = Depends(security)
):
    return None

@router.get('/{imageDbId}', status_code=status.HTTP_200_OK)
async def get_image_metadata_summary(
    imageDbId: str,
    Authorization: HTTPAuthorizationCredentials = Depends(security)
):
    return None

@router.put('/{imageDbId}/imagecontent', status_code=status.HTTP_201_CREATED)
async def upload_image_file(
    imageDbId: str,
    request: Request,
    Authorization: HTTPAuthorizationCredentials = Depends(security)
):
    return None

@router.put('/{imageDbId}', status_code=status.HTTP_201_CREATED)
async def update_image_metadata(
    imageDbId: str,
    request: Request,
    Authorization: HTTPAuthorizationCredentials = Depends(security)
):
    return None