
# Image Breed Code Map


## Commands with outer function name

# DB PATCHES

 https://github.com/nickmorales/imagebreed/blob/master/db/00121/FixDroneImageryPartialTemplates.pm#L47#L
sub@patch https://github.com/nickmorales/imagebreed/blob/master/db/00121/FixDroneImageryPartialTemplates.pm#L53
 https://github.com/nickmorales/imagebreed/blob/master/db/00121/FixDroneImageryPartialTemplates.pm#L61
 https://github.com/nickmorales/imagebreed/blob/master/db/00121/FixDroneImageryPartialTemplates.pm#L62
 https://github.com/nickmorales/imagebreed/blob/master/db/00146/AddDroneRunResizeRatioCvterm.pm#L43#L
sub@patch https://github.com/nickmorales/imagebreed/blob/master/db/00146/AddDroneRunResizeRatioCvterm.pm#L49
 https://github.com/nickmorales/imagebreed/blob/master/db/00146/AddDroneRunResizeRatioCvterm.pm#L57
 https://github.com/nickmorales/imagebreed/blob/master/db/00127/AddDroneRunImagingVehicleCvterms.pm#L44#L
sub@patch https://github.com/nickmorales/imagebreed/blob/master/db/00127/AddDroneRunImagingVehicleCvterms.pm#L50
 https://github.com/nickmorales/imagebreed/blob/master/db/00127/AddDroneRunImagingVehicleCvterms.pm#L58
 https://github.com/nickmorales/imagebreed/blob/master/db/00127/AddDroneRunGroundControlPointsCvterms.pm#L44#L
sub@patch https://github.com/nickmorales/imagebreed/blob/master/db/00127/AddDroneRunGroundControlPointsCvterms.pm#L50
 https://github.com/nickmorales/imagebreed/blob/master/db/00127/AddDroneRunGroundControlPointsCvterms.pm#L58
 https://github.com/nickmorales/imagebreed/blob/master/db/00140/AddDroneImageryODMRunningCvterm.pm#L43#L
sub@patch https://github.com/nickmorales/imagebreed/blob/master/db/00140/AddDroneImageryODMRunningCvterm.pm#L49
 https://github.com/nickmorales/imagebreed/blob/master/db/00140/AddDroneImageryODMRunningCvterm.pm#L57
 https://github.com/nickmorales/imagebreed/blob/master/db/00161/AddDroneRunGroundRoverCvterms.pm#L46#L
sub@patch https://github.com/nickmorales/imagebreed/blob/master/db/00161/AddDroneRunGroundRoverCvterms.pm#L52
 https://github.com/nickmorales/imagebreed/blob/master/db/00161/AddDroneRunGroundRoverCvterms.pm#L60
 https://github.com/nickmorales/imagebreed/blob/master/db/00161/AddDroneRunOrthophotoTypeCvterms.pm#L46#L
sub@patch https://github.com/nickmorales/imagebreed/blob/master/db/00161/AddDroneRunOrthophotoTypeCvterms.pm#L52
 https://github.com/nickmorales/imagebreed/blob/master/db/00161/AddDroneRunOrthophotoTypeCvterms.pm#L60


## Drone-realted commands

