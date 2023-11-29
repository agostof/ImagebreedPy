from pydantic import BaseModel

class VehicleRequest(BaseModel):
    vehicle_name: str | None = None
    vehicle_description: str | None = None
    battery_names: str | None = None
    private_company_id: str | None = None