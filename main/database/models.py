from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import DeclarativeBase

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
    DRONE = "drone"
    ROVER = "rover"

    def __init__(self, name:str=None, description:str=None, type:str = DRONE):
        self.vehicle_name = name
        self.vehicle_description = description
        self.vehicle_type = type

    def __repr__(self):
        return f'Vehicle {self.id=}\n     {self.vehicle_name=}\n     {self.vehicle_description=}'