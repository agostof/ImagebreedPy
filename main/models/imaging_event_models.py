
from pydantic import BaseModel
from typing import Annotated
from fastapi import UploadFile, File, Form, Request

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

class ImagingEventRequest(BaseModel):
    images_zipfile: Annotated[UploadFile, File()] = None,
    images_panel_zipfile: Annotated[UploadFile, File()] = None,
    ortho_report: Annotated[UploadFile, File()] = None,
    ortho_image_1: Annotated[UploadFile, File()] = None,
    ortho_image_2: Annotated[UploadFile, File()] = None,
    ortho_image_3: Annotated[UploadFile, File()] = None,
    ortho_image_4: Annotated[UploadFile, File()] = None,
    ortho_image_5: Annotated[UploadFile, File()] = None,
    ortho_image_6: Annotated[UploadFile, File()] = None,
    ortho_image_7: Annotated[UploadFile, File()] = None,
    ortho_image_8: Annotated[UploadFile, File()] = None,
    ortho_image_9: Annotated[UploadFile, File()] = None,
    ortho_image_10: Annotated[UploadFile, File()] = None,
    ortho_image_11: Annotated[UploadFile, File()] = None,
    ortho_image_odm: Annotated[UploadFile, File()] = None,
    ortho_image_agisoft: Annotated[UploadFile, File()] = None,
    drone_run_id: Annotated[str, Form()] = "",
    odm_image_count: Annotated[str, Form()] = "",
    private_company_id: Annotated[str, Form()] = "",
    drone_run_field_trial_id: Annotated[str, Form()] = "",
    drone_run_name: Annotated[str, Form()] = "",
    drone_run_type: Annotated[str, Form()] = "",
    drone_run_description: Annotated[str, Form()] = "",
    drone_run_date: Annotated[str, Form()] = "",
    camera_info: Annotated[str, Form()] = "",
    vehicle_id: Annotated[str, Form()] = "",

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

        if "upload_drone_images_zipfile" in http_form_request._form._dict:
            self.images_zipfile = http_form_request._form._dict["upload_drone_images_zipfile"]
        if "upload_drone_images_panel_zipfile" in http_form_request._form._dict:
            self.images_panel_zipfile = http_form_request._form._dict["upload_drone_images_panel_zipfile"]

        if "drone_run_band_stitched_ortho_report" in http_form_request._form._dict:
            self.ortho_report = http_form_request._form._dict["drone_run_band_stitched_ortho_report"]
        if "drone_run_band_stitched_ortho_image_1" in http_form_request._form._dict:
            self.ortho_image_1 = http_form_request._form._dict["drone_run_band_stitched_ortho_image_1"]
        if "drone_run_band_stitched_ortho_image_2" in http_form_request._form._dict:
            self.ortho_image_2 = http_form_request._form._dict["drone_run_band_stitched_ortho_image_2"]
        if "drone_run_band_stitched_ortho_image_3" in http_form_request._form._dict:
            self.ortho_image_3 = http_form_request._form._dict["drone_run_band_stitched_ortho_image_3"]
        if "drone_run_band_stitched_ortho_image_4" in http_form_request._form._dict:
            self.ortho_image_4 = http_form_request._form._dict["drone_run_band_stitched_ortho_image_4"]
        if "drone_run_band_stitched_ortho_image_5" in http_form_request._form._dict:
            self.ortho_image_5 = http_form_request._form._dict["drone_run_band_stitched_ortho_image_5"]
        if "drone_run_band_stitched_ortho_image_6" in http_form_request._form._dict:
            self.ortho_image_6 = http_form_request._form._dict["drone_run_band_stitched_ortho_image_6"]
        if "drone_run_band_stitched_ortho_image_7" in http_form_request._form._dict:
            self.ortho_image_7 = http_form_request._form._dict["drone_run_band_stitched_ortho_image_7"]
        if "drone_run_band_stitched_ortho_image_8" in http_form_request._form._dict:
            self.ortho_image_8 = http_form_request._form._dict["drone_run_band_stitched_ortho_image_8"]
        if "drone_run_band_stitched_ortho_image_9" in http_form_request._form._dict:
            self.ortho_image_9 = http_form_request._form._dict["drone_run_band_stitched_ortho_image_9"]
        if "drone_run_band_stitched_ortho_image_10" in http_form_request._form._dict:
            self.ortho_image_10 = http_form_request._form._dict["drone_run_band_stitched_ortho_image_10"]
        if "drone_run_band_stitched_ortho_image_11" in http_form_request._form._dict:
            self.ortho_image_11 = http_form_request._form._dict["drone_run_band_stitched_ortho_image_11"]
        if "drone_run_band_stitched_ortho_image_odm" in http_form_request._form._dict:
            self.ortho_image_odm = http_form_request._form._dict["drone_run_band_stitched_ortho_image_odm"]
        if "drone_run_band_stitched_ortho_image_agisoft" in http_form_request._form._dict:
            self.ortho_image_agisoft = http_form_request._form._dict["drone_run_band_stitched_ortho_image_agisoft"]
        


