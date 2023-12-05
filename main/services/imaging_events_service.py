from sqlalchemy import select
from datetime import datetime
import asyncio
import os
import re

from main.database.db import db_session
from main.database.db_models import ImagingEvent, Sensor
from main.models.imaging_event_models import ImagingEventRequest
import main.image_processing.image_stitching as ImageStitching


class ImagingEventServiceClass():
    def getImagingEvents(self, vehicleType:str = None, event_id:int = None):
        sqlStatement = select(ImagingEvent)

        if vehicleType:
            sqlStatement = sqlStatement.where(ImagingEvent.vehicle.has(vehicle_type=vehicleType))
        if event_id:
            sqlStatement = sqlStatement.where(ImagingEvent.id == event_id)

        imagingEvents = db_session.scalars(sqlStatement)

        return imagingEvents
    
    def getImagingEventTableRows(self, vehicleType:str = None):
        imagingEvents = self.getImagingEvents(vehicleType)

        imagingEventTable = []
        for imagingEvent in imagingEvents:
            imagingEventTable.append([
                imagingEvent.name, 
                imagingEvent.event_type, 
                imagingEvent.description, 
                str(imagingEvent.timestamp), 
                imagingEvent.vehicle.vehicle_name, 
                "" if imagingEvent.sensor is None else imagingEvent.sensor.description, 
                imagingEvent.trial_name, 
                imagingEvent.trial_description
                ])

        return imagingEventTable
    
    
    def getImagingEventSummaries(self):
        events = self.getImagingEvents()

        eventSummaries = []
        for event in events:
            eventSummaries.append({
                "name": event.name,
                "id": str(event.id)
            })

        return eventSummaries
    
    def getImagingEventDetails(self):
        events = self.getImagingEvents()

        regex = re.compile(r"[^\w\d]")
        eventDetails = dict()
        for event in events:
            trial_id = regex.sub("", event.trial_name)
            if trial_id not in eventDetails:
                eventDetails[trial_id] = []
            
            eventDetails[trial_id].append(event)

        return eventDetails
    
    def saveImagingEvent(self, event: ImagingEvent):
        event.timestamp = datetime.now()

        db_session.add(event)
        db_session.commit()

        return event

    def createNewImagingEvent(self, request: ImagingEventRequest, sensor: Sensor):
        new_imaging_event = ImagingEvent(name=request.drone_run_name, 
                                        description=request.drone_run_description,
                                        vehicle_id=request.vehicle_id,
                                        event_type=request.drone_run_type,
                                        timestamp=request.drone_run_date,
                                        sensor_id=sensor.id, 
                                        trial_name=request.drone_run_field_trial_id,
                                        trial_description=request.drone_run_field_trial_id,
                                        )
        self.saveImagingEvent(event=new_imaging_event)

        return new_imaging_event

    def triggerImageStitching(self, images: list[str | os.PathLike], out_path: str | os.PathLike):
        asyncio.create_task(ImageStitching.stitchImages(image_paths=images, out_path=out_path))
        
    async def fakeTask(self):
        print("start task")
        await asyncio.sleep(30)
        print("end task")


ImagingEventService = ImagingEventServiceClass()
