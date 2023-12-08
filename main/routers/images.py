from fastapi import APIRouter, Request
from fastapi.responses import FileResponse
from pathlib import Path

from main.services.images_service import ImageService

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
