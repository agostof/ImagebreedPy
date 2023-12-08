from pydantic import BaseModel
from sqlalchemy import select, and_
from pathlib import Path

from main.database.db import db_session
from main.database.db_models import Image, ImageCollection


class ImageServiceClass():
    def getImage(self, image_id:int = None, image_collection_id:int = None, process_step_name:int = None, local_path:str = None):
        sqlStatement = select(Image)

        if image_id:
            sqlStatement = sqlStatement.where(Image.id == image_id)
        if image_collection_id:
            sqlStatement = sqlStatement.where(Image.image_collection_id == image_collection_id)
        if process_step_name:
            sqlStatement = sqlStatement.where(Image.process_step == process_step_name)
        if local_path:
            sqlStatement = sqlStatement.where(Image.local_path == str(local_path))

        image = db_session.scalars(sqlStatement).first()

        return image
    
    def getImages(self, image_id:int = None, image_collection_id:int = None, process_step_name:int = None):
        sqlStatement = select(Image)

        if image_id:
            sqlStatement = sqlStatement.where(Image.id == image_id)
        if image_collection_id:
            sqlStatement = sqlStatement.where(Image.image_collection_id == image_collection_id)
        if process_step_name:
            sqlStatement = sqlStatement.where(Image.process_step == process_step_name)

        images = db_session.scalars(sqlStatement).all()

        return images
    
    def getImageCollection(self, image_collection_id:int = None):
        sqlStatement = select(ImageCollection)

        if image_collection_id:
            sqlStatement = sqlStatement.where(ImageCollection.id == image_collection_id)

        image = db_session.scalars(sqlStatement).first()

        return image
    
    def getOrthoImage(self, image_collection_id:int = None):
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
    
    def saveImage(self, image: Image):
        existing_image_record = self.getImage(local_path=image.local_path)

        if existing_image_record:
            existing_image_record.name = image.name
            existing_image_record.description = image.description
            existing_image_record.image_collection_id = image.image_collection_id
            existing_image_record.local_path = image.local_path
            existing_image_record.thumbnail_id = image.thumbnail_id
            existing_image_record.process_step = image.process_step
            existing_image_record.width = image.width
            existing_image_record.height = image.height
            existing_image_record.is_ortho = image.is_ortho
            existing_image_record.sensor_id = image.sensor_id
            existing_image_record.sensor_band_id = image.sensor_band_id  
            existing_image_record.image_scale_factor = image.image_scale_factor 
        else:
            db_session.add(image)
            existing_image_record = image

        db_session.commit()

        return existing_image_record
    
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
    
    def saveOrthoImage(self, collection: ImageCollection, ortho_image_path: str, ortho_thumbnail_id: int, sensor_id: int, 
                       sensor_band_id: int, height: int = None, width: int = None):
        image_path = Path(ortho_image_path)
        image_entity = Image(name=image_path.name,
                            description=image_path.name,
                            image_collection_id=collection.id,
                            local_path=str(image_path),
                            thumbnail_id=ortho_thumbnail_id,
                            is_ortho=True,
                            height=height,
                            width=width,
                            process_step="original",
                            sensor_id=sensor_id,
                            sensor_band_id=sensor_band_id)
        image_entity = self.saveImage(image=image_entity)
        return image_entity
    
    def saveModifiedImage(self, original_image: Image, new_image_path: str, process_step_name: str, height: int = None, width: int = None):

        image_entity = Image(image = original_image)

        image_entity.local_path = str(new_image_path)
        image_entity.process_step=process_step_name
        if height:
            image_entity.height=height
        if width:
            image_entity.width=width

        return self.saveImage(image=image_entity)
    

ImageService = ImageServiceClass()
