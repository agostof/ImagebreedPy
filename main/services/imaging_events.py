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
    
    
    def getImagingEventSummaries(self):
        events = self.getImagingEvents()

        eventSummaries = []
        for event in events:
            eventSummaries.append({
                "name": event.name,
                "id": str(event.id)
            })

        return eventSummaries

ImagingEventService = ImagingEventServiceClass()

class ImageRequest(BaseModel):
    image_id: str | None = None
    drone_run_band_project_id: str | None = None
    company_id: str | None = None
    is_private: str | None = None

class RotateImageRequest(ImageRequest):
    angle: float | None = None

class CropImageRequest(ImageRequest):
    polygon: list[dict] | None = None

class ThresholdImageRequest(ImageRequest):
    image_type_list: list[str] | None = None
    lower_threshold_percentage: float | None = None
    upper_threshold_percentage: float | None = None

class PlotPolygonTemplateRequest(BaseModel):
    drone_run_band_project_id: str | None = None
    stock_polygons: dict | None = None
    flight_pass_counter: int | None = None

class PlotPolygonPreviewRequest(BaseModel):
    drone_run_band_project_id: str | None = None
    stock_polygons: dict | None = None
    image_id: str | None = None

class StandardProcessRequest(BaseModel):
    drone_run_project_id: str | None = None
    drone_run_band_project_id: str | None = None
    apply_drone_run_band_project_ids: list[str] | None = None
    vegetative_indices: list[str] | None = None
    phenotype_types: list[str] | None = None
    time_cvterm_id: str | None = None
    standard_process_type: str | None = None
    field_trial_id: str | None = None
    apply_to_all_drone_runs_from_same_camera_rig: str | None = None
    phenotypes_plot_margin_top_bottom: str | None = None
    phenotypes_plot_margin_right_left: str | None = None
    drone_imagery_remove_background_lower_percentage: int | None = None
    drone_imagery_remove_background_upper_percentage: int | None = None
    polygon_template_metadata: list[dict] | None = None
    polygon_templates_deleted: list[dict] | None = None
    polygon_removed_numbers: list[int] | None = None
    polygons_to_plot_names: dict | None = None
    company_id: str | None = None
    is_private: str | None = None


