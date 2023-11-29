
from sqlalchemy import select, or_

from main.database.db import db_session
from main.database.db_models import Vehicle, DRONE, ROVER, Sensor
from main.models.vehicle_models import VehicleRequest

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
    
    def getSensors(self):
        sqlStatement = select(Sensor)
        sensors = db_session.scalars(sqlStatement)

        sensor_summaries = []

        for sensor in sensors:
            sensor_summaries.append({
                "id": str(sensor.id),
                "name": sensor.name,
                "description": sensor.description,
            })

        return sensor_summaries

    def getSensorFromName(self, sensor_name:str):
        sqlStatement = select(Sensor).where(Sensor.name == sensor_name)
        sensor = db_session.scalars(sqlStatement).first()
        return sensor


VehicleService = VehicleServiceClass()
        