sub@upload_drone_rover https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneRover/DroneRoverUpload.pm#L35
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneRover/DroneRoverUpload.pm#L485
sub@_check_user_login_drone_rover_upload https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneRover/DroneRoverUpload.pm#L568
sub@drone_rover_summary_top https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRoverMainDisplay.pm#L37
sub@drone_rover_summary_top_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRoverMainDisplay.pm#L38
sub@_check_user_login_drone_rover_main_display https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRoverMainDisplay.pm#L271
sub@drone_rover_get_vehicles https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRover.pm#L53
sub@drone_rover_get_vehicles_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRover.pm#L54
sub@drone_rover_get_collection https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRover.pm#L99
sub@drone_rover_get_collection_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRover.pm#L100
sub@drone_rover_get_point_cloud https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRover.pm#L134
sub@drone_rover_get_point_cloud_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRover.pm#L135
sub@drone_rover_plot_polygons_test_pheno_range_correlations https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRover.pm#L161
sub@drone_rover_plot_polygons_test_pheno_range_correlations_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRover.pm#L162
sub@drone_rover_plot_polygons_process_apply https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRover.pm#L428
sub@drone_rover_plot_polygons_process_apply_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRover.pm#L429
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRover.pm#L530
sub@processed_plot_point_cloud_count https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRover.pm#L902
sub@processed_plot_point_cloud_count_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRover.pm#L903
sub@drone_rover_collections_field_names https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRover.pm#L937
sub@drone_rover_collections_field_names_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRover.pm#L938
sub@drone_rover_collections_field_names_link https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRover.pm#L976
sub@drone_rover_collections_field_names_link_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRover.pm#L977
sub@_check_user_login_drone_rover https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRover.pm#L1023
sub@drone_imagery_show_example_simulations https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryAnalytics.pm#L71
sub@drone_imagery_show_example_simulations_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryAnalytics.pm#L72
sub@drone_imagery_calculate_analytics https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryAnalytics.pm#L971
sub@drone_imagery_calculate_analytics_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryAnalytics.pm#L972
sub@_check_user_login_drone_imagery_analytics https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryAnalytics.pm#L15600
sub@raw_drone_imagery_plot_image_count https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L71
sub@raw_drone_imagery_plot_image_count_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L72
sub@drone_imagery_analysis_query https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L106
sub@drone_imagery_analysis_query_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L107
sub@drone_imagery_calculate_statistics https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L232
sub@drone_imagery_calculate_statistics_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L233
sub@_drone_imagery_interactive_get_gps https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L3758
sub@drone_imagery_separate_gps https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4026
sub@drone_imagery_separate_gps_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4027
sub@drone_imagery_get_gps https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4119
sub@drone_imagery_get_gps_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4120
sub@drone_imagery_check_gps_images_rotation https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4137
sub@drone_imagery_check_gps_images_rotation_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4138
sub@drone_imagery_update_gps_images_rotation https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4154
sub@drone_imagery_update_gps_images_rotation_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4155
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4261
sub@drone_imagery_match_and_align_two_images https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4392
sub@drone_imagery_match_and_align_two_images_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4393
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4422
sub@_drone_imagery_match_and_align_images https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4482
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4509
sub@_perform_match_raw_images_sequential https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4667
sub@drone_imagery_match_and_align_images_sequential https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4972
sub@drone_imagery_match_and_align_images_sequential_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4973
sub@drone_imagery_delete_gps_images https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4998
sub@drone_imagery_delete_gps_images_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4999
sub@drone_imagery_save_gps_images https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5042
sub@drone_imagery_save_gps_images_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5043
sub@drone_imagery_calculate_statistics_store_analysis https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5082
sub@drone_imagery_calculate_statistics_store_analysis_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5083
sub@drone_imagery_rotate_image https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5185
sub@drone_imagery_rotate_image_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5186
sub@_perform_image_rotate https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5208
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5240
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5253
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5261
sub@drone_imagery_get_contours https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5440
sub@drone_imagery_get_contours_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5441
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5461
sub@drone_imagery_retrieve_parameter_template https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5509
sub@drone_imagery_retrieve_parameter_template_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5510
sub@drone_imagery_assign_plot_polygons https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5526
sub@drone_imagery_assign_plot_polygons_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5527
sub@_perform_plot_polygon_assign https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5544
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5745
sub@drone_imagery_manual_assign_plot_polygon_save_partial_template https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5831
sub@drone_imagery_manual_assign_plot_polygon_save_partial_template_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5832
sub@drone_imagery_manual_assign_plot_polygon https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5909
sub@drone_imagery_manual_assign_plot_polygon_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5910
sub@drone_imagery_save_plot_polygons_template https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6012
sub@drone_imagery_save_plot_polygons_template_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6013
sub@drone_imagery_save_plot_polygons_template_separated https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6069
sub@drone_imagery_save_plot_polygons_template_separated_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6070
sub@drone_imagery_denoise https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6129
sub@drone_imagery_denoise_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6130
sub@_perform_image_denoise https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6150
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6168
sub@drone_imagery_remove_background_display https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6233
sub@drone_imagery_remove_background_display_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6234
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6263
sub@drone_imagery_remove_background_save https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6290
sub@drone_imagery_remove_background_save_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6291
sub@_perform_image_background_remove_threshold https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6322
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6353
sub@drone_imagery_remove_background_percentage_save https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6392
sub@drone_imagery_remove_background_percentage_save_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6393
sub@_perform_image_background_remove_threshold_percentage https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6429
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6484
sub@_get_image_background_remove_threshold_percentage https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6529
sub@get_check_field_trial_ids https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6563
sub@get_check_field_trial_ids_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6564
sub@get_drone_run_projects https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6612
sub@get_drone_run_projects_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6613
sub@get_drone_run_projects_kv https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6689
sub@get_drone_run_projects_kv_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6690
sub@get_plot_polygon_types_images https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6746
sub@get_plot_polygon_types_images_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6747
sub@_get_standard_4_polygon_types https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6849
sub@_get_standard_9_polygon_types https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6869
sub@_get_standard_ndvi_ndre_polygon_types https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6890
sub@get_plot_polygon_types https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6898
sub@get_plot_polygon_types_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6899
sub@get_drone_run_band_projects https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L7039
sub@get_drone_run_band_projects_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L7040
sub@get_week_after_planting_date https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L7159
sub@get_week_after_planting_date_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L7160
sub@_perform_get_weeks_drone_run_after_planting https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L7181
sub@check_maximum_standard_processes https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L7277
sub@check_maximum_standard_processes_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L7278
sub@drone_run_get_field_trial_drone_run_projects_in_same_orthophoto https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L7295
sub@drone_run_get_field_trial_drone_run_projects_in_same_orthophoto_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L7296
sub@retrieve_preview_plot_images https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L7338
sub@retrieve_preview_plot_images_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L7339
sub@preview_plot_polygons https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L7375
sub@preview_plot_polygons_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L7376
sub@standard_process_apply https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L7395
sub@standard_process_apply_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L7396
sub@standard_process_apply_ground_control_points https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L7875
sub@standard_process_apply_ground_control_points_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L7876
sub@standard_process_apply_previous_imaging_event https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L8701
sub@standard_process_apply_previous_imaging_event_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L8702
sub@standard_process_apply_raw_images_interactive https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L8959
sub@standard_process_apply_raw_images_interactive_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L8960
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L9204
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L9213
sub@drone_imagery_get_vehicle https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L9280
sub@drone_imagery_get_vehicle_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L9281
sub@drone_imagery_get_vehicles https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L9323
sub@drone_imagery_get_vehicles_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L9324
sub@drone_imagery_accession_phenotype_histogram https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L9368
sub@drone_imagery_accession_phenotype_histogram_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L9369
sub@drone_imagery_save_single_plot_image https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L9514
sub@drone_imagery_save_single_plot_image_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L9515
sub@standard_process_minimal_vi_apply https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L9601
sub@standard_process_minimal_vi_apply_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L9602
sub@standard_process_extended_apply https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L9757
sub@standard_process_extended_apply_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L9758
sub@_perform_standard_process_minimal_vi_calc https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L9928
sub@_perform_standard_process_extended_vi_calc https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L9954
sub@_perform_extended_base_standard_process https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10126
sub@_perform_minimal_vi_standard_process https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10175
sub@_perform_extended_vi_standard_process https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10332
sub@get_project_md_image https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10383
sub@get_project_md_image_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10384
sub@get_brighten_image https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10412
sub@get_brighten_image_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10413
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10434
sub@drone_imagery_get_image https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10462
sub@drone_imagery_get_image_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10463
sub@drone_imagery_remove_image https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10486
sub@drone_imagery_remove_image_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10487
sub@drone_imagery_crop_image https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10500
sub@drone_imagery_crop_image_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10501
sub@_perform_image_cropping https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10529
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10563
sub@drone_imagery_calculate_fourier_transform https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10631
sub@drone_imagery_calculate_fourier_transform_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10632
sub@_perform_fourier_transform_calculation https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10650
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10675
sub@drone_imagery_calculate_vegetative_index https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10722
sub@drone_imagery_calculate_vegetative_index_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10723
sub@_perform_vegetative_index_calculation https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10740
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10816
sub@drone_imagery_mask_remove_background https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10882
sub@drone_imagery_mask_remove_background_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10883
sub@_perform_image_background_remove_mask https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10898
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10921
sub@drone_imagery_get_plot_polygon_images https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10952
sub@drone_imagery_get_plot_polygon_images_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10953
sub@drone_imagery_merge_bands https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10984
sub@drone_imagery_merge_bands_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10985
sub@_perform_image_merge https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L11006
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L11058
sub@_perform_phenotype_automated https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L11153
sub@drone_imagery_get_drone_run_image_counts https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L11266
sub@drone_imagery_get_drone_run_image_counts_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L11267
sub@drone_imagery_update_details https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L11322
sub@drone_imagery_update_details_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L11323
sub@drone_imagery_quality_control_get_images https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L11350
sub@drone_imagery_quality_control_get_images_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L11351
sub@drone_imagery_check_available_applicable_vi https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L11412
sub@drone_imagery_check_available_applicable_vi_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L11413
sub@drone_imagery_check_associated_field_trials https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L11556
sub@drone_imagery_check_associated_field_trials_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L11557
sub@drone_imagery_save_associated_field_trials https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L11576
sub@drone_imagery_save_associated_field_trials_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L11577
sub@drone_imagery_apply_other_selected_vi https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L11850
sub@drone_imagery_apply_other_selected_vi_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L11851
sub@drone_imagery_get_image_for_saving_gcp https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L11974
sub@drone_imagery_get_image_for_saving_gcp_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L11975
sub@drone_imagery_plot_polygon_spreadsheet_parse https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L12021
sub@drone_imagery_plot_polygon_spreadsheet_parse_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L12022
sub@drone_imagery_get_image_for_time_series https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L12199
sub@drone_imagery_get_image_for_time_series_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L12200
sub@drone_imagery_saving_gcp https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L12286
sub@drone_imagery_saving_gcp_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L12287
sub@drone_imagery_remove_one_gcp https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L12334
sub@drone_imagery_remove_one_gcp_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L12335
sub@drone_imagery_obsolete_image_change https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L12372
sub@drone_imagery_obsolete_image_change_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L12373
sub@drone_imagery_calculate_phenotypes https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L12388
sub@drone_imagery_calculate_phenotypes_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L12389
sub@drone_imagery_generate_phenotypes https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L12435
sub@drone_imagery_generate_phenotypes_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L12436
sub@_perform_phenotype_calculation https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L12471
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L12750
sub@drone_imagery_compare_images https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L12963
sub@drone_imagery_compare_images_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L12964
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13024
sub@drone_imagery_train_keras_model https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13031
sub@drone_imagery_train_keras_model_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13032
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13411
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13414
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13420
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13423
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13426
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13429
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13432
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13435
sub@drone_imagery_save_keras_model https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13553
sub@drone_imagery_save_keras_model_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13554
sub@_perform_save_trained_keras_cnn_model https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13579
sub@drone_imagery_predict_keras_model https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13650
sub@drone_imagery_predict_keras_model_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13651
sub@_perform_keras_cnn_predict https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13677
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L14117
sub@drone_imagery_autoencoder_keras_vi_model https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L14405
sub@drone_imagery_autoencoder_keras_vi_model_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L14406
sub@_perform_autoencoder_keras_cnn_vi https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L14438
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L14681
sub@drone_imagery_change_date_drone_run https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L14824
sub@drone_imagery_change_date_drone_run_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L14825
sub@drone_imagery_delete_drone_run https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L15033
sub@drone_imagery_delete_drone_run_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L15034
sub@drone_imagery_get_image_types https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L15140
sub@drone_imagery_get_image_types_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L15141
sub@drone_imagery_growing_degree_days https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L15155
sub@drone_imagery_growing_degree_days_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L15156
sub@drone_imagery_precipitation_sum https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L15174
sub@drone_imagery_precipitation_sum_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L15175
sub@_perform_gdd_calculation_and_drone_run_time_saving https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L15192
sub@_perform_precipitation_sum_calculation_and_drone_run_time_saving https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L15294
sub@drone_imagery_retrain_mask_rcnn https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L15390
sub@drone_imagery_retrain_mask_rcnn_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L15391
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L15558
sub@drone_imagery_predict_mask_rcnn https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L15608
sub@drone_imagery_predict_mask_rcnn_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L15609
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L15676
sub@drone_imagery_export_drone_runs https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L15697
sub@drone_imagery_export_drone_runs_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L15698
sub@drone_imagery_point_cloud_3d https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L16050
sub@drone_imagery_point_cloud_3d_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L16051
sub@_check_user_login_drone_imagery https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L16095
sub@raw_drone_imagery_summary_top https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryMainDisplay.pm#L38
sub@raw_drone_imagery_summary_top_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryMainDisplay.pm#L39
sub@raw_drone_imagery_drone_run_band_summary https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryMainDisplay.pm#L367
sub@raw_drone_imagery_drone_run_band_summary_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryMainDisplay.pm#L368
sub@_draw_drone_imagery_section https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryMainDisplay.pm#L682
sub@_draw_plot_polygon_images_panel https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryMainDisplay.pm#L722
sub@_check_user_login_drone_imagery_main_display https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryMainDisplay.pm#L753
sub@upload_drone_imagery_check_drone_name https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L45
sub@upload_drone_imagery_check_drone_name_GET https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L46
sub@upload_drone_imagery https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L66
sub@upload_drone_imagery_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L67
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L466
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L474
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L613
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L624
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L834
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L1016
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L1282
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L1288
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L1308
sub@upload_drone_imagery_new_vehicle https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L1376
sub@upload_drone_imagery_new_vehicle_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L1377
sub@upload_drone_imagery_new_vehicle_rover https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L1430
sub@upload_drone_imagery_new_vehicle_rover_POST https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L1431
sub@_check_user_login_drone_imagery_upload https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L1484
sub@upload_drone_imagery https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L35
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L512
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L621
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L895
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L930
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1006
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1014
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1292
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1299
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1356
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1385
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1448
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1470
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1503
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1594
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1602
sub@upload_drone_imagery_bulk https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1722
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L2363
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L2371
sub@upload_drone_imagery_bulk_previous https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L2412
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L3188
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L3223
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L3280
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L3367
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L3375
sub@upload_drone_imagery_geocoordinate_param https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L3705
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L3760
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L3795
sub@upload_drone_imagery_standard_process_previous_geotiff https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L4052
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L4171
 https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L4206
