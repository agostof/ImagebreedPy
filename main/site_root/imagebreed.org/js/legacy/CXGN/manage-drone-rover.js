$(document).ready(function () {

    //
    // Imaging vehicles
    //

    $('#drone_rover_view_rover_vehicles_link').click(function () {
        $('#drone_rover_view_rover_vehicles_table').DataTable({
            destroy: true,
            paging: true,
            ajax: {
                'url': '/api/drone_rover/rover_vehicles',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
                }
            }
        });

        $('#drone_rover_view_rover_vehicles_modal').modal('show');
    })

    //
    // Standard Process for EarthSense Rover Events
    //

    var manage_drone_rover_plot_polygons_background_image_url;
    var manage_drone_rover_plot_polygons_background_image_width;
    var manage_drone_rover_plot_polygons_background_image_height;
    var manage_drone_rover_plot_polygons_background_filtered_side_span_image_url;
    var manage_drone_rover_plot_polygons_background_filtered_side_span_image_width;
    var manage_drone_rover_plot_polygons_background_filtered_side_span_image_height;
    var manage_drone_rover_plot_polygons_background_filtered_side_height_image_url;
    var manage_drone_rover_plot_polygons_background_filtered_side_height_image_width;
    var manage_drone_rover_plot_polygons_background_filtered_side_height_image_height;
    var manage_drone_rover_plot_polygons_drone_run_project_ids_in_same_orthophoto = [];
    var manage_drone_rover_plot_polygons_drone_run_project_names_in_same_orthophoto = [];
    var manage_drone_rover_plot_polygons_field_trial_ids_in_same_orthophoto = [];
    var manage_drone_rover_plot_polygons_field_trial_names_in_same_orthophoto = [];
    var manage_drone_rover_plot_polygons_phenotype_time = '';
    var manage_drone_rover_plot_polygon_process_click_type = '';
    var manage_drone_rover_plot_polygons_field_trial_layout_responses = {};
    var manage_drone_rover_plot_polygons_field_trial_layout_response_names = [];
    var manage_drone_rover_plot_polygons_field_trial_layout_responses_designs = {};
    var manage_drone_rover_plot_polygons_available_stock_names = [];
    var manage_drone_rover_plot_polygons_plot_names_colors = {};
    var manage_drone_rover_plot_polygons_plot_names_plot_numbers = {};
    var manage_drone_rover_plot_polygons_num_plots = 0;
    var manage_drone_rover_plot_polygons_plot_polygon_vertical_lines = [];
    var manage_drone_rover_plot_polygons_plot_polygon_horizontal_lines = [];
    var manage_drone_rover_plot_polygons_plot_polygon_boundaries = [];
    var manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned = {};
    var manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned_map = {};
    var manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned_squares = [];
    var manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned_plot_names = [];
    var manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned_plot_numbers = [];

    var manage_drone_rover_plot_polygons_plot_polygon_phenotypes = {};
    var manage_drone_rover_plot_polygons_plot_polygon_phenotypes_traits = {};

    var svgElementFilteredImage;
    var svgElementFilteredImageSideSpan;
    var svgElementFilteredImageSideHeight;

    var manage_drone_rover_plot_polygons_stroke_width = 4;
    var manage_drone_rover_plot_polygons_stroke_color = "red";

    var manage_drone_rover_plot_polygons_private_company_id = $('#plot_polygon_process_private_company_id').val();
    var manage_drone_rover_plot_polygons_private_company_is_private = $('#plot_polygon_process_private_company_is_private').val();
    var manage_drone_rover_plot_polygons_field_trial_id = $('#plot_polygon_process_field_trial_id').val();
    var manage_drone_rover_plot_polygons_field_trial_name = $('#plot_polygon_process_field_trial_name').val();
    var manage_drone_rover_plot_polygons_drone_run_project_id = $('#plot_polygon_process_drone_run_project_id').val();
    var manage_drone_rover_plot_polygons_drone_run_project_name = $('#plot_polygon_process_drone_run_project_name').val();
    var manage_drone_rover_plot_polygons_original_image_id = $('#plot_polygon_process_original_image_id').val();
    var manage_drone_rover_plot_polygons_filtered_image_id = $('#plot_polygon_process_filtered_image_id').val();
    var manage_drone_rover_plot_polygons_filtered_side_span_image_id = $('#plot_polygon_process_filtered_side_span_image_id').val();
    var manage_drone_rover_plot_polygons_filtered_side_height_image_id = $('#plot_polygon_process_filtered_side_height_image_id').val();
    var manage_drone_rover_plot_polygons_collection_number = $('#plot_polygon_process_collection_number').val();
    var manage_drone_rover_plot_polygons_collection_project_id = $('#plot_polygon_process_collection_project_id').val();
    var manage_drone_rover_plot_polygons_database_field_name = $('#plot_polygon_process_database_field_name').val();

    jQuery.ajax({
        url: '/api/drone_imagery/get_field_trial_drone_run_projects_in_same_orthophoto?drone_run_project_id=' + manage_drone_rover_plot_polygons_drone_run_project_id + '&field_trial_project_id=' + manage_drone_rover_plot_polygons_field_trial_id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
        },
        success: function (response) {
            // console.log(response);
            manage_drone_rover_plot_polygons_drone_run_project_ids_in_same_orthophoto = response.drone_run_project_ids;
            manage_drone_rover_plot_polygons_drone_run_project_names_in_same_orthophoto = response.drone_run_project_names;
            manage_drone_rover_plot_polygons_field_trial_ids_in_same_orthophoto = response.drone_run_field_trial_ids;
            manage_drone_rover_plot_polygons_field_trial_names_in_same_orthophoto = response.drone_run_field_trial_names;

            manage_drone_rover_plot_polygons_field_trial_layout_responses = response.drone_run_all_field_trial_layouts;
            manage_drone_rover_plot_polygons_field_trial_layout_response_names = response.drone_run_all_field_trial_names;

            var field_trial_layout_counter = 0;
            for (var key in manage_drone_rover_plot_polygons_field_trial_layout_responses) {
                if (manage_drone_rover_plot_polygons_field_trial_layout_responses.hasOwnProperty(key)) {
                    var response = manage_drone_rover_plot_polygons_field_trial_layout_responses[key];
                    var layout = response.output;

                    for (var i = 1; i < layout.length; i++) {
                        manage_drone_rover_plot_polygons_available_stock_names.push(layout[i][0]);
                    }
                    droneRoverDrawLayoutTable(response, {}, 'drone_rover_plot_polygons_process_trial_layout_div_' + field_trial_layout_counter, 'drone_rover_plot_polygons_process_layout_table_' + field_trial_layout_counter);

                    manage_drone_rover_plot_polygons_field_trial_layout_responses_designs[key] = {};
                    field_trial_layout_counter = field_trial_layout_counter + 1;
                }
            }

            var plot_polygons_field_trial_names_order = manage_drone_rover_plot_polygons_field_trial_layout_response_names;

            for (var plot_polygons_field_trial_name_iterator = 0; plot_polygons_field_trial_name_iterator < plot_polygons_field_trial_names_order.length; plot_polygons_field_trial_name_iterator++) {
                var plot_polygons_field_trial_names_order_current = plot_polygons_field_trial_names_order[plot_polygons_field_trial_name_iterator];
                var field_trial_layout_response_current = manage_drone_rover_plot_polygons_field_trial_layout_responses[plot_polygons_field_trial_names_order_current];

                var randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);

                var plot_polygons_layout = field_trial_layout_response_current.output;
                for (var i = 1; i < plot_polygons_layout.length; i++) {
                    var plot_polygons_plot_number = Number(plot_polygons_layout[i][2]);
                    var plot_polygons_plot_name = plot_polygons_layout[i][0];

                    manage_drone_rover_plot_polygons_plot_names_colors[plot_polygons_plot_name] = randomColor;
                    manage_drone_rover_plot_polygons_plot_names_plot_numbers[plot_polygons_plot_name] = plot_polygons_plot_number;
                    manage_drone_rover_plot_polygons_field_trial_layout_responses_designs[plot_polygons_field_trial_names_order_current][plot_polygons_plot_number] = plot_polygons_plot_name;
                }
            }
            // console.log(manage_drone_rover_plot_polygons_field_trial_layout_responses_designs);

        },
        error: function (response) {
            alert('Error getting other field trial rover events in the same rover event!');
        }
    });

    showPlotPolygonStartRoverSVG('drone_rover_plot_polygons_process_top_section', 'drone_rover_plot_polygons_process_load_div');


    function droneRoverDrawLayoutTable(response, plot_polygons, layout_div_id, layout_table_div_id) {
        var output = response.output;
        var header = output[0];
        var html = '<p>Field Trial: <b>' + response.trial_name + '</b></p><table class="display table-borders " id="' + layout_table_div_id + '"><thead><tr>';
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
        html = html + '</tbody></table><hr>';
        $('#' + layout_div_id).html(html);
        $('#' + layout_table_div_id).DataTable();
    }

    function showPlotPolygonStartRoverSVG(info_div_id, load_div_id) {
        jQuery.ajax({
            url: '/api/drone_imagery/get_image?image_id=' + manage_drone_rover_plot_polygons_filtered_image_id,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
                $("#working_modal").modal("show");
            },
            success: function (response) {
                console.log(response);

                manage_drone_rover_plot_polygons_background_image_url = response.image_url;

                manage_drone_rover_plot_polygons_background_image_width = parseInt(response.image_width);
                manage_drone_rover_plot_polygons_background_image_height = parseInt(response.image_height);

                var top_section_html = '<p>Total Image Width: ' + manage_drone_rover_plot_polygons_background_image_width + 'px. Total Image Height: ' + manage_drone_rover_plot_polygons_background_image_height + 'px.</p>';

                $('#' + info_div_id).html(top_section_html);

                d3.select('#drone_rover_plot_polygons_process_image_div_svg').selectAll("*").remove();
                svgElementFilteredImage = d3.select('#drone_rover_plot_polygons_process_image_div_svg').append("svg")
                    .attr("width", manage_drone_rover_plot_polygons_background_image_width)
                    .attr("height", manage_drone_rover_plot_polygons_background_image_height)
                    .attr("id", 'drone_rover_plot_polygons_process_image_div_svg_area')
                    .attr("x_pos", 0)
                    .attr("y_pos", 0)
                    .attr("x", 0)
                    .attr("y", 0)
                    .on("click", function () {
                        var coords = d3.mouse(this);
                        var PosX = Math.round(coords[0]);
                        var PosY = Math.round(coords[1]);

                        if (manage_drone_rover_plot_polygon_process_click_type == '') {
                            //alert('X Coordinate: '+PosX+'. Y Coordinate: '+PosY+'.');
                        }
                    });

                var imageGroup = svgElementFilteredImage.append("g")
                    .attr("x_pos", 0)
                    .attr("y_pos", 0)
                    .attr("x", 0)
                    .attr("y", 0);

                var imageElem = imageGroup.append("image")
                    .attr("x_pos", 0)
                    .attr("y_pos", 0)
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("xlink:href", manage_drone_rover_plot_polygons_background_image_url)
                    .attr("height", manage_drone_rover_plot_polygons_background_image_height)
                    .attr("width", manage_drone_rover_plot_polygons_background_image_width);

                svgElementFilteredImage.append('rect')
                    .attr('class', 'zoom')
                    .attr('cursor', 'move')
                    .attr('fill', 'none')
                    .attr('pointer-events', 'all')
                    .attr('width', manage_drone_rover_plot_polygons_background_image_width)
                    .attr('height', manage_drone_rover_plot_polygons_background_image_height);

                $('#' + load_div_id).hide();

                jQuery.ajax({
                    url: '/api/drone_imagery/get_image?image_id=' + manage_drone_rover_plot_polygons_filtered_side_span_image_id,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
                    },
                    success: function (response) {
                        console.log(response);

                        manage_drone_rover_plot_polygons_background_filtered_side_span_image_url = response.image_url;

                        manage_drone_rover_plot_polygons_background_filtered_side_span_image_width = parseInt(response.image_width);
                        manage_drone_rover_plot_polygons_background_filtered_side_span_image_height = parseInt(response.image_height);

                        d3.select('#drone_rover_plot_polygons_process_image_div_topview_svg').selectAll("*").remove();
                        svgElementFilteredImageSideSpan = d3.select('#drone_rover_plot_polygons_process_image_div_topview_svg').append("svg")
                            .attr("width", manage_drone_rover_plot_polygons_background_filtered_side_span_image_width)
                            .attr("height", manage_drone_rover_plot_polygons_background_filtered_side_span_image_height)
                            .attr("id", 'drone_rover_plot_polygons_process_image_div_topview_svg_area')
                            .attr("x_pos", 0)
                            .attr("y_pos", 0)
                            .attr("x", 0)
                            .attr("y", 0)
                            .on("click", function () {
                                var coords = d3.mouse(this);
                                var PosX = Math.round(coords[0]);
                                var PosY = Math.round(coords[1]);

                                if (manage_drone_rover_plot_polygon_process_click_type == '') {
                                    //alert('X Coordinate: '+PosX+'. Y Coordinate: '+PosY+'.');
                                }
                            });

                        var imageGroup = svgElementFilteredImageSideSpan.append("g")
                            .attr("x_pos", 0)
                            .attr("y_pos", 0)
                            .attr("x", 0)
                            .attr("y", 0);

                        var imageElem = imageGroup.append("image")
                            .attr("x_pos", 0)
                            .attr("y_pos", 0)
                            .attr("x", 0)
                            .attr("y", 0)
                            .attr("xlink:href", manage_drone_rover_plot_polygons_background_filtered_side_span_image_url)
                            .attr("height", manage_drone_rover_plot_polygons_background_filtered_side_span_image_height)
                            .attr("width", manage_drone_rover_plot_polygons_background_filtered_side_span_image_width);

                        svgElementFilteredImageSideSpan.append('rect')
                            .attr('class', 'zoom')
                            .attr('cursor', 'move')
                            .attr('fill', 'none')
                            .attr('pointer-events', 'all')
                            .attr('width', manage_drone_rover_plot_polygons_background_filtered_side_span_image_width)
                            .attr('height', manage_drone_rover_plot_polygons_background_filtered_side_span_image_height);

                        jQuery.ajax({
                            url: '/api/drone_imagery/get_image?image_id=' + manage_drone_rover_plot_polygons_filtered_side_height_image_id,
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
                            },
                            success: function (response) {
                                console.log(response);

                                manage_drone_rover_plot_polygons_background_filtered_side_height_image_url = response.image_url;

                                manage_drone_rover_plot_polygons_background_filtered_side_height_image_width = parseInt(response.image_width);
                                manage_drone_rover_plot_polygons_background_filtered_side_height_image_height = parseInt(response.image_height);

                                d3.select('#drone_rover_plot_polygons_process_image_div_sideheight_svg').selectAll("*").remove();
                                svgElementFilteredImageSideHeight = d3.select('#drone_rover_plot_polygons_process_image_div_sideheight_svg').append("svg")
                                    .attr("width", manage_drone_rover_plot_polygons_background_filtered_side_height_image_width)
                                    .attr("height", manage_drone_rover_plot_polygons_background_filtered_side_height_image_height)
                                    .attr("id", 'drone_rover_plot_polygons_process_image_div_sideheight_svg_area')
                                    .attr("x_pos", 0)
                                    .attr("y_pos", 0)
                                    .attr("x", 0)
                                    .attr("y", 0)
                                    .on("click", function () {
                                        var coords = d3.mouse(this);
                                        var PosX = Math.round(coords[0]);
                                        var PosY = Math.round(coords[1]);

                                        if (manage_drone_rover_plot_polygon_process_click_type == '') {
                                            //alert('X Coordinate: '+PosX+'. Y Coordinate: '+PosY+'.');
                                        }
                                    });

                                var imageGroup = svgElementFilteredImageSideHeight.append("g")
                                    .attr("x_pos", 0)
                                    .attr("y_pos", 0)
                                    .attr("x", 0)
                                    .attr("y", 0);

                                var imageElem = imageGroup.append("image")
                                    .attr("x_pos", 0)
                                    .attr("y_pos", 0)
                                    .attr("x", 0)
                                    .attr("y", 0)
                                    .attr("xlink:href", manage_drone_rover_plot_polygons_background_filtered_side_height_image_url)
                                    .attr("height", manage_drone_rover_plot_polygons_background_filtered_side_height_image_height)
                                    .attr("width", manage_drone_rover_plot_polygons_background_filtered_side_height_image_width);

                                svgElementFilteredImageSideHeight.append('rect')
                                    .attr('class', 'zoom')
                                    .attr('cursor', 'move')
                                    .attr('fill', 'none')
                                    .attr('pointer-events', 'all')
                                    .attr('width', manage_drone_rover_plot_polygons_background_filtered_side_height_image_width)
                                    .attr('height', manage_drone_rover_plot_polygons_background_filtered_side_height_image_height);

                                jQuery.ajax({
                                    url: '/api/drone_rover/get_collection?drone_run_project_id=' + manage_drone_rover_plot_polygons_drone_run_project_id + '&collection_number=' + manage_drone_rover_plot_polygons_collection_number,
                                    beforeSend: function (xhr) {
                                        xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
                                    },
                                    success: function (response) {
                                        console.log(response);

                                        var start_range = response['run_info']['tracker']['start_range'];
                                        var stop_range = response['run_info']['tracker']['stop_range'];
                                        var start_column = response['run_info']['tracker']['start_column'];
                                        var stop_column = response['run_info']['tracker']['stop_column'];
                                        var range_min = response['run_info']['field']['range_min'];
                                        var range_max = response['run_info']['field']['range_max'];
                                        var column_min = response['run_info']['field']['column_min'];
                                        var column_max = response['run_info']['field']['column_max'];

                                        var html = "<table class='display '><thead><tr><th>Collection Field</th><th>Database Field Trial</th><th>Range Min</th><th>Range Max</th><th>Column Min</th><th>Column Max</th><th>Rows Per Column</th><th>Plot Length</th><th>Row Width</th><th>Planting Spacing</th><th>Crop</th></tr></thead><tbody>";
                                        html = html + "<tr><td>" + response['run_info']['field']['name'] + "</td><td>" + manage_drone_rover_plot_polygons_database_field_name + "</td><td>" + range_min + "</td><td>" + range_max + "</td><td>" + column_min + "</td><td>" + column_max + "</td><td>" + response['run_info']['field']['rows_per_column'] + "</td><td>" + response['run_info']['field']['plot_length'] + "</td><td>" + response['run_info']['field']['row_width'] + "</td><td>" + response['run_info']['field']['planting_spacing'] + "</td><td>" + response['run_info']['field']['crop_name'] + "</td></tr>";
                                        html = html + "</tbody></thead></table>";

                                        html = html + "<table class='display '><thead><tr><th>Collection</th><th>Start Range</th><th>Stop Range</th><th>Start Column</th><th>Stop Column</th></tr></thead><tbody>";
                                        html = html + "<tr><td>" + manage_drone_rover_plot_polygons_collection_number + "</td><td>" + start_range + "</td><td>" + stop_range + "</td><td>" + start_column + "</td><td>" + stop_column + "</td></tr>";
                                        html = html + "</tbody></thead></table>";

                                        html = html + "<div class='card bg-light'><div class='form-horizontal'><div class='form-group'><label class='col-sm-3 control-label'>Number Plots: </label><div class='col-sm-9'><input class='form-control' type='number' id='manage_drone_rover_plot_polygon_process_num_plots' /></div></div></div></div></div>";

                                        $('#plot_polygon_process_collection_range_start').val(start_range);
                                        $('#plot_polygon_process_collection_range_stop').val(stop_range);
                                        $('#plot_polygon_process_collection_column_start').val(start_column);
                                        $('#plot_polygon_process_collection_column_stop').val(stop_column);
                                        $('#plot_polygon_process_collection_range_min').val(range_min);
                                        $('#plot_polygon_process_collection_range_max').val(range_max);
                                        $('#plot_polygon_process_collection_column_min').val(column_min);
                                        $('#plot_polygon_process_collection_column_max').val(column_max);

                                        $('#drone_rover_plot_polygons_process_run_info_section').html(html);

                                        var range_diff = Math.abs(stop_range - start_range);
                                        var column_diff = Math.abs(stop_column - start_column);

                                        if (range_diff == 0 && column_diff == 0) {
                                            alert('The tracker.json says 0 ranges and 0 columns were passed! Manually specify the number of plots below.');
                                        }
                                        else if (range_diff > 0 && column_diff > 0) {
                                            alert('The tracker.json says more than 0 ranges and more than 0 columns were passed! Manually specify the number of plots below.');
                                        }
                                        else {
                                            var current_diff = 0;
                                            if (range_diff > 0) {
                                                current_diff = range_diff;
                                            }
                                            if (column_diff > 0) {
                                                current_diff = column_diff;
                                            }
                                            manage_drone_rover_plot_polygons_num_plots = current_diff + 1;
                                            $('#manage_drone_rover_plot_polygon_process_num_plots').val(manage_drone_rover_plot_polygons_num_plots);

                                            changeNumPlotsDrawVerticalLines();
                                        }

                                        $("#working_modal").modal("hide");

                                        jQuery.ajax({
                                            type: 'GET',
                                            url: '/api/drone_imagery/get_weeks_after_planting_date?drone_run_project_id=' + manage_drone_rover_plot_polygons_drone_run_project_id,
                                            dataType: "json",
                                            beforeSend: function (xhr) {
                                                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
                                            },
                                            success: function (response) {
                                                console.log(response);
                                                if (response.error) {
                                                    alert(response.error);
                                                }

                                                var html = "<div class='card bg-light'><table class='display '><thead><tr><th>Field Trial</th><th>Planting Date</th><th>Imaging Event Date</th><th>Number of Weeks</th><th>Number of Days</th></tr></thead><tbody>";
                                                html = html + "<tr><td>" + response.trial_name + "</td><td>" + response.planting_date + "</td><td>" + response.drone_run_date + "</td><td>" + response.time_ontology_week_term + "</td><td>" + response.time_ontology_day_term + "</td></tr>";

                                                jQuery.ajax({
                                                    type: 'GET',
                                                    url: '/api/drone_imagery/get_weeks_after_planting_date?drone_run_project_ids=' + JSON.stringify(manage_drone_rover_plot_polygons_drone_run_project_ids_in_same_orthophoto),
                                                    dataType: "json",
                                                    beforeSend: function (xhr) {
                                                        xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
                                                    },
                                                    success: function (response) {
                                                        console.log(response);
                                                        if (response.error) {
                                                            alert(response.error);
                                                        }

                                                        for (var i = 0; i < response.length; i++) {
                                                            html = html + "<tr><td>" + response[i].trial_name + "</td><td>" + response[i].planting_date + "</td><td>" + response[i].drone_run_date + "</td><td>" + response[i].time_ontology_week_term + "</td><td>" + response[i].time_ontology_day_term + "</td></tr>";
                                                        }

                                                        html = html + '</tbody></table></div>';
                                                        $('#drone_rover_plot_polygon_process_week_term_div').html(html);

                                                    },
                                                    error: function (response) {
                                                        alert('Error getting time terms!');
                                                    }
                                                });

                                            },
                                            error: function (response) {
                                                alert('Error getting time terms!');
                                            }
                                        });

                                    },
                                    error: function (response) {
                                        alert('Error getting rover run info for collection!');
                                    }
                                });
                            },
                            error: function (response) {
                                $("#working_modal").modal("hide");
                                alert('Error retrieving rover point cloud plot polygon filtered side height image SVG!')
                            }
                        });

                    },
                    error: function (response) {
                        $("#working_modal").modal("hide");
                        alert('Error retrieving rover point cloud plot polygon filtered side span image SVG!')
                    }
                });
            },
            error: function (response) {
                alert('Error retrieving rover point cloud plot polygon image SVG!')
            }
        });
    }

    $(document).on('change', '#manage_drone_rover_plot_polygon_process_num_plots', function () {
        manage_drone_rover_plot_polygons_num_plots = $(this).val();
        changeNumPlotsDrawVerticalLines();
    });

    function changeNumPlotsDrawVerticalLines() {
        manage_drone_rover_plot_polygons_plot_polygon_vertical_lines = [];
        var average_plot_width = parseInt(manage_drone_rover_plot_polygons_background_image_width / manage_drone_rover_plot_polygons_num_plots);
        var current_width = 0;
        for (var i = 0; i <= manage_drone_rover_plot_polygons_num_plots; i++) {
            manage_drone_rover_plot_polygons_plot_polygon_vertical_lines.push([
                [current_width, 0],
                [current_width, manage_drone_rover_plot_polygons_background_image_height]
            ]);
            current_width = current_width + average_plot_width;
        }
        //console.log(manage_drone_rover_plot_polygons_plot_polygon_vertical_lines);

        manage_drone_rover_plot_polygons_plot_polygon_horizontal_lines = [
            [
                [0, manage_drone_rover_plot_polygons_background_image_height * 1 / 3],
                [manage_drone_rover_plot_polygons_background_image_width, manage_drone_rover_plot_polygons_background_image_height * 1 / 3]
            ],
            [
                [0, manage_drone_rover_plot_polygons_background_image_height * 2 / 3],
                [manage_drone_rover_plot_polygons_background_image_width, manage_drone_rover_plot_polygons_background_image_height * 2 / 3]
            ]
        ];

        drawRoverPlotLinesFilteredImage();
        drawRoverPlotLinesFilteredSideSpanImage();
        drawRoverPlotLinesFilteredSideHeightImage();
        evaluatePlotPolygonBoundaries();
        drawRoverPlotPolygonAssignInput();
    }

    function evaluatePlotPolygonBoundaries() {
        manage_drone_rover_plot_polygons_plot_polygon_boundaries = [];

        for (var i = 0; i < manage_drone_rover_plot_polygons_num_plots; i++) {
            manage_drone_rover_plot_polygons_plot_polygon_boundaries.push([
                [manage_drone_rover_plot_polygons_plot_polygon_vertical_lines[i][0][0], parseInt(manage_drone_rover_plot_polygons_plot_polygon_horizontal_lines[0][0][1])],
                [manage_drone_rover_plot_polygons_plot_polygon_vertical_lines[i + 1][0][0], parseInt(manage_drone_rover_plot_polygons_plot_polygon_horizontal_lines[0][0][1])],
                [manage_drone_rover_plot_polygons_plot_polygon_vertical_lines[i + 1][0][0], parseInt(manage_drone_rover_plot_polygons_plot_polygon_horizontal_lines[1][0][1])],
                [manage_drone_rover_plot_polygons_plot_polygon_vertical_lines[i][0][0], parseInt(manage_drone_rover_plot_polygons_plot_polygon_horizontal_lines[1][0][1])],
                [manage_drone_rover_plot_polygons_plot_polygon_vertical_lines[i][0][0], parseInt(manage_drone_rover_plot_polygons_plot_polygon_horizontal_lines[0][0][1])],
            ]);
        }
        // console.log(manage_drone_rover_plot_polygons_plot_polygon_boundaries);
    }

    function drawRoverPlotPolygonAssignInput() {
        var html = "<table class='display '><thead><tr><th>Field Name</th><th>Polygon Number</th><th>Plot Number</th></tr></thead><tbody>";
        for (var i = 0; i < manage_drone_rover_plot_polygons_num_plots; i++) {
            html = html + "<tr><td>" + manage_drone_rover_plot_polygons_database_field_name + "</td><td>" + i + "</td><td><input class='form-control input-sm' name='manage_drone_rover_plot_polgyons_assign_plot_number' data-polygon_number='" + i + "' /></td></tr>";
        }
        html = html + "</tbody></thead></table>";
        html = html + "<button class='btn btn-primary' id='manage_drone_rover_plot_polgyons_assign_plot_number_submit' >Assign Plot Polygons</button>&nbsp;&nbsp;&nbsp;&nbsp;<button class='btn btn-primary' id='manage_drone_rover_plot_polgyons_plot_number_submit' >Confirm and Save Plot Polygons</button>";

        $('#drone_rover_plot_polygon_process_generated_polygons_table').html(html);
    }

    $(document).on('click', '#manage_drone_rover_plot_polgyons_assign_plot_number_submit', function () {
        manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned = {};
        manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned_map = {};
        manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned_squares = [];
        manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned_plot_names = [];
        manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned_plot_numbers = [];

        if (manage_drone_rover_plot_polygons_num_plots < 1) {
            alert('There must be atleast one plot! Increase the plot number!');
            return false;
        }
        else {
            if (manage_drone_rover_plot_polygons_database_field_name in manage_drone_rover_plot_polygons_field_trial_layout_responses_designs) {
                $('input[name="manage_drone_rover_plot_polgyons_assign_plot_number"]').each(function () {
                    var plot_number = $(this).val();
                    var polygon_number = $(this).data('polygon_number');
                    if (plot_number != '' && plot_number != undefined) {
                        var plot_name = manage_drone_rover_plot_polygons_field_trial_layout_responses_designs[manage_drone_rover_plot_polygons_database_field_name][plot_number];
                        var polygon_square = manage_drone_rover_plot_polygons_plot_polygon_boundaries[polygon_number];

                        manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned[plot_name] = polygon_square;
                        manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned_map[polygon_number] = plot_number;
                        manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned_squares.push(polygon_square);
                        manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned_plot_names.push(plot_name);
                        manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned_plot_numbers.push(plot_number);
                    }
                });
                drawRoverPlotPolygonConfirm();
            }
            else {
                alert('The field trial ' + manage_drone_rover_plot_polygons_database_field_name + ' is not in the connected field trials!');
                return false;
            }
        }
        console.log(manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned);
    });

    function drawRoverPlotPolygonConfirm() {
        var focus = svgElementFilteredImageSideSpan.append("g")
            .attr("x_pos", 0)
            .attr("y_pos", 0)
            .attr("x", 0)
            .attr("y", 0);

        d3.select('#drone_rover_plot_polygons_process_image_div_svg').selectAll("text").remove();
        d3.select('#drone_rover_plot_polygons_process_image_div_topview_svg').selectAll("text").remove();
        d3.select('#drone_rover_plot_polygons_process_image_div_sideheight_svg').selectAll("text").remove();

        var fill_color = '#' + Math.floor(Math.random() * 16777215).toString(16);

        for (var i = 0; i < manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned_squares.length; i++) {
            var plot_poly = manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned_squares[i];
            var plot_name = manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned_plot_names[i];
            var plot_number = manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned_plot_numbers[i];

            focus.append('rect')
                .attr('x', plot_poly[0][0])
                .attr('y', plot_poly[0][1])
                .attr('width', plot_poly[1][0] - plot_poly[0][0])
                .attr('height', plot_poly[3][1] - plot_poly[0][1])
                .attr('stroke', 'black')
                .attr('fill', fill_color)
                .style("opacity", 0.5)
                .append("svg:title")
                .text(plot_name);

            focus.append("path")
                .datum(plot_poly)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", 4.5)
                .attr("d", line);

            focus.append("text")
                .attr("x", parseInt(plot_poly[0][0]) + 10)
                .attr("y", parseInt(plot_poly[0][1]) + 70)
                .style('fill', 'red')
                .style("font-size", "36px")
                .style("font-weight", 500)
                .attr("class", "visible")
                .text(plot_number)
                .append("svg:title")
                .text(plot_name);
        }
    }

    $(document).on('click', '#manage_drone_rover_plot_polgyons_plot_number_submit', function () {
        if (manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned_squares.length > 0) {
            Workflow.complete("#manage_drone_rover_plot_polgyons_plot_number_submit");
            Workflow.focus('#manage_drone_rover_plot_polygon_process_workflow', 1);
        }
        else {
            alert('Please assign plot numbers to polygon numbers first!');
            return false;
        }
    });

    var line = d3.line()
        .x(function (d) { return d[0]; })
        .y(function (d) { return d[1]; });

    let dragFilteredImage = d3.drag()
        .on('start', dragstartedFilteredImage)
        .on('drag', draggedFilteredImage)
        .on('end', dragendedFilteredImage);

    function dragstartedFilteredImage(d) {
        d3.select(this).raise().classed('active', true);
    }

    function draggedFilteredImage(d) {
        var x = d3.event.x;
        var y = d3.event.y;
        var line_index = d3.select(this).attr('line_index');
        var line_type = d3.select(this).attr('type');

        if (line_type == 'vertical') {
            manage_drone_rover_plot_polygons_plot_polygon_vertical_lines[line_index] = [[x, 0], [x, manage_drone_rover_plot_polygons_background_image_height]];
        }
    }

    function dragendedFilteredImage(d) {
        var x = d3.event.x;
        var y = d3.event.y;
        d3.select(this).classed('active', false);
        drawRoverPlotLinesFilteredImage();
        drawRoverPlotLinesFilteredSideSpanImage();
        drawRoverPlotLinesFilteredSideHeightImage();
        evaluatePlotPolygonBoundaries();
    }

    function drawRoverPlotLinesFilteredImage() {
        //console.log(manage_drone_rover_plot_polygons_plot_polygon_vertical_lines);

        d3.select('#drone_rover_plot_polygons_process_image_div_svg').selectAll("path").remove();
        d3.select('#drone_rover_plot_polygons_process_image_div_topview_svg').selectAll("path").remove();
        d3.select('#drone_rover_plot_polygons_process_image_div_sideheight_svg').selectAll("path").remove();

        d3.select('#drone_rover_plot_polygons_process_image_div_svg').selectAll("text").remove();
        d3.select('#drone_rover_plot_polygons_process_image_div_topview_svg').selectAll("text").remove();
        d3.select('#drone_rover_plot_polygons_process_image_div_sideheight_svg').selectAll("text").remove();

        d3.select('#drone_rover_plot_polygons_process_image_div_svg').selectAll("circle").remove();
        d3.select('#drone_rover_plot_polygons_process_image_div_topview_svg').selectAll("circle").remove();
        d3.select('#drone_rover_plot_polygons_process_image_div_sideheight_svg').selectAll("circle").remove();

        d3.select('#drone_rover_plot_polygons_process_image_div_svg').selectAll("rect").remove();
        d3.select('#drone_rover_plot_polygons_process_image_div_topview_svg').selectAll("rect").remove();
        d3.select('#drone_rover_plot_polygons_process_image_div_sideheight_svg').selectAll("rect").remove();

        var imageGroup = svgElementFilteredImage.append("g")
            .attr("x_pos", 0)
            .attr("y_pos", 0)
            .attr("x", 0)
            .attr("y", 0);

        for (var i = 0; i < manage_drone_rover_plot_polygons_plot_polygon_vertical_lines.length; i++) {
            var x = manage_drone_rover_plot_polygons_plot_polygon_vertical_lines[i];
            var x_pos = x[0][0] + 10;

            imageGroup.append("path")
                .datum(x)
                .attr("fill", "none")
                .attr("stroke", manage_drone_rover_plot_polygons_stroke_color)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", manage_drone_rover_plot_polygons_stroke_width)
                .attr("line_index", i)
                .attr("type", "vertical")
                .attr("d", line);

            imageGroup.append("text")
                .attr("x", x_pos)
                .attr("y", 50)
                .style('fill', manage_drone_rover_plot_polygons_stroke_color)
                .style("font-size", "36px")
                .style("font-weight", 500)
                .text(i);
        }

        imageGroup.selectAll('path')
            .call(dragFilteredImage);

    }

    let dragFilteredSideSpanImage = d3.drag()
        .on('start', dragstartedFilteredSideSpanImage)
        .on('drag', draggedFilteredSideSpanImage)
        .on('end', dragendedFilteredSideSpanImage);

    function dragstartedFilteredSideSpanImage(d) {
        d3.select(this).raise().classed('active', true);
    }

    function draggedFilteredSideSpanImage(d) {
        var x = d3.event.x;
        var y = d3.event.y;
        var line_index = d3.select(this).attr('line_index');
        var line_type = d3.select(this).attr('type');

        if (line_type == 'horizontal') {
            manage_drone_rover_plot_polygons_plot_polygon_horizontal_lines[line_index] = [[0, y], [manage_drone_rover_plot_polygons_background_image_width, y]];
        }
        if (line_type == 'vertical') {
            manage_drone_rover_plot_polygons_plot_polygon_vertical_lines[line_index] = [[x, 0], [x, manage_drone_rover_plot_polygons_background_image_height]];
        }
    }

    function dragendedFilteredSideSpanImage(d) {
        var x = d3.event.x;
        var y = d3.event.y;
        d3.select(this).classed('active', false);
        drawRoverPlotLinesFilteredImage();
        drawRoverPlotLinesFilteredSideSpanImage();
        drawRoverPlotLinesFilteredSideHeightImage();
        evaluatePlotPolygonBoundaries();
    }

    function drawRoverPlotLinesFilteredSideSpanImage() {
        //console.log(manage_drone_rover_plot_polygons_plot_polygon_vertical_lines);

        var imageGroup = svgElementFilteredImageSideSpan.append("g")
            .attr("x_pos", 0)
            .attr("y_pos", 0)
            .attr("x", 0)
            .attr("y", 0);

        for (var i = 0; i < manage_drone_rover_plot_polygons_plot_polygon_vertical_lines.length; i++) {
            var x = manage_drone_rover_plot_polygons_plot_polygon_vertical_lines[i];
            var x_pos = x[0][0] + 10;

            imageGroup.append("path")
                .datum(x)
                .attr("fill", "none")
                .attr("stroke", manage_drone_rover_plot_polygons_stroke_color)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", manage_drone_rover_plot_polygons_stroke_width)
                .attr("line_index", i)
                .attr("type", "vertical")
                .attr("d", line);

            imageGroup.append("text")
                .attr("x", x_pos)
                .attr("y", manage_drone_rover_plot_polygons_plot_polygon_horizontal_lines[0][0][1] + 70)
                .style('fill', manage_drone_rover_plot_polygons_stroke_color)
                .style("font-size", "36px")
                .style("font-weight", 500)
                .text(i);
        }

        for (var i = 0; i < manage_drone_rover_plot_polygons_plot_polygon_horizontal_lines.length; i++) {
            var x = manage_drone_rover_plot_polygons_plot_polygon_horizontal_lines[i];

            imageGroup.append("path")
                .datum(x)
                .attr("fill", "none")
                .attr("stroke", manage_drone_rover_plot_polygons_stroke_color)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", manage_drone_rover_plot_polygons_stroke_width)
                .attr("line_index", i)
                .attr("type", "horizontal")
                .attr("d", line);
        }

        imageGroup.selectAll('path')
            .call(dragFilteredSideSpanImage);

    }

    let dragFilteredSideHeightImage = d3.drag()
        .on('start', dragstartedFilteredSideHeightImage)
        .on('drag', draggedFilteredSideHeightImage)
        .on('end', dragendedFilteredSideHeightImage);

    function dragstartedFilteredSideHeightImage(d) {
        d3.select(this).raise().classed('active', true);
    }

    function draggedFilteredSideHeightImage(d) {
        var x = d3.event.x;
        var y = d3.event.y;
        var line_index = d3.select(this).attr('line_index');
        var line_type = d3.select(this).attr('type');

        if (line_type == 'horizontal') {
            var ratio = x / manage_drone_rover_plot_polygons_background_filtered_side_height_image_width;
            var y_pos = parseInt(manage_drone_rover_plot_polygons_background_image_height * ratio);

            manage_drone_rover_plot_polygons_plot_polygon_horizontal_lines[line_index] = [[0, y_pos], [manage_drone_rover_plot_polygons_background_image_width, y_pos]];
        }
    }

    function dragendedFilteredSideHeightImage(d) {
        var x = d3.event.x;
        var y = d3.event.y;
        d3.select(this).classed('active', false);
        drawRoverPlotLinesFilteredImage();
        drawRoverPlotLinesFilteredSideSpanImage();
        drawRoverPlotLinesFilteredSideHeightImage();
        evaluatePlotPolygonBoundaries();
    }

    function drawRoverPlotLinesFilteredSideHeightImage() {
        //console.log(manage_drone_rover_plot_polygons_plot_polygon_vertical_lines);

        var imageGroup = svgElementFilteredImageSideHeight.append("g")
            .attr("x_pos", 0)
            .attr("y_pos", 0)
            .attr("x", 0)
            .attr("y", 0);

        for (var i = 0; i < manage_drone_rover_plot_polygons_plot_polygon_horizontal_lines.length; i++) {
            var x = manage_drone_rover_plot_polygons_plot_polygon_horizontal_lines[i];
            var y = x[0][1];
            var ratio = y / manage_drone_rover_plot_polygons_background_image_height;
            var x_pos = parseInt(manage_drone_rover_plot_polygons_background_filtered_side_height_image_width * ratio);

            var lines_horizontal_display = [
                [x_pos, 0],
                [x_pos, manage_drone_rover_plot_polygons_background_filtered_side_height_image_height]
            ];

            imageGroup.append("path")
                .datum(lines_horizontal_display)
                .attr("fill", "none")
                .attr("stroke", manage_drone_rover_plot_polygons_stroke_color)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .attr("stroke-width", manage_drone_rover_plot_polygons_stroke_width)
                .attr("line_index", i)
                .attr("type", "horizontal")
                .attr("d", line);
        }

        imageGroup.selectAll('path')
            .call(dragFilteredSideHeightImage);

    }

    $('#manage_drone_rover_plot_polygon_process_phenotypes_step').click(function () {
        var selected = [];
        $('input[name="drone_rover_plot_polygons_process_phenotypes_select"]:checked').each(function () {
            selected.push($(this).val());
        });
        if (selected.length < 1) {
            alert('Please select at least one phenotype!');
            return false;
        } else {
            var manage_drone_rover_template = {
                num_plots: manage_drone_rover_plot_polygons_num_plots,
                image_width: manage_drone_rover_plot_polygons_background_filtered_side_span_image_width,
                image_height: manage_drone_rover_plot_polygons_background_filtered_side_span_image_height,
                vertical_lines: manage_drone_rover_plot_polygons_plot_polygon_vertical_lines,
                horizontal_lines: manage_drone_rover_plot_polygons_plot_polygon_horizontal_lines,
                polygon_number_to_plot_number: manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned_map
            };

            jQuery.ajax({
                type: 'POST',
                url: '/api/drone_rover/plot_polygons_process_apply',
                dataType: "json",
                data: {
                    'drone_run_project_id': manage_drone_rover_plot_polygons_drone_run_project_id,
                    'drone_run_collection_number': manage_drone_rover_plot_polygons_collection_number,
                    'drone_run_collection_project_id': manage_drone_rover_plot_polygons_collection_project_id,
                    'phenotype_types': JSON.stringify(selected),
                    'field_trial_id': manage_drone_rover_plot_polygons_field_trial_id,
                    'polygon_template_metadata': JSON.stringify(manage_drone_rover_template),
                    'polygons_to_plot_names': JSON.stringify(manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned),
                    'company_id': manage_drone_rover_plot_polygons_private_company_id,
                    'is_private': manage_drone_rover_plot_polygons_private_company_is_private
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
                },
                success: function (response) {
                    console.log(response);
                    if (response.error) {
                        alert(response.error);
                    }
                },
                error: function (response) {
                    alert('Error saving rover process assigned plot polygons!')
                }
            });

            Workflow.complete("#manage_drone_rover_plot_polygon_process_phenotypes_step");
            $('#drone_rover_plot_polygons_process_complete_dialog').modal('show');
        }
    });

    $('#drone_rover_plot_polygons_process_correlate_phenotype_trait_submit').click(function () {

        if (manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned_plot_names.length == 0) {
            alert('Please assign the plot polygons to plot numbers above first!');
            return false;
        }

        var selected_trait_ids = $('#drone_rover_plot_polygons_process_correlate_phenotype_trait_select').val();
        console.log(selected_trait_ids);

        if (!selected_trait_ids || selected_trait_ids.length < 1) {
            alert('Please select at least one trait!');
            return false;
        }
        else {
            var manage_drone_rover_template = {
                num_plots: manage_drone_rover_plot_polygons_num_plots,
                image_width: manage_drone_rover_plot_polygons_background_filtered_side_span_image_width,
                image_height: manage_drone_rover_plot_polygons_background_filtered_side_span_image_height,
                vertical_lines: manage_drone_rover_plot_polygons_plot_polygon_vertical_lines,
                horizontal_lines: manage_drone_rover_plot_polygons_plot_polygon_horizontal_lines,
                polygon_number_to_plot_number: manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned_map
            };

            jQuery.ajax({
                type: 'POST',
                url: '/api/drone_rover/plot_polygons_process_apply',
                dataType: "json",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
                    $("#working_modal").modal("show");
                },
                data: {
                    'drone_run_project_id': manage_drone_rover_plot_polygons_drone_run_project_id,
                    'drone_run_collection_number': manage_drone_rover_plot_polygons_collection_number,
                    'drone_run_collection_project_id': manage_drone_rover_plot_polygons_collection_project_id,
                    'phenotype_types': JSON.stringify(selected),
                    'field_trial_id': manage_drone_rover_plot_polygons_field_trial_id,
                    'polygon_template_metadata': JSON.stringify(manage_drone_rover_template),
                    'polygons_to_plot_names': JSON.stringify(manage_drone_rover_plot_polygons_plot_polygon_boundaries_assigned),
                    'company_id': manage_drone_rover_plot_polygons_private_company_id,
                    'is_private': manage_drone_rover_plot_polygons_private_company_is_private,
                    'is_test': 1
                },
                success: function (response) {
                    console.log(response);
                    if (response.error) {
                        alert(response.error);
                    }
                    else {
                        manage_drone_rover_plot_polygons_plot_polygon_phenotypes = response.pheno_data;
                        manage_drone_rover_plot_polygons_plot_polygon_phenotypes_traits = response.traits;

                        jQuery.ajax({
                            type: 'POST',
                            url: '/ajax/breeders/trial/' + manage_drone_rover_plot_polygons_field_trial_id + '/correlate_traits',
                            data: {
                                'trait_ids': JSON.stringify(selected_trait_ids),
                                'observation_unit_level': 'plot',
                                'correlation_type': 'pearson',
                                'additional_pheno': JSON.stringify(manage_drone_rover_plot_polygons_plot_polygon_phenotypes),
                                'additional_traits': JSON.stringify(manage_drone_rover_plot_polygons_plot_polygon_phenotypes_traits)
                            },
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
                            },
                            success: function (response) {
                                console.log(response);
                                $("#working_modal").modal("hide");
                                if (response.error) {
                                    alert(response.error);
                                }
                                else {
                                    var html = '<table class="display  "><thead><tr>';
                                    for (var i = 0; i < response.result[0].length; i++) {
                                        html = html + '<th>' + response.result[0][i] + '</th>';
                                    }
                                    html = html + '</tr></thead>';
                                    for (var i = 1; i < response.result.length; i++) {
                                        html = html + '<tr>';
                                        for (var j = 0; j < response.result[i].length; j++) {
                                            html = html + '<td>' + response.result[i][j] + '</td>';
                                        }
                                        html = html + '</tr>';
                                    }
                                    html = html + '</tbody></table>';
                                    $('#drone_rover_plot_polygons_process_correlate_phenotype_trait_results').html(html);

                                    jQuery.ajax({
                                        type: 'POST',
                                        url: '/api/drone_rover/plot_polygons_test_pheno_range_correlations',
                                        dataType: "json",
                                        data: {
                                            'trait_ids': JSON.stringify(selected_trait_ids),
                                            'observation_unit_level': 'plot',
                                            'correlation_type': 'pearson',
                                            'field_trial_id': manage_drone_rover_plot_polygons_field_trial_id,
                                            'additional_pheno': JSON.stringify(manage_drone_rover_plot_polygons_plot_polygon_phenotypes),
                                            'additional_traits': JSON.stringify(manage_drone_rover_plot_polygons_plot_polygon_phenotypes_traits),
                                            'range_min': $('#plot_polygon_process_collection_range_min').val(),
                                            'range_max': $('#plot_polygon_process_collection_range_max').val(),
                                            'column_min': $('#plot_polygon_process_collection_column_min').val(),
                                            'column_max': $('#plot_polygon_process_collection_column_max').val(),
                                            'range_start': $('#plot_polygon_process_collection_range_start').val(),
                                            'range_stop': $('#plot_polygon_process_collection_range_stop').val(),
                                            'column_start': $('#plot_polygon_process_collection_column_start').val(),
                                            'column_stop': $('#plot_polygon_process_collection_column_stop').val(),
                                            'columns_question': $('#drone_rover_plot_polygons_process_correlate_phenotype_columns_question').val()
                                        },
                                        beforeSend: function (xhr) {
                                            xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
                                        },
                                        success: function (response) {
                                            console.log(response);
                                            if (response.error) {
                                                alert(response.error);
                                            }
                                            else {
                                                var html = '<table class="display  "><thead><tr>';
                                                for (var i = 0; i < response.result[0].length; i++) {
                                                    html = html + '<th>' + response.result[0][i] + '</th>';
                                                }
                                                html = html + '</tr></thead>';
                                                for (var i = 1; i < response.result.length; i++) {
                                                    html = html + '<tr>';
                                                    for (var j = 0; j < response.result[i].length; j++) {
                                                        html = html + '<td>' + response.result[i][j] + '</td>';
                                                    }
                                                    html = html + '</tr>';
                                                }
                                                html = html + '</tbody></table>';
                                                $('#drone_rover_plot_polygons_process_correlate_test_phenotype_trait_results').html(html);
                                            }
                                        },
                                        error: function (response) {
                                            alert('Error doing correlation across other potential ranges!');
                                        }
                                    });

                                }
                            },
                            error: function (response) {
                                $("#working_modal").modal("hide");
                                alert('Error doing correlation!');
                            }
                        });
                    }
                },
                error: function (response) {
                    $("#working_modal").modal("hide");
                    alert('Error saving rover process assigned plot polygons!')
                }
            });
        }
    });

    $('#drone_rover_plot_polygons_process_complete_dialog').on('hidden.bs.modal', function () {
        location.reload();
    });

});
