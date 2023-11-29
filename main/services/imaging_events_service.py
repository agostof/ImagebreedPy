from sqlalchemy import select
from datetime import datetime

from main.database.db import db_session
from main.database.db_models import ImagingEvent
from main.models.imaging_event_models import ImagingEventRequest
from main.services.image_file_util import archive_zip_file


class ImagingEventServiceClass():
    def getImagingEvents(self, vehicleType:str = None):
        sqlStatement = select(ImagingEvent)

        if vehicleType:
            # sqlStatement = sqlStatement.join(Vehicle).where(Vehicle.vehicle_type == vehicleType)
            sqlStatement = sqlStatement.where(ImagingEvent.vehicle.has(vehicle_type=vehicleType))

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
    
    def saveImagingEvent(self, event: ImagingEvent):
        event.timestamp = datetime.now()

        db_session.add(event)
        db_session.commit()

        return event
    
    def archiveUploads(self, request: ImagingEventRequest):
        response = {}
        if request.images_zipfile:
            archive_path = archive_zip_file(request.images_zipfile)
            response["zip"] = archive_path
        if request.images_panel_zipfile:
            archive_path = archive_zip_file(request.images_panel_zipfile)
            response["panel_zip"] = archive_path

        # TODO add others to archive


ImagingEventService = ImagingEventServiceClass()