sub@upload_drone_imagery_additional_raw_images https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L4555
sub@_check_user_login_drone_imagery_upload https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L4613
sub@perform_drone_imagery_analytics https://github.com/nickmorales/imagebreed/blob/master/lib/CXGN/DroneImagery/DroneImageryAnalyticsRunSimulation.pm#L65


## ODM DOCKER Commands
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L1273
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L1301
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1275
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1430

## The following places are where the Python code that runs image anlysis with OpenCV is invoked.
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneRover/DroneRoverUpload.pm#L485
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/ImageAnalysis.pm#L198
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneRover/DroneRover.pm#L530
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4261
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4422
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L4509
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5240
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5253
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5261
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5461
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L5745
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6168
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6263
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6353
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L6484
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L9204
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10434
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10563
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10675
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10816
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L10921
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L11058
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L12750
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13024
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13411
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13414
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13420
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13423
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13426
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13429
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13432
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L13435
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L14117
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L14681
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L15558
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImagery.pm#L15676
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L466
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L474
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L613
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L624
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L834
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L1016
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L1282
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L1288
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/AJAX/DroneImagery/DroneImageryUpload.pm#L1308
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L512
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L621
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L895
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L930
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1006
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1014
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1292
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1299
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1356
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1385
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1448
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1470
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1503
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1594
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L1602
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L2363
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L2371
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L3188
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L3223
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L3280
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L3367
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L3375
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L3760
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L3795
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L4171
https://github.com/nickmorales/imagebreed/blob/master/lib/SGN/Controller/DroneImagery/DroneImageryUpload.pm#L4206
