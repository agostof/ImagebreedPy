from pydantic import BaseModel


class AnalyticsRequest(BaseModel):
    observation_variable_id_list: str | None = None
    field_trial_id_list: str | None = None
    statistics_select: str | None = None
    analytics_protocol_id: str | None = None
    analytics_protocol_name: str | None = None
    analytics_protocol_desc: str | None = None
    analytics_select: str | None = None
    number_iterations: str | None = None
    relationship_matrix_type: str | None = None
    protocol_id: str | None = None
    compute_from_parents: str | None = None
    use_parental_grms_if_compute_from_parents: str | None = None
    include_pedgiree_info_if_compute_from_parents: str | None = None
    htp_pheno_rel_matrix_type: str | None = None
    htp_pheno_rel_matrix_time_points: str | None = None
    htp_pheno_rel_matrix_blues_inversion: str | None = None
    tolparinv: str | None = None
    legendre_order_number: str | None = None
    use_area_under_curve: str | None = None
    permanent_environment_structure: str | None = None
    permanent_environment_structure_phenotype_correlation_traits: str | None = None
    permanent_environment_structure_phenotype_trait_ids: str | None = None
    sim_env_change_over_time: str | None = None
    env_variance_percent: str | None = None
    simulated_environment_real_data_trait_id: str | None = None
    sim_env_change_over_time_correlation: str | None = None
    fixed_effect_type: str | None = None
    fixed_effect_trait_id: str | None = None
    fixed_effect_quantiles: str | None = None
    simulations_to_run: str | None = None

    

class AnalyticsResponse(BaseModel):
    analytics_protocol_id: str | None = None
    sum_square_residual_original: str | None = None
    sum_square_residual_altered: str | None = None
    genetic_effect_sum_original: str | None = None
    genetic_effect_sum_altered: str | None = None
    env_effect_sum_original: str | None = None
    env_effect_sum_altered: str | None = None
    simulated_environment_to_effect_correlations: list[str] | None = None
    spatial_effects_plots: list[str] | None = None
    unique_accessions: list[str] | None = None
    unique_traits: list[str] | None = None
    unique_plots: list[str] | None = None
    result_blup_genetic_data_altered: list[str] | None = None
    result_blup_spatial_data_altered: list[str] | None = None
    result_blup_pe_data_altered: list[str] | None = None
    stats_tempfile: str | None = None
    grm_file: str | None = None
    stats_out_tempfile_string: str | None = None
    stats_out_htp_rel_tempfile_out_string: str | None = None
    error: str | None = None


class VehicleRequest(BaseModel):
    vehicle_name: str | None = None
    vehicle_description: str | None = None
    battery_names: str | None = None
    private_company_id: str | None = None


class AnalysisQueryRequest(BaseModel):
    vehicle_name: list[str] | None = None
    observation_variable_id_list: list[str] | None = None
    field_trial_id_list: list[str] | None = None
    project_image_type_id_list: list[str] | None = None
    format: str | None = None