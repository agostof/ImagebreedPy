$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const drone_run_project_id = urlParams.get('drone_run_project_id');

    $('#manage_drone_imagery_standard_process_drone_run_bands_table').DataTable({
        destroy: true,
        ajax: {
            url: '/api/drone_imagery/drone_run_bands?select_checkbox_name=drone_run_standard_process_band_select&drone_run_project_id=' + drone_run_project_id,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            }
        }
    });


});

$(document).ready(function () {

    var manage_drone_imagery_standard_process_raw_images_interactive_current_pass = 1;
    var manage_drone_imagery_standard_process_raw_images_interactive_maximum_pass;
    var manage_drone_imagery_standard_process_raw_images_interactive_is_rotating = 1;
    var manage_drone_imagery_standard_process_raw_images_interactive_field_trial_id;
    var manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id;
    var manage_drone_imagery_standard_process_raw_images_interactive_north_or_south = 'South';
    var manage_drone_imagery_standard_process_raw_images_interactive_east_or_west = 'East';
    var manage_drone_imagery_standard_process_interactive_drone_run_band_project_id;
    var manage_drone_imagery_standard_process_raw_images_interactive_bulk_rotate_angle = 0;
    var manage_drone_imagery_standard_process_raw_images_interactive_rotate_angle = 0;
    var manage_drone_imagery_standard_process_raw_images_interactive_rotate_frame_angle = 0;
    var manage_drone_imagery_standard_process_raw_images_interactive_x_factor = 10000000;
    var manage_drone_imagery_standard_process_raw_images_interactive_y_factor = 16000000;
    var manage_drone_imagery_standard_process_raw_images_interactive_svg;
    var manage_drone_imagery_standard_process_raw_images_interactive_image;
    var manage_drone_imagery_standard_process_raw_images_nir_image_counter = 0;
    var manage_drone_imagery_standard_process_raw_images_nir_images = [];
    var drone_imagery_interactive_total_width;
    var drone_imagery_interactive_total_length;
    var manage_drone_imagery_standard_process_interactive_gps_images;
    var manage_drone_imagery_standard_process_interactive_saved_gps_positions;
    var manage_drone_imagery_standard_process_interactive_latitudes;
    var manage_drone_imagery_standard_process_interactive_latitudes_rounded;
    var manage_drone_imagery_standard_process_interactive_longitudes;
    var manage_drone_imagery_standard_process_interactive_longitudes_rounded;
    var manage_drone_imagery_standard_process_interactive_min_longitude;
    var manage_drone_imagery_standard_process_interactive_min_latitude;
    var manage_drone_imagery_standard_process_interactive_latitude_counter = 0;
    var manage_drone_imagery_standard_process_interactive_longitude_counter = 0;
    var drone_imagery_interactive_plot_polygons_removed_numbers = [];
    var drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions = [];
    var plot_polygons_interactive_num_rows_generated;
    var plot_polygons_interactive_num_cols_generated;
    var plot_polygons_interactive_generated_polygons = [];
    var drone_imagery_interactive_plot_polygons_display = [];
    var drone_imagery_interactive_plot_polygons = {};
    var drone_imagery_interactive_plot_generated_polygons = [];
    var plot_polygons_interactive_number_generated;
    var plot_polygons_interactive_ind_4_points = [];
    var plot_polygons_interactive_display_points = [];
    var drone_imagery_interactive_plot_polygons_available_stock_names = [];
    var drone_imagery_interactive_field_trial_layout_response;
    var drone_imagery_interactive_plot_polygons_removed_numbers = [];
    var plot_polygons_interactive_total_height_generated;
    var manage_drone_imagery_standard_process_interactive_apply_drone_run_band_project_ids = [];
    var manage_drone_imagery_standard_process_interactive_phenotype_time;
    var manage_drone_imagery_standard_process_interactive_apply_drone_run_band_vegetative_indices = [];
    var manage_drone_imagery_standard_process_interactive_latitude_rounded_map = {};
    var manage_drone_imagery_standard_process_interactive_longitude_rounded_map = {};
    var manage_drone_imagery_standard_process_interactive_latitude_ordinal_max;
    var manage_drone_imagery_standard_process_interactive_longitude_ordinal_max;
    var manage_drone_imagery_standard_process_interactive_current_ordinal_latitude_raw;
    var manage_drone_imagery_standard_process_interactive_current_ordinal_latitude_current;
    var manage_drone_imagery_standard_process_interactive_current_ordinal_longitude_raw;
    var manage_drone_imagery_standard_process_interactive_current_ordinal_longitude_current;
    var project_drone_imagery_interactive_ground_control_points_saved_div_table;
    var project_drone_imagery_interactive_ground_control_points_saved;
    var project_drone_imagery_interactive_ground_control_points_saved_array;

    d3.selection.prototype.moveToFront = function () {
        return this.each(function () {
            this.parentNode.appendChild(this);
        });
    };

    var droneImageryInteractiveSaveGPStimeout = null;
    function saveGPSPixelPositions() {
        if (droneImageryInteractiveSaveGPStimeout !== null) {
            clearTimeout(droneImageryInteractiveSaveGPStimeout);
        }
        droneImageryInteractiveSaveGPStimeout = setTimeout(function () {

            jQuery.ajax({
                url: '/api/drone_imagery/save_gps_images',
                type: 'POST',
                data: {
                    'gps_images': JSON.stringify(manage_drone_imagery_standard_process_interactive_gps_images),
                    'drone_run_project_id': manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id,
                    'flight_pass_counter': manage_drone_imagery_standard_process_raw_images_interactive_current_pass
                },
                beforeSend: function (xhr) {
                    $("#working_modal").modal("show");
                    xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
                },
                success: function (response) {
                    console.log(response);
                },
                error: function (response) {
                    alert('Error saving GPS images positions!');
                }
            });

        }, 100);
    }

    function appendDraggableImage(url, x_pos, y_pos, latitude, longitude, nir_image_id, stack_image_ids, rotate_angle, enable_drag, rotated_bound, match_problem) {

        var color = "orange";
        if (match_problem == 1) {
            color = "red";
        }
        else if (match_problem == 0) {
            color = "green";
        }

        var imageGroup = manage_drone_imagery_standard_process_raw_images_interactive_svg.append("g")
            .datum({ position: x_pos, y_pos })
            .attr("x_pos", x_pos)
            .attr("y_pos", y_pos)
            .attr("latitude", latitude)
            .attr("longitude", longitude)
            .attr("rotate_angle", rotate_angle)
            .attr("nir_image_id", nir_image_id)
            .attr("stack_image_ids", stack_image_ids)
            .attr("id", "nir_image_" + nir_image_id)
            .attr("match_problem", match_problem)
            .attr("transform", d => "translate(" + x_pos + "," + y_pos + ") rotate(" + rotate_angle + "," + manage_drone_imagery_standard_process_raw_images_interactive_image.width / 2 + "," + manage_drone_imagery_standard_process_raw_images_interactive_image.length / 2 + ")");

        if (enable_drag == 1) {
            imageGroup.call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
        }

        var imageElem = imageGroup.append("image")
            .attr("xlink:href", url)
            //.style("stroke", color)
            //.style("stroke-width", 2)
            .attr("height", manage_drone_imagery_standard_process_raw_images_interactive_image.length)
            .attr("width", manage_drone_imagery_standard_process_raw_images_interactive_image.width);

        var squareFill = imageGroup.append("square")
            .attr("class", "square-fill")
            //.style("stroke", color)
            //.style("stroke-width", 2)
            .attr("cx", manage_drone_imagery_standard_process_raw_images_interactive_image.width)
            .attr("cy", manage_drone_imagery_standard_process_raw_images_interactive_image.length);

        var imageborder = imageGroup.append('rect')
            .attr('class', 'image-border')
            .style("fill", "none")
            //.style("stroke", color)
            //.style("stroke-width", 2)
            .attr('width', manage_drone_imagery_standard_process_raw_images_interactive_image.width)
            .attr('height', manage_drone_imagery_standard_process_raw_images_interactive_image.length);

        if (rotated_bound && rotated_bound.length > 0) {
            var bound_x1 = parseFloat(rotated_bound[0][0]) + parseFloat(x_pos);
            var bound_y1 = parseFloat(rotated_bound[0][1]) + parseFloat(y_pos);
            var bound_x2 = parseFloat(rotated_bound[1][0]) + parseFloat(x_pos);
            var bound_y2 = parseFloat(rotated_bound[1][1]) + parseFloat(y_pos);
            var bound_x3 = parseFloat(rotated_bound[2][0]) + parseFloat(x_pos);
            var bound_y3 = parseFloat(rotated_bound[2][1]) + parseFloat(y_pos);
            var bound_x4 = parseFloat(rotated_bound[3][0]) + parseFloat(x_pos);
            var bound_y4 = parseFloat(rotated_bound[3][1]) + parseFloat(y_pos);

            var rotatedBoundGroup = manage_drone_imagery_standard_process_raw_images_interactive_svg.append("g")
                .datum({ position: x_pos, y_pos })
                .attr("x_pos", x_pos)
                .attr("y_pos", y_pos)
                .attr("nir_image_id", nir_image_id)
                .attr("match_problem", match_problem)
                .attr("is_rotated_bound", 1);
            var line1 = rotatedBoundGroup.append('line')
                .style("stroke", color)
                .style("stroke-width", 2)
                .attr("x1", bound_x1)
                .attr("y1", bound_y1)
                .attr("x2", bound_x2)
                .attr("y2", bound_y2)
                .attr("latitude", latitude)
                .attr("longitude", longitude)
                .attr("bnum", 0)
                .attr("nir_image_id", nir_image_id)
                .attr("match_problem", match_problem)
                .attr("is_rotated_bound", 1);
            var line2 = rotatedBoundGroup.append('line')
                .style("stroke", color)
                .style("stroke-width", 2)
                .attr("x1", bound_x2)
                .attr("y1", bound_y2)
                .attr("x2", bound_x3)
                .attr("y2", bound_y3)
                .attr("latitude", latitude)
                .attr("longitude", longitude)
                .attr("bnum", 1)
                .attr("nir_image_id", nir_image_id)
                .attr("match_problem", match_problem)
                .attr("is_rotated_bound", 1);
            var line3 = rotatedBoundGroup.append('line')
                .style("stroke", color)
                .style("stroke-width", 2)
                .attr("x1", bound_x3)
                .attr("y1", bound_y3)
                .attr("x2", bound_x4)
                .attr("y2", bound_y4)
                .attr("latitude", latitude)
                .attr("longitude", longitude)
                .attr("bnum", 2)
                .attr("nir_image_id", nir_image_id)
                .attr("match_problem", match_problem)
                .attr("is_rotated_bound", 1);
            var line4 = rotatedBoundGroup.append('line')
                .style("stroke", color)
                .style("stroke-width", 2)
                .attr("x1", bound_x4)
                .attr("y1", bound_y4)
                .attr("x2", bound_x1)
                .attr("y2", bound_y1)
                .attr("latitude", latitude)
                .attr("longitude", longitude)
                .attr("bnum", 3)
                .attr("nir_image_id", nir_image_id)
                .attr("match_problem", match_problem)
                .attr("is_rotated_bound", 1);

            manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]['rotated_bound_translated'] = [[bound_x1, bound_y1], [bound_x2, bound_y2], [bound_x3, bound_y3], [bound_x4, bound_y4]];
            saveGPSPixelPositions();
        }
    }

    function dragstarted(d) {
        d3.select(this).style("opacity", 0.6);
        d3.select(this).moveToFront();
    }

    function dragged(d) {
        var newX = d3.event.x - manage_drone_imagery_standard_process_raw_images_interactive_image.width / 2;
        var newY = d3.event.y - manage_drone_imagery_standard_process_raw_images_interactive_image.length / 2;
        d.x_pos = newX;
        d.y_pos = newY;
        var rotate_angle = d3.select(this).attr("rotate_angle");

        d3.select(this)
            .attr("transform", "translate(" + newX + "," + newY + ") rotate(" + rotate_angle + "," + manage_drone_imagery_standard_process_raw_images_interactive_image.width / 2 + "," + manage_drone_imagery_standard_process_raw_images_interactive_image.length / 2 + ")");
    }

    function dragended(d) {
        d3.select(this).lower();
        d3.select(this).style("opacity", 1.0);
        d3.select(this).moveToFront();

        var newX = d3.event.x - manage_drone_imagery_standard_process_raw_images_interactive_image.width / 2;
        var newY = d3.event.y - manage_drone_imagery_standard_process_raw_images_interactive_image.length / 2;
        d3.select(this).datum({ position: newX, newY });
        d3.select(this).attr("x_pos", newX);
        d3.select(this).attr("y_pos", newY);

        var latitude = d3.select(this).attr("latitude");
        var longitude = d3.select(this).attr("longitude");
        manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]['manual_match'] = 1;
        manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]['x_pos'] = newX;
        manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]['y_pos'] = newY;
        manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]['rotate_angle'] = manage_drone_imagery_standard_process_raw_images_interactive_rotate_angle;

        d3.selectAll("text").moveToFront();
        d3.selectAll("line").moveToFront();
        d3.selectAll("circle").moveToFront();
        saveGPSPixelPositions();
    }

    $('#drone_imagery_standard_process_raw_images_interactive_rotate_previous_pass').click(function () {
        if (manage_drone_imagery_standard_process_raw_images_interactive_current_pass > 1) {
            manage_drone_imagery_standard_process_raw_images_interactive_current_pass = manage_drone_imagery_standard_process_raw_images_interactive_current_pass - 1;

            initializeInteractiveSvg('#drone_imagery_standard_process_raw_images_interactive_bulk_rotate_div', 'drone_imagery_standard_process_raw_images_interactive_bulk_rotate_div_area', 1, 0);

            $('#drone_imagery_standard_process_interactive_rotate_flight_pass').html("<h1><b>Current Imaging Event Pass: " + manage_drone_imagery_standard_process_raw_images_interactive_current_pass + "/" + manage_drone_imagery_standard_process_raw_images_interactive_maximum_pass + "</b></h1>");
        }
        else {
            alert('No previous imaging pass to go to!');
            return false;
        }
    });

    $('#drone_imagery_standard_process_raw_images_interactive_rotate_next_pass').click(function () {
        if (manage_drone_imagery_standard_process_raw_images_interactive_current_pass < manage_drone_imagery_standard_process_raw_images_interactive_maximum_pass) {
            manage_drone_imagery_standard_process_raw_images_interactive_current_pass = manage_drone_imagery_standard_process_raw_images_interactive_current_pass + 1;

            initializeInteractiveSvg('#drone_imagery_standard_process_raw_images_interactive_bulk_rotate_div', 'drone_imagery_standard_process_raw_images_interactive_bulk_rotate_div_area', 1, 0);

            $('#drone_imagery_standard_process_interactive_rotate_flight_pass').html("<h1><b>Current Imaging Event Pass: " + manage_drone_imagery_standard_process_raw_images_interactive_current_pass + "/" + manage_drone_imagery_standard_process_raw_images_interactive_maximum_pass + "</b></h1>");
        }
        else {
            alert('No next imaging pass to go to!');
            return false;
        }
    });

    $('#manage_drone_imagery_standard_process_interactive_rotate_step').click(function () {

        jQuery.ajax({
            url: '/api/drone_imagery/update_gps_images_rotation',
            type: 'POST',
            beforeSend: function (xhr) {
                $("#working_modal").modal("show");
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            data: {
                'drone_run_project_id': manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id,
                'rotate_angle': manage_drone_imagery_standard_process_raw_images_interactive_bulk_rotate_angle,
                'flight_pass_counter': manage_drone_imagery_standard_process_raw_images_interactive_current_pass,
                'nir_image_ids': JSON.stringify(manage_drone_imagery_standard_process_raw_images_nir_images)
            },
            success: function (response) {
                console.log(response);
                //$('#working_modal').hide();
            },
            error: function (response) {
                //$('#working_modal').hide();
                alert('Error rotating GPS images!');
            }
        });

        if (manage_drone_imagery_standard_process_raw_images_interactive_current_pass < manage_drone_imagery_standard_process_raw_images_interactive_maximum_pass) {
            manage_drone_imagery_standard_process_raw_images_interactive_current_pass = manage_drone_imagery_standard_process_raw_images_interactive_current_pass + 1;

            console.log("PASS ROTATION COMPLETE");

            initializeInteractiveSvg('#drone_imagery_standard_process_raw_images_interactive_bulk_rotate_div', 'drone_imagery_standard_process_raw_images_interactive_bulk_rotate_div_area', 1, 0);

            $('#drone_imagery_standard_process_interactive_rotate_flight_pass').html("<h1><b>Current Imaging Event Pass: " + manage_drone_imagery_standard_process_raw_images_interactive_current_pass + "/" + manage_drone_imagery_standard_process_raw_images_interactive_maximum_pass + "</b></h1>");

            window.scrollTo(0, 0);
        }
        else {

            $('#drone_imagery_standard_process_interactive_rotate_flight_pass').html("<h1><b>Current Imaging Event Pass: " + manage_drone_imagery_standard_process_raw_images_interactive_current_pass + "/" + manage_drone_imagery_standard_process_raw_images_interactive_maximum_pass + "</b></h1><br/><div><h3>Working <img src='/img/wheel.gif' /></h3></div>");

            (function checkRawImageRotateProcess(manage_drone_imagery_standard_process_raw_images_interactive_is_rotating) {
                setTimeout(function () {
                    jQuery.ajax({
                        url: '/api/drone_imagery/check_gps_images_rotation',
                        type: 'POST',
                        data: {
                            'drone_run_project_id': manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id,
                        },
                        beforeSend: function (xhr) {
                            $("#working_modal").modal("show");
                            xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
                        },
                        success: function (response) {
                            console.log(response);
                            manage_drone_imagery_standard_process_raw_images_interactive_is_rotating = response.is_rotating;
                            if (manage_drone_imagery_standard_process_raw_images_interactive_is_rotating == 1) {
                                checkRawImageRotateProcess(manage_drone_imagery_standard_process_raw_images_interactive_is_rotating);
                            }
                            else {
                                $('#drone_imagery_standard_process_interactive_rotate_flight_pass').html("<h1><b>Current Imaging Event Pass: " + manage_drone_imagery_standard_process_raw_images_interactive_current_pass + "/" + manage_drone_imagery_standard_process_raw_images_interactive_maximum_pass + "</b></h1>");

                                console.log("ROTATION AND MATCHING COMPLETE");

                                manage_drone_imagery_standard_process_raw_images_interactive_current_pass = 1;

                                $('#drone_imagery_standard_process_interactive_plot_polygons_flight_pass').html("<h1><b>Current Imaging Event Pass: " + manage_drone_imagery_standard_process_raw_images_interactive_current_pass + "/" + manage_drone_imagery_standard_process_raw_images_interactive_maximum_pass + "</b></h1>");

                                initializeInteractiveSvg('#drone_imagery_standard_process_raw_images_image_id_interactive_select_div', 'drone_imagery_standard_process_raw_images_image_id_interactive_select_div_area', 1, 1);

                                Workflow.complete("#manage_drone_imagery_standard_process_interactive_rotate_step");
                                Workflow.focus('#manage_drone_imagery_standard_process_raw_images_interactive_workflow', 4);

                                window.scrollTo(0, 0);
                            }
                        },
                        error: function (response) {
                            alert('Error checking GPS image rotation and matching!');
                        }
                    });
                }, 10000);
            })(manage_drone_imagery_standard_process_raw_images_interactive_is_rotating);
        }
    });

    $('#drone_imagery_standard_process_raw_images_interactive_rotate_skip_forward').click(function () {
        manage_drone_imagery_standard_process_raw_images_interactive_current_pass = 1;

        $('#drone_imagery_standard_process_interactive_plot_polygons_flight_pass').html("<h1><b>Current Imaging Event Pass: " + manage_drone_imagery_standard_process_raw_images_interactive_current_pass + "/" + manage_drone_imagery_standard_process_raw_images_interactive_maximum_pass + "</b></h1>");

        initializeInteractiveSvg('#drone_imagery_standard_process_raw_images_image_id_interactive_select_div', 'drone_imagery_standard_process_raw_images_image_id_interactive_select_div_area', 1, 1);

        Workflow.complete("#manage_drone_imagery_standard_process_interactive_rotate_step");
        Workflow.focus('#manage_drone_imagery_standard_process_raw_images_interactive_workflow', 4);

        window.scrollTo(0, 0);
    });

    d3.select("#drone_imagery_standard_process_raw_images_interactive_bulk_rotate_degrees_input").on("input", function () {
        manage_drone_imagery_standard_process_raw_images_interactive_bulk_rotate_angle = this.value;
        droneImageryInteractiveRotateImages(manage_drone_imagery_standard_process_raw_images_interactive_bulk_rotate_angle, 1, '#drone_imagery_standard_process_raw_images_interactive_bulk_rotate_div_area_' + manage_drone_imagery_standard_process_raw_images_interactive_current_pass);
        $('#drone_imagery_standard_process_raw_images_interactive_bulk_rotate_degrees_input_text').html(manage_drone_imagery_standard_process_raw_images_interactive_bulk_rotate_angle);
    });

    function getRandomColorInteractive() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function drawRotateCrosshairsInteractive(color) {
        var row_line_width = 250;
        var col_line_width = 250;
        var number_col_lines = drone_imagery_interactive_total_width / col_line_width;
        var number_row_lines = drone_imagery_interactive_total_length / row_line_width;
        var current_row_val = row_line_width;
        var current_col_val = col_line_width;
        for (var i = 0; i < number_col_lines; i++) {
            manage_drone_imagery_standard_process_raw_images_interactive_svg.append('line')
                .style("stroke", color)
                .style("stroke-width", 5)
                .attr("x1", current_col_val)
                .attr("y1", 0)
                .attr("x2", current_col_val)
                .attr("y2", drone_imagery_interactive_total_length);
            current_col_val = current_col_val + col_line_width;
        }
        for (var i = 0; i < number_col_lines; i++) {
            manage_drone_imagery_standard_process_raw_images_interactive_svg.append('line')
                .style("stroke", color)
                .style("stroke-width", 5)
                .attr("x1", 0)
                .attr("y1", current_row_val)
                .attr("x2", drone_imagery_interactive_total_width)
                .attr("y2", current_row_val);
            current_row_val = current_row_val + row_line_width;
        }
    }

    $('#drone_imagery_standard_process_interactive_rotate_crosshairs').click(function () {
        drawRotateCrosshairsInteractive(getRandomColorInteractive());
    });

    $('#drone_imagery_standard_process_raw_images_interactive_match_restart').click(function () {
        jQuery.ajax({
            url: '/api/drone_imagery/delete_gps_images',
            type: 'POST',
            data: {
                'drone_run_project_id': manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id
            },
            beforeSend: function (xhr) {
                $("#working_modal").modal("show");
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            success: function (response) {
                console.log(response);
                location.reload();
            },
            error: function (response) {
                alert('Error deleting GPS images template from match step!')
            }
        });
    });

    $('#drone_imagery_standard_process_raw_images_interactive_rotate_restart').click(function () {
        jQuery.ajax({
            url: '/api/drone_imagery/delete_gps_images',
            type: 'POST',
            data: {
                'drone_run_project_id': manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id
            },
            beforeSend: function (xhr) {
                $("#working_modal").modal("show");
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            success: function (response) {
                console.log(response);
                location.reload();
            },
            error: function (response) {
                alert('Error deleting GPS images template from rotate step!')
            }
        });
    });

    $('#drone_imagery_standard_process_raw_images_interactive_match_view').click(function () {
        $('#drone_imagery_standard_process_raw_images_interactive_match_modal').modal('show');
    });

    function droneImageryInteractiveDrawImages(enable_drag, div_id) {
        d3.selectAll(div_id + ' > g').remove();
        d3.selectAll(div_id + ' > square').remove();
        d3.selectAll(div_id + ' > image').remove();
        d3.selectAll(div_id + ' > line').remove();
        //d3.selectAll(div_id+' > circle').remove();
        d3.selectAll(div_id + ' > text').remove();
        d3.selectAll(div_id + ' > rect').remove();
        manage_drone_imagery_standard_process_raw_images_nir_images = [];

        for (var i = 0; i < manage_drone_imagery_standard_process_interactive_latitudes.length; i++) {
            var latitude = manage_drone_imagery_standard_process_interactive_latitudes[i];
            for (var j = 0; j < manage_drone_imagery_standard_process_interactive_longitudes.length; j++) {
                var longitude = manage_drone_imagery_standard_process_interactive_longitudes[j];
                if (manage_drone_imagery_standard_process_interactive_saved_gps_positions && manage_drone_imagery_standard_process_interactive_saved_gps_positions[latitude] && manage_drone_imagery_standard_process_interactive_saved_gps_positions[latitude][longitude] && manage_drone_imagery_standard_process_interactive_saved_gps_positions[latitude][longitude]['x_pos'] !== undefined) {

                    var image_url = manage_drone_imagery_standard_process_interactive_saved_gps_positions[latitude][longitude]['image_url'];
                    var nir_image_id = manage_drone_imagery_standard_process_interactive_saved_gps_positions[latitude][longitude]['nir_image_id'];
                    var rotated_image_ids = manage_drone_imagery_standard_process_interactive_saved_gps_positions[latitude][longitude]['rotated_image_ids'];
                    var x_pos = manage_drone_imagery_standard_process_interactive_saved_gps_positions[latitude][longitude]['x_pos'];
                    var y_pos = manage_drone_imagery_standard_process_interactive_saved_gps_positions[latitude][longitude]['y_pos'];
                    manage_drone_imagery_standard_process_raw_images_nir_images.push(nir_image_id);
                    var rotate_angle = manage_drone_imagery_standard_process_interactive_saved_gps_positions[latitude][longitude]['d3_rotate_angle'] ? manage_drone_imagery_standard_process_interactive_saved_gps_positions[latitude][longitude]['d3_rotate_angle'] : 0;
                    var rotated_bound = manage_drone_imagery_standard_process_interactive_saved_gps_positions[latitude][longitude]['rotated_bound'];
                    var match_problem = manage_drone_imagery_standard_process_interactive_saved_gps_positions[latitude][longitude]['match_problem'];
                    appendDraggableImage(image_url, x_pos, y_pos, latitude, longitude, nir_image_id, JSON.stringify(rotated_image_ids), rotate_angle, enable_drag, rotated_bound, match_problem);
                }
                else if (manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]) {

                    var image_url = manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]['image_url'];
                    var nir_image_id = manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]['nir_image_id'];
                    var rotated_image_ids = manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]['rotated_image_ids'];

                    var x_pos;
                    var y_pos;
                    if (manage_drone_imagery_standard_process_raw_images_interactive_north_or_south == 'North') {
                        y_pos = Math.round((latitude - manage_drone_imagery_standard_process_interactive_min_latitude) * manage_drone_imagery_standard_process_raw_images_interactive_y_factor);
                    }
                    else if (manage_drone_imagery_standard_process_raw_images_interactive_north_or_south == 'South') {
                        y_pos = drone_imagery_interactive_total_length - Math.round((latitude - manage_drone_imagery_standard_process_interactive_min_latitude) * manage_drone_imagery_standard_process_raw_images_interactive_y_factor) - manage_drone_imagery_standard_process_interactive_image_length;
                    }
                    if (manage_drone_imagery_standard_process_raw_images_interactive_east_or_west == 'East') {
                        x_pos = Math.round((longitude - manage_drone_imagery_standard_process_interactive_min_longitude) * manage_drone_imagery_standard_process_raw_images_interactive_x_factor);
                    }
                    else if (manage_drone_imagery_standard_process_raw_images_interactive_east_or_west == 'West') {
                        x_pos = drone_imagery_interactive_total_width - Math.round((longitude - manage_drone_imagery_standard_process_interactive_min_longitude) * manage_drone_imagery_standard_process_raw_images_interactive_x_factor) - manage_drone_imagery_standard_process_interactive_image_width;
                    }
                    manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]['x_pos'] = x_pos;
                    manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]['y_pos'] = y_pos;
                    var rotate_angle = manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]['d3_rotate_angle'] ? manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]['d3_rotate_angle'] : 0;
                    manage_drone_imagery_standard_process_raw_images_nir_images.push(nir_image_id);
                    var rotated_bound = manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]['rotated_bound'];
                    var match_problem = manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]['match_problem'];
                    appendDraggableImage(image_url, x_pos, y_pos, latitude, longitude, nir_image_id, JSON.stringify(rotated_image_ids), rotate_angle, enable_drag, rotated_bound, match_problem);
                }
            }
        }
        if (!manage_drone_imagery_standard_process_interactive_saved_gps_positions) {
            manage_drone_imagery_standard_process_interactive_saved_gps_positions = manage_drone_imagery_standard_process_interactive_gps_images;
        }
        manage_drone_imagery_standard_process_raw_images_nir_images = manage_drone_imagery_standard_process_raw_images_nir_images.sort();
        //console.log(manage_drone_imagery_standard_process_raw_images_nir_images);
        //console.log(manage_drone_imagery_standard_process_interactive_saved_gps_positions);
        //console.log(manage_drone_imagery_standard_process_interactive_gps_images);

        d3.selectAll('g').each(function (d) {
            var match_problem = d3.select(this).attr('match_problem');
            if (match_problem == 1) {
                d3.select(this).moveToFront();
            }
        });
        d3.selectAll('line').each(function (d) {
            var match_problem = d3.select(this).attr('match_problem');
            if (match_problem == 1) {
                d3.select(this).moveToFront();
            }
        });

        saveGPSPixelPositions();
    }

    var droneImageryRotateSavetimeout = null;
    function droneImageryInteractiveRotateImages(angle, centered, div_id) {
        d3.selectAll(div_id + '>g').each(function (d) {
            var x_pos = d3.select(this).attr('x_pos');
            var y_pos = d3.select(this).attr('y_pos');
            if (centered == 1) {
                var rotate_x_pos = manage_drone_imagery_standard_process_interactive_image_width / 2;
                var rotate_y_pos = manage_drone_imagery_standard_process_interactive_image_length / 2;
                d3.select(this).attr("transform", "translate(" + x_pos + "," + y_pos + ") rotate(" + angle + "," + rotate_x_pos + "," + rotate_y_pos + ")");
            }
            else {
                d3.select(this).attr("transform", "translate(" + x_pos + "," + y_pos + ") rotate(" + angle + ")");
                d3.select(this).attr("rotate_angle", angle);
                var latitude = d3.select(this).attr('latitude');
                var longitude = d3.select(this).attr('longitude');
                manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]['rotate_angle'] = manage_drone_imagery_standard_process_raw_images_interactive_rotate_angle;
            }
        });
        if (droneImageryRotateSavetimeout !== null) {
            clearTimeout(droneImageryRotateSavetimeout);
        }
        droneImageryRotateSavetimeout = setTimeout(function () {
            saveGPSPixelPositions();
        }, 900);
    }

    function manage_drone_imagery_interactive_match_two_images(image_id1, image_id2) {
        jQuery.ajax({
            url: '/api/drone_imagery/match_and_align_two_images',
            type: 'POST',
            data: {
                'image_id1': image_id1,
                'image_id2': image_id2,
                'drone_run_project_id': manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id,
            },
            beforeSend: function (xhr) {
                $("#working_modal").modal("show");
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            success: function (response) {
                console.log(response);

                var angle_radians = parseInt(manage_drone_imagery_standard_process_raw_images_interactive_rotate_angle) * 0.0174533;
                console.log(manage_drone_imagery_standard_process_raw_images_interactive_rotate_angle);
                var x_pos_dst;
                var x_pos_src;
                var y_pos_dst;
                var y_pos_src;
                var src_latitude;
                var src_longitude;
                d3.selectAll('g').each(function (d) {
                    var nir_image_id = d3.select(this).attr('nir_image_id');
                    var is_rotated_bound = d3.select(this).attr('is_rotated_bound');
                    if (!is_rotated_bound) {
                        if (nir_image_id == response.image_id_dst) {
                            x_pos_dst = d3.select(this).attr('x_pos');
                            y_pos_dst = d3.select(this).attr('y_pos');
                        }
                        if (nir_image_id == response.image_id_src) {
                            x_pos_src = d3.select(this).attr('x_pos');
                            y_pos_src = d3.select(this).attr('y_pos');
                            src_latitude = d3.select(this).attr('latitude');
                            src_longitude = d3.select(this).attr('longitude');
                        }
                    }
                });

                manage_drone_imagery_standard_process_interactive_current_ordinal_latitude_raw = src_latitude;
                manage_drone_imagery_standard_process_interactive_current_ordinal_longitude_raw = src_longitude;
                manage_drone_imagery_standard_process_interactive_current_ordinal_latitude_current = manage_drone_imagery_standard_process_interactive_latitude_rounded_map[src_latitude];
                manage_drone_imagery_standard_process_interactive_current_ordinal_longitude_current = manage_drone_imagery_standard_process_interactive_longitude_rounded_map[src_longitude];

                var src_match = response.match_points_src[0];
                var src_match_x = src_match[0];
                var src_match_y = src_match[1];
                var src_match_x_rotated = src_match_x * Math.cos(angle_radians) - src_match_y * Math.sin(angle_radians);
                var src_match_y_rotated = src_match_x * Math.sin(angle_radians) + src_match_y * Math.cos(angle_radians);
                var x_pos_match_src = parseFloat(x_pos_src) + parseFloat(src_match_x_rotated);
                var y_pos_match_src = parseFloat(y_pos_src) + parseFloat(src_match_y_rotated);

                var dst_match = response.match_points_dst[0];
                var dst_match_x = dst_match[0];
                var dst_match_y = dst_match[1];
                var dst_match_x_rotated = dst_match_x * Math.cos(angle_radians) - dst_match_y * Math.sin(angle_radians);
                var dst_match_y_rotated = dst_match_x * Math.sin(angle_radians) + dst_match_y * Math.cos(angle_radians);
                var x_pos_match_dst = x_pos_match_src - dst_match_x_rotated;
                var y_pos_match_dst = y_pos_match_src - dst_match_y_rotated;

                var x_pos_translation = parseFloat(x_pos_dst) - parseFloat(x_pos_match_dst);
                var y_pos_translation = parseFloat(y_pos_dst) - parseFloat(y_pos_match_dst);

                d3.selectAll('g').each(function (d) {
                    var nir_image_id = d3.select(this).attr('nir_image_id');
                    if (nir_image_id == response.image_id_dst) {

                        var is_rotated_bound = d3.select(this).attr('is_rotated_bound');
                        if (is_rotated_bound == 1) {
                        } else {
                            d3.select(this).attr('x_pos', x_pos_match_dst);
                            d3.select(this).attr('y_pos', y_pos_match_dst);

                            var rotate_angle = d3.select(this).attr('rotate_angle');
                            d3.select(this).attr("transform", "translate(" + x_pos_match_dst + "," + y_pos_match_dst + ") rotate(" + rotate_angle + "," + manage_drone_imagery_standard_process_raw_images_interactive_image.width / 2 + "," + manage_drone_imagery_standard_process_raw_images_interactive_image.length / 2 + ")");

                            var latitude = d3.select(this).attr('latitude');
                            var longitude = d3.select(this).attr('longitude');
                            manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]['x_pos'] = x_pos_match_dst;
                            manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]['y_pos'] = y_pos_match_dst;
                            manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]['rotate_angle'] = rotate_angle;
                        }
                        d3.select(this).moveToFront();
                    }
                });

                d3.selectAll('line').each(function (d) {
                    var nir_image_id = d3.select(this).attr('nir_image_id');
                    if (nir_image_id == response.image_id_dst) {

                        var is_rotated_bound = d3.select(this).attr('is_rotated_bound');
                        if (is_rotated_bound == 1) {
                            var x_pos_1 = parseInt(d3.select(this).attr('x1')) - x_pos_translation;
                            var y_pos_1 = parseInt(d3.select(this).attr('y1')) - y_pos_translation;
                            var x_pos_2 = parseInt(d3.select(this).attr('x2')) - x_pos_translation;
                            var y_pos_2 = parseInt(d3.select(this).attr('y2')) - y_pos_translation;
                            d3.select(this).attr('x1', parseInt(x_pos_1));
                            d3.select(this).attr('y1', parseInt(y_pos_1));
                            d3.select(this).attr('x2', parseInt(x_pos_2));
                            d3.select(this).attr('y2', parseInt(y_pos_2));
                            var latitude = d3.select(this).attr('latitude');
                            var longitude = d3.select(this).attr('longitude');
                            var rotated_bound = manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]['rotated_bound'];
                            var bnum = parseInt(d3.select(this).attr('bnum'));
                            rotated_bound[bnum] = [x_pos_1, y_pos_1];
                            manage_drone_imagery_standard_process_interactive_gps_images[latitude][longitude]['rotated_bound'] = rotated_bound;
                        }
                        d3.select(this).moveToFront();
                    }
                });

                var ordinal_latitude = manage_drone_imagery_standard_process_interactive_latitude_rounded_map[src_latitude];
                var ordinal_longitude = manage_drone_imagery_standard_process_interactive_longitude_rounded_map[src_longitude];

                $('#drone_imagery_standard_process_raw_images_interactive_match_modal_div').html("<img src='" + response.match_image_url + "' >");

                manage_drone_imagery_standard_process_raw_images_nir_image_counter = manage_drone_imagery_standard_process_raw_images_nir_image_counter + 1;
                console.log(manage_drone_imagery_standard_process_interactive_gps_images);
                saveGPSPixelPositions();

                image_id1 = manage_drone_imagery_standard_process_raw_images_nir_images[manage_drone_imagery_standard_process_raw_images_nir_image_counter];
                image_id2 = manage_drone_imagery_standard_process_raw_images_nir_images[manage_drone_imagery_standard_process_raw_images_nir_image_counter + 1];

                if (image_id1 != undefined && image_id2 != undefined) {
                    manage_drone_imagery_interactive_match_two_images(image_id1, image_id2);
                }
                else {
                    alert('No more images to match!');
                    return false;
                }
            },
            error: function (response) {
                alert('Error matching and aligning two images!')
            }
        });
    }

    $('#drone_imagery_standard_process_raw_images_interactive_match_previous_pass').click(function () {
        if (manage_drone_imagery_standard_process_raw_images_interactive_current_pass > 1) {
            manage_drone_imagery_standard_process_raw_images_interactive_current_pass = manage_drone_imagery_standard_process_raw_images_interactive_current_pass - 1;

            initializeInteractiveSvg('#drone_imagery_standard_process_raw_images_image_id_interactive_select_div', 'drone_imagery_standard_process_raw_images_image_id_interactive_select_div_area', 1, 1);

            $('#drone_imagery_standard_process_interactive_plot_polygons_flight_pass').html("<h1><b>Current Imaging Event Pass: " + manage_drone_imagery_standard_process_raw_images_interactive_current_pass + "/" + manage_drone_imagery_standard_process_raw_images_interactive_maximum_pass + "</b></h1>");

            plot_polygons_interactive_display_points = [];
            plot_polygons_interactive_ind_4_points = [];
            plot_polygons_interactive_generated_polygons = {};
            drone_imagery_interactive_plot_polygons_display = {};
            plot_polygons_interactive_generated_polygons = [];
            drone_imagery_interactive_plot_generated_polygons = [];
            drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions = [];
            drone_imagery_interactive_plot_polygons_removed_numbers = [];
            $('#drone_imagery_interactive_generated_polygons_div').html('');

            droneImageryDrawLayoutTableInteractive(drone_imagery_interactive_field_trial_layout_response, {}, 'drone_imagery_interactive_trial_layout_div', 'drone_imagery_interactive_trial_layout_table');
            droneImageryDrawPlotPolygonActiveTemplatesTableInteractive('drone_imagery_plot_polygons_active_templates_raw_images_interactive', drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions);
            plotPolygonManualAssignPlotNumberTable('drone_imagery_standard_process_interactive_generated_polygons_table', 'drone_imagery_standard_process_interactive_generated_polygons_table_id', 'drone_imagery_standard_process_interactive_generated_polygons_table_input', 'drone_imagery_standard_process_interactive_generated_polygons_table_input_generate_button', 'drone_imagery_standard_process_interactive_plot_polygons_submit_bottom');

            window.scrollTo(0, 0);
        }
        else {
            alert('No previous imaging pass to go to!');
            return false;
        }
    });

    $('#drone_imagery_standard_process_raw_images_interactive_match_next_pass').click(function () {
        if (manage_drone_imagery_standard_process_raw_images_interactive_current_pass < manage_drone_imagery_standard_process_raw_images_interactive_maximum_pass) {
            manage_drone_imagery_standard_process_raw_images_interactive_current_pass = manage_drone_imagery_standard_process_raw_images_interactive_current_pass + 1;

            initializeInteractiveSvg('#drone_imagery_standard_process_raw_images_image_id_interactive_select_div', 'drone_imagery_standard_process_raw_images_image_id_interactive_select_div_area', 1, 1);

            $('#drone_imagery_standard_process_interactive_plot_polygons_flight_pass').html("<h1><b>Current Imaging Event Pass: " + manage_drone_imagery_standard_process_raw_images_interactive_current_pass + "/" + manage_drone_imagery_standard_process_raw_images_interactive_maximum_pass + "</b></h1>");

            plot_polygons_interactive_display_points = [];
            plot_polygons_interactive_ind_4_points = [];
            plot_polygons_interactive_generated_polygons = {};
            drone_imagery_interactive_plot_polygons_display = {};
            plot_polygons_interactive_generated_polygons = [];
            drone_imagery_interactive_plot_generated_polygons = [];
            drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions = [];
            drone_imagery_interactive_plot_polygons_removed_numbers = [];
            $('#drone_imagery_interactive_generated_polygons_div').html('');

            droneImageryDrawLayoutTableInteractive(drone_imagery_interactive_field_trial_layout_response, {}, 'drone_imagery_interactive_trial_layout_div', 'drone_imagery_interactive_trial_layout_table');
            droneImageryDrawPlotPolygonActiveTemplatesTableInteractive('drone_imagery_plot_polygons_active_templates_raw_images_interactive', drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions);
            plotPolygonManualAssignPlotNumberTable('drone_imagery_standard_process_interactive_generated_polygons_table', 'drone_imagery_standard_process_interactive_generated_polygons_table_id', 'drone_imagery_standard_process_interactive_generated_polygons_table_input', 'drone_imagery_standard_process_interactive_generated_polygons_table_input_generate_button', 'drone_imagery_standard_process_interactive_plot_polygons_submit_bottom');

            window.scrollTo(0, 0);
        }
        else {
            alert('No next imaging pass to go to!');
            return false;
        }
    });

    function matchAndAlignSequential() {
        jQuery.ajax({
            url: '/api/drone_imagery/match_and_align_images_sequential',
            type: 'POST',
            beforeSend: function (xhr) {
                $("#working_modal").modal("show");
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            data: {
                'nir_image_ids': JSON.stringify(manage_drone_imagery_standard_process_raw_images_nir_images),
                'drone_run_project_id': manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id,
                'flight_pass_counter': manage_drone_imagery_standard_process_raw_images_interactive_current_pass
            },
            success: function (response) {
                console.log(response);
                //    $('#working_modal').modal('hide');
                alert(response.message);

                console.log("Match Seq Complete");
                initializeInteractiveSvg('#drone_imagery_standard_process_raw_images_image_id_interactive_select_div', 'drone_imagery_standard_process_raw_images_image_id_interactive_select_div_area', 1, 1);
            },
            error: function (response) {
                //    $('#working_modal').modal('hide');
                alert('Error matching and aligning images sequential!')
            }
        });
    }

    $('#drone_imagery_standard_process_raw_images_interactive_match').click(function () {
        matchAndAlignSequential();
    });

    $('#drone_imagery_standard_process_raw_images_interactive_drop_pin').click(function () {
        alert('Click on a place in the current imaging event pass to drop a pin');

        d3.selectAll("g").on('mousedown.drag', null);

        manage_drone_imagery_standard_process_raw_images_interactive_svg.on("click", function () {
            var current_pos = d3.mouse(this);

            manage_drone_imagery_standard_process_raw_images_interactive_svg.append("circle")
                .attr("cx", current_pos[0])
                .attr("cy", current_pos[1])
                .attr("r", 8)
                .attr("fill", "yellow");

            d3.selectAll("g").call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
        });
    });

    function initializeInteractiveSvg(svg_div, svg_div_id, init, enable_drag) {
        jQuery.ajax({
            url: '/api/drone_imagery/get_drone_imagery_gps?drone_run_project_id=' + manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id + '&flight_pass_counter=' + manage_drone_imagery_standard_process_raw_images_interactive_current_pass,
            beforeSend: function (xhr) {
                $("#working_modal").modal("show");
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            success: function (response) {
                console.log(response);

                svg_div = svg_div + "_" + manage_drone_imagery_standard_process_raw_images_interactive_current_pass;
                svg_div_id = svg_div_id + "_" + manage_drone_imagery_standard_process_raw_images_interactive_current_pass;

                manage_drone_imagery_standard_process_interactive_image_width = response.image_width;
                manage_drone_imagery_standard_process_interactive_image_length = response.image_length;

                drone_imagery_interactive_total_width = response.x_range;
                drone_imagery_interactive_total_length = response.y_range;

                manage_drone_imagery_standard_process_raw_images_interactive_image = {
                    width: manage_drone_imagery_standard_process_interactive_image_width,
                    length: manage_drone_imagery_standard_process_interactive_image_length
                }

                d3.select(svg_div).html("<h1>Imaging Pass Number: " + manage_drone_imagery_standard_process_raw_images_interactive_current_pass + "</h1>");

                manage_drone_imagery_standard_process_raw_images_interactive_svg = d3.select(svg_div).append("svg")
                    .attr("width", drone_imagery_interactive_total_width)
                    .attr("height", drone_imagery_interactive_total_length)
                    .attr("id", svg_div_id)
                    .on("click", function () {
                        console.log(d3.mouse(this));
                    })

                if (init) {
                    initializeImagesInteractive(enable_drag, svg_div_id);
                }
            },
            error: function (response) {
                alert('Error init svg!')
            }
        });
    }

    function initializeImagesInteractive(enable_drag, svg_div_area) {
        jQuery.ajax({
            url: '/api/drone_imagery/get_drone_imagery_gps?drone_run_project_id=' + manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id + '&flight_pass_counter=' + manage_drone_imagery_standard_process_raw_images_interactive_current_pass,
            beforeSend: function (xhr) {
                $("#working_modal").modal("show");
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            success: function (response) {
                console.log(response);
                $("#working_modal").modal("hide");

                manage_drone_imagery_standard_process_interactive_gps_images = response.gps_images;
                manage_drone_imagery_standard_process_interactive_saved_gps_positions = response.saved_gps_positions;
                if (manage_drone_imagery_standard_process_interactive_saved_gps_positions) {
                    manage_drone_imagery_standard_process_interactive_gps_images = manage_drone_imagery_standard_process_interactive_saved_gps_positions;
                }
                manage_drone_imagery_standard_process_interactive_latitudes = response.latitudes;
                manage_drone_imagery_standard_process_interactive_latitudes_rounded = response.latitudes_rounded;
                manage_drone_imagery_standard_process_interactive_longitudes = response.longitudes;
                manage_drone_imagery_standard_process_interactive_longitudes_rounded = response.longitudes_rounded;
                manage_drone_imagery_standard_process_interactive_min_longitude = response.min_longitude;
                manage_drone_imagery_standard_process_interactive_min_latitude = response.min_latitude;
                manage_drone_imagery_standard_process_interactive_latitude_rounded_map = response.latitude_rounded_map;
                manage_drone_imagery_standard_process_interactive_longitude_rounded_map = response.longitude_rounded_map;
                manage_drone_imagery_standard_process_interactive_latitude_ordinal_max = manage_drone_imagery_standard_process_interactive_latitudes_rounded.length;
                manage_drone_imagery_standard_process_interactive_longitude_ordinal_max = manage_drone_imagery_standard_process_interactive_longitudes_rounded.length;
                manage_drone_imagery_standard_process_interactive_image_width = response.image_width;
                manage_drone_imagery_standard_process_interactive_image_length = response.image_length;

                drone_imagery_interactive_total_width = response.x_range;
                drone_imagery_interactive_total_length = response.y_range;

                manage_drone_imagery_standard_process_raw_images_interactive_image = {
                    width: manage_drone_imagery_standard_process_interactive_image_width,
                    length: manage_drone_imagery_standard_process_interactive_image_length
                };

                droneImageryInteractiveDrawImages(enable_drag, svg_div_area);
                showPlotPolygonTableStartInteractive(manage_drone_imagery_standard_process_raw_images_interactive_field_trial_id);
            },
            error: function (response) {
                $("#working_modal").modal("hide");
                alert('Error retrieving images and gps info!')
            }
        });
    }

    $(document).on('click', 'button[name="project_drone_imagery_standard_process_raw_images_interactive"]', function () {
        showManageDroneImagerySection('manage_drone_imagery_standard_process_raw_images_interactive_div');

        manage_drone_imagery_standard_process_raw_images_interactive_field_trial_id = $(this).data('field_trial_id');
        manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id = $(this).data('drone_run_project_id');

        get_select_box('drone_imagery_parameter_select', 'plot_polygons_previously_saved_plot_polygon_templates_raw_images_interactive', { 'empty': 1, 'field_trial_id': manage_drone_imagery_standard_process_raw_images_interactive_field_trial_id, 'parameter': 'plot_polygons_separated', 'id': 'manage_drone_imagery_standard_process_interactive_previous_templates', 'name': 'manage_drone_imagery_standard_process_interactive_previous_templates' });

        $('#manage_drone_imagery_standard_process_interactive_drone_run_bands_table').DataTable({
            destroy: true,
            ajax: '/api/drone_imagery/drone_run_bands?select_checkbox_name=drone_run_standard_process_interactive_band_select&drone_run_project_id=' + manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id
        });

    });

    $('#manage_drone_imagery_standard_process_interactive_select_drone_run_band_step').click(function () {
        var selected = [];
        $('input[name="drone_run_standard_process_interactive_band_select"]:checked').each(function () {
            selected.push($(this).val());
        });
        if (selected.length > 1 || selected.length == 0) {
            alert('Please select one band!');
            return false;
        }
        manage_drone_imagery_standard_process_interactive_drone_run_band_project_id = selected[0];

        jQuery.ajax({
            url: '/api/drone_imagery/separate_drone_imagery_gps?drone_run_project_id=' + manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id,
            beforeSend: function (xhr) {
                $("#working_modal").modal("show");
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            success: function (response) {
                console.log(response);

                var html = '<table class="display  "><thead><tr><th>Imaging Pass Number</th><th>Number of Captures</th></tr></thead><tbody>';
                for (var i = 0; i < response.results.length; i++) {
                    html = html + '<tr><td>' + response.results[i][0] + '</td><td>' + response.results[i][1] + '</td></tr>';
                }
                html = html + '</tbody></table>'
                $('#manage_drone_imagery_standard_process_interactive_separated_passes_info').html(html);

                Workflow.complete("#manage_drone_imagery_standard_process_interactive_select_drone_run_band_step");
                Workflow.focus('#manage_drone_imagery_standard_process_raw_images_interactive_workflow', 2);

                window.scrollTo(0, 0);
            },
            error: function (response) {
                alert('Error separate micasense stacks!');
            }
        });
    });

    $('#manage_drone_imagery_standard_process_interactive_separated_passes_step').click(function () {
        project_drone_imagery_interactive_ground_control_points_saved_div_table = 'project_drone_imagery_standard_process_interactive_ground_control_points_saved_div';

        jQuery.ajax({
            url: '/api/drone_imagery/get_drone_imagery_gps?drone_run_project_id=' + manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id + '&flight_pass_counter=' + manage_drone_imagery_standard_process_raw_images_interactive_current_pass,
            beforeSend: function (xhr) {
                $("#working_modal").modal("show");
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            success: function (response) {
                console.log(response);

                get_select_box('drone_runs_with_gcps', 'manage_drone_imagery_standard_process_interactive_ground_control_points_select', { 'id': 'manage_drone_imagery_standard_process_interactive_ground_control_points_select_id', 'name': 'manage_drone_imagery_standard_process_interactive_ground_control_points_select_id', 'field_trial_id': manage_drone_imagery_standard_process_raw_images_interactive_field_trial_id, 'empty': 1 });

                jQuery.ajax({
                    url: '/api/drone_imagery/get_image_for_saving_gcp?drone_run_project_id=' + manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id,
                    beforeSend: function (xhr) {
                        $("#working_modal").modal("show");
                        xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
                    },
                    success: function (response) {
                        console.log(response);

                        project_drone_imagery_interactive_ground_control_points_saved = response.saved_gcps_full;
                        project_drone_imagery_interactive_ground_control_points_saved_array = response.gcps_array;
                        _redraw_ground_control_points_table_interactive();
                    },
                    error: function (response) {
                        alert('Error getting standard process interactive gcps!');
                    }
                });

                manage_drone_imagery_standard_process_raw_images_interactive_maximum_pass = response.max_flight_pass_counter;

                if (response.all_passes_rotated == 1) {
                    console.log("ROTATION COMPLETE SEPARATED STEP");

                    manage_drone_imagery_standard_process_raw_images_interactive_current_pass = 1;

                    $('#drone_imagery_standard_process_interactive_plot_polygons_flight_pass').html("<h1><b>Current Imaging Event Pass: " + manage_drone_imagery_standard_process_raw_images_interactive_current_pass + "/" + manage_drone_imagery_standard_process_raw_images_interactive_maximum_pass + "</b></h1>");

                    initializeInteractiveSvg('#drone_imagery_standard_process_raw_images_image_id_interactive_select_div', 'drone_imagery_standard_process_raw_images_image_id_interactive_select_div_area', 1, 1);

                    Workflow.complete("#manage_drone_imagery_standard_process_interactive_separated_passes_step");
                    Workflow.complete("#manage_drone_imagery_standard_process_interactive_rotate_step");
                    Workflow.focus('#manage_drone_imagery_standard_process_raw_images_interactive_workflow', 4);
                }
                else {
                    console.log("Initial");
                    initializeInteractiveSvg('#drone_imagery_standard_process_raw_images_interactive_bulk_rotate_div', 'drone_imagery_standard_process_raw_images_interactive_bulk_rotate_div_area', 1, 0);

                    manage_drone_imagery_standard_process_raw_images_interactive_current_pass = 1;

                    $('#drone_imagery_standard_process_interactive_rotate_flight_pass').html("<h1><b>Current Imaging Event Pass: " + manage_drone_imagery_standard_process_raw_images_interactive_current_pass + "/" + manage_drone_imagery_standard_process_raw_images_interactive_maximum_pass + "</b></h1>");

                    Workflow.complete("#manage_drone_imagery_standard_process_interactive_separated_passes_step");
                    Workflow.focus('#manage_drone_imagery_standard_process_raw_images_interactive_workflow', 3);
                }
                window.scrollTo(0, 0);
            },
            error: function (response) {
                alert('Error check rotation!');
            }
        });
    });

    $('#manage_drone_imagery_standard_process_interactive_ground_control_points_option').change(function () {
        if ($(this).val() == 'Yes') {
            $('#manage_drone_imagery_standard_process_interactive_ground_control_points_select_div').show();

            //Change click type to save ground control points
        }
        else {
            $('#manage_drone_imagery_standard_process_interactive_ground_control_points_select_div').hide();
        }
    });

    function _redraw_ground_control_points_table_interactive() {
        var html = "<table class='display '><thead><tr><th>Saved GCP Name</th><th>X Pos</th><th>Y Pos</th><th>Latitude</th><th>Longitude</th><th>Remove</th></thead><tbody>";
        for (var i = 0; i < project_drone_imagery_interactive_ground_control_points_saved_array.length; i++) {
            html = html + "<tr><td>" + project_drone_imagery_interactive_ground_control_points_saved_array[i]['name'] + "</td><td>" + project_drone_imagery_interactive_ground_control_points_saved_array[i]['x_pos'] + "</td><td>" + project_drone_imagery_interactive_ground_control_points_saved_array[i]['y_pos'] + "</td><td>" + project_drone_imagery_interactive_ground_control_points_saved_array[i]['latitude'] + "</td><td>" + project_drone_imagery_interactive_ground_control_points_saved_array[i]['longitude'] + "</td><td><p style='color:red' name='project_drone_imagery_interactive_ground_control_points_delete_one' data-name='" + project_drone_imagery_interactive_ground_control_points_saved_array[i]['name'] + "' data-drone_run_project_id=" + manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id + " >X</p></td></tr>";
        }
        html = html + "</tbody></table>";
        html = html + "<button class='btn btn-outline-secondary' name='project_drone_imagery_interactive_ground_control_points_draw_points'>Draw Saved GCPs</button>";
        $('#' + project_drone_imagery_interactive_ground_control_points_saved_div_table).html(html);
    }

    $(document).on('click', 'p[name="project_drone_imagery_interactive_ground_control_points_delete_one"]', function () {
        var drone_run_project_id = $(this).data('drone_run_project_id');
        var name = $(this).data('name');

        if (confirm("Remove this GCP?")) {
            jQuery.ajax({
                type: 'POST',
                url: '/api/drone_imagery/remove_one_gcp',
                data: {
                    'drone_run_project_id': drone_run_project_id,
                    'name': name,
                },
                beforeSend: function (xhr) {
                    $("#working_modal").modal("show");
                    xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
                },
                success: function (response) {
                    console.log(response);
                    if (response.error) {
                        alert(response.error);
                    }
                    project_drone_imagery_interactive_ground_control_points_saved = response.saved_gcps_full;
                    project_drone_imagery_interactive_ground_control_points_saved_array = response.gcps_array;
                    _redraw_ground_control_points_table_interactive();
                },
                error: function (response) {
                    alert('Error deleting GCP name!');
                }
            });
        }
    });

    d3.select("#drone_imagery_standard_process_raw_images_interactive_rotate_degrees_input").on("input", function () {
        manage_drone_imagery_standard_process_raw_images_interactive_rotate_angle = this.value;
        droneImageryInteractiveRotateImages(manage_drone_imagery_standard_process_raw_images_interactive_rotate_angle, 0, '#drone_imagery_standard_process_raw_images_interactive_bulk_rotate_div_area_' + manage_drone_imagery_standard_process_raw_images_interactive_current_pass);
    });

    $('#drone_imagery_standard_process_raw_images_interactive_north_south_input').change(function () {
        manage_drone_imagery_standard_process_raw_images_interactive_north_or_south = $(this).val();
        jQuery.ajax({
            url: '/api/drone_imagery/delete_gps_images',
            type: 'POST',
            data: {
                'drone_run_project_id': manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id
            },
            beforeSend: function (xhr) {
                $("#working_modal").modal("show");
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            success: function (response) {
                console.log(response);
                manage_drone_imagery_standard_process_raw_images_nir_image_counter = 0;
                initializeImagesInteractive(1, '#drone_imagery_standard_process_raw_images_image_id_interactive_select_div_area_' + manage_drone_imagery_standard_process_raw_images_interactive_current_pass);
            },
            error: function (response) {
                alert('Error deleting GPS images template from NS step!')
            }
        });
    });

    $('#drone_imagery_standard_process_raw_images_interactive_east_or_west').change(function () {
        manage_drone_imagery_standard_process_raw_images_interactive_east_or_west = $(this).val();
        jQuery.ajax({
            url: '/api/drone_imagery/delete_gps_images',
            type: 'POST',
            data: {
                'drone_run_project_id': manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id
            },
            beforeSend: function (xhr) {
                $("#working_modal").modal("show");
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            success: function (response) {
                console.log(response);
                manage_drone_imagery_standard_process_raw_images_nir_image_counter = 0;
                initializeImagesInteractive(1, '#drone_imagery_standard_process_raw_images_image_id_interactive_select_div_area_' + manage_drone_imagery_standard_process_raw_images_interactive_current_pass);
            },
            error: function (response) {
                alert('Error deleting GPS images template from EW step!')
            }
        });
    });

    d3.select("#drone_imagery_standard_process_raw_images_interactive_rotate_frame_degrees_input").on("input", function () {
        manage_drone_imagery_standard_process_raw_images_interactive_rotate_frame_angle = this.value;
        d3.select("svg").attr('transform', function () {
            var x1 = d3.select("svg").attr("width") / 2;
            var y1 = d3.select("svg").attr("height") / 2;
            return `rotate(${manage_drone_imagery_standard_process_raw_images_interactive_rotate_frame_angle}, ${x1}, ${y1})`;
        });
    });

    $('#drone_imagery_plot_polygons_top_left_click_raw_images_interactive').click(function () {
        alert('Now click the top left corner of your field on the image below.');

        d3.selectAll("g").on('mousedown.drag', null);

        manage_drone_imagery_standard_process_raw_images_interactive_svg.on("click", function () {
            var current_pos = d3.mouse(this);
            $('#drone_imagery_plot_polygons_left_column_top_offset_raw_images_interactive').val(current_pos[1]);
            $('#drone_imagery_plot_polygons_top_row_left_offset_raw_images_interactive').val(current_pos[0]);
            console.log(current_pos);

            d3.selectAll("g").call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
        });
    });
    $('#drone_imagery_plot_polygons_top_right_click_raw_images_interactive').click(function () {
        alert('Now click the top right corner of your field on the image below.');

        d3.selectAll("g").on('mousedown.drag', null);

        manage_drone_imagery_standard_process_raw_images_interactive_svg.on("click", function () {
            var current_pos = d3.mouse(this);
            $('#drone_imagery_plot_polygons_top_row_right_offset_raw_images_interactive').val(drone_imagery_interactive_total_width - current_pos[0]);
            console.log(current_pos);

            d3.selectAll("g").call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
        });
    });
    $('#drone_imagery_plot_polygons_bottom_left_click_raw_images_interactive').click(function () {
        alert('Now click the bottom left corner of your field on the image below.');

        d3.selectAll("g").on('mousedown.drag', null);

        manage_drone_imagery_standard_process_raw_images_interactive_svg.on("click", function () {
            var current_pos = d3.mouse(this);
            $('#drone_imagery_plot_polygons_bottom_row_left_offset_raw_images_interactive').val(current_pos[0]);
            $('#drone_imagery_plot_polygons_left_column_bottom_offset_raw_images_interactive').val(drone_imagery_interactive_total_length - current_pos[1]);
            console.log(current_pos);

            d3.selectAll("g").call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
        });
    });
    $('#drone_imagery_plot_polygons_bottom_right_click_raw_images_interactive').click(function () {
        alert('Now click the bottom right corner of your field on the image below.');

        d3.selectAll("g").on('mousedown.drag', null);

        manage_drone_imagery_standard_process_raw_images_interactive_svg.on("click", function () {
            var current_pos = d3.mouse(this);
            $('#drone_imagery_plot_polygons_right_col_bottom_offset_raw_images_interactive').val(drone_imagery_interactive_total_length - current_pos[1]);
            console.log(current_pos);

            d3.selectAll("g").call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
        });
    });

    $('#drone_imagery_plot_polygons_rectangles_apply_raw_images_interactive').click(function () {
        plot_polygons_interactive_display_points = [];
        plot_polygons_interactive_ind_4_points = [];

        var num_rows_val = $('#drone_imagery_plot_polygons_num_rows_raw_images_interactive').val();
        var num_cols_val = $('#drone_imagery_plot_polygons_num_cols_raw_images_interactive').val();
        var section_top_row_left_offset_val = $('#drone_imagery_plot_polygons_top_row_left_offset_raw_images_interactive').val();
        var section_bottom_row_left_offset_val = $('#drone_imagery_plot_polygons_bottom_row_left_offset_raw_images_interactive').val();
        var section_left_column_top_offset_val = $('#drone_imagery_plot_polygons_left_column_top_offset_raw_images_interactive').val();
        var section_left_column_bottom_offset_val = $('#drone_imagery_plot_polygons_left_column_bottom_offset_raw_images_interactive').val();
        var section_top_row_right_offset_val = $('#drone_imagery_plot_polygons_top_row_right_offset_raw_images_interactive').val();
        var section_right_column_bottom_offset_val = $('#drone_imagery_plot_polygons_right_col_bottom_offset_raw_images_interactive').val();

        plotPolygonsRectanglesApplyInteractive(num_rows_val, num_cols_val, section_top_row_left_offset_val, section_bottom_row_left_offset_val, section_left_column_top_offset_val, section_left_column_bottom_offset_val, section_top_row_right_offset_val, section_right_column_bottom_offset_val, drone_imagery_interactive_total_width, drone_imagery_interactive_total_length, 'drone_imagery_interactive_generated_polygons_div');

        plotPolygonManualAssignPlotNumberTable('drone_imagery_standard_process_interactive_generated_polygons_table', 'drone_imagery_standard_process_interactive_generated_polygons_table_id', 'drone_imagery_standard_process_interactive_generated_polygons_table_input', 'drone_imagery_standard_process_interactive_generated_polygons_table_input_generate_button', 'drone_imagery_standard_process_interactive_plot_polygons_submit_bottom');

        $('#drone_imagery_standard_process_interactive_generated_polygons_input_div').show();
    });

    var drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_counter = 0;
    var drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_top_row_left_offset_val = 0;
    var drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_bottom_row_left_offset_val = 0;
    var drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_left_column_top_offset_val = 0;
    var drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_left_column_bottom_offset_val = 0;
    var drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_top_row_right_offset_val = 0;
    var drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_right_column_bottom_offset_val = 0;

    $('#drone_imagery_plot_polygons_rectangles_apply_square_average_raw_images_interactive').click(function () {
        alert('Click the four corners of 10 single plots at random in the current imaging pass. For each single plot click the top left, then the top right, then the bottom right, then the bottom left.');

    });

    $('#drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive').click(function () {
        plot_polygons_interactive_display_points = [];
        plot_polygons_interactive_ind_4_points = [];

        var num_rows_val = $('#drone_imagery_plot_polygons_num_rows_raw_images_interactive').val();
        var num_cols_val = $('#drone_imagery_plot_polygons_num_cols_raw_images_interactive').val();
        var section_top_row_left_offset_val = $('#drone_imagery_plot_polygons_top_row_left_offset_raw_images_interactive').val();
        var section_bottom_row_left_offset_val = $('#drone_imagery_plot_polygons_bottom_row_left_offset_raw_images_interactive').val();
        var section_left_column_top_offset_val = $('#drone_imagery_plot_polygons_left_column_top_offset_raw_images_interactive').val();
        var section_left_column_bottom_offset_val = $('#drone_imagery_plot_polygons_left_column_bottom_offset_raw_images_interactive').val();
        var section_top_row_right_offset_val = $('#drone_imagery_plot_polygons_top_row_right_offset_raw_images_interactive').val();
        var section_right_column_bottom_offset_val = $('#drone_imagery_plot_polygons_right_col_bottom_offset_raw_images_interactive').val();

        if (num_rows_val == '') {
            alert('Please give the number of rows!');
            return;
        }
        if (num_cols_val == '') {
            alert('Please give the number of columns!');
            return;
        }
        if (section_top_row_left_offset_val == '') {
            alert('Please give the top-most rows left margin! This can be 0 if there is no offset.');
            return;
        }
        if (section_bottom_row_left_offset_val == '') {
            alert('Please give the bottom-most rows left margin! This can be 0 if there is no offset.');
            return;
        }
        if (section_left_column_top_offset_val == '') {
            alert('Please give the left-most columns top margin! This can be 0 if there is no offset.');
            return;
        }
        if (section_left_column_bottom_offset_val == '') {
            alert('Please give the left-most columns bottom margin! This can be 0 if there is no offset.');
            return;
        }
        if (section_top_row_right_offset_val == '') {
            alert('Please give the top-most rows right margin! This can be 0 if there is no offset.');
            return;
        }
        if (section_right_column_bottom_offset_val == '') {
            alert('Please give the right-most columns bottom margin! This can be 0 if there is no offset.');
            return;
        }

        if (drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_counter > 0) {
            drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_top_row_left_offset_val = (drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_top_row_left_offset_val + parseInt(section_top_row_left_offset_val)) / 2;
            drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_bottom_row_left_offset_val = (drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_bottom_row_left_offset_val + parseInt(section_bottom_row_left_offset_val)) / 2;
            drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_left_column_top_offset_val = (drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_left_column_top_offset_val + parseInt(section_left_column_top_offset_val)) / 2;
            drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_left_column_bottom_offset_val = (drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_left_column_bottom_offset_val + parseInt(section_left_column_bottom_offset_val)) / 2;
            drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_top_row_right_offset_val = (drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_top_row_right_offset_val + parseInt(section_top_row_right_offset_val)) / 2;
            drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_right_column_bottom_offset_val = (drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_right_column_bottom_offset_val + parseInt(section_right_column_bottom_offset_val)) / 2;
        }
        drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_counter = drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_counter + 1;

        if (drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_counter < 10) {
            alert('Click the boundaries of another plot. You need to click atleast 10 to get a good average. Completed: ' + drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_counter);
            return false;
        }

        plotPolygonsRectanglesApplySquareInteractive(num_rows_val, num_cols_val, drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_top_row_left_offset_val, drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_bottom_row_left_offset_val, drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_left_column_top_offset_val, drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_left_column_bottom_offset_val, drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_top_row_right_offset_val, drone_imagery_plot_polygons_rectangles_apply_square_raw_images_interactive_section_right_column_bottom_offset_val, drone_imagery_interactive_total_width, drone_imagery_interactive_total_length, 'drone_imagery_interactive_generated_polygons_div');
    });

    function plotPolygonManualAssignPlotNumberTable(div_id, table_id, input_name, generate_assign_button, save_button) {
        var html = '<div class="panel panel-default"><div class="panel-body">';
        html = html + '<table class="display" id="' + table_id + '"><thead><tr><th>Polygon Number</th><th>Plot Number</th></tr></thead><tbody>';
        for (var i = 0; i < drone_imagery_interactive_plot_generated_polygons.length; i++) {
            html = html + '<tr><td>' + i + '</td><td><input type="number" class="form-control" data-polygon_number="' + i + '" name="' + input_name + '" /></td></tr>';
        }
        html = html + '</tbody></table><hr>';
        html = html + '<button class="btn btn-primary" id="' + generate_assign_button + '">Generate Assignments From Manual Input (Does Not Save)</button>&nbsp;&nbsp;&nbsp;<button class="btn btn-primary" name="' + save_button + '">Finish and Save Polygons To Plots. Go to Next Imaging Pass.</button></div></div>';

        $('#' + div_id).html(html);
        $('#' + table_id).DataTable({ 'paging': false });
    }

    function drawPolylineInteractive(points) {
        if (points.length == 4) {
            points.push(points[0]);
        }
        for (var i = 0; i < points.length - 1; i++) {
            manage_drone_imagery_standard_process_raw_images_interactive_svg.append('line')
                .style("stroke", "blue")
                .style("stroke-width", 5)
                .attr("x1", points[i].x)
                .attr("y1", points[i].y)
                .attr("x2", points[i + 1].x)
                .attr("y2", points[i + 1].y);
        }
    }

    function drawWaypointsInteractive(points, label, random_factor) {
        var plot_polygon_random_number = Math.random() * random_factor;
        if (points.length > 0 && label != undefined) {
            if (drone_imagery_interactive_plot_polygons_removed_numbers.includes(label)) {
                manage_drone_imagery_standard_process_raw_images_interactive_svg.append("text")
                    .attr("x", points[0].x + 3)
                    .attr("y", points[0].y + 14 + plot_polygon_random_number)
                    .text('NA')
                    .attr("font-family", "Arial")
                    .attr("font-size", "18px")
                    .attr("fill", "blue");
            } else {
                manage_drone_imagery_standard_process_raw_images_interactive_svg.append("text")
                    .attr("x", points[0].x + 3)
                    .attr("y", points[0].y + 14 + plot_polygon_random_number)
                    .text(label)
                    .attr("font-family", "Arial")
                    .attr("font-size", "18px")
                    .attr("fill", "red");
            }
        }
        //for(var i=0;i<points.length;i++){
        //    manage_drone_imagery_standard_process_raw_images_interactive_svg.append("circle")
        //        .attr("cx", points[i].x)
        //        .attr("cy", points[i].y)
        //        .attr("r", 4)
        //        .attr("fill", "blue");
        //}
    }

    function droneImageryDrawPlotPolygonActiveTemplatesTableInteractive(div_id, plot_polygons_template_dimensions) {
        var html = '<table class="display"><thead><tr><th>Template Number</th><th>Rows</th><th>Columns</th><th>Total Polygons</th><th>Options</th></tr></thead><tbody>';
        for (var i = 0; i < plot_polygons_template_dimensions.length; i++) {
            html = html + '<tr><td>' + i + '</td><td>' + plot_polygons_template_dimensions[i]['num_rows'] + '</td><td>' + plot_polygons_template_dimensions[i]['num_cols'] + '</td><td>' + plot_polygons_template_dimensions[i]['total_plot_polygons'] + '</td><td><button class="btn btn-sm btn-primary" name="drone_imagery_plot_polygon_template_options_interactive" data-plot_polygon_template_id="' + i + '" >Options</button></td></tr>';
        }
        html = html + '</tbody></table>';
        $('#' + div_id).html(html);
    }

    function plotPolygonsRectanglesApplyInteractive(num_rows_val, num_cols_val, section_top_row_left_offset_val, section_bottom_row_left_offset_val, section_left_column_top_offset_val, section_left_column_bottom_offset_val, section_top_row_right_offset_val, section_right_column_bottom_offset_val, section_width, section_height, plot_polygons_assignment_info) {
        if (num_rows_val == '') {
            alert('Please give the number of rows!');
            return;
        }
        if (num_cols_val == '') {
            alert('Please give the number of columns!');
            return;
        }
        if (section_top_row_left_offset_val == '') {
            alert('Please give the top-most rows left margin! This can be 0 if there is no offset.');
            return;
        }
        if (section_bottom_row_left_offset_val == '') {
            alert('Please give the bottom-most rows left margin! This can be 0 if there is no offset.');
            return;
        }
        if (section_left_column_top_offset_val == '') {
            alert('Please give the left-most columns top margin! This can be 0 if there is no offset.');
            return;
        }
        if (section_left_column_bottom_offset_val == '') {
            alert('Please give the left-most columns bottom margin! This can be 0 if there is no offset.');
            return;
        }
        if (section_top_row_right_offset_val == '') {
            alert('Please give the top-most rows right margin! This can be 0 if there is no offset.');
            return;
        }
        if (section_right_column_bottom_offset_val == '') {
            alert('Please give the right-most columns bottom margin! This can be 0 if there is no offset.');
            return;
        }

        plot_polygons_interactive_num_rows_generated = parseInt(num_rows_val);
        plot_polygons_interactive_num_cols_generated = parseInt(num_cols_val);

        var section_top_row_left_offset = parseInt(section_top_row_left_offset_val);
        var section_bottom_row_left_offset = parseInt(section_bottom_row_left_offset_val);
        var section_left_column_top_offset = parseInt(section_left_column_top_offset_val);
        var section_left_column_bottom_offset = parseInt(section_left_column_bottom_offset_val);
        var section_top_row_right_offset = parseInt(section_top_row_right_offset_val);
        var section_right_column_bottom_offset = parseInt(section_right_column_bottom_offset_val);

        var total_gradual_left_shift = section_bottom_row_left_offset - section_top_row_left_offset;
        var col_left_shift_increment = total_gradual_left_shift / plot_polygons_interactive_num_rows_generated;

        var total_gradual_vertical_shift = section_right_column_bottom_offset - section_left_column_bottom_offset;
        var col_vertical_shift_increment = total_gradual_vertical_shift / plot_polygons_interactive_num_cols_generated;

        var col_width = (section_width - section_top_row_left_offset - section_top_row_right_offset) / plot_polygons_interactive_num_cols_generated;
        var row_height = (section_height - section_left_column_top_offset - section_left_column_bottom_offset) / plot_polygons_interactive_num_rows_generated;

        var x_pos = section_top_row_left_offset;
        var y_pos = section_left_column_top_offset;

        manage_drone_imagery_standard_process_raw_images_interactive_svg = d3.select('#drone_imagery_standard_process_raw_images_image_id_interactive_select_div_area_' + manage_drone_imagery_standard_process_raw_images_interactive_current_pass);

        var row_num = 1;
        for (var i = 0; i < plot_polygons_interactive_num_rows_generated; i++) {
            for (var j = 0; j < plot_polygons_interactive_num_cols_generated; j++) {
                var x_pos_val = x_pos;
                var y_pos_val = y_pos;
                plot_polygons_interactive_generated_polygons.push([
                    { x: x_pos_val, y: y_pos_val },
                    { x: x_pos_val + col_width, y: y_pos_val },
                    { x: x_pos_val + col_width, y: y_pos_val + row_height },
                    { x: x_pos_val, y: y_pos_val + row_height }
                ]);
                x_pos = x_pos + col_width;
                y_pos = y_pos - col_vertical_shift_increment;
            }
            x_pos = section_top_row_left_offset + (row_num * col_left_shift_increment);
            y_pos = y_pos + row_height + total_gradual_vertical_shift;
            row_num = row_num + 1;
        }
        console.log(plot_polygons_interactive_generated_polygons);

        plot_polygons_interactive_total_height_generated = row_height * plot_polygons_interactive_num_rows_generated;
        plot_polygons_interactive_number_generated = plot_polygons_interactive_generated_polygons.length;

        var drone_imagery_plot_polygons_new = [];
        var drone_imagery_plot_polygons_display_new = [];

        for (var i = 0; i < plot_polygons_interactive_generated_polygons.length; i++) {
            plot_polygons_interactive_ind_4_points = plot_polygons_interactive_generated_polygons[i];
            plot_polygons_interactive_display_points = plot_polygons_interactive_ind_4_points;
            if (plot_polygons_interactive_display_points.length == 4) {
                plot_polygons_interactive_display_points.push(plot_polygons_interactive_ind_4_points[0]);
            }
            drawPolylineInteractive(plot_polygons_interactive_display_points);
            drawWaypointsInteractive(plot_polygons_interactive_display_points, i, 0);
            drone_imagery_interactive_plot_generated_polygons[i] = plot_polygons_interactive_ind_4_points;
            drone_imagery_plot_polygons_new[i] = plot_polygons_interactive_ind_4_points;
            drone_imagery_interactive_plot_polygons_display[i] = plot_polygons_interactive_display_points;
            drone_imagery_plot_polygons_display_new[i] = plot_polygons_interactive_display_points;
        }

        drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions.push({
            'num_rows': plot_polygons_interactive_num_rows_generated,
            'num_cols': plot_polygons_interactive_num_cols_generated,
            'total_plot_polygons': plot_polygons_interactive_num_rows_generated * plot_polygons_interactive_num_cols_generated,
            'plot_polygons': drone_imagery_plot_polygons_new,
            'plot_polygons_display': drone_imagery_plot_polygons_display_new
        });

        droneImageryDrawPlotPolygonActiveTemplatesTableInteractive('drone_imagery_plot_polygons_active_templates_raw_images_interactive', drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions);

        droneImageryDrawRectangleTableInteractive('drone_imagery_interactive_generated_polygons_div', 'drone_imagery_standard_process_interactive_plot_polygons_generated_assign', 'drone_imagery_standard_process_interactive_plot_polygons_submit_bottom');
    }

    function plotPolygonsRectanglesApplySquareInteractive(num_rows_val, num_cols_val, section_top_row_left_offset_val, section_bottom_row_left_offset_val, section_left_column_top_offset_val, section_left_column_bottom_offset_val, section_top_row_right_offset_val, section_right_column_bottom_offset_val, section_width, section_height, plot_polygons_assignment_info) {
        plot_polygons_interactive_num_rows_generated = parseInt(num_rows_val);
        plot_polygons_interactive_num_cols_generated = parseInt(num_cols_val);

        var section_top_row_left_offset = parseInt(section_top_row_left_offset_val);
        var section_bottom_row_left_offset = parseInt(section_bottom_row_left_offset_val);
        var section_left_column_top_offset = parseInt(section_left_column_top_offset_val);
        var section_left_column_bottom_offset = parseInt(section_left_column_bottom_offset_val);
        var section_top_row_right_offset = parseInt(section_top_row_right_offset_val);
        var section_right_column_bottom_offset = parseInt(section_right_column_bottom_offset_val);

        var total_gradual_left_shift = section_bottom_row_left_offset - section_top_row_left_offset;
        var col_left_shift_increment = total_gradual_left_shift / plot_polygons_interactive_num_rows_generated;

        var total_gradual_vertical_shift = section_right_column_bottom_offset - section_left_column_bottom_offset;
        var col_vertical_shift_increment = total_gradual_vertical_shift / plot_polygons_interactive_num_cols_generated;

        var col_width = (section_width - section_top_row_left_offset - section_top_row_right_offset);
        var row_height = (section_height - section_left_column_top_offset - section_left_column_bottom_offset);

        var x_pos = section_top_row_left_offset;
        var y_pos = section_left_column_top_offset;

        manage_drone_imagery_standard_process_raw_images_interactive_svg = d3.select('#drone_imagery_standard_process_raw_images_image_id_interactive_select_div_area_' + manage_drone_imagery_standard_process_raw_images_interactive_current_pass);

        var row_num = 1;
        var plot_polygons_interactive_generated_polygons_intermediate = [];
        for (var i = 0; i < plot_polygons_interactive_num_rows_generated; i++) {
            for (var j = 0; j < plot_polygons_interactive_num_cols_generated; j++) {
                var x_pos_val = x_pos;
                var y_pos_val = y_pos;
                plot_polygons_interactive_generated_polygons_intermediate.push([
                    { x: x_pos_val, y: y_pos_val },
                    { x: x_pos_val + col_width, y: y_pos_val },
                    { x: x_pos_val + col_width, y: y_pos_val + row_height },
                    { x: x_pos_val, y: y_pos_val + row_height }
                ]);
                x_pos = x_pos + col_width;
                y_pos = y_pos - col_vertical_shift_increment;
            }
            x_pos = section_top_row_left_offset + (row_num * col_left_shift_increment);
            y_pos = y_pos + row_height + total_gradual_vertical_shift;
            row_num = row_num + 1;
        }
        console.log(plot_polygons_interactive_generated_polygons_intermediate);

        alert('Click on where the top left corner of the template will be pasted in the current imaging event pass.');

        d3.selectAll("g").on('mousedown.drag', null);

        d3.select("#drone_imagery_standard_process_raw_images_image_id_interactive_select_div_area_" + manage_drone_imagery_standard_process_raw_images_interactive_current_pass).on("click", function () {
            var current_pos = d3.mouse(this);

            d3.selectAll("g").call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

            var plot_polygon_top_left_position = plot_polygons_interactive_generated_polygons_intermediate[0][0];
            var plot_polygon_template_paste_x_diff = plot_polygon_top_left_position['x'] - current_pos[0];
            var plot_polygon_template_paste_y_diff = plot_polygon_top_left_position['y'] - current_pos[1];

            for (var i in plot_polygons_interactive_generated_polygons_intermediate) {
                plot_polygons_interactive_generated_polygons.push([
                    { x: plot_polygons_interactive_generated_polygons_intermediate[i][0]['x'] - plot_polygon_template_paste_x_diff, y: plot_polygons_interactive_generated_polygons_intermediate[i][0]['y'] - plot_polygon_template_paste_y_diff },
                    { x: plot_polygons_interactive_generated_polygons_intermediate[i][1]['x'] - plot_polygon_template_paste_x_diff, y: plot_polygons_interactive_generated_polygons_intermediate[i][1]['y'] - plot_polygon_template_paste_y_diff },
                    { x: plot_polygons_interactive_generated_polygons_intermediate[i][2]['x'] - plot_polygon_template_paste_x_diff, y: plot_polygons_interactive_generated_polygons_intermediate[i][2]['y'] - plot_polygon_template_paste_y_diff },
                    { x: plot_polygons_interactive_generated_polygons_intermediate[i][3]['x'] - plot_polygon_template_paste_x_diff, y: plot_polygons_interactive_generated_polygons_intermediate[i][3]['y'] - plot_polygon_template_paste_y_diff }
                ]);
            }
            console.log(plot_polygons_interactive_generated_polygons);

            plot_polygons_interactive_total_height_generated = row_height * plot_polygons_interactive_num_rows_generated;
            plot_polygons_interactive_number_generated = plot_polygons_interactive_generated_polygons.length;

            var drone_imagery_plot_polygons_new = [];
            var drone_imagery_plot_polygons_display_new = [];

            for (var i = 0; i < plot_polygons_interactive_generated_polygons.length; i++) {
                plot_polygons_interactive_ind_4_points = plot_polygons_interactive_generated_polygons[i];
                plot_polygons_interactive_display_points = plot_polygons_interactive_ind_4_points;
                if (plot_polygons_interactive_display_points.length == 4) {
                    plot_polygons_interactive_display_points.push(plot_polygons_interactive_ind_4_points[0]);
                }
                drawPolylineInteractive(plot_polygons_interactive_display_points);
                drawWaypointsInteractive(plot_polygons_interactive_display_points, i, 0);
                drone_imagery_interactive_plot_generated_polygons[i] = plot_polygons_interactive_ind_4_points;
                drone_imagery_plot_polygons_new[i] = plot_polygons_interactive_ind_4_points;
                drone_imagery_interactive_plot_polygons_display[i] = plot_polygons_interactive_display_points;
                drone_imagery_plot_polygons_display_new[i] = plot_polygons_interactive_display_points;
            }

            drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions.push({
                'num_rows': plot_polygons_interactive_num_rows_generated,
                'num_cols': plot_polygons_interactive_num_cols_generated,
                'total_plot_polygons': plot_polygons_interactive_num_rows_generated * plot_polygons_interactive_num_cols_generated,
                'plot_polygons': drone_imagery_plot_polygons_new,
                'plot_polygons_display': drone_imagery_plot_polygons_display_new
            });

            droneImageryDrawPlotPolygonActiveTemplatesTableInteractive('drone_imagery_plot_polygons_active_templates_raw_images_interactive', drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions);

            droneImageryDrawRectangleTableInteractive('drone_imagery_interactive_generated_polygons_div', 'drone_imagery_standard_process_interactive_plot_polygons_generated_assign', 'drone_imagery_standard_process_interactive_plot_polygons_submit_bottom');

            plotPolygonManualAssignPlotNumberTable('drone_imagery_standard_process_interactive_generated_polygons_table', 'drone_imagery_standard_process_interactive_generated_polygons_table_id', 'drone_imagery_standard_process_interactive_generated_polygons_table_input', 'drone_imagery_standard_process_interactive_generated_polygons_table_input_generate_button', 'drone_imagery_standard_process_interactive_plot_polygons_submit_bottom');
        });
    }

    function showPlotPolygonTableStartInteractive(trial_id) {
        jQuery.ajax({
            url: '/ajax/breeders/trial/' + trial_id + '/layout_table',
            beforeSend: function (xhr) {
                $("#working_modal").modal("show");
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            success: function (response) {
                console.log(response);
                drone_imagery_interactive_field_trial_layout_response = response;
                var layout = drone_imagery_interactive_field_trial_layout_response.output;
                for (var i = 1; i < layout.length; i++) {
                    drone_imagery_interactive_plot_polygons_available_stock_names.push(layout[i][0]);
                }

                droneImageryDrawRectangleTableInteractive('drone_imagery_interactive_generated_polygons_div', 'drone_imagery_standard_process_interactive_plot_polygons_generated_assign', 'drone_imagery_standard_process_interactive_plot_polygons_submit_bottom');

                droneImageryDrawLayoutTableInteractive(response, {}, 'drone_imagery_interactive_trial_layout_div', 'drone_imagery_interactive_trial_layout_table');
            },
            error: function (response) {
                alert('Error retrieving trial layout and design!')
            }
        });
    }

    function droneImageryDrawLayoutTableInteractive(response, plot_polygons, layout_div_id, layout_table_div_id) {
        var output = response.output;
        var header = output[0];
        var html = '<table class="display table-borders " id="' + layout_table_div_id + '"><thead><tr>';
        for (var i = 0; i < header.length; i++) {
            html = html + '<td>' + header[i] + '</td>';
        }
        html = html + '<td>Polygon Assigned</td>';
        html = html + '</tr></thead><tbody>';
        for (var i = 1; i < output.length; i++) {
            html = html + '<tr>';
            for (var j = 0; j < output[i].length; j++) {
                html = html + '<td>' + output[i][j] + '</td>';
            }
            if (output[i][0] in plot_polygons && plot_polygons[output[i][0]] != undefined) {
                html = html + '<td>Yes</td>';
            } else {
                html = html + '<td></td>';
            }
            html = html + '</tr>';
        }
        html = html + '</tbody></table>';
        $('#' + layout_div_id).html(html);
        $('#' + layout_table_div_id).DataTable();
    }

    function droneImageryDrawRectangleTableInteractive(plot_polygons_layout_assignment_info, plot_polygons_generate_assignment_button, plot_polygon_assignment_submit_button) {
        var html = '<hr><div class="card bg-light"><h2>Or Auto Assign Plot Polygons to Plot Numbers</h2>';
        html = html + '<div class="panel panel-default"><div class="panel-body"><div class="form form-horizontal">';
        html = html + '<div class="row"><div class="col-sm-6"><div class="form-group form-group-sm"><label class="col-sm-6 control-label">Location of First Plot (e.g. plot number 1): </label><div class="col-sm-6"><select class="form-control" id="drone_imagery_interactive_plot_polygons_first_plot_start" name="drone_imagery_interactive_plot_polygons_first_plot_start"><option value="top_left">Top Left</option><option value="top_right">Top Right</option><option value="bottom_left" disabled>Bottom Left</option><option value="bottom_right" disabled>Bottom Right</option></select></div></div></div><div class="col-sm-6"><div class="form-group form-group-sm"><label class="col-sm-6 control-label">Second Plot Follows First Plot Going: </label><div class="col-sm-6"><select class="form-control" id="drone_imagery_interactive_plot_polygons_second_plot_follows" name="drone_imagery_interactive_plot_polygons_second_plot_follows"><option value="right">Right</option><option value="up">Up</option><option value="down">Down</option><option value="left">Left</option></select></div></div></div></div>';
        html = html + '<div class="row"><div class="col-sm-6"><div class="form-group form-group-sm"><label class="col-sm-6 control-label">Plot Number Orientation: </label><div class="col-sm-6"><select class="form-control" id="drone_imagery_interactive_plot_polygons_plot_orientation" name="drone_imagery_interactive_plot_polygons_plot_orientation"><option value="serpentine">Serpentine</option><option value="zigzag">Zigzag (Not Serpentine)</option></select></div></div></div><div class="col-sm-6"><div class="form-group form-group-sm"><label class="col-sm-6 control-label">Plot Number Start (optional): </label><div class="col-sm-6"><input type="number" class="form-control" id="drone_imagery_interactive_plot_polygons_plot_number_start" name="drone_imagery_interactive_plot_polygons_plot_number_start" placeholder="OPTIONAL" /></div></div></div></div>';
        html = html + '<button class="btn btn-primary" id="' + plot_polygons_generate_assignment_button + '">Generate Assignments (Does Not Save)</button>&nbsp;&nbsp;&nbsp;<button class="btn btn-primary" name="' + plot_polygon_assignment_submit_button + '">Finish and Save Polygons To Plots. Go to Next Imaging Pass.</button></div>';
        html = html + '</div></div></div></div>';

        $('#' + plot_polygons_layout_assignment_info).html(html);
    }

    var drone_imagery_interactive_current_plot_polygon_index_options_id = '';
    $(document).on('click', 'button[name="drone_imagery_plot_polygon_template_options_interactive"]', function () {
        $('#drone_imagery_interactive_plot_polygon_template_options_dialog').modal('show');
        drone_imagery_interactive_current_plot_polygon_index_options_id = $(this).data('plot_polygon_template_id');
    });

    $('#drone_imagery_interactive_plot_polygon_template_options_paste_click').click(function () {
        $('#drone_imagery_interactive_plot_polygon_template_options_dialog').modal('hide');
        alert('Click on where the top left corner of the template will be pasted.');

        d3.selectAll("g").on('mousedown.drag', null);

        d3.select("#drone_imagery_standard_process_raw_images_image_id_interactive_select_div_area_" + manage_drone_imagery_standard_process_raw_images_interactive_current_pass).on("click", function () {
            var current_pos = d3.mouse(this);

            d3.selectAll("g").call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

            plotPolygonsTemplatePasteInteractive(current_pos[0], current_pos[1], drone_imagery_interactive_total_width, drone_imagery_interactive_total_length, parseInt(drone_imagery_interactive_current_plot_polygon_index_options_id), 'drone_imagery_interactive_generated_polygons_div');

            plotPolygonManualAssignPlotNumberTable('drone_imagery_standard_process_interactive_generated_polygons_table', 'drone_imagery_standard_process_interactive_generated_polygons_table_id', 'drone_imagery_standard_process_interactive_generated_polygons_table_input', 'drone_imagery_standard_process_interactive_generated_polygons_table_input_generate_button', 'drone_imagery_standard_process_interactive_plot_polygons_submit_bottom');
        });
    });

    function plotPolygonsTemplatePasteInteractive(posx, posy, section_width, section_height, plot_polygon_template_id, plot_polygons_assignment_info) {
        var plot_polygon_template_to_paste = drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions[plot_polygon_template_id];

        var plot_polygons_previous_plot_polygons = plot_polygon_template_to_paste['plot_polygons'];
        plot_polygons_interactive_num_rows_generated = plot_polygon_template_to_paste['num_rows'];
        plot_polygons_interactive_num_cols_generated = plot_polygon_template_to_paste['num_cols'];

        var plot_polygon_top_left_position = plot_polygons_previous_plot_polygons[0][0];
        var plot_polygon_template_paste_x_diff = plot_polygon_top_left_position['x'] - posx;
        var plot_polygon_template_paste_y_diff = plot_polygon_top_left_position['y'] - posy;

        for (var i in plot_polygons_previous_plot_polygons) {
            plot_polygons_interactive_generated_polygons.push([
                { x: plot_polygons_previous_plot_polygons[i][0]['x'] - plot_polygon_template_paste_x_diff, y: plot_polygons_previous_plot_polygons[i][0]['y'] - plot_polygon_template_paste_y_diff },
                { x: plot_polygons_previous_plot_polygons[i][1]['x'] - plot_polygon_template_paste_x_diff, y: plot_polygons_previous_plot_polygons[i][1]['y'] - plot_polygon_template_paste_y_diff },
                { x: plot_polygons_previous_plot_polygons[i][2]['x'] - plot_polygon_template_paste_x_diff, y: plot_polygons_previous_plot_polygons[i][2]['y'] - plot_polygon_template_paste_y_diff },
                { x: plot_polygons_previous_plot_polygons[i][3]['x'] - plot_polygon_template_paste_x_diff, y: plot_polygons_previous_plot_polygons[i][3]['y'] - plot_polygon_template_paste_y_diff }
            ]);
        }

        plot_polygons_interactive_number_generated = plot_polygons_interactive_generated_polygons.length;
        console.log(plot_polygons_interactive_generated_polygons);

        var drone_imagery_plot_polygons_new = {};
        var drone_imagery_plot_polygons_display_new = {};

        for (var i = 0; i < plot_polygons_interactive_generated_polygons.length; i++) {
            plot_polygons_interactive_ind_4_points = plot_polygons_interactive_generated_polygons[i];
            plot_polygons_interactive_display_points = plot_polygons_interactive_ind_4_points;
            if (plot_polygons_interactive_display_points.length == 4) {
                plot_polygons_interactive_display_points.push(plot_polygons_interactive_ind_4_points[0]);
            }
            drawPolylineInteractive(plot_polygons_interactive_display_points);
            drawWaypointsInteractive(plot_polygons_interactive_display_points, i, 0);
            drone_imagery_interactive_plot_generated_polygons[i] = plot_polygons_interactive_ind_4_points;
            drone_imagery_plot_polygons_new[i] = plot_polygons_interactive_ind_4_points;
            drone_imagery_interactive_plot_polygons_display[i] = plot_polygons_interactive_display_points;
            drone_imagery_plot_polygons_display_new[i] = plot_polygons_interactive_display_points;
        }

        drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions.push({
            'num_rows': plot_polygons_interactive_num_rows_generated,
            'num_cols': plot_polygons_interactive_num_cols_generated,
            'total_plot_polygons': plot_polygons_interactive_num_rows_generated * plot_polygons_interactive_num_cols_generated,
            'plot_polygons': drone_imagery_plot_polygons_new,
            'plot_polygons_display': drone_imagery_plot_polygons_display_new
        });

        droneImageryDrawPlotPolygonActiveTemplatesTableInteractive('drone_imagery_plot_polygons_active_templates_raw_images_interactive', drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions);

        droneImageryDrawRectangleTableInteractive('drone_imagery_interactive_generated_polygons_div', 'drone_imagery_standard_process_interactive_plot_polygons_generated_assign', 'drone_imagery_standard_process_interactive_plot_polygons_submit_bottom');
    }

    $(document).on('click', '#drone_imagery_standard_process_interactive_generated_polygons_table_input_generate_button', function () {
        generatePlotPolygonAssignmentsInteractiveManual('drone_imagery_standard_process_trial_layout_div_0', 'drone_imagery_standard_process_layout_table_0');
    });

    function generatePlotPolygonAssignmentsInteractiveManual(trial_layout_div, trial_layout_table) {
        var plot_polygons_layout = drone_imagery_interactive_field_trial_layout_response.output;
        var plot_polygons_plot_numbers = [];
        var plot_polygons_plot_numbers_plot_names = {};
        for (var i = 1; i < plot_polygons_layout.length; i++) {
            var plot_polygons_plot_number = parseInt(plot_polygons_layout[i][2]);
            plot_polygons_plot_numbers.push(plot_polygons_plot_number);
            plot_polygons_plot_numbers_plot_names[plot_polygons_plot_number] = plot_polygons_layout[i][0];
        }

        var plot_polygon_new_display = {};
        $('input[name="drone_imagery_standard_process_interactive_generated_polygons_table_input"]').each(function () {
            var plot_number = $(this).val();
            var polygon_number = $(this).data('polygon_number');

            if (drone_imagery_interactive_plot_polygons_removed_numbers.includes(polygon_number.toString())) {
                console.log("Skipping " + polygon_number);
                plot_polygon_new_display[polygon_number] = drone_imagery_interactive_plot_polygons_display[polygon_number];
            } else {
                plot_polygon_new_display[plot_polygons_plot_numbers_plot_names[plot_number]] = drone_imagery_interactive_plot_polygons_display[polygon_number];
                drone_imagery_interactive_plot_polygons[plot_polygons_plot_numbers_plot_names[plot_number]] = drone_imagery_interactive_plot_generated_polygons[polygon_number];
            }
        });

        droneImageryDrawLayoutTableInteractive(drone_imagery_interactive_field_trial_layout_response, drone_imagery_interactive_plot_polygons, 'drone_imagery_interactive_trial_layout_div', 'drone_imagery_interactive_trial_layout_table');

        drone_imagery_interactive_plot_polygons_display = plot_polygon_new_display;
        draw_canvas_image_interactive(plot_polygons_interactive_total_height_generated / plot_polygons_interactive_num_rows_generated);
    }

    $(document).on('click', '#drone_imagery_standard_process_interactive_plot_polygons_generated_assign', function () {
        generatePlotPolygonAssignmentsInteractive('drone_imagery_standard_process_trial_layout_div_0', 'drone_imagery_standard_process_layout_table_0');
    });

    function generatePlotPolygonAssignmentsInteractive(trial_layout_div, trial_layout_table) {
        var plot_polygons_first_plot_start = $('#drone_imagery_interactive_plot_polygons_first_plot_start').val();
        var plot_polygons_second_plot_follows = $('#drone_imagery_interactive_plot_polygons_second_plot_follows').val();
        var plot_polygons_plot_orientation = $('#drone_imagery_interactive_plot_polygons_plot_orientation').val();
        var plot_polygons_plot_number_start = $('#drone_imagery_interactive_plot_polygons_plot_number_start').val();
        var plot_polygons_plot_number_start_int = 0;
        if (plot_polygons_plot_number_start != '') {
            plot_polygons_plot_number_start_int = parseInt($('#drone_imagery_interactive_plot_polygons_plot_number_start').val());
        }

        var plot_polygons_layout = drone_imagery_interactive_field_trial_layout_response.output;
        var plot_polygons_plot_numbers = [];
        var plot_polygons_plot_numbers_plot_names = {};
        for (var i = 1; i < plot_polygons_layout.length; i++) {
            var plot_polygons_plot_number = parseInt(plot_polygons_layout[i][2]);
            if (plot_polygons_plot_number >= plot_polygons_plot_number_start_int) {
                plot_polygons_plot_numbers.push(plot_polygons_plot_number);
                plot_polygons_plot_numbers_plot_names[plot_polygons_plot_number] = plot_polygons_layout[i][0];
            }
        }
        plot_polygons_plot_numbers = plot_polygons_plot_numbers.sort(function (a, b) { return a - b; });
        var plot_polygons_current_plot_number_index = 0;

        var plot_polygons_template_index = 0;
        var plot_polygons_template_current = drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions[plot_polygons_template_index];
        var plot_polygons_template_current_num_cols = plot_polygons_template_current.num_cols;
        var plot_polygons_template_current_num_rows = plot_polygons_template_current.num_rows;
        var plot_polygons_template_current_total_plot_polygons = plot_polygons_template_current.total_plot_polygons;
        var plot_polygons_template_current_plot_polygon_index = 0;

        var plot_polygon_new_display = {};
        if (plot_polygons_first_plot_start == 'top_left') {
            var generated_polygon_key_first_plot_number = 0;
            if (plot_polygons_second_plot_follows == 'left' || plot_polygons_second_plot_follows == 'up') {
                alert('Second plot cannot follow left or up from first plot if the first plot starts at the top left, because that is physically impossible.');
                return;
            }
            if (plot_polygons_second_plot_follows == 'right') {
                if (plot_polygons_plot_orientation == 'zigzag') {
                    var plot_polygon_current_polygon_index = generated_polygon_key_first_plot_number;
                    for (var j = generated_polygon_key_first_plot_number; j < plot_polygons_plot_numbers.length + drone_imagery_interactive_plot_polygons_removed_numbers.length; j++) {
                        if (drone_imagery_interactive_plot_polygons_removed_numbers.includes(plot_polygon_current_polygon_index.toString())) {
                            console.log("Skipping " + plot_polygon_current_polygon_index);
                            plot_polygon_new_display[plot_polygon_current_polygon_index] = drone_imagery_interactive_plot_polygons_display[plot_polygon_current_polygon_index];
                        } else {
                            plot_polygon_new_display[plot_polygons_plot_numbers_plot_names[plot_polygons_plot_numbers[plot_polygons_current_plot_number_index]]] = drone_imagery_interactive_plot_polygons_display[plot_polygon_current_polygon_index];
                            drone_imagery_interactive_plot_polygons[plot_polygons_plot_numbers_plot_names[plot_polygons_plot_numbers[plot_polygons_current_plot_number_index]]] = drone_imagery_interactive_plot_generated_polygons[plot_polygon_current_polygon_index];
                            plot_polygons_current_plot_number_index = plot_polygons_current_plot_number_index + 1;
                            plot_polygons_template_current_plot_polygon_index = plot_polygons_template_current_plot_polygon_index + 1;
                        }
                        plot_polygon_current_polygon_index = plot_polygon_current_polygon_index + 1;

                        if (plot_polygons_template_current_plot_polygon_index == plot_polygons_template_current_total_plot_polygons) {
                            plot_polygons_template_index = plot_polygons_template_index + 1;
                            plot_polygons_template_current = drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions[plot_polygons_template_index];
                            if (plot_polygons_template_current != undefined) {
                                plot_polygons_template_current_num_cols = plot_polygons_template_current.num_cols;
                                plot_polygons_template_current_num_rows = plot_polygons_template_current.num_rows;
                                plot_polygons_template_current_total_plot_polygons = plot_polygons_template_current.total_plot_polygons;
                                plot_polygons_template_current_plot_polygon_index = 0;
                            }
                        }
                    }
                }
                if (plot_polygons_plot_orientation == 'serpentine') {
                    var plot_polygon_current_polygon_index = generated_polygon_key_first_plot_number;
                    var plot_polygon_column_count = 0;
                    var plot_polygon_zigzig_polygon_index = generated_polygon_key_first_plot_number;
                    var going_right = 1;
                    var plot_polygon_previous_template_plot_count = 0;
                    for (var j = generated_polygon_key_first_plot_number; j < plot_polygons_plot_numbers.length + drone_imagery_interactive_plot_polygons_removed_numbers.length; j++) {

                        if (going_right == 1) {
                            plot_polygon_current_polygon_index = plot_polygon_zigzig_polygon_index;
                        }
                        if (going_right == 0) {
                            plot_polygon_current_polygon_index = plot_polygon_previous_template_plot_count + plot_polygons_template_current_num_cols - plot_polygon_column_count - 1;
                        }

                        if (drone_imagery_interactive_plot_polygons_removed_numbers.includes(plot_polygon_current_polygon_index.toString())) {
                            console.log("Skipping " + plot_polygon_current_polygon_index);
                            plot_polygon_new_display[plot_polygon_current_polygon_index] = drone_imagery_interactive_plot_polygons_display[plot_polygon_current_polygon_index];
                        } else {
                            plot_polygon_new_display[plot_polygons_plot_numbers_plot_names[plot_polygons_plot_numbers[plot_polygons_current_plot_number_index]]] = drone_imagery_interactive_plot_polygons_display[plot_polygon_current_polygon_index];
                            drone_imagery_interactive_plot_polygons[plot_polygons_plot_numbers_plot_names[plot_polygons_plot_numbers[plot_polygons_current_plot_number_index]]] = drone_imagery_interactive_plot_generated_polygons[plot_polygon_current_polygon_index];
                            plot_polygons_current_plot_number_index = plot_polygons_current_plot_number_index + 1;
                            plot_polygons_template_current_plot_polygon_index = plot_polygons_template_current_plot_polygon_index + 1;
                        }

                        plot_polygon_zigzig_polygon_index = plot_polygon_zigzig_polygon_index + 1;
                        plot_polygon_column_count = plot_polygon_column_count + 1;

                        if (plot_polygon_column_count == plot_polygons_template_current_num_cols) {
                            plot_polygon_column_count = 0;
                            if (going_right == 1) {
                                going_right = 0;
                            } else {
                                going_right = 1;
                            }
                            plot_polygon_previous_template_plot_count = plot_polygon_previous_template_plot_count + plot_polygons_template_current_num_cols;
                        }

                        if (plot_polygons_template_current_plot_polygon_index == plot_polygons_template_current_total_plot_polygons) {
                            plot_polygons_template_index = plot_polygons_template_index + 1;
                            plot_polygons_template_current = drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions[plot_polygons_template_index];
                            if (plot_polygons_template_current != undefined) {
                                plot_polygons_template_current_num_cols = plot_polygons_template_current.num_cols;
                                plot_polygons_template_current_num_rows = plot_polygons_template_current.num_rows;
                                plot_polygons_template_current_total_plot_polygons = plot_polygons_template_current.total_plot_polygons;
                                plot_polygons_template_current_plot_polygon_index = 0;
                            }
                        }
                    }
                }
            }
            if (plot_polygons_second_plot_follows == 'down') {
                alert('Down not implemented if first plot starts in top left. Please contact us or try rotating your image differently before assigning plot polygons (e.g. rotate image 90 degrees clock-wise, then first plot starts in top right and you can go left for plot assignment).');
                return;
            }
        }
        if (plot_polygons_first_plot_start == 'top_right') {
            var generated_polygon_key_first_plot_number = plot_polygons_template_current_num_cols - 1;
            if (plot_polygons_second_plot_follows == 'right' || plot_polygons_second_plot_follows == 'up') {
                alert('Second plot cannot follow right or up from first plot if the first plot starts at the top right, because that is physically impossible.');
                return;
            }
            if (plot_polygons_second_plot_follows == 'left') {
                if (plot_polygons_plot_orientation == 'zigzag') {
                    console.log(generated_polygon_key_first_plot_number);
                    var plot_polygon_current_polygon_index = generated_polygon_key_first_plot_number;
                    var plot_polygon_column_count = 0;
                    var plot_polygon_previous_template_plot_count = 0;
                    for (var j = generated_polygon_key_first_plot_number; j < generated_polygon_key_first_plot_number + plot_polygons_plot_numbers.length + drone_imagery_interactive_plot_polygons_removed_numbers.length; j++) {

                        plot_polygon_current_polygon_index = plot_polygon_previous_template_plot_count + plot_polygons_template_current_num_cols - plot_polygon_column_count - 1;

                        if (drone_imagery_interactive_plot_polygons_removed_numbers.includes(plot_polygon_current_polygon_index.toString())) {
                            console.log("Skipping " + plot_polygon_current_polygon_index);
                            plot_polygon_new_display[plot_polygon_current_polygon_index] = drone_imagery_interactive_plot_polygons_display[plot_polygon_current_polygon_index];
                        } else {
                            plot_polygon_new_display[plot_polygons_plot_numbers_plot_names[plot_polygons_plot_numbers[plot_polygons_current_plot_number_index]]] = drone_imagery_interactive_plot_polygons_display[plot_polygon_current_polygon_index];
                            drone_imagery_interactive_plot_polygons[plot_polygons_plot_numbers_plot_names[plot_polygons_plot_numbers[plot_polygons_current_plot_number_index]]] = drone_imagery_interactive_plot_generated_polygons[plot_polygon_current_polygon_index];
                            plot_polygons_current_plot_number_index = plot_polygons_current_plot_number_index + 1;
                            plot_polygons_template_current_plot_polygon_index = plot_polygons_template_current_plot_polygon_index + 1;
                        }

                        plot_polygon_column_count = plot_polygon_column_count + 1;

                        if (plot_polygon_column_count == plot_polygons_template_current_num_cols) {
                            plot_polygon_column_count = 0;
                            plot_polygon_previous_template_plot_count = plot_polygon_previous_template_plot_count + plot_polygons_template_current_num_cols;
                        }

                        if (plot_polygons_template_current_plot_polygon_index == plot_polygons_template_current_total_plot_polygons) {
                            plot_polygons_template_index = plot_polygons_template_index + 1;
                            plot_polygons_template_current = drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions[plot_polygons_template_index];
                            if (plot_polygons_template_current != undefined) {
                                plot_polygons_template_current_num_cols = plot_polygons_template_current.num_cols;
                                plot_polygons_template_current_num_rows = plot_polygons_template_current.num_rows;
                                plot_polygons_template_current_total_plot_polygons = plot_polygons_template_current.total_plot_polygons;
                                plot_polygons_template_current_plot_polygon_index = 0;
                            }
                        }
                    }
                }
                if (plot_polygons_plot_orientation == 'serpentine') {
                    var plot_polygon_current_polygon_index = generated_polygon_key_first_plot_number;
                    var plot_polygon_column_count = 0;
                    var plot_polygon_zigzig_polygon_index = generated_polygon_key_first_plot_number;
                    var going_left = 1;
                    var plot_polygon_previous_template_plot_count = 0;
                    for (var j = generated_polygon_key_first_plot_number; j < generated_polygon_key_first_plot_number + plot_polygons_plot_numbers.length + drone_imagery_interactive_plot_polygons_removed_numbers.length; j++) {

                        if (going_left == 0) {
                            plot_polygon_current_polygon_index = plot_polygon_previous_template_plot_count + plot_polygon_column_count;
                        }
                        if (going_left == 1) {
                            plot_polygon_current_polygon_index = plot_polygon_previous_template_plot_count + plot_polygons_template_current_num_cols - plot_polygon_column_count - 1;
                        }

                        if (drone_imagery_interactive_plot_polygons_removed_numbers.includes(plot_polygon_current_polygon_index.toString())) {
                            console.log("Skipping " + plot_polygon_current_polygon_index);
                            plot_polygon_new_display[plot_polygon_current_polygon_index] = drone_imagery_interactive_plot_polygons_display[plot_polygon_current_polygon_index];
                        } else {
                            plot_polygon_new_display[plot_polygons_plot_numbers_plot_names[plot_polygons_plot_numbers[plot_polygons_current_plot_number_index]]] = drone_imagery_interactive_plot_polygons_display[plot_polygon_current_polygon_index];
                            drone_imagery_interactive_plot_polygons[plot_polygons_plot_numbers_plot_names[plot_polygons_plot_numbers[plot_polygons_current_plot_number_index]]] = drone_imagery_interactive_plot_generated_polygons[plot_polygon_current_polygon_index];
                            plot_polygons_current_plot_number_index = plot_polygons_current_plot_number_index + 1;
                            plot_polygons_template_current_plot_polygon_index = plot_polygons_template_current_plot_polygon_index + 1;
                        }

                        plot_polygon_zigzig_polygon_index = plot_polygon_zigzig_polygon_index + 1;
                        plot_polygon_column_count = plot_polygon_column_count + 1;

                        if (plot_polygon_column_count == plot_polygons_template_current_num_cols) {
                            plot_polygon_column_count = 0;
                            if (going_left == 1) {
                                going_left = 0;
                            } else {
                                going_left = 1;
                            }
                            plot_polygon_previous_template_plot_count = plot_polygon_previous_template_plot_count + plot_polygons_template_current_num_cols;
                        }

                        if (plot_polygons_template_current_plot_polygon_index == plot_polygons_template_current_total_plot_polygons) {
                            plot_polygons_template_index = plot_polygons_template_index + 1;
                            plot_polygons_template_current = drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions[plot_polygons_template_index];
                            if (plot_polygons_template_current != undefined) {
                                plot_polygons_template_current_num_cols = plot_polygons_template_current.num_cols;
                                plot_polygons_template_current_num_rows = plot_polygons_template_current.num_rows;
                                plot_polygons_template_current_total_plot_polygons = plot_polygons_template_current.total_plot_polygons;
                                plot_polygons_template_current_plot_polygon_index = 0;
                            }
                        }
                    }
                }
            }
            if (plot_polygons_second_plot_follows == 'down') {
                alert('Down not implemented if your first plot starts in top right. Please contact us or try rotating your image differently before assigning plot polygons (e.g. rotate image 90 degrees clockwise, then first plot starts in bottom right corner and plot assignment can follow going left).');
                return;
            }
        }
        if (plot_polygons_first_plot_start == 'bottom_left') {
            alert('Not implemented');
            return;
        }
        if (plot_polygons_first_plot_start == 'bottom_right') {
            alert('Not implemented');
            return;
        }

        droneImageryDrawLayoutTableInteractive(drone_imagery_interactive_field_trial_layout_response, drone_imagery_interactive_plot_polygons, 'drone_imagery_interactive_trial_layout_div', 'drone_imagery_interactive_trial_layout_table');

        drone_imagery_interactive_plot_polygons_display = plot_polygon_new_display;
        draw_canvas_image_interactive(plot_polygons_interactive_total_height_generated / plot_polygons_interactive_num_rows_generated);
    }

    $(document).on('click', '#drone_imagery_interactive_plot_polygons_clear', function () {
        plot_polygons_interactive_display_points = [];
        plot_polygons_interactive_ind_4_points = [];
        plot_polygons_interactive_generated_polygons = {};
        drone_imagery_interactive_plot_polygons_display = {};
        plot_polygons_interactive_generated_polygons = [];
        drone_imagery_interactive_plot_generated_polygons = [];
        drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions = [];
        drone_imagery_interactive_plot_polygons_removed_numbers = [];
        d3.selectAll('#drone_imagery_standard_process_raw_images_image_id_interactive_select_div_area_' + manage_drone_imagery_standard_process_raw_images_interactive_current_pass + ' > text').remove();
        d3.selectAll('#drone_imagery_standard_process_raw_images_image_id_interactive_select_div_area_' + manage_drone_imagery_standard_process_raw_images_interactive_current_pass + ' > line').remove();
        //d3.selectAll('#drone_imagery_standard_process_raw_images_image_id_interactive_select_div_area_'+manage_drone_imagery_standard_process_raw_images_interactive_current_pass+' > circle').remove();
        $('#drone_imagery_interactive_generated_polygons_div').html('');

        droneImageryDrawLayoutTableInteractive(drone_imagery_interactive_field_trial_layout_response, {}, 'drone_imagery_interactive_trial_layout_div', 'drone_imagery_interactive_trial_layout_table');
        droneImageryDrawPlotPolygonActiveTemplatesTableInteractive('drone_imagery_plot_polygons_active_templates_raw_images_interactive', drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions);
        plotPolygonManualAssignPlotNumberTable('drone_imagery_standard_process_interactive_generated_polygons_table', 'drone_imagery_standard_process_interactive_generated_polygons_table_id', 'drone_imagery_standard_process_interactive_generated_polygons_table_input', 'drone_imagery_standard_process_interactive_generated_polygons_table_input_generate_button', 'drone_imagery_standard_process_interactive_plot_polygons_submit_bottom');
    });

    $(document).on('click', '#drone_imagery_interactive_plot_polygons_clear_one', function () {
        $('#drone_imagery_interactive_plot_polygon_remove_polygon').modal('show');
        return false;
    });

    $('#drone_imagery_interactive_plot_polygon_remove_polygon_submit').click(function () {
        var polygon_number = $('#drone_imagery_interactive_plot_polygon_remove_polygon_number').val();
        drone_imagery_interactive_plot_polygons_removed_numbers.push(polygon_number);
        draw_canvas_image_interactive(plot_polygons_interactive_total_height_generated / plot_polygons_interactive_num_rows_generated);
        plotPolygonManualAssignPlotNumberTable('drone_imagery_standard_process_interactive_generated_polygons_table', 'drone_imagery_standard_process_interactive_generated_polygons_table_id', 'drone_imagery_standard_process_interactive_generated_polygons_table_input', 'drone_imagery_standard_process_interactive_generated_polygons_table_input_generate_button', 'drone_imagery_standard_process_interactive_plot_polygons_submit_bottom');
        return false;
    });

    function draw_canvas_image_interactive(random_scaling) {
        d3.selectAll('#drone_imagery_standard_process_raw_images_image_id_interactive_select_div_area_' + manage_drone_imagery_standard_process_raw_images_interactive_current_pass + ' > text').remove();
        d3.selectAll('#drone_imagery_standard_process_raw_images_image_id_interactive_select_div_area_' + manage_drone_imagery_standard_process_raw_images_interactive_current_pass + ' > line').remove();
        //d3.selectAll('#drone_imagery_standard_process_raw_images_image_id_interactive_select_div_area_'+manage_drone_imagery_standard_process_raw_images_interactive_current_pass+' > circle').remove();
        console.log("draw_canvas_image_interactive");
        console.log(drone_imagery_interactive_plot_polygons_display);

        for (key in drone_imagery_interactive_plot_polygons_display) {
            var plot_polygons_display_points_again = drone_imagery_interactive_plot_polygons_display[key];
            drawPolylineInteractive(plot_polygons_display_points_again);
            drawWaypointsInteractive(plot_polygons_display_points_again, key, random_scaling);
        }
        return false;
    }

    $(document).on('click', 'button[name="drone_imagery_standard_process_interactive_plot_polygons_submit_bottom"]', function () {
        console.log(manage_drone_imagery_standard_process_interactive_saved_gps_positions);

        console.log(drone_imagery_interactive_plot_polygons);
        console.log(drone_imagery_interactive_plot_polygons_display);

        jQuery.ajax({
            type: 'POST',
            url: '/api/drone_imagery/save_plot_polygons_template_separated',
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                'drone_run_band_project_id': manage_drone_imagery_standard_process_interactive_drone_run_band_project_id,
                'stock_polygons': drone_imagery_interactive_plot_polygons,
                'flight_pass_counter': manage_drone_imagery_standard_process_raw_images_interactive_current_pass
            }),
            beforeSend: function (xhr) {
                $("#working_modal").modal("show");
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            success: function (response) {
                console.log(response);
                if (response.error) {
                    alert(response.error);
                }
                console.log(manage_drone_imagery_standard_process_raw_images_interactive_current_pass);
                if (manage_drone_imagery_standard_process_raw_images_interactive_current_pass < manage_drone_imagery_standard_process_raw_images_interactive_maximum_pass) {
                    manage_drone_imagery_standard_process_raw_images_interactive_current_pass = manage_drone_imagery_standard_process_raw_images_interactive_current_pass + 1;

                    console.log("Plot Polygon pass COMPLETE");

                    initializeInteractiveSvg('#drone_imagery_standard_process_raw_images_image_id_interactive_select_div', 'drone_imagery_standard_process_raw_images_image_id_interactive_select_div_area', 1, 1);

                    $('#drone_imagery_standard_process_interactive_plot_polygons_flight_pass').html("<h1><b>Current Imaging Event Pass: " + manage_drone_imagery_standard_process_raw_images_interactive_current_pass + "/" + manage_drone_imagery_standard_process_raw_images_interactive_maximum_pass + "</b></h1>");

                    plot_polygons_interactive_display_points = [];
                    plot_polygons_interactive_ind_4_points = [];
                    plot_polygons_interactive_generated_polygons = {};
                    drone_imagery_interactive_plot_polygons_display = {};
                    plot_polygons_interactive_generated_polygons = [];
                    drone_imagery_interactive_plot_generated_polygons = [];
                    drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions = [];
                    drone_imagery_interactive_plot_polygons_removed_numbers = [];
                    $('#drone_imagery_interactive_generated_polygons_div').html('');

                    droneImageryDrawLayoutTableInteractive(drone_imagery_interactive_field_trial_layout_response, {}, 'drone_imagery_interactive_trial_layout_div', 'drone_imagery_interactive_trial_layout_table');
                    droneImageryDrawPlotPolygonActiveTemplatesTableInteractive('drone_imagery_plot_polygons_active_templates_raw_images_interactive', drone_imagery_standard_process_raw_images_interactive_plot_polygons_template_dimensions);
                    plotPolygonManualAssignPlotNumberTable('drone_imagery_standard_process_interactive_generated_polygons_table', 'drone_imagery_standard_process_interactive_generated_polygons_table_id', 'drone_imagery_standard_process_interactive_generated_polygons_table_input', 'drone_imagery_standard_process_interactive_generated_polygons_table_input_generate_button', 'drone_imagery_standard_process_interactive_plot_polygons_submit_bottom');

                    window.scrollTo(0, 0);
                }
                else {
                    console.log("Plot polygon COMPLETE");

                    manage_drone_imagery_standard_process_raw_images_interactive_current_pass = 1;

                    $('#manage_drone_imagery_standard_process_interactive_drone_run_bands_apply_table').DataTable({
                        destroy: true,
                        ajax: '/api/drone_imagery/drone_run_bands?select_checkbox_name=drone_run_standard_process_interactive_band_apply_select&drone_run_project_id=' + manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id + '&select_all=1&disable=1'
                    });

                    Workflow.complete("#drone_imagery_standard_process_raw_images_interactive_match_previous_pass");
                    Workflow.focus('#manage_drone_imagery_standard_process_raw_images_interactive_workflow', 5);
                }
            },
            error: function (response) {
                //alert('Error saving standard process assigned plot polygons!')
            }
        });
    });

    $('#manage_drone_imagery_standard_process_interactive_drone_run_band_apply_step').click(function () {
        manage_drone_imagery_standard_process_interactive_apply_drone_run_band_project_ids = [];
        $('input[name="drone_run_standard_process_interactive_band_apply_select"]:checked').each(function () {
            manage_drone_imagery_standard_process_interactive_apply_drone_run_band_project_ids.push($(this).val());
        });
        if (manage_drone_imagery_standard_process_interactive_apply_drone_run_band_project_ids.length < 1) {
            alert('Please select at least one other drone run band!');
            return false;
        } else {
            Workflow.complete("#manage_drone_imagery_standard_process_interactive_drone_run_band_apply_step");
            Workflow.focus('#manage_drone_imagery_standard_process_raw_images_interactive_workflow', 6);
        }
    });

    $('#manage_drone_imagery_standard_interactive_process_indices_step').click(function () {
        manage_drone_imagery_standard_process_interactive_apply_drone_run_band_vegetative_indices = [];
        $('input[name="drone_imagery_standard_process_interactive_apply_indices_select"]:checked').each(function () {
            manage_drone_imagery_standard_process_interactive_apply_drone_run_band_vegetative_indices.push($(this).val());
        });
        if (manage_drone_imagery_standard_process_interactive_apply_drone_run_band_vegetative_indices.length < 1) {
            alert('Please select at least one vegetative index!');
            return false;
        } else {
            jQuery.ajax({
                type: 'GET',
                url: '/api/drone_imagery/get_weeks_after_planting_date?drone_run_project_id=' + manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id,
                dataType: "json",
                beforeSend: function (xhr) {
                    $("#working_modal").modal("show");
                    xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
                },
                success: function (response) {
                    $('#working_modal').modal('hide');
                    console.log(response);
                    if (response.error) {
                        alert(response.error);
                    }

                    var html = "<div><b>Field Trial Planting Date</b>: " + response.planting_date + "<br/><b>Drone Run Date</b>: " + response.drone_run_date + "<br/><b>Number of Weeks</b>: " + response.rounded_time_difference_weeks + "<br/><b>Number of Weeks Ontology Term</b>: " + response.time_ontology_week_term + "<br/><b>Number of Days</b>:" + response.time_difference_days + "<br/><b>Number of Days Ontology Term</b>: " + response.time_ontology_day_term + "<br/><br/></div>";
                    $('#drone_imagery_standard_process_interactive_week_term_div').html(html);

                    manage_drone_imagery_standard_process_interactive_phenotype_time = response.time_ontology_day_cvterm_id;
                },
                error: function (response) {
                    alert('Error getting time terms!');
                    $('#working_modal').modal('hide');
                }
            });

            Workflow.complete("#manage_drone_imagery_standard_interactive_process_indices_step");
            Workflow.focus('#manage_drone_imagery_standard_process_raw_images_interactive_workflow', 7);
        }
    });

    $('#manage_drone_imagery_standard_process_interactive_phenotypes_step').click(function () {
        var selected = [];

        if (manage_drone_imagery_standard_process_interactive_phenotype_time == '') {
            alert('Time of phenotype not set! This should not happen! Please contact us.');
            return false;
        }

        $('input[name="drone_imagery_standard_process_interactive_phenotypes_select"]:checked').each(function () {
            selected.push($(this).val());
        });
        if (selected.length < 1) {
            alert('Please select at least one phenotype!');
            return false;
        } else {
            jQuery.ajax({
                type: 'POST',
                url: '/api/drone_imagery/standard_process_apply_raw_images_interactive',
                dataType: "json",
                data: {
                    'drone_run_project_id': manage_drone_imagery_standard_process_raw_images_interactive_drone_run_id,
                    'drone_run_band_project_id': manage_drone_imagery_standard_process_interactive_drone_run_band_project_id,
                    'apply_drone_run_band_project_ids': JSON.stringify(manage_drone_imagery_standard_process_interactive_apply_drone_run_band_project_ids),
                    'vegetative_indices': JSON.stringify(manage_drone_imagery_standard_process_interactive_apply_drone_run_band_vegetative_indices),
                    'phenotype_types': JSON.stringify(selected),
                    'time_cvterm_id': manage_drone_imagery_standard_process_interactive_phenotype_time,
                    'standard_process_type': 'minimal'
                },
                beforeSend: function (xhr) {
                    $("#working_modal").modal("show");
                    xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
                },
                success: function (response) {
                    console.log(response);
                    if (response.error) {
                        alert(response.error);
                    }
                },
                error: function (response) {
                    //alert('Error saving standard process assigned plot polygons!')
                }
            });

            Workflow.complete("#manage_drone_imagery_standard_process_interactive_phenotypes_step");
            //$('#drone_imagery_standard_process_interactive_complete_dialog').modal('show');
        }
    });

    $('#drone_imagery_standard_process_interactive_complete_dialog').on('hidden.bs.modal', function () {
        location.reload();
    })

    $('#plot_polygons_use_previously_saved_template_raw_images_interactive').click(function () {
        var plot_polygons_use_previously_saved_template = $('#manage_drone_imagery_standard_process_interactive_previous_templates').val();
        if (plot_polygons_use_previously_saved_template == '') {
            alert('Please select a previously saved template before trying to apply it. If there is not a template listed, then you can create one using the templating tool above.');
            return;
        }

        jQuery.ajax({
            url: '/api/drone_imagery/retrieve_parameter_template?plot_polygons_template_projectprop_id=' + plot_polygons_use_previously_saved_template,
            beforeSend: function (xhr) {
                $("#working_modal").modal("show");
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            success: function (response) {
                console.log(response);
                var p = response.parameter;
                drone_imagery_interactive_plot_polygons_display = p[manage_drone_imagery_standard_process_raw_images_interactive_current_pass];
                drone_imagery_interactive_plot_polygons = p[manage_drone_imagery_standard_process_raw_images_interactive_current_pass];

                droneImageryDrawLayoutTableInteractive(drone_imagery_interactive_field_trial_layout_response, drone_imagery_interactive_plot_polygons, 'drone_imagery_interactive_trial_layout_div', 'drone_imagery_interactive_trial_layout_table');
                droneImageryDrawRectangleTableInteractive('drone_imagery_interactive_generated_polygons_div', 'drone_imagery_standard_process_interactive_plot_polygons_generated_assign', 'drone_imagery_standard_process_interactive_plot_polygons_submit_bottom');

                draw_canvas_image_interactive(0);
            },
            error: function (response) {
                alert('Error retrieving plot polygons template!');
            }
        });
        return;
    });

    function showManageDroneImagerySection(section_div_id) {
        console.log(section_div_id);

        $('#manage_drone_imagery_crop_div').hide();
        $('#manage_drone_imagery_top_div').hide();
        $('#manage_drone_imagery_plot_polygons_div').hide();
        $('#manage_drone_imagery_calculate_phenotypes_div').hide();
        $('#manage_drone_imagery_remove_background_div').hide();
        $('#manage_drone_imagery_rotate_div').hide();
        $('#manage_drone_imagery_vegetative_index_div').hide();
        $('#manage_drone_imagery_standard_process_div').hide();
        $('#manage_drone_imagery_standard_process_raw_images_div').hide();
        $('#manage_drone_imagery_standard_process_raw_images_interactive_div').hide();
        $('#manage_drone_imagery_loading_div').hide();

        $('#' + section_div_id).show();

        window.scrollTo(0, 0);
    }
});
