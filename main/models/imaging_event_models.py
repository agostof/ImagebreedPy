
from pydantic import BaseModel
from typing import Annotated
from fastapi import UploadFile, File, Form, Request

class ImageRequest(BaseModel):
    image_id: int | None = None
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
    image_id: int | None = None

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

class ImagingEventRequestOrthoImage(BaseModel):
    ortho_image_file: UploadFile = None
    band_coordinate_system:str = None
    band_description:str = None
    band_type:str = None

class ImagingEventRequest(BaseModel):
    images_zipfile: UploadFile = None
    images_panel_zipfile: UploadFile = None
    ortho_report: UploadFile = None

    ortho_images: list[ImagingEventRequestOrthoImage] = None

    ortho_image_odm: UploadFile = None
    ortho_image_agisoft: UploadFile = None
    drone_run_id: str = None
    odm_image_count: str = None
    private_company_id: str = None
    drone_run_field_trial_id: str = None
    drone_run_name: str = None
    drone_run_type: str = None
    drone_run_description: str = None
    drone_run_date: str = None
    camera_info: str = None
    vehicle_id: str = None
    image_stitching: bool = None
    

    def __init__(self, http_form_request: Request):
        super().__init__()
        self.drone_run_id = http_form_request._form._dict["drone_run_id"]
        self.odm_image_count = http_form_request._form._dict["drone_image_upload_drone_run_band_stitching_odm_image_count"]
        self.private_company_id = http_form_request._form._dict["private_company_id"]
        self.drone_run_field_trial_id = http_form_request._form._dict["drone_run_field_trial_id"]
        self.drone_run_name = http_form_request._form._dict["drone_run_name"]
        self.drone_run_type = http_form_request._form._dict["drone_run_type"]
        self.drone_run_description = http_form_request._form._dict["drone_run_description"]
        self.drone_run_date = http_form_request._form._dict["drone_run_date"]
        self.camera_info = http_form_request._form._dict["drone_image_upload_camera_info"]
        self.vehicle_id = http_form_request._form._dict["drone_run_imaging_vehicle_id"]

        if "drone_image_upload_drone_run_band_stitching" in http_form_request._form._dict:
            self.image_stitching = http_form_request._form._dict["drone_image_upload_drone_run_band_stitching"] == "yes_open_data_map_stitch"

        if "upload_drone_images_zipfile" in http_form_request._form._dict:
            self.images_zipfile = http_form_request._form._dict["upload_drone_images_zipfile"]
        if "upload_drone_images_panel_zipfile" in http_form_request._form._dict:
            self.images_panel_zipfile = http_form_request._form._dict["upload_drone_images_panel_zipfile"]

        if "drone_run_band_stitched_ortho_report" in http_form_request._form._dict:
            self.ortho_report = http_form_request._form._dict["drone_run_band_stitched_ortho_report"]

        self.ortho_images = []
        for n in range(0, 11):
            key = f"drone_run_band_stitched_ortho_image_{n}"
            if key in http_form_request._form._dict and http_form_request._form._dict[key]:
                image_data = ImagingEventRequestOrthoImage(ortho_image_file=http_form_request._form._dict[key],
                                                           band_coordinate_system=http_form_request._form._dict[f"drone_run_band_coordinate_system_{n}"],
                                                           band_description=http_form_request._form._dict[f"drone_run_band_description_{n}"],
                                                           band_type=http_form_request._form._dict[f"drone_run_band_type_{n}"]
                                                           )
                self.ortho_images.append(image_data)

        if "drone_run_band_stitched_ortho_image_odm" in http_form_request._form._dict:
            self.ortho_image_odm = http_form_request._form._dict["drone_run_band_stitched_ortho_image_odm"]
        if "drone_run_band_stitched_ortho_image_agisoft" in http_form_request._form._dict:
            self.ortho_image_agisoft = http_form_request._form._dict["drone_run_band_stitched_ortho_image_agisoft"]
        


