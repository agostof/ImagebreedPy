from pydantic import BaseModel
from sqlalchemy import select

from main.database.db import db_session
from main.database.db_models import Image


class ImageServiceClass():
    def getImageMetadata(self, image_id:str = None):
        sqlStatement = select(Image)

        if image_id:
            sqlStatement = sqlStatement.where(Image.id == image_id)

        image = db_session.scalars(sqlStatement).first()

        return image
    

ImageService = ImageServiceClass()
