from pydantic import BaseModel
from sqlalchemy import select, or_

from main.database.db import db_session
from main.database.models import Vehicle, DRONE, ROVER

class VehicleRequest(BaseModel):
    vehicle_name: str | None = None
    vehicle_description: str | None = None
    battery_names: str | None = None
    private_company_id: str | None = None


class VehicleServiceClass():
    def getVehicles(self, includeDrones: bool = True, includeRovers: bool = True):
        sqlStatement = select(Vehicle)

        if(includeDrones & includeRovers):
            sqlStatement = sqlStatement.where(or_(Vehicle.vehicle_type == DRONE, Vehicle.vehicle_type == ROVER))
        elif(includeDrones):
            sqlStatement = sqlStatement.where(Vehicle.vehicle_type == DRONE)
        elif(includeRovers):
            sqlStatement = sqlStatement.where(Vehicle.vehicle_type == ROVER)
        else:
            sqlStatement = sqlStatement.where(Vehicle.vehicle_type == '')

        vehicles = db_session.scalars(sqlStatement)

        return vehicles
    
    def getVehicleSummaries(self, includeDrones: bool = True, includeRovers: bool = True):
        vehicles = self.getVehicles(includeDrones=includeDrones, includeRovers=includeRovers)

        vehicleSummaries = []
        for vehicle in vehicles:
            vehicleSummaries.append({
                "name": vehicle.vehicle_name,
                "id": str(vehicle.id)
            })

        return vehicleSummaries
    
    def getVehicle(self, vehicle_id:int = None):
        sqlStatement = select(Vehicle).where(Vehicle.id == int(vehicle_id))
        vehicle = db_session.scalars(sqlStatement).first()
        return vehicle
    
    def saveVehicle(self, vehicleReq: VehicleRequest, vehicle_type:str = DRONE) -> Vehicle:
        vehicle = Vehicle(vehicleRequest = vehicleReq)
        vehicle.vehicle_type = vehicle_type

        db_session.add(vehicle)
        db_session.commit()

        return vehicle
    
    def convertToAPIResponse(self, vehicle: Vehicle):
        return {"properties": {"batteries": {vehicle.battery_names : {"usage":0,"obsolete":0} } },
                "description": vehicle.vehicle_description,
                "name":vehicle.vehicle_name,
                "vehicle_id": vehicle.id
                }

VehicleService = VehicleServiceClass()
        



