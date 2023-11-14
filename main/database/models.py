from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import DeclarativeBase

DRONE:str = "drone"
ROVER:str = "rover"

class Base(DeclarativeBase):
    pass

class Vehicle(Base):
    __tablename__ = 'vehicles'
    id = Column(Integer, primary_key=True)
    vehicle_name = Column(String(50), unique=False)
    vehicle_description = Column(String(120), unique=False)
    vehicle_type = Column(String(50), unique=False)
    battery_names = Column(String(50), unique=False)
    private_company_id = Column(String(50), unique=False)

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