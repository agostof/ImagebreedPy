$(document).ready(function () {
    // BLuk Upload Handlers
    $('#upload_drone_imagery_bulk_previous_button').click(function (e) {
        e.preventDefault();
        $('#upload_drone_imagery_bulk_previous_dialog').modal("show");
        return;
    });

    $('#upload_drone_imagery_bulk_button').click(function (e) {
        e.preventDefault();
        $('#upload_drone_imagery_bulk_dialog').modal("show");
        return;
    });

    // Form Variables
    var private_company_id;
    var upload_drone_imagery_vehicle_id;
    var upload_drone_imagery_field_trial_ids_string = '';
    var upload_drone_imagery_field_trial_names = [];

    var drone_run_date_element = $("#drone_run_date");
    drone_run_date_element[0].valueAsDate = new Date()

    // On Change Hnadlers
    $(document).on('change', '#drone_run_company_id', function () {
        private_company_id = $(this).val();
        get_select_box('imaging_event_vehicles', 'drone_run_imaging_vehicle_div', { 'id': 'drone_run_imaging_vehicle_id', 'name': 'drone_run_imaging_vehicle_id', 'private_company_id': private_company_id });
        get_select_box('trials', 'upload_drone_image_trial_select_div', { 'name': 'drone_run_field_trial_id', 'id': 'drone_run_field_trial_id', 'empty': 1, 'multiple': 1, 'private_company_id': private_company_id });
    });

    $(document).on('change', '#drone_run_field_trial_id', function () {
        var upload_drone_imagery_field_trial_ids = $(this).val();
        upload_drone_imagery_field_trial_ids_string = upload_drone_imagery_field_trial_ids.join();

        if (upload_drone_imagery_field_trial_ids.length > 31) {
            alert('The maximum number of field trials you can select here is currently 31. Please contact us to change this, by increasing the trial layout table rendering number.');
            return false;
        }

        $('#drone_image_upload_drone_runs_table').DataTable({
            destroy: true,
            ajax: {
                url: '/api/drone_imagery/drone_runs?select_checkbox_name=upload_drone_imagery_drone_run_select&field_trial_ids=' + upload_drone_imagery_field_trial_ids_string + '&disable=1',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
                }
            }
        });

        jQuery.ajax({
            url: '/api/drone_imagery/check_field_trial_ids?field_trial_ids=' + upload_drone_imagery_field_trial_ids_string,
            beforeSend: function (xhr) {
                $("#working_modal").modal("show");
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            success: function (response) {
                console.log(response);
                if (response.html) {
                    $('#upload_drone_image_field_trial_info').html(response.html);
                }
                if (response.can_proceed == 1) {
                    $('#upload_drone_image_field_trial_select_date_continue_div').show();
                    upload_drone_imagery_field_trial_names = response.field_trial_names;
                }
                else {
                    upload_drone_imagery_field_trial_ids_string = '';
                    upload_drone_imagery_field_trial_names = [];
                    $('#upload_drone_image_field_trial_select_date_continue_div').hide();
                }
            },
            error: function (response) {
                alert('Error checking field trial details!');
            }
        });
    });

    $(document).on('change', '#drone_run_is_fixed_rig', function () {
        if ($(this).val() == 'Yes') {
            $('#drone_image_upload_create_drone_inputs_fixed_camera').show();
        }
        else {
            $('#drone_image_upload_create_drone_inputs_fixed_camera').hide();
        }
        return false;
    });

    $('#upload_drone_image_field_trial_select_date_continue').click(function () {
        if (upload_drone_imagery_field_trial_ids_string == '') {
            alert('Please select at least one field trial first!');
            return false;
        }
        if (drone_run_date_element.val() == '') {
            alert('Please give an imaging event date!');
            return false;
        }

        var field_trial_names_generated = [];
        var drone_run_date = drone_run_date_element.val();
        var drone_run_date_gen = drone_run_date.replace(/\//g, '');
        for (var i = 0; i < upload_drone_imagery_field_trial_names.length; i++) {
            var drone_run_name_gen = upload_drone_imagery_field_trial_names[i] + "_" + drone_run_date_gen;
            drone_run_name_gen = drone_run_name_gen.replace(/ /g, '_');
            drone_run_name_gen = drone_run_name_gen.replace(/\,/g, '_');
            field_trial_names_generated.push(drone_run_name_gen);
        }
        var field_trial_names_generated_string = field_trial_names_generated.join();
        $('#drone_run_name').val(field_trial_names_generated_string);

        Workflow.complete('#upload_drone_image_field_trial_select_date_continue');
        Workflow.focus('#drone_imagery_upload_workflow', 2);

    });

    $(document).on('change', '#drone_image_upload_camera_info', function () {
        var sensor_id = $('#drone_image_upload_camera_info').val();
        jQuery.ajax({
            url: '/api/drone_imagery/sensors?sensor_id=' + sensor_id,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            success: function (response) {
                console.log(response);
                
                var select = $('#drone_run_band_number');
                select.empty()
                select.append("<option disabled selected> -- Select -- </option>")
                if(response.data[0].allowBWBand){
                    select.append("<option value='one_bw'>One Black and White Image</option>");
                }
                if(response.data[0].allowRGBBand){
                    select.append("<option value='one_rgb'>One RGB Color Image</option>");
                }
                if(response.data[0].totalBandsAllowed){
                    for (let i = 1; i <= response.data[0].totalBandsAllowed; i++) {
                        select.append("<option value=" + i + ">" + i +" Separate Spectral Bands and/or DSM raster </option>");
                    }
                }
            },
            error: function (response) {
                alert('Error checking sensor details!');
            }
        });
    });

    $(document).on('change', '#drone_run_imaging_vehicle_id', function () {
        upload_drone_imagery_vehicle_id = $(this).val();
    });

    $('#drone_image_upload_drone_run_continue').click(function (e) {
        e.preventDefault();

        var drone_run_name = $('#drone_run_name').val()
        var selected = [];
        $('input[name="upload_drone_imagery_drone_run_select"]:checked').each(function () {
            selected.push($(this).val());
        });

        if (selected.length > 1) {
            alert('Only select one drone run!');
            return false;
        }
        if (selected.length == 0 && drone_run_name == '') {
            alert('Select an imaging event or create a new one!');
            return false;
        }
        if (selected.length == 1 && drone_run_name != '') {
            alert('If you selected an imaging event, do not try to make a new one at the same time!');
            return false;
        }

        if (selected.length == 1 && drone_run_name == '') {
            $('#drone_run_id').val(selected[0]);
            Workflow.complete('#drone_image_upload_drone_run_continue');
            Workflow.focus('#drone_imagery_upload_workflow', 3);
        } else if (selected.length == 0 && $('#drone_run_name').val() != '') {
            if ($('#drone_run_description').val() == '') {
                alert('Please give an imaging event description.');
            } else if ($('#drone_run_date').val() == '') {
                alert('Please give an imaging event date.');
            } else if ($('#drone_run_type').val() == '') {
                alert('Please select an imaging event type');
            } else if ($('#drone_image_upload_camera_info').val() == '') {
                alert('Please select an imaging event sensor type');
            } else if ($('#drone_run_imaging_vehicle_id').val() == '') {
                alert('Please select an imaging event vehicle! You can create a new vehicle if needed e.g. default_uav');
            } else {
                $('#drone_run_id').val('');

                Workflow.complete('#drone_image_upload_drone_run_continue');
                Workflow.focus('#drone_imagery_upload_workflow', 3);
            }
        }

        return false;
    });

    $('#drone_image_upload_drone_run_band_stitching').change(function () {
        if ($(this).val() == 'no') {
            $('#drone_run_upload_drone_run_band_number_div').show();
            $('#drone_run_upload_drone_run_band_image_type_div').show();
        }
        else {
            $('#drone_run_upload_drone_run_band_number_div').hide();
            $('#drone_run_upload_drone_run_band_image_type_div').hide();
        }
    });

    var drone_run_band_unstitched = '';
    var drone_run_band_image_type = '';
    var new_drone_run_band_stitching_odm_more_images = '';
    $('#drone_image_upload_drone_run_band_continue').click(function (e) {
        e.preventDefault();

        var drone_run_band_number = $('#drone_run_band_number').val();
        drone_run_band_unstitched = $('#drone_image_upload_drone_run_band_stitching').val();
        drone_run_band_image_type = $('#drone_run_upload_drone_run_band_image_type').val();
        var drone_run_camera_info = $('#drone_image_upload_camera_info').val();
        var drone_run_id = $('#drone_run_id').val();
        var drone_run_name = $('#drone_run_name').val();
        var drone_run_company_id = $('#drone_run_company_id').val();
        var drone_run_description = $('#drone_run_description').val();
        var drone_run_date = $('#drone_run_date').val();
        var drone_run_type = $('#drone_run_type').val();
        var drone_run_vehicle_id = $('#drone_run_imaging_vehicle_id').val();
        var drone_run_vehicle_battery_name = $('#drone_run_imaging_vehicle_battery_name').val();
        var drone_run_camera_rig_description = $('#drone_run_camera_rig_description').val();
        var drone_run_base_date = $('#drone_run_base_date').val();

        if (drone_run_band_unstitched == '') {
            alert('Please select whether you are uploading orthomosaic images.');
            return false;
        }
        if (drone_run_id == '' && drone_run_camera_info == '') {
            alert('Please select the sensor type used.');
            return false;
        }

        if (drone_run_vehicle_id == '' || drone_run_vehicle_battery_name == '') {
            alert('Please select an imaging event vehicle and the associated battery! You can create a new vehicle if needed e.g. default_battery');
            return false;
        }
        if (drone_run_camera_info == '') {
            alert('Please select the camera type used.');
            return false;
        }

        console.log(drone_run_band_unstitched);
        console.log(drone_run_band_number);
        console.log(drone_run_camera_info);

        $('input[name="drone_run_field_trial_id"]').val(upload_drone_imagery_field_trial_ids_string);
        $('input[name="private_company_id"]').val(drone_run_company_id);
        $('input[name="drone_run_name"]').val(drone_run_name);
        $('input[name="drone_run_type"]').val(drone_run_type);
        $('input[name="drone_image_upload_camera_info"]').val(drone_run_camera_info);
        $('input[name="drone_run_imaging_vehicle_id"]').val(drone_run_vehicle_id);
        $('input[name="drone_run_imaging_vehicle_battery_name"]').val(drone_run_vehicle_battery_name);
        $('input[name="drone_run_description"]').val(drone_run_description);
        $('input[name="drone_run_date"]').val(drone_run_date);
        $('input[name="drone_run_camera_rig_description"]').val(drone_run_camera_rig_description);
        $('input[name="drone_run_base_date"]').val(drone_run_base_date);
        $('input[name="drone_image_upload_drone_run_band_stitching"]').val(drone_run_band_unstitched);
        $('input[name="drone_image_upload_drone_run_band_type"]').val(drone_run_band_image_type);
        $('input[name="drone_run_band_number"]').val(drone_run_band_number);

        if (drone_run_band_unstitched == 'no') {
            if (drone_run_band_number == '') {
                alert('Please select the number of imaging event bands you will upload!');
                return false;
            }
            else if (drone_run_band_image_type == '') {
                alert('Please select an option for how the orthophotomosaic was produced.');
                return false;
            }
            else {
                if (drone_run_band_number == 5 && drone_run_camera_info == 'micasense_5') {
                    $('select[name="drone_run_band_type_1"] option[value="Blue (450-520nm)"]').attr('selected', 'selected');
                    $('select[name="drone_run_band_type_2"] option[value="Green (515-600nm)"]').attr('selected', 'selected');
                    $('select[name="drone_run_band_type_3"] option[value="Red (600-690nm)"]').attr('selected', 'selected');
                    $('select[name="drone_run_band_type_4"] option[value="NIR (780-3000nm)"]').attr('selected', 'selected');
                    $('select[name="drone_run_band_type_5"] option[value="Red Edge (690-750nm)"]').attr('selected', 'selected');
                }
                else if (drone_run_band_number == 10 && drone_run_camera_info == 'micasense_10') {
                    $('select[name="drone_run_band_type_1"] option[value="Blue (450-520nm)"]').attr('selected', 'selected');
                    $('select[name="drone_run_band_type_2"] option[value="Green (515-600nm)"]').attr('selected', 'selected');
                    $('select[name="drone_run_band_type_3"] option[value="Red (600-690nm)"]').attr('selected', 'selected');
                    $('select[name="drone_run_band_type_4"] option[value="NIR (780-3000nm)"]').attr('selected', 'selected');
                    $('select[name="drone_run_band_type_5"] option[value="Red Edge (690-750nm)"]').attr('selected', 'selected');
                    $('select[name="drone_run_band_type_6"] option[value="Coastal Blue (410-480nm)"]').attr('selected', 'selected');
                    $('select[name="drone_run_band_type_7"] option[value="Green (510-550nm)"]').attr('selected', 'selected');
                    $('select[name="drone_run_band_type_8"] option[value="Red (590-670nm)"]').attr('selected', 'selected');
                    $('select[name="drone_run_band_type_9"] option[value="Red Edge (680-720nm)"]').attr('selected', 'selected');
                    $('select[name="drone_run_band_type_10"] option[value="Red Edge (720-760nm)"]').attr('selected', 'selected');
                }
            }

            if (drone_run_band_number == 1 || drone_run_band_number == 'one_bw' || drone_run_band_number == 'one_rgb') {
                $('#upload_drone_imagery_dialog_one_band').modal('show');
            }
            if (drone_run_band_number == 2) {
                $('#upload_drone_imagery_dialog_two_band').modal('show');
            }
            if (drone_run_band_number == 3) {
                $('#upload_drone_imagery_dialog_three_band').modal('show');
            }
            if (drone_run_band_number == 4) {
                $('#upload_drone_imagery_dialog_four_band').modal('show');
            }
            if (drone_run_band_number == 5) {
                if (drone_run_band_image_type == 'ODM') {
                    $('#upload_drone_imagery_dialog_five_band_ODM').modal('show');
                }
                else if (drone_run_band_image_type == 'Agisoft') {
                    $('#upload_drone_imagery_dialog_five_or_ten_band_agisoft').modal('show');
                }
                else {
                    $('#upload_drone_imagery_dialog_five_band').modal('show');
                }
            }
            if (drone_run_band_number == 6) {
                $('#upload_drone_imagery_dialog_six_band').modal('show');
            }
            if (drone_run_band_number == 7) {
                $('#upload_drone_imagery_dialog_seven_band').modal('show');
            }
            if (drone_run_band_number == 8) {
                $('#upload_drone_imagery_dialog_eight_band').modal('show');
            }
            if (drone_run_band_number == 9) {
                $('#upload_drone_imagery_dialog_nine_band').modal('show');
            }
            if (drone_run_band_number == 10) {
                if (drone_run_band_image_type == 'Agisoft') {
                    $('#upload_drone_imagery_dialog_five_or_ten_band_agisoft').modal('show');
                }
                else {
                    $('#upload_drone_imagery_dialog_ten_band').modal('show');
                }
            }
            if (drone_run_band_number == 11) {
                $('#upload_drone_imagery_dialog_eleven_band').modal('show');
            }
        }
        else if (drone_run_band_unstitched == 'yes_open_data_map_stitch') {
            if (drone_run_camera_info == 'micasense_5') {
                $('#upload_drone_imagery_dialog_odm_micasense').modal('show');
            }
            else if (drone_run_camera_info == 'ccd_color') {
                $('#upload_drone_imagery_dialog_odm').modal('show');
            }
            else {
                alert('ODM can only stitch MicaSense 5-channel Images or RGB Color Images. Please only select one of those camera sensors to use ODM.');
            }
        }

        return false;
    });

    $('#upload_drone_imagery_select_images_one').click(function (e) {
        e.preventDefault();
        if ($('#drone_run_band_description_one_1').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_one_1').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_one_1').val() == '') {
            alert('Please select an image');
            return;
        }

        Workflow.complete('#upload_drone_imagery_select_images_one');
        Workflow.focus('#drone_imagery_upload_workflow_one_band', 1);
        return false;
    });

    $('#upload_drone_imagery_select_images_two').click(function (e) {
        e.preventDefault();
        if ($('#drone_run_band_description_two_1').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_two_1').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_two_1').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_two_2').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_two_2').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_two_2').val() == '') {
            alert('Please select an image');
            return;
        }

        Workflow.complete('#upload_drone_imagery_select_images_two');
        Workflow.focus('#drone_imagery_upload_workflow_two_band', 1);
        return false;
    });

    $('#upload_drone_imagery_select_images_three').click(function (e) {
        e.preventDefault();
        if ($('#drone_run_band_description_three_1').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_three_1').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_three_1').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_three_2').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_three_2').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_three_2').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_three_3').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_three_3').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_three_3').val() == '') {
            alert('Please select an image');
            return;
        }

        Workflow.complete('#upload_drone_imagery_select_images_three');
        Workflow.focus('#drone_imagery_upload_workflow_three_band', 1);
        return false;
    });

    $('#upload_drone_imagery_select_images_four').click(function (e) {
        e.preventDefault();
        if ($('#drone_run_band_description_four_1').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_four_1').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_four_1').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_four_2').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_four_2').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_four_2').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_four_3').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_four_3').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_four_3').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_four_4').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_four_4').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_four_4').val() == '') {
            alert('Please select an image');
            return;
        }

        Workflow.complete('#upload_drone_imagery_select_images_four');
        Workflow.focus('#drone_imagery_upload_workflow_four_band', 1);
        return false;
    });

    $('#upload_drone_imagery_select_images_five').click(function (e) {
        e.preventDefault();
        if ($('#drone_run_band_description_five_1').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_five_1').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_five_1').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_five_2').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_five_2').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_five_2').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_five_3').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_five_3').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_five_3').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_five_4').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_five_4').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_five_4').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_five_5').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_five_5').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_five_5').val() == '') {
            alert('Please select an image');
            return;
        }

        Workflow.complete('#upload_drone_imagery_select_images_five');
        Workflow.focus('#drone_imagery_upload_workflow_five_band', 1);
        return false;
    });

    $('#upload_drone_imagery_select_images_five_odm').click(function (e) {
        e.preventDefault();
        if ($('#drone_run_band_stitched_ortho_image_five_odm').val() == '') {
            alert('Please select an image');
            return;
        }
        Workflow.complete('#upload_drone_imagery_select_images_five_odm');
        Workflow.focus('#drone_imagery_upload_workflow_five_band_odm', 1);
        return false;
    });

    $('#upload_drone_imagery_select_images_five_or_ten_agisoft').click(function (e) {
        e.preventDefault();
        if ($('#drone_run_band_stitched_ortho_image_five_or_ten_agisoft').val() == '') {
            alert('Please select an image');
            return;
        }
        Workflow.complete('#upload_drone_imagery_select_images_five_or_ten_agisoft');
        Workflow.focus('#drone_imagery_upload_workflow_five_or_ten_band_agisoft', 1);
        return false;
    });

    $('#upload_drone_imagery_select_images_six').click(function (e) {
        e.preventDefault();
        if ($('#drone_run_band_description_six_1').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_six_1').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_six_1').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_six_2').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_six_2').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_six_2').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_six_3').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_six_3').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_six_3').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_six_4').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_six_4').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_six_4').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_six_5').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_six_5').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_six_5').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_six_6').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_six_6').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_six_6').val() == '') {
            alert('Please select an image');
            return;
        }

        Workflow.complete('#upload_drone_imagery_select_images_six');
        Workflow.focus('#drone_imagery_upload_workflow_six_band', 1);
        return false;
    });

    $('#upload_drone_imagery_select_images_seven').click(function (e) {
        e.preventDefault();
        if ($('#drone_run_band_description_seven_1').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_seven_1').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_seven_1').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_seven_2').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_seven_2').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_seven_2').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_seven_3').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_seven_3').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_seven_3').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_seven_4').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_seven_4').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_seven_4').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_seven_5').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_seven_5').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_seven_5').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_seven_6').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_seven_6').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_seven_6').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_seven_7').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_seven_7').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_seven_7').val() == '') {
            alert('Please select an image');
            return;
        }

        Workflow.complete('#upload_drone_imagery_select_images_seven');
        Workflow.focus('#drone_imagery_upload_workflow_seven_band', 1);
        return false;
    });

    $('#upload_drone_imagery_select_images_eight').click(function (e) {
        e.preventDefault();
        if ($('#drone_run_band_description_eight_1').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_eight_1').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_eight_1').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_eight_2').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_eight_2').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_eight_2').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_eight_3').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_eight_3').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_eight_3').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_eight_4').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_eight_4').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_eight_4').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_eight_5').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_eight_5').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_eight_5').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_eight_6').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_eight_6').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_eight_6').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_eight_7').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_eight_7').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_eight_7').val() == '') {
            alert('Please select an image');
            return;
        }
        if ($('#drone_run_band_description_eight_8').val() == '') {
            alert('Please give a drone run band description.');
            return;
        } else if ($('#drone_run_band_type_eight_8').val() == '') {
            alert('Please select a drone run band type.');
            return;
        }
        if ($('#drone_run_band_stitched_ortho_image_eight_8').val() == '') {
            alert('Please select an image');
            return;
        }

        Workflow.complete('#upload_drone_imagery_select_images_eight');
        Workflow.focus('#drone_imagery_upload_workflow_eight_band', 1);
        return false;
    });

    $('#upload_drone_imagery_select_images_odm').click(function (e) {
        e.preventDefault();
        if ($('#upload_drone_images_zipfile_odm').val() == '') {
            alert('Please select a zipfile of images');
            return;
        }

        var file_input = document.getElementById('upload_drone_images_zipfile_odm');
        if (!file_input.files[0] || file_input.files.length > 1) {
            alert('Please select only a single zipfile.');
            return;
        }

        Workflow.complete('#upload_drone_imagery_select_images_odm');
        Workflow.focus('#drone_imagery_upload_workflow_odm', 1);
        return false;
    });

    $('#upload_drone_imagery_select_images_odm_micasense').click(function (e) {
        e.preventDefault();
        if ($('#upload_drone_images_zipfile_odm_micasense').val() == '') {
            alert('Please select a zipfile of images');
            return;
        }

        var file_input = document.getElementById('upload_drone_images_zipfile_odm_micasense');
        if (!file_input.files[0] || file_input.files.length > 1) {
            alert('Please select only a single zipfile.');
            return;
        }

        if ($('#upload_drone_images_panel_zipfile_odm_micasense').val() == '') {
            alert('Please select a zipfile of Micasense radiocalibration panel images');
            return;
        }

        Workflow.complete('#upload_drone_imagery_select_images_odm_micasense');
        Workflow.focus('#drone_imagery_upload_workflow_odm_micasense', 1);
        return false;
    });

    $('#upload_drone_imagery_odm_form').submit(function () {
        $('#working_msg').html('This can potentially take time to complete. Ensure the file(s) have completely transferred to the server before closing this tab.');
        $('#working_modal').modal('show');
        return true;
    });

    $('#upload_drone_imagery_odm_micasense_form').submit(function () {
        $('#working_msg').html('This can potentially take time to complete. Ensure the file(s) have completely transferred to the server before closing this tab.');
        $('#working_modal').modal('show');
        return true;
    });

    $('#upload_drone_imagery_bulk_previous_form').submit(function () {
        $('#working_msg').html('This can potentially take time to complete. Ensure the file(s) have completely transferred to the server before closing this tab.');
        $('#working_modal').modal('show');
        return true;
    });

    $('#upload_drone_imagery_bulk_form').submit(function () {
        $('#working_msg').html('This can potentially take time to complete. Ensure the file(s) have completely transferred to the server before closing this tab.');
        $('#working_modal').modal('show');
        return true;
    });

    $('#upload_drone_imagery_one_band_form').submit(function () {
        $('#working_msg').html('This can potentially take time to complete. Ensure the file(s) have completely transferred to the server before closing this tab.');
        $('#working_modal').modal('show');
        return true;
    });

    $('#upload_drone_imagery_two_band_form').submit(function () {
        $('#working_msg').html('This can potentially take time to complete. Ensure the file(s) have completely transferred to the server before closing this tab.');
        $('#working_modal').modal('show');
        return true;
    });

    $('#upload_drone_imagery_three_band_form').submit(function () {
        $('#working_msg').html('This can potentially take time to complete. Ensure the file(s) have completely transferred to the server before closing this tab.');
        $('#working_modal').modal('show');
        return true;
    });

    $('#upload_drone_imagery_four_band_form').submit(function () {
        $('#working_msg').html('This can potentially take time to complete. Ensure the file(s) have completely transferred to the server before closing this tab.');
        $('#working_modal').modal('show');
        return true;
    });

    $('#upload_drone_imagery_five_band_form').submit(function () {
        $('#working_msg').html('This can potentially take time to complete. Ensure the file(s) have completely transferred to the server before closing this tab.');
        $('#working_modal').modal('show');
        return true;
    });

    $('#upload_drone_imagery_five_band_odm_form').submit(function () {
        $('#working_msg').html('This can potentially take time to complete. Ensure the file(s) have completely transferred to the server before closing this tab.');
        $('#working_modal').modal('show');
        return true;
    });

    $('#upload_drone_imagery_six_band_form').submit(function () {
        $('#working_msg').html('This can potentially take time to complete. Ensure the file(s) have completely transferred to the server before closing this tab.');
        $('#working_modal').modal('show');
        return true;
    });

    $('#upload_drone_imagery_seven_band_form').submit(function () {
        $('#working_msg').html('This can potentially take time to complete. Ensure the file(s) have completely transferred to the server before closing this tab.');
        $('#working_modal').modal('show');
        return true;
    });

    $('#upload_drone_imagery_eight_band_form').submit(function () {
        $('#working_msg').html('This can potentially take time to complete. Ensure the file(s) have completely transferred to the server before closing this tab.');
        $('#working_modal').modal('show');
        return true;
    });

});
