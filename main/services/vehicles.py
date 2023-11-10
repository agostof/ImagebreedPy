from pydantic import BaseModel
from sqlalchemy import select

from main.database.db import get_db
from main.database.models import Vehicle


def getVehicleSummaries(includeDrones: bool = True, includeRovers: bool = True):
    sqlStatement = select(Vehicle)

    if(includeDrones & includeRovers):
        sqlStatement = sqlStatement.where(Vehicle.vehicle_type == Vehicle.DRONE | Vehicle.vehicle_type == Vehicle.ROVER)
    elif(includeDrones):
        sqlStatement = sqlStatement.where(Vehicle.vehicle_type == Vehicle.DRONE)
    elif(includeRovers):
        sqlStatement = sqlStatement.where(Vehicle.vehicle_type == Vehicle.ROVER)
    else:
        sqlStatement = sqlStatement.where(Vehicle.vehicle_type == '')

    vehicles = get_db().scalars(sqlStatement)

    vehicleSummaries = []
    for vehicle in vehicles:
        vehicleSummaries.append({
            "name": vehicle.vehicle_name,
            "id": str(vehicle.id)
        })

    return vehicleSummaries




class VehicleRequest(BaseModel):
    vehicle_name: str | None = None
    vehicle_description: str | None = None
    battery_names: str | None = None
    private_company_id: str | None = None