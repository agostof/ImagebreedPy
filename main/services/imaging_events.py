from pydantic import BaseModel
from sqlalchemy import select, or_

from main.database.db import db_session
from main.database.models import ImagingEvent


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
                imagingEvent.sensor.name, 
                imagingEvent.trial_name, 
                imagingEvent.trial_description
                ])

        return imagingEventTable

ImagingEventService = ImagingEventServiceClass()
        
