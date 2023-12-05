from pydantic import BaseModel
from sqlalchemy import select, and_
from pathlib import Path

from main.database.db import db_session
from main.database.db_models import Image, ImageCollection


class ImageServiceClass():
    def getImageMetadata(self, image_id:int = None):
        sqlStatement = select(Image)

        if image_id:
            sqlStatement = sqlStatement.where(Image.id == image_id)

        image = db_session.scalars(sqlStatement).first()

        return image
    
    def getImageCollection(self, image_collection_id:str = None):
        sqlStatement = select(ImageCollection)

        if image_collection_id:
            sqlStatement = sqlStatement.where(ImageCollection.id == image_collection_id)

        image = db_session.scalars(sqlStatement).first()

        return image
    
    def getOrthoImage(self, image_collection_id:str = None):
        sqlStatement = select(Image)

        if image_collection_id:
            sqlStatement = sqlStatement.where(
                and_(Image.image_collection_id == image_collection_id,
                     Image.is_ortho == True
                     )
            )

        image = db_session.scalars(sqlStatement).first()

        return image
    
    
    def saveImageCollection(self, collection: ImageCollection):
        db_session.add(collection)
        db_session.commit()

        return collection
    
    def saveImages(self, collection: ImageCollection, images: list[str], sensor_id: int, sensor_band_id: int):
        image_entities = []

        for image_path_str in images:
            image_path = Path(image_path_str)
            if image_path.is_file():
                image_entity = Image(name=image_path.name,
                                     description=image_path.name,
                                     image_collection_id=collection.id,
                                     local_path=str(image_path),
                                     sensor_id=sensor_id,
                                     sensor_band_id=sensor_band_id)
                image_entities.append(image_entity)

        db_session.add_all(image_entities)
        db_session.commit()

        return collection
    
    def saveOrthoImage(self, collection: ImageCollection, ortho_image_path: str, ortho_thumbnail_path: str, sensor_id: int, sensor_band_id: int):
        image_path = Path(ortho_image_path)
        thumbnail_path = Path(ortho_thumbnail_path)
        image_entity = Image(name=image_path.name,
                            description=image_path.name,
                            image_collection_id=collection.id,
                            local_path=str(image_path),
                            thumbnail_path=str(thumbnail_path),
                            is_ortho=True,
                            sensor_id=sensor_id,
                            sensor_band_id=sensor_band_id)

        db_session.add(image_entity)
        db_session.commit()

        return image_entity
    

ImageService = ImageServiceClass()
