from typing import List
from sqlalchemy import String, ForeignKey, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from datetime import datetime

DRONE:str = "drone"
ROVER:str = "rover"

class Base(DeclarativeBase):
    pass

class Vehicle(Base):
    __tablename__ = 'vehicle'
    id: Mapped[int] = mapped_column(primary_key=True)
    vehicle_name: Mapped[str] = mapped_column(String(50))
    vehicle_description: Mapped[str] = mapped_column(String(150))
    vehicle_type: Mapped[str] = mapped_column(String(50))
    battery_names: Mapped[str] = mapped_column(String(50))
    private_company_id: Mapped[str] = mapped_column(String(50))

    def __init__(self, name:str=None, description:str=None, type:str = DRONE, battery_names:str = None, private_company_id:str = None,  vehicleRequest = None):
        if(vehicleRequest):
            self.vehicle_name = vehicleRequest.vehicle_name
            self.vehicle_description = vehicleRequest.vehicle_description
            self.battery_names = vehicleRequest.battery_names
            self.private_company_id = vehicleRequest.private_company_id
        else:
            self.vehicle_name = name
            self.vehicle_description = description
            self.vehicle_type = type
            self.battery_names = battery_names
            self.private_company_id = private_company_id

    def __repr__(self):
        return f'Vehicle {self.id=}\n     {self.vehicle_name=}\n     {self.vehicle_description=}'
    
    
class AnalysisModel(Base):
    __tablename__ = 'analysis_model'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    description: Mapped[str] = mapped_column(String(50))
    url: Mapped[str] = mapped_column(String(50))

    def __init__(self, name:str=None, description:str=None, url:str = None):
        self.name = name
        self.description = description
        self.url = url

    def __repr__(self):
        return f'AnalysisModel {self.id=}\n     {self.name=}\n     {self.description=}'
    
class Sensor(Base):
    __tablename__ = 'sensor'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    description: Mapped[str] = mapped_column(String(50))

    def __init__(self, name:str=None, description:str=None):
        self.name = name
        self.description = description

    def __repr__(self):
        return f'Sensor {self.id=}\n     {self.name=}\n     {self.description=}'
    
class ImagingEvent(Base):
    __tablename__ = 'imaging_event'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    description: Mapped[str] = mapped_column(String(150))
    event_type: Mapped[str] = mapped_column(String(50))
    timestamp: Mapped[datetime] = mapped_column(DateTime())
    trial_name: Mapped[str] = mapped_column(String(50))
    trial_description: Mapped[str] = mapped_column(String(150))
    vehicle_id: Mapped[int] = mapped_column(ForeignKey("vehicle.id"))
    vehicle: Mapped["Vehicle"] = relationship()
    sensor_id: Mapped[int] = mapped_column(ForeignKey("sensor.id"))
    sensor: Mapped["Sensor"] = relationship()
    image_collections: Mapped[List["ImageCollection"]] = relationship(back_populates="imaging_event")

    def __init__(self, name:str=None, description:str=None, event_type:str = None, timestamp:datetime = None, vehicle_id:int = None, sensor_id:int = None, trial_name:str = None, trial_description:str = None):
        self.name = name
        self.description = description
        self.event_type = event_type
        self.timestamp = timestamp
        self.vehicle_id = vehicle_id
        self.sensor_id = sensor_id
        self.trial_name = trial_name
        self.trial_description = trial_description

    def __repr__(self):
        return f'ImagingEvent {self.id=}\n     {self.name=}\n     {self.description=}'
    
    
    
class ImageCollection(Base):
    __tablename__ = 'image_collection'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    description: Mapped[str] = mapped_column(String(50))
    images: Mapped[List["Image"]] = relationship(back_populates="image_collection")
    imaging_event_id: Mapped[int] = mapped_column(ForeignKey("imaging_event.id"))
    imaging_event: Mapped["ImagingEvent"] = relationship(back_populates="image_collections")

    def __init__(self, name:str=None, description:str=None, imaging_event_id:int=None):
        self.name = name
        self.description = description
        self.imaging_event_id = imaging_event_id

    def __repr__(self):
        return f'ImageCollection {self.id=}\n     {self.name=}\n     {self.description=}'
    
class Image(Base):
    __tablename__ = 'image'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    description: Mapped[str] = mapped_column(String(150))
    local_path: Mapped[str] = mapped_column(String(150), default="/")
    image_collection_id: Mapped[int] = mapped_column(ForeignKey("image_collection.id"))
    image_collection: Mapped["ImageCollection"] = relationship(back_populates="images")

    def __init__(self, name:str=None, description:str=None, image_collection_id:int = None):
        self.name = name
        self.description = description
        self.image_collection_id = image_collection_id

    def __repr__(self):
        return f'Image {self.id=}\n     {self.name=}\n     {self.description=}'