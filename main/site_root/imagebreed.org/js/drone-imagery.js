
$(document).ready(function () {

    //
    // Calculate statistics
    //

    var manage_drone_imagery_calculate_statistics_field_trial_id_array = undefined;
    var manage_drone_imagery_calculate_statistics_field_trial_id_string = "";
    var manage_drone_imagery_calculate_statistics_observation_variable_type;
    var manage_drone_imagery_calculate_statistics_trait_ids = [];
    var manage_drone_imagery_calculate_statistics_trait_names = [];
    var manage_drone_imagery_calculate_statistics_accession_names = [];
    var manage_drone_imagery_calculate_statistics_plot_names = [];
    var manage_drone_imagery_calculate_statistics_select = '';
    var manage_drone_imagery_calculate_statistics_phenotype_training_file;
    var manage_drone_imagery_calculate_statistics_grm_training_file;
    var manage_drone_imagery_calculate_statistics_response = {};

    var manage_drone_imagery_calculate_statistics_multiseason_field_trial_id_array = undefined;
    var manage_drone_imagery_calculate_statistics_multiseason_field_trial_id_string = "";
    var manage_drone_imagery_calculate_statistics_multiseason_trait_ids = [];
    var manage_drone_imagery_calculate_statistics_multiseason_trait_names = [];
    var manage_drone_imagery_calculate_statistics_multiseason_accession_names = [];
    var manage_drone_imagery_calculate_statistics_multiseason_plot_names = [];
    var manage_drone_imagery_calculate_statistics_multiseason_select = '';
    var manage_drone_imagery_calculate_statistics_multiseason_phenotype_training_file;
    var manage_drone_imagery_calculate_statistics_multiseason_grm_training_file;
    var manage_drone_imagery_calculate_statistics_multiseason_response = {};

    $('#drone_imagery_calculate_statistics_link').click(function () {
        get_select_box('trials', 'drone_imagery_calculate_statistics_trial_select_div', { 'name': 'drone_imagery_calculate_statistics_field_trial_id', 'id': 'drone_imagery_calculate_statistics_field_trial_id', 'empty': 1, 'multiple': 1 });

        get_select_box('trials', 'drone_imagery_calculate_statistics_multiseason_trial_select_div', { 'name': 'drone_imagery_calculate_statistics_multiseason_field_trial_id', 'id': 'drone_imagery_calculate_statistics_multiseason_field_trial_id', 'empty': 1, 'multiple': 1 });

        $('#drone_imagery_calculate_statistics_dialog').modal('show');
    });

    $('#drone_imagery_calculate_statistics_intro_single_trial_multiseason_select_step').click(function () {
        $('#drone_imagery_calculate_statistics_single_trial_multiseason_dialog').modal('show');
    });

    $('#drone_imagery_calculate_statistics_intro_single_trial_select_step').click(function () {
        Workflow.complete("#drone_imagery_calculate_statistics_intro_single_trial_select_step");
        Workflow.focus('#drone_imagery_calculate_statistics_workflow', 1);
    });

    $('#drone_imagery_calculate_statistics_select_observation_variable_type').change(function () {
        manage_drone_imagery_calculate_statistics_observation_variable_type = $('#drone_imagery_calculate_statistics_select_observation_variable_type').val();
        if (manage_drone_imagery_calculate_statistics_observation_variable_type == 'time_ontology') {
            get_select_box('traits', 'drone_imagery_calculate_statistics_trait_select_div', { 'name': 'drone_imagery_calculate_statistics_trait_id_select', 'id': 'drone_imagery_calculate_statistics_trait_id_select', 'empty': 1, 'multiple': 1, 'size': 20, 'trial_ids': manage_drone_imagery_calculate_statistics_field_trial_id_string, 'stock_type': 'plot', 'contains_composable_cv_type': manage_drone_imagery_calculate_statistics_observation_variable_type, 'select_format': 'component_table_select' });
        }
        else {
            get_select_box('traits', 'drone_imagery_calculate_statistics_trait_select_div', { 'name': 'drone_imagery_calculate_statistics_trait_id_select', 'id': 'drone_imagery_calculate_statistics_trait_id_select', 'empty': 1, 'multiple': 1, 'size': 20, 'trial_ids': manage_drone_imagery_calculate_statistics_field_trial_id_string, 'stock_type': 'plot', 'contains_composable_cv_type': manage_drone_imagery_calculate_statistics_observation_variable_type });
        }
    });

    $('#drone_imagery_calculate_statistics_field_trial_select_step').click(function () {
        manage_drone_imagery_calculate_statistics_field_trial_id_array = undefined;
        manage_drone_imagery_calculate_statistics_field_trial_id_string = "";
        manage_drone_imagery_calculate_statistics_field_trial_id_array = $('#drone_imagery_calculate_statistics_field_trial_id').val();

        if (manage_drone_imagery_calculate_statistics_field_trial_id_array.length > 1) {
            alert('Please only select a single field trial for now!');
            return false;
        }

        manage_drone_imagery_calculate_statistics_field_trial_id_string = manage_drone_imagery_calculate_statistics_field_trial_id_array.join(",");
        manage_drone_imagery_calculate_statistics_observation_variable_type = $('#drone_imagery_calculate_statistics_select_observation_variable_type').val();
        if (manage_drone_imagery_calculate_statistics_field_trial_id_string == '') {
            alert('Please select a field trial first!');
        } else {
            if (manage_drone_imagery_calculate_statistics_observation_variable_type == 'time_ontology') {
                get_select_box('traits', 'drone_imagery_calculate_statistics_trait_select_div', { 'name': 'drone_imagery_calculate_statistics_trait_id_select', 'id': 'drone_imagery_calculate_statistics_trait_id_select', 'empty': 1, 'multiple': 1, 'size': 20, 'trial_ids': manage_drone_imagery_calculate_statistics_field_trial_id_string, 'stock_type': 'plot', 'contains_composable_cv_type': manage_drone_imagery_calculate_statistics_observation_variable_type, 'select_format': 'component_table_select' });
            }
            else {
                get_select_box('traits', 'drone_imagery_calculate_statistics_trait_select_div', { 'name': 'drone_imagery_calculate_statistics_trait_id_select', 'id': 'drone_imagery_calculate_statistics_trait_id_select', 'empty': 1, 'multiple': 1, 'size': 20, 'trial_ids': manage_drone_imagery_calculate_statistics_field_trial_id_string, 'stock_type': 'plot', 'contains_composable_cv_type': manage_drone_imagery_calculate_statistics_observation_variable_type });
            }

            get_select_box('traits', 'drone_imagery_calculate_statistics_permanent_env_structure_phenotype_correlation_select_div', { 'name': 'drone_imagery_calculate_statistics_permanent_env_structure_phenotype_correlation_select', 'id': 'drone_imagery_calculate_statistics_permanent_env_structure_phenotype_correlation_select', 'empty': 1, 'multiple': 1, 'size': 20, 'trial_ids': manage_drone_imagery_calculate_statistics_field_trial_id_string, 'stock_type': 'plot' });

            Workflow.complete("#drone_imagery_calculate_statistics_field_trial_select_step");
            Workflow.focus('#drone_imagery_calculate_statistics_workflow', 2);
        }
        return false;
    });

    $('#drone_imagery_calculate_statistics_multiseason_field_trial_select_step').click(function () {
        manage_drone_imagery_calculate_statistics_multiseason_field_trial_id_array = undefined;
        manage_drone_imagery_calculate_statistics_multiseason_field_trial_id_string = "";
        manage_drone_imagery_calculate_statistics_multiseason_field_trial_id_array = $('#drone_imagery_calculate_statistics_multiseason_field_trial_id').val();

        if (manage_drone_imagery_calculate_statistics_multiseason_field_trial_id_array.length > 1) {
            alert('Please only select a single field trial for now!');
            return false;
        }

        manage_drone_imagery_calculate_statistics_multiseason_field_trial_id_string = manage_drone_imagery_calculate_statistics_multiseason_field_trial_id_array.join(",");

        get_select_box('traits', 'drone_imagery_calculate_statistics_multiseason_trait_select_div', { 'name': 'drone_imagery_calculate_statistics_multiseason_trait_id_select', 'id': 'drone_imagery_calculate_statistics_multiseason_trait_id_select', 'empty': 1, 'multiple': 1, 'size': 20, 'trial_ids': manage_drone_imagery_calculate_statistics_multiseason_field_trial_id_string, 'stock_type': 'plot', 'contains_composable_cv_type': 'time_ontology', 'select_format': 'component_table_multiseason_select' });

        get_select_box('traits', 'drone_imagery_calculate_statistics_multiseason_permanent_env_structure_phenotype_correlation_select_div', { 'name': 'drone_imagery_calculate_statistics_multiseason_permanent_env_structure_phenotype_correlation_select', 'id': 'drone_imagery_calculate_statistics_multiseason_permanent_env_structure_phenotype_correlation_select', 'empty': 1, 'multiple': 1, 'size': 20, 'trial_ids': manage_drone_imagery_calculate_statistics_multiseason_field_trial_id_string, 'stock_type': 'plot' });

        Workflow.complete("#drone_imagery_calculate_statistics_multiseason_field_trial_select_step");
        Workflow.focus('#drone_imagery_calculate_statistics_single_trial_multiseason_workflow', 2);
    });

    $('#drone_imagery_calculate_statistics_trait_select_step').click(function () {
        get_select_box('genotyping_protocol', 'drone_imagery_calculate_statistics_genotyping_protocol_select_div', { 'name': 'drone_image_calculate_statistics_genotyping_protocol_select', 'id': 'drone_image_calculate_statistics_genotyping_protocol_select', 'empty': 1 });

        manage_drone_imagery_calculate_statistics_trait_ids = [];

        if (manage_drone_imagery_calculate_statistics_observation_variable_type == 'time_ontology') {
            $('input[name="drone_imagery_calculate_statistics_trait_id_select"]').each(function () {
                if (this.checked) {
                    manage_drone_imagery_calculate_statistics_trait_ids.push($(this).val());
                }
            });
        }
        else {
            manage_drone_imagery_calculate_statistics_trait_ids = $('#drone_imagery_calculate_statistics_trait_id_select').val();
            if (manage_drone_imagery_calculate_statistics_trait_ids == null || manage_drone_imagery_calculate_statistics_trait_ids == undefined) {
                alert('Please select at least one observation variable!');
                return false;
            }
        }

        if (manage_drone_imagery_calculate_statistics_trait_ids.length < 1) {
            alert('Please select at least one observation variable!');
        } else {
            Workflow.complete("#drone_imagery_calculate_statistics_trait_select_step");
            Workflow.focus('#drone_imagery_calculate_statistics_workflow', 3);
        }
        return false;
    });

    $('#drone_imagery_calculate_statistics_select_input').change(function () {
        $("#drone_imagery_calculate_statistics_relationship_matrix_type_select_div").val('').change();
        $("#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select").val('no').change();

        manage_drone_imagery_calculate_statistics_select = $('#drone_imagery_calculate_statistics_select_input').val();


        $('#drone_imagery_calculate_statistics_marss_div').hide();
        $('#drone_imagery_calculate_statistics_relationship_matrix_type_div').hide();
        $('#drone_imagery_calculate_statistics_genotyping_protocol_div').hide();
        $('#drone_imagery_calculate_statistics_analysis_save_blups_genetic_pe_residual').hide();
        $('#drone_imagery_calculate_statistics_analysis_save_blups_genetic').hide();
        $('#drone_imagery_calculate_statistics_analysis_save_blups_spatial').hide();
        $('#drone_imagery_calculate_statistics_analysis_save_blups_pe').hide();
        $('#drone_imagery_calculate_statistics_analysis_save_residuals').hide();
        $('#drone_imagery_calculate_statistics_analysis_save_fitted').hide();
        $('#drone_imagery_calculate_statistics_legendre_polynomial_div').hide();
        $('#drone_imagery_calculate_statistics_permanent_env_structure_div').hide();
        $('#drone_image_calculate_statistics_use_area_under_curve_select_div').hide();
        $('#drone_image_calculate_statistics_inversion_tolerance_select_div').hide();

        if (manage_drone_imagery_calculate_statistics_select == 'marss_germplasmname_block') {
            $('#drone_imagery_calculate_statistics_marss_div').show();
        }
        else if (manage_drone_imagery_calculate_statistics_select == 'lmer_germplasmname_replicate') {
            $('#drone_imagery_calculate_statistics_analysis_save_blups_genetic').show();
        }
        else if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_spatial_genetic_blups') {
            $('#drone_imagery_calculate_statistics_relationship_matrix_type_div').show();
            $('#drone_imagery_calculate_statistics_analysis_save_blups_genetic_pe_residual').show();
            $('#drone_image_calculate_statistics_inversion_tolerance_select_div').show();
        }
        else if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_temporal_random_regression_dap_genetic_blups' || manage_drone_imagery_calculate_statistics_select == 'sommer_grm_temporal_random_regression_gdd_genetic_blups') {
            $('#drone_imagery_calculate_statistics_relationship_matrix_type_div').show();
            $('#drone_imagery_calculate_statistics_analysis_save_blups_genetic').show();
            $('#drone_imagery_calculate_statistics_analysis_save_blups_pe').show();
            $('#drone_imagery_calculate_statistics_legendre_polynomial_div').show();
            $('#drone_image_calculate_statistics_use_area_under_curve_select_div').show();
            $('#drone_image_calculate_statistics_inversion_tolerance_select_div').show();
        }
        else if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_genetic_only_random_regression_dap_genetic_blups' || manage_drone_imagery_calculate_statistics_select == 'sommer_grm_genetic_only_random_regression_gdd_genetic_blups') {
            $('#drone_imagery_calculate_statistics_relationship_matrix_type_div').show();
            $('#drone_imagery_calculate_statistics_analysis_save_blups_genetic').show();
            $('#drone_imagery_calculate_statistics_legendre_polynomial_div').show();
            $('#drone_image_calculate_statistics_use_area_under_curve_select_div').show();
            $('#drone_image_calculate_statistics_inversion_tolerance_select_div').show();
        }
        else if (manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_dap_blups' || manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_gdd_blups' || manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_dap_blups' || manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_gdd_blups') {
            $('#drone_imagery_calculate_statistics_relationship_matrix_type_div').show();
            $('#drone_imagery_calculate_statistics_analysis_save_blups_genetic_pe_residual').show();
            $('#drone_imagery_calculate_statistics_legendre_polynomial_div').show();
            $('#drone_imagery_calculate_statistics_permanent_env_structure_div').show();
            $('#drone_image_calculate_statistics_use_area_under_curve_select_div').show();
            $('#drone_image_calculate_statistics_inversion_tolerance_select_div').show();
        }
        else if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_genetic_blups') {
            $('#drone_imagery_calculate_statistics_relationship_matrix_type_div').show();
            $('#drone_imagery_calculate_statistics_analysis_save_blups_genetic').show();
            $('#drone_image_calculate_statistics_inversion_tolerance_select_div').show();
        }
    });

    $('#drone_imagery_calculate_statistics_relationship_matrix_type_select_div').change(function () {
        if ($(this).val() == 'genotypes') {
            $('#drone_imagery_calculate_statistics_genotyping_protocol_div').show();
            $('#drone_imagery_calculate_statistics_htp_phenotypes_rel_matrix_div').hide();
        }
        else if ($(this).val() == 'htp_phenotypes') {
            $('#drone_imagery_calculate_statistics_genotyping_protocol_div').hide();
            $('#drone_imagery_calculate_statistics_htp_phenotypes_rel_matrix_div').show();
        }
        else {
            $('#drone_imagery_calculate_statistics_genotyping_protocol_div').hide();
            $('#drone_imagery_calculate_statistics_htp_phenotypes_rel_matrix_div').hide();
        }
    });

    $('#drone_image_calculate_statistics_htp_phenotypes_rel_matrix_select').change(function () {
        if ($(this).val() == 'blues') {
            $('#drone_image_calculate_statistics_htp_phenotypes_rel_matrix_inversion_select_div').show();
        }
        else {
            $('#drone_image_calculate_statistics_htp_phenotypes_rel_matrix_inversion_select_div').hide();
        }
    });

    $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').change(function () {
        if ($(this).val() == 'yes') {
            $('#drone_image_calculate_statistics_genotyping_protocol_include_pedigree_select_div').show();
            $('#drone_image_calculate_statistics_genotyping_protocol_use_parental_grms_select_div').show();
        }
        if ($(this).val() == 'no') {
            $('#drone_image_calculate_statistics_genotyping_protocol_include_pedigree_select_div').hide();
            $('#drone_image_calculate_statistics_genotyping_protocol_use_parental_grms_select_div').hide();
            $('#drone_image_calculate_statistics_genotyping_protocol_include_pedigree_select option[value=no]').attr('selected', 'selected');
            $('#drone_image_calculate_statistics_genotyping_protocol_use_parental_grms_select option[value=no]').attr('selected', 'selected');
        }
    });

    $('#drone_image_calculate_statistics_genotyping_protocol_use_parental_grms_select').change(function () {
        if ($(this).val() == 'yes') {
            $('#drone_image_calculate_statistics_genotyping_protocol_include_pedigree_select option[value=no]').attr('selected', 'selected');
            $('#drone_image_calculate_statistics_genotyping_protocol_include_pedigree_select_div').hide();
        }
        if ($(this).val() == 'no') {
            $('#drone_image_calculate_statistics_genotyping_protocol_include_pedigree_select_div').show();
        }
    });

    $('#drone_image_calculate_statistics_permanent_env_structure_select').change(function () {
        if ($(this).val() == 'euclidean_rows_and_columns') {
            $('#drone_imagery_calculate_statistics_permanent_env_structure_phenotype_correlation_div').hide();
        }
        else if ($(this).val() == 'phenotype_correlation') {
            $('#drone_imagery_calculate_statistics_permanent_env_structure_phenotype_correlation_div').show();
        }
        else {
            $('#drone_imagery_calculate_statistics_permanent_env_structure_phenotype_correlation_div').hide();
        }
    });

    $('#drone_imagery_calculate_statistics_select_step').click(function () {

        manage_drone_imagery_calculate_statistics_select = $('#drone_imagery_calculate_statistics_select_input').val();

        if (manage_drone_imagery_calculate_statistics_select == 'marss_germplasmname_block' && manage_drone_imagery_calculate_statistics_observation_variable_type != 'time_ontology') {
            alert('The MARSS model fit and prediction only works for Time Series traits! Please go to Trait Selection and select time series traits.');
            return false;
        }
        if ($('#drone_image_calculate_statistics_genotyping_protocol_include_pedigree_select').val() == 'yes' && $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').val() != 'yes') {
            alert('You can only use pedigree info in the relationship matrix if you will compute the genotypes from the parents!');
            return false;
        }
        if ($('#drone_image_calculate_statistics_genotyping_protocol_use_parental_grms_select').val() == 'yes' && $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').val() != 'yes') {
            alert('You can only use parental relationship matrices if you will compute the genotypes from the parents!');
            return false;
        }

        var manage_drone_imagery_calculate_statistics_rr_structure_phenotype_correlation = [];
        if ($('#drone_image_calculate_statistics_permanent_env_structure_select').val() == 'phenotype_correlation') {
            manage_drone_imagery_calculate_statistics_rr_structure_phenotype_correlation = $('#drone_imagery_calculate_statistics_permanent_env_structure_phenotype_correlation_select').val();
            if (!manage_drone_imagery_calculate_statistics_rr_structure_phenotype_correlation || manage_drone_imagery_calculate_statistics_rr_structure_phenotype_correlation.length < 3) {
                alert('Please select at least three phenotypes to use in random regression phenotype correlation structure!');
                return false;
            }
        }

        jQuery.ajax({
            url: '/api/drone_imagery/calculate_statistics',
            type: 'POST',
            data: {
                'observation_variable_id_list': JSON.stringify(manage_drone_imagery_calculate_statistics_trait_ids),
                'field_trial_id_list': JSON.stringify(manage_drone_imagery_calculate_statistics_field_trial_id_array),
                'statistics_select': manage_drone_imagery_calculate_statistics_select,
                'statistics_select_marss_options': $('#drone_imagery_calculate_statistics_select_marss').val(),
                'relationship_matrix_type': $('#drone_imagery_calculate_statistics_relationship_matrix_type_select_div').val(),
                'protocol_id': $('#drone_image_calculate_statistics_genotyping_protocol_select').val(),
                'compute_from_parents': $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').val(),
                'use_parental_grms_if_compute_from_parents': $('#drone_image_calculate_statistics_genotyping_protocol_use_parental_grms_select').val(),
                'include_pedgiree_info_if_compute_from_parents': $('#drone_image_calculate_statistics_genotyping_protocol_include_pedigree_select').val(),
                'htp_pheno_rel_matrix_type': $('#drone_image_calculate_statistics_htp_phenotypes_rel_matrix_select').val(),
                'htp_pheno_rel_matrix_time_points': $('#drone_image_calculate_statistics_htp_phenotypes_rel_matrix_times_select').val(),
                'htp_pheno_rel_matrix_blues_inversion': $('#drone_image_calculate_statistics_htp_phenotypes_rel_matrix_inversion_select').val(),
                'tolparinv': $('#drone_image_calculate_statistics_tolparinv_select').val(),
                'legendre_order_number': $('#drone_image_calculate_statistics_legendre_order_number_select').val(),
                'use_area_under_curve': $('#drone_image_calculate_statistics_use_area_under_curve_select').val(),
                'permanent_environment_structure': $('#drone_image_calculate_statistics_permanent_env_structure_select').val(),
                'permanent_environment_structure_phenotype_correlation_traits': JSON.stringify(manage_drone_imagery_calculate_statistics_rr_structure_phenotype_correlation)
            },
            beforeSend: function (xhr) {
                $("#working_modal").modal("show");
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            success: function (response) {
                console.log(response);
                $("#working_modal").modal("hide");

                if (response.error) {
                    alert(response.error);
                }
                else {
                    manage_drone_imagery_calculate_statistics_response = response;

                    var html = '';
                    if (response.sum_square_residual) {
                        html = html + '<h4>Sum square residual: ' + response.sum_square_residual + '</h4><hr>';
                    }
                    if (response.genetic_effects_line_plot) {
                        html = html + '<img src="' + response.genetic_effects_line_plot + '"><hr>';
                    }
                    if (response.env_effects_heatmap_plot) {
                        html = html + '<img src="' + response.env_effects_heatmap_plot + '"><hr>';
                    }
                    if (response.env_effects_ggcorr_plot) {
                        html = html + '<img src="' + response.env_effects_ggcorr_plot + '"><hr>';
                    }
                    if (response.env_effects_line_plot) {
                        html = html + '<img src="' + response.env_effects_line_plot + '"><hr>';
                    }
                    if (response.unique_accessions.length > 0 && response.unique_traits.length > 0 && response.result_blup_genetic_data) {
                        manage_drone_imagery_calculate_statistics_accession_names = response.unique_accessions;
                        manage_drone_imagery_calculate_statistics_trait_names = response.unique_traits;
                        manage_drone_imagery_calculate_statistics_phenotype_training_file = response.stats_tempfile;
                        manage_drone_imagery_calculate_statistics_grm_training_file = response.grm_file;

                        html = html + '<table class="display"><thead><tr><th>Accessions</th>';
                        for (var i = 0; i < manage_drone_imagery_calculate_statistics_trait_names.length; i++) {
                            html = html + '<th>' + manage_drone_imagery_calculate_statistics_trait_names[i] + '</th>';
                        }
                        html = html + '</tr></thead><tbody>';
                        for (var k = 0; k < response.unique_accessions.length; k++) {
                            var acc = response.unique_accessions[k];
                            html = html + '<tr><td>' + acc + '</td>';
                            for (var i = 0; i < manage_drone_imagery_calculate_statistics_trait_names.length; i++) {
                                if (response.result_blup_genetic_data[acc] && response.result_blup_genetic_data[acc][manage_drone_imagery_calculate_statistics_trait_names[i]]) {
                                    html = html + '<td>' + response.result_blup_genetic_data[acc][manage_drone_imagery_calculate_statistics_trait_names[i]][0] + '</td>';
                                }
                                else {
                                    html = html + '<td>NA</td>';
                                }
                            }
                            html = html + '</tr>';
                        }
                        html = html + '</tbody></table>';
                    }

                    if (response.unique_plots.length > 0 && response.unique_traits.length > 0 && response.result_blup_spatial_data) {
                        manage_drone_imagery_calculate_statistics_plot_names = response.unique_plots;
                        manage_drone_imagery_calculate_statistics_trait_names = response.unique_traits;

                        html = html + '<table class="display"><thead><tr><th>Plots</th>';
                        for (var i = 0; i < response.unique_traits.length; i++) {
                            html = html + '<th>' + response.unique_traits[i] + '</th>';
                        }
                        html = html + '</tr></thead><tbody>';
                        for (var k = 0; k < response.unique_plots.length; k++) {
                            var plot = response.unique_plots[k];
                            html = html + '<tr><td>' + plot + '</td>';
                            for (var i = 0; i < response.unique_traits.length; i++) {
                                html = html + '<td>' + response.result_blup_spatial_data[plot][response.unique_traits[i]][0] + '</td>';
                            }
                            html = html + '</tr>';
                        }
                        html = html + '</tbody></table>';
                    }

                    if (response.unique_plots.length > 0 && response.unique_traits.length > 0 && response.result_blup_pe_data) {
                        manage_drone_imagery_calculate_statistics_plot_names = response.unique_plots;
                        manage_drone_imagery_calculate_statistics_trait_names = response.unique_traits;

                        html = html + '<table class="display"><thead><tr><th>Plots</th>';
                        for (var i = 0; i < response.unique_traits.length; i++) {
                            html = html + '<th>' + response.unique_traits[i] + '</th>';
                        }
                        html = html + '</tr></thead><tbody>';
                        for (var k = 0; k < response.unique_plots.length; k++) {
                            var plot = response.unique_plots[k];
                            html = html + '<tr><td>' + plot + '</td>';
                            for (var i = 0; i < response.unique_traits.length; i++) {
                                if (response.result_blup_pe_data[plot] && response.result_blup_pe_data[plot][response.unique_traits[i]]) {
                                    html = html + '<td>' + response.result_blup_pe_data[plot][response.unique_traits[i]][0] + '</td>';
                                }
                                else {
                                    html = html + '<td>NA</td>';
                                }
                            }
                            html = html + '</tr>';
                        }
                        html = html + '</tbody></table>';
                    }

                    if (response.results.length > 0) {
                        html = '<table class="display"><thead><tr><th>Observation Variable</th><th>Statistics</th><th>Plot</th></tr></thead><tbody>';
                        for (var i = 0; i < response.results.length; i++) {
                            html = html + '<tr><td>' + response.results[i][0] + '</td><td>' + response.results[i][1] + '</td><td><img src="' + response.results[i][2] + '"></td></tr>';
                        }
                        html = html + '</tbody></table>';
                    }

                    html = html + '<hr><a href="' + response.stats_out_tempfile_string + '.log" target=_blank>Stats file or log</a>';

                    if ($('#drone_imagery_calculate_statistics_relationship_matrix_type_select_div').val() == 'htp_phenotypes') {
                        html = html + '<hr><a href="' + response.stats_out_htp_rel_tempfile_out_string + '" target=_blank>HTP Relationship Matrix</a>';
                    }

                    $('#drone_imagery_calculate_statistics_result_div').html(html);

                    Workflow.complete("#drone_imagery_calculate_statistics_select_step");
                    Workflow.focus('#drone_imagery_calculate_statistics_workflow', 4);
                }
            },
            error: function (response) {
                $("#working_modal").modal("hide");
                alert('Error calculating statistics!')
            }
        });
    });

    $('#drone_imagery_calculate_statistics_analysis_save_blups_genetic_pe_residual').click(function () {
        $('#generic_save_analysis_template_dialog').modal('show');
    });

    $('#generic_save_analysis_template_submit_button').click(function () {
        var generic_save_analysis_template_analysis_name = $('#generic_save_analysis_template_analysis_name').val();
        var generic_save_analysis_template_analysis_description = $('#generic_save_analysis_template_analysis_description').val();
        var generic_save_analysis_template_analysis_year = $('#generic_save_analysis_template_analysis_year').val();
        var generic_save_analysis_template_breeding_program_id = $('#generic_save_analysis_template_breeding_program_id').val();

        if (generic_save_analysis_template_analysis_name == '') {
            alert('Please give an analysis template name');
            return false;
        }
        if (generic_save_analysis_template_analysis_description == '') {
            alert('Please give an analysis template description');
            return false;
        }
        if (generic_save_analysis_template_analysis_year == '') {
            alert('Please give an analysis template year');
            return false;
        }

        var drone_imagery_stats_parameters = {};
        var drone_imagery_stats_protocol = '';
        var drone_imagery_stats_auxiliary_files = [];
        var drone_imagery_stats_result_summary = {};
        var statistical_ontology_term = '';
        var drone_imagery_stats_compose_trait_info;

        var drone_imagery_stats_tolparinv_param = $('#drone_image_calculate_statistics_tolparinv_select').val();
        var drone_imagery_stats_numbers_traits = manage_drone_imagery_calculate_statistics_response.unique_traits.length;
        var drone_imagery_legendre_order = $('#drone_image_calculate_statistics_legendre_order_number_select').val();

        if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_spatial_genetic_blups') {

            var drone_imagery_stats_mv_traits = [];
            for (var i = 1; i < drone_imagery_stats_numbers_traits + 1; i++) {
                drone_imagery_stats_mv_traits.push('t' + i);
            }
            var drone_imagery_stats_mv_traits_string = drone_imagery_stats_mv_traits.join();

            drone_imagery_stats_protocol = 'mmer(' + drone_imagery_stats_mv_traits_string + '~1+replicate, random=~vs(id, Gu=geno_mat, Gtc=unsm(' + drone_imagery_stats_numbers_traits + ')) +vs(rowNumberFactor, Gtc=diag(' + drone_imagery_stats_numbers_traits + ')) +vs(colNumberFactor, Gtc=diag(' + drone_imagery_stats_numbers_traits + ')) + spl2Da(rowNumber, colNumber), rcov=~vs(units, Gtc=unsm(' + drone_imagery_stats_numbers_traits + ')), data=mat, tolparinv=' + drone_imagery_stats_tolparinv_param + ');';

            drone_imagery_stats_parameters = {
                'tolparinv': drone_imagery_stats_tolparinv_param,
                'genotyping_protocol_id': $('#drone_image_calculate_statistics_genotyping_protocol_select').val(),
                'compute_genotypes_from_parents': $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').val(),
                'protocol': drone_imagery_stats_protocol
            };

            drone_imagery_stats_auxiliary_files = [{ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_spatial_genetic_blups_grm_file' }];

            drone_imagery_stats_compose_trait_info = JSON.stringify(manage_drone_imagery_calculate_statistics_response.trait_composing_info);

            statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and row and column spatial effects computed using Sommer R|SGNSTAT:0000001";
        }
        if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_genetic_blups') {

            var drone_imagery_stats_mv_traits = [];
            for (var i = 1; i < drone_imagery_stats_numbers_traits + 1; i++) {
                drone_imagery_stats_mv_traits.push('t' + i);
            }
            var drone_imagery_stats_mv_traits_string = drone_imagery_stats_mv_traits.join();

            drone_imagery_stats_protocol = 'mmer(' + drone_imagery_stats_mv_traits_string + '~1+replicate, random=~vs(id, Gu=geno_mat, Gtc=unsm(' + drone_imagery_stats_numbers_traits + ')), rcov=~vs(units, Gtc=unsm(' + drone_imagery_stats_numbers_traits + ')), data=mat, tolparinv=' + drone_imagery_stats_tolparinv_param + ');';

            drone_imagery_stats_parameters = {
                'tolparinv': drone_imagery_stats_tolparinv_param,
                'genotyping_protocol_id': $('#drone_image_calculate_statistics_genotyping_protocol_select').val(),
                'compute_genotypes_from_parents': $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').val(),
                'protocol': drone_imagery_stats_protocol
            };

            drone_imagery_stats_auxiliary_files = [{ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_genetic_blups_grm_file' }];

            drone_imagery_stats_compose_trait_info = JSON.stringify(manage_drone_imagery_calculate_statistics_response.trait_composing_info);

            statistical_ontology_term = "Multivariate genetic BLUPs using genetic relationship matrix computed using Sommer R|SGNSTAT:0000024";
        }
        if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_temporal_random_regression_dap_genetic_blups') {

            drone_imagery_stats_protocol = 'mmer(value~1+replicate, random=~vs(id, Gu=geno_mat) +vs(leg(time_DAP, ' + drone_imagery_legendre_order + ', intercept=TRUE), id) +vs(leg(time_DAP, ' + drone_imagery_legendre_order + ', intercept=TRUE), plot_id), rcov=~vs(units), data=mat_long_format, tolparinv=' + drone_imagery_stats_tolparinv_param + ');';

            drone_imagery_stats_parameters = {
                'tolparinv': drone_imagery_stats_tolparinv_param,
                'genotyping_protocol_id': $('#drone_image_calculate_statistics_genotyping_protocol_select').val(),
                'compute_genotypes_from_parents': $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').val(),
                'legendre_polynomial_order': drone_imagery_legendre_order,
                'protocol': drone_imagery_stats_protocol
            };

            drone_imagery_stats_auxiliary_files = [
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_DAP_genetic_blups_grm_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_DAP_genetic_blups_genetic_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_DAP_genetic_blups_permanent_environment_coefficients_file' },
            ];

            statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on days after planting computed using Sommer R|SGNSTAT:0000004";
        }
        if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_temporal_random_regression_gdd_genetic_blups') {

            drone_imagery_stats_protocol = 'mmer(value~1+replicate, random=~vs(id, Gu=geno_mat) +vs(leg(time_GDD, ' + drone_imagery_legendre_order + ', intercept=TRUE), id) +vs(leg(time_GDD, ' + drone_imagery_legendre_order + ', intercept=TRUE), plot_id), rcov=~vs(units), data=mat_long_format, tolparinv=' + drone_imagery_stats_tolparinv_param + ');';

            drone_imagery_stats_parameters = {
                'tolparinv': drone_imagery_stats_tolparinv_param,
                'genotyping_protocol_id': $('#drone_image_calculate_statistics_genotyping_protocol_select').val(),
                'compute_genotypes_from_parents': $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').val(),
                'legendre_polynomial_order': drone_imagery_legendre_order,
                'protocol': drone_imagery_stats_protocol
            };

            drone_imagery_stats_auxiliary_files = [
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_GDD_genetic_blups_grm_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_GDD_genetic_blups_genetic_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_GDD_genetic_blups_permanent_environment_coefficients_file' }
            ];

            statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on growing degree days computed using Sommer R|SGNSTAT:0000006";
        }
        if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_genetic_only_random_regression_dap_genetic_blups') {

            drone_imagery_stats_protocol = 'mmer(value~1+replicate, random=~vs(id, Gu=geno_mat) +vs(leg(time_DAP, ' + drone_imagery_legendre_order + ', intercept=TRUE), id), rcov=~vs(units), data=mat_long_format, tolparinv=' + drone_imagery_stats_tolparinv_param + ');';

            drone_imagery_stats_parameters = {
                'tolparinv': drone_imagery_stats_tolparinv_param,
                'genotyping_protocol_id': $('#drone_image_calculate_statistics_genotyping_protocol_select').val(),
                'compute_genotypes_from_parents': $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').val(),
                'legendre_polynomial_order': drone_imagery_legendre_order,
                'protocol': drone_imagery_stats_protocol
            };

            drone_imagery_stats_auxiliary_files = [
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_genetic_legendre_polynomial_genetic_blups_grm_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_genetic_legendre_polynomial_genetic_blups_genetic_coefficients_file' },
            ];

            statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on days after planting computed using Sommer R|SGNSTAT:0000004";
        }
        if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_genetic_only_random_regression_gdd_genetic_blups') {

            drone_imagery_stats_protocol = 'mmer(value~1+replicate, random=~vs(id, Gu=geno_mat) +vs(leg(time_GDD, ' + drone_imagery_legendre_order + ', intercept=TRUE), id) +vs(leg(time_GDD, ' + drone_imagery_legendre_order + ', intercept=TRUE), plot_id), rcov=~vs(units), data=mat_long_format, tolparinv=' + drone_imagery_stats_tolparinv_param + ');';

            drone_imagery_stats_parameters = {
                'tolparinv': drone_imagery_stats_tolparinv_param,
                'genotyping_protocol_id': $('#drone_image_calculate_statistics_genotyping_protocol_select').val(),
                'compute_genotypes_from_parents': $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').val(),
                'legendre_polynomial_order': drone_imagery_legendre_order,
                'protocol': drone_imagery_stats_protocol
            };

            drone_imagery_stats_auxiliary_files = [
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_genetic_legendre_polynomial_genetic_blups_grm_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_genetic_legendre_polynomial_genetic_blups_genetic_coefficients_file' },
            ];

            statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on growing degree days computed using Sommer R|SGNSTAT:0000006";
        }

        var training_data_file = manage_drone_imagery_calculate_statistics_response.stats_tempfile;

        if (manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_gdd_blups' || manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_dap_blups' || manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_dap_blups' || manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_gdd_blups') {

            training_data_file = manage_drone_imagery_calculate_statistics_response.blupf90_training_file;
            var drone_imagery_permanent_env_structure = $('#drone_image_calculate_statistics_permanent_env_structure_select').val();

            if (manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_gdd_blups' || manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_dap_blups') {
                drone_imagery_stats_protocol = 'blupf90(random regression GRM and Permanent Environment ' + drone_imagery_permanent_env_structure + ', conv_crit=' + drone_imagery_stats_tolparinv_param + ');';
            }
            if (manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_dap_blups' || manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_gdd_blups') {
                drone_imagery_stats_protocol = 'airemlf90(random regression GRM and Permanent Environment ' + drone_imagery_permanent_env_structure + ', conv_crit=' + drone_imagery_stats_tolparinv_param + ');';
            }

            drone_imagery_stats_parameters = {
                'tolparinv': drone_imagery_stats_tolparinv_param,
                'genotyping_protocol_id': $('#drone_image_calculate_statistics_genotyping_protocol_select').val(),
                'compute_genotypes_from_parents': $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').val(),
                'legendre_polynomial_order': drone_imagery_legendre_order,
                'protocol': drone_imagery_stats_protocol,
                'permanent_environment_structure': drone_imagery_permanent_env_structure
            };

            if (manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_gdd_blups') {
                statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on growing degree days computed using BLUPf90|SGNSTAT:0000010";

                drone_imagery_stats_auxiliary_files = [
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_genetic_blups_grm_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_genetic_blups_param_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_genetic_blups_log_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_genetic_blups_genetic_coefficients_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_genetic_blups_permanent_environment_coefficients_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_blups_solutions_file' }
                ];
                if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                    drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_blups_permanent_environment_structure_file' });
                }
            }
            else if (manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_dap_blups') {
                statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on days after planting computed using BLUPf90|SGNSTAT:0000008";

                drone_imagery_stats_auxiliary_files = [
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_genetic_blups_grm_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_genetic_blups_param_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_genetic_blups_log_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_genetic_blups_genetic_coefficients_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_genetic_blups_permanent_environment_coefficients_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_blups_solutions_file' }
                ];
                if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                    drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_blups_permanent_environment_structure_file' });
                }
            }
            else if (manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_dap_blups') {
                statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on days after planting computed using AIREMLf90|SGNSTAT:0000018";

                drone_imagery_stats_auxiliary_files = [
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_genetic_blups_grm_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_genetic_blups_param_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_genetic_blups_log_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_genetic_blups_genetic_coefficients_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_genetic_blups_permanent_environment_coefficients_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_blups_solutions_file' }
                ];
                if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                    drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_blups_permanent_environment_structure_file' });
                }
            }
            else if (manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_gdd_blups') {
                statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on growing degree days computed using AIREMLf90|SGNSTAT:0000020";

                drone_imagery_stats_auxiliary_files = [
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_genetic_blups_grm_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_genetic_blups_param_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_genetic_blups_log_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_genetic_blups_genetic_coefficients_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_genetic_blups_permanent_environment_coefficients_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_blups_solutions_file' }
                ];
                if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                    drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_blups_permanent_environment_structure_file' });
                }
            }
        }
        if (manage_drone_imagery_calculate_statistics_select == 'lmer_germplasmname_replicate') {
            drone_imagery_stats_protocol = 'lmer(t1~replicate + 1|germplasmName, data=mat, na.action = na.omit)';
            drone_imagery_stats_parameters = {
                'protocol': drone_imagery_stats_protocol
            };
            statistical_ontology_term = "Univariate linear mixed model genetic BLUPs using germplasmName computed using LMER R|SGNSTAT:0000002";
        }

        jQuery.ajax({
            type: 'POST',
            url: '/ajax/analysis/store/json',
            data: {
                'analysis_to_save_boolean': 'yes',
                'analysis_name': generic_save_analysis_template_analysis_name + '_GBLUPS',
                'analysis_description': generic_save_analysis_template_analysis_description,
                'analysis_year': generic_save_analysis_template_analysis_year,
                'analysis_breeding_program_id': generic_save_analysis_template_breeding_program_id,
                'analysis_protocol': drone_imagery_stats_protocol,
                'analysis_dataset_id': '',
                'analysis_accession_names': JSON.stringify(manage_drone_imagery_calculate_statistics_response.unique_accessions),
                'analysis_trait_names': JSON.stringify(manage_drone_imagery_calculate_statistics_response.unique_traits),
                'analysis_statistical_ontology_term': statistical_ontology_term,
                'analysis_precomputed_design_optional': '',
                'analysis_result_values': JSON.stringify(manage_drone_imagery_calculate_statistics_response.result_blup_genetic_data),
                'analysis_result_values_type': 'analysis_result_values_match_accession_names',
                'analysis_result_summary': JSON.stringify(drone_imagery_stats_result_summary),
                'analysis_result_trait_compose_info': drone_imagery_stats_compose_trait_info,
                'analysis_model_id': '',
                'analysis_model_name': generic_save_analysis_template_analysis_name + '_GBLUPSandPEandResiduals_Model',
                'analysis_model_description': generic_save_analysis_template_analysis_description,
                'analysis_model_is_public': 'yes',
                'analysis_model_language': manage_drone_imagery_calculate_statistics_response.analysis_model_language,
                'analysis_model_type': manage_drone_imagery_calculate_statistics_response.analysis_model_type,
                'analysis_model_properties': JSON.stringify(drone_imagery_stats_parameters),
                'analysis_model_application_name': manage_drone_imagery_calculate_statistics_response.application_name,
                'analysis_model_application_version': manage_drone_imagery_calculate_statistics_response.application_version,
                'analysis_model_file': '',
                'analysis_model_file_type': '',
                'analysis_model_training_data_file': training_data_file,
                'analysis_model_training_data_file_type': manage_drone_imagery_calculate_statistics_response.analysis_model_training_data_file_type,
                'analysis_model_auxiliary_files': JSON.stringify(drone_imagery_stats_auxiliary_files)
            },
            beforeSend: function (xhr) {
                $('#working_modal').modal('show');
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            success: function (response) {
                console.log(response);
                if (response.error) {
                    alert(response.error);
                }
                if (response.success) {
                    var html = '<div>';
                    if (response.model_id) {
                        html = html + '<p>Go to saved <a href="/analyses_model/' + response.model_id + '" target=_blank >model</a></p>';
                    }
                    if (response.analysis_id) {
                        html = html + '<p>Go to saved <a href="/analyses/' + response.analysis_id + '" target=_blank >GBLUP analysis</a></p>';
                    }
                    html = html + '</div>';
                    $('#generic_save_analysis_template_response_div').html(html);

                    var statistical_ontology_term;
                    var drone_imagery_stats_auxiliary_files;
                    var drone_imagery_stats_training_data_file;
                    var generic_save_analysis_template_name_type = '_PermanentEnvironment';
                    var generic_save_analysis_template_env1_result_values = JSON.stringify(manage_drone_imagery_calculate_statistics_response.result_blup_pe_data);

                    if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_temporal_random_regression_dap_genetic_blups') {
                        drone_imagery_stats_auxiliary_files = [
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_DAP_genetic_blups_grm_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_DAP_genetic_blups_genetic_coefficients_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_DAP_genetic_blups_permanent_environment_coefficients_file' }
                        ];

                        statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on days after planting computed using Sommer R|SGNSTAT:0000004";

                        drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.stats_tempfile;
                    }
                    if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_temporal_random_regression_gdd_genetic_blups') {
                        drone_imagery_stats_auxiliary_files = [
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_GDD_genetic_blups_grm_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_GDD_genetic_blups_genetic_coefficients_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_GDD_genetic_blups_permanent_environment_coefficients_file' }
                        ];

                        statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on growing degree days computed using Sommer R|SGNSTAT:0000006";

                        drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.stats_tempfile;
                    }
                    if (manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_gdd_blups') {
                        statistical_ontology_term = "Multivariate linear mixed model permanent environment BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on growing degree days computed using BLUPf90|SGNSTAT:0000011";

                        drone_imagery_stats_auxiliary_files = [
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_grm_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_param_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_log_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_genetic_coefficients_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_permanent_environment_coefficients_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_blups_solutions_file' }
                        ];
                        if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                            drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_blups_permanent_environment_structure_file' });
                        }

                        drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.blupf90_training_file;
                    }
                    else if (manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_dap_blups') {
                        statistical_ontology_term = "Multivariate linear mixed model permanent environment BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on days after planting computed using BLUPf90|SGNSTAT:0000009";

                        drone_imagery_stats_auxiliary_files = [
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_grm_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_param_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_log_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_genetic_coefficients_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_permanent_environment_coefficients_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_blups_solutions_file' }
                        ];
                        if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                            drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_blups_permanent_environment_structure_file' });
                        }

                        drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.blupf90_training_file;
                    }
                    if (manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_gdd_blups') {
                        statistical_ontology_term = "Multivariate linear mixed model permanent environment BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on growing degree days computed using AIREMLf90|SGNSTAT:0000021";

                        drone_imagery_stats_auxiliary_files = [
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_grm_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_param_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_log_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_genetic_coefficients_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_permanent_environment_coefficients_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_blups_solutions_file' }
                        ];
                        if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                            drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_blups_permanent_environment_structure_file' });
                        }

                        drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.blupf90_training_file;
                    }
                    else if (manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_dap_blups') {
                        statistical_ontology_term = "Multivariate linear mixed model permanent environment BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on days after planting computed using AIREMLf90|SGNSTAT:0000019";

                        drone_imagery_stats_auxiliary_files = [
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_grm_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_param_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_log_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_genetic_coefficients_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_permanent_environment_coefficients_file' },
                            { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_blups_solutions_file' }
                        ];
                        if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                            drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_blups_permanent_environment_structure_file' });
                        }

                        drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.blupf90_training_file;
                    }

                    if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_spatial_genetic_blups') {
                        statistical_ontology_term = "Multivariate linear mixed model 2D spline spatial BLUPs using genetic relationship matrix and row and column spatial effects computed using Sommer R|SGNSTAT:0000003";

                        drone_imagery_stats_auxiliary_files = [{ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_spatial_genetic_blups_grm_file' }];

                        generic_save_analysis_template_name_type = '_Spatial';
                        generic_save_analysis_template_env1_result_values = JSON.stringify(manage_drone_imagery_calculate_statistics_response.result_blup_spatial_data);

                        drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.stats_tempfile;
                    }

                    jQuery.ajax({
                        type: 'POST',
                        url: '/ajax/analysis/store/json',
                        data: {
                            'analysis_to_save_boolean': 'yes',
                            'analysis_name': generic_save_analysis_template_analysis_name + generic_save_analysis_template_name_type,
                            'analysis_description': generic_save_analysis_template_analysis_description,
                            'analysis_year': generic_save_analysis_template_analysis_year,
                            'analysis_breeding_program_id': generic_save_analysis_template_breeding_program_id,
                            'analysis_protocol': drone_imagery_stats_protocol,
                            'analysis_dataset_id': '',
                            'analysis_accession_names': JSON.stringify(manage_drone_imagery_calculate_statistics_response.unique_accessions),
                            'analysis_trait_names': JSON.stringify(manage_drone_imagery_calculate_statistics_response.unique_traits),
                            'analysis_statistical_ontology_term': statistical_ontology_term,
                            'analysis_precomputed_design_optional': JSON.stringify(manage_drone_imagery_calculate_statistics_response.field_trial_design),
                            'analysis_result_values': generic_save_analysis_template_env1_result_values,
                            'analysis_result_values_type': 'analysis_result_values_match_precomputed_design',
                            'analysis_result_summary': JSON.stringify(drone_imagery_stats_result_summary),
                            'analysis_result_trait_compose_info': '',
                            'analysis_model_id': response.model_id,
                            'analysis_model_name': '',
                            'analysis_model_description': '',
                            'analysis_model_is_public': 'yes',
                            'analysis_model_language': manage_drone_imagery_calculate_statistics_response.analysis_model_language,
                            'analysis_model_type': manage_drone_imagery_calculate_statistics_response.analysis_model_type,
                            'analysis_model_properties': JSON.stringify(drone_imagery_stats_parameters),
                            'analysis_model_application_name': manage_drone_imagery_calculate_statistics_response.application_name,
                            'analysis_model_application_version': manage_drone_imagery_calculate_statistics_response.application_version,
                            'analysis_model_file': '',
                            'analysis_model_file_type': '',
                            'analysis_model_training_data_file': drone_imagery_stats_training_data_file,
                            'analysis_model_training_data_file_type': manage_drone_imagery_calculate_statistics_response.analysis_model_training_data_file_type,
                            'analysis_model_auxiliary_files': JSON.stringify(drone_imagery_stats_auxiliary_files)
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
                            if (response.success) {
                                html = html + '<div>';
                                if (response.analysis_id) {
                                    if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_spatial_genetic_blups') {
                                        html = html + '<p>Go to saved <a href="/analyses/' + response.analysis_id + '" target=_blank >spatial BLUP analysis</a></p>';
                                    }
                                    else {
                                        html = html + '<p>Go to saved <a href="/analyses/' + response.analysis_id + '" target=_blank >permanent environment BLUP analysis</a></p>';
                                    }
                                }
                                html = html + '</div>';
                                $('#generic_save_analysis_template_response_div').html(html);

                                var drone_imagery_stats_auxiliary_files;
                                var drone_imagery_stats_training_data_file;
                                if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_temporal_random_regression_dap_genetic_blups') {

                                    drone_imagery_stats_auxiliary_files = [
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_DAP_genetic_blups_grm_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_DAP_genetic_blups_genetic_coefficients_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_DAP_genetic_blups_permanent_environment_coefficients_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.yhat_residual_tempfile, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_DAP_genetic_blups_residual_file' }
                                    ];

                                    statistical_ontology_term = "Multivariate linear mixed model residual using genetic relationship matrix and temporal Legendre polynomial random regression on days after planting computed using Sommer R|SGNSTAT:0000030";

                                    drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.stats_tempfile;
                                }
                                if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_temporal_random_regression_gdd_genetic_blups') {

                                    drone_imagery_stats_auxiliary_files = [
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_GDD_genetic_blups_grm_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_GDD_genetic_blups_genetic_coefficients_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_GDD_genetic_blups_permanent_environment_coefficients_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.yhat_residual_tempfile, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_GDD_genetic_blups_residual_file' }
                                    ];

                                    statistical_ontology_term = "Multivariate linear mixed model residual using genetic relationship matrix and temporal Legendre polynomial random regression on growing degree days computed using Sommer R|SGNSTAT:0000031";

                                    drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.stats_tempfile;
                                }
                                if (manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_gdd_blups') {
                                    statistical_ontology_term = "Multivariate linear mixed model residual using genetic relationship matrix and temporal Legendre polynomial random regression on growing degree days computed using BLUPf90|SGNSTAT:0000029";

                                    drone_imagery_stats_auxiliary_files = [
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_grm_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_param_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_log_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_genetic_coefficients_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_permanent_environment_coefficients_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_blups_solutions_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.yhat_residual_tempfile, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_residual_file' }
                                    ];
                                    if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                                        drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_blups_permanent_environment_structure_file' });
                                    }

                                    drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.blupf90_training_file;
                                }
                                else if (manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_dap_blups') {
                                    statistical_ontology_term = "Multivariate linear mixed model residual using genetic relationship matrix and temporal Legendre polynomial random regression on days after planting computed using BLUPf90|SGNSTAT:0000028";

                                    drone_imagery_stats_auxiliary_files = [
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_grm_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_param_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_log_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_genetic_coefficients_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_permanent_environment_coefficients_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_blups_solutions_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.yhat_residual_tempfile, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_residual_file' }
                                    ];
                                    if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                                        drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_blups_permanent_environment_structure_file' });
                                    }

                                    drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.blupf90_training_file;
                                }
                                if (manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_gdd_blups') {
                                    statistical_ontology_term = "Multivariate linear mixed model residual using genetic relationship matrix and temporal Legendre polynomial random regression on growing degree days computed using AIREMLf90|SGNSTAT:0000027";

                                    drone_imagery_stats_auxiliary_files = [
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_grm_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_param_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_log_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_genetic_coefficients_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_permanent_environment_coefficients_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_blups_solutions_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.yhat_residual_tempfile, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_residual_file' }
                                    ];
                                    if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                                        drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_blups_permanent_environment_structure_file' });
                                    }

                                    drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.blupf90_training_file;
                                }
                                else if (manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_dap_blups') {
                                    statistical_ontology_term = "Multivariate linear mixed model residual using genetic relationship matrix and temporal Legendre polynomial random regression on days after planting computed using AIREMLf90|SGNSTAT:0000026";

                                    drone_imagery_stats_auxiliary_files = [
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_grm_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_param_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_log_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_genetic_coefficients_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_permanent_environment_coefficients_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_blups_solutions_file' },
                                        { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.yhat_residual_tempfile, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_residual_file' }
                                    ];
                                    if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                                        drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_blups_permanent_environment_structure_file' });
                                    }

                                    drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.blupf90_training_file;
                                }

                                if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_spatial_genetic_blups') {
                                    $('#working_modal').modal('hide');
                                    alert('Analysis and/or model saved!');
                                    return false;
                                }

                                jQuery.ajax({
                                    type: 'POST',
                                    url: '/ajax/analysis/store/json',
                                    data: {
                                        'analysis_to_save_boolean': 'yes',
                                        'analysis_name': generic_save_analysis_template_analysis_name + '_Residual',
                                        'analysis_description': generic_save_analysis_template_analysis_description,
                                        'analysis_year': generic_save_analysis_template_analysis_year,
                                        'analysis_breeding_program_id': generic_save_analysis_template_breeding_program_id,
                                        'analysis_protocol': drone_imagery_stats_protocol,
                                        'analysis_dataset_id': '',
                                        'analysis_accession_names': JSON.stringify(manage_drone_imagery_calculate_statistics_response.unique_accessions),
                                        'analysis_trait_names': JSON.stringify(manage_drone_imagery_calculate_statistics_response.unique_residual_traits),
                                        'analysis_statistical_ontology_term': statistical_ontology_term,
                                        'analysis_precomputed_design_optional': JSON.stringify(manage_drone_imagery_calculate_statistics_response.field_trial_design),
                                        'analysis_result_values': JSON.stringify(manage_drone_imagery_calculate_statistics_response.result_residual_data),
                                        'analysis_result_values_type': 'analysis_result_values_match_precomputed_design',
                                        'analysis_result_summary': JSON.stringify(drone_imagery_stats_result_summary),
                                        'analysis_result_trait_compose_info': JSON.stringify(manage_drone_imagery_calculate_statistics_response.trait_composing_info),
                                        'analysis_model_id': response.model_id,
                                        'analysis_model_name': '',
                                        'analysis_model_description': '',
                                        'analysis_model_is_public': 'yes',
                                        'analysis_model_language': manage_drone_imagery_calculate_statistics_response.analysis_model_language,
                                        'analysis_model_type': manage_drone_imagery_calculate_statistics_response.analysis_model_type,
                                        'analysis_model_properties': JSON.stringify(drone_imagery_stats_parameters),
                                        'analysis_model_application_name': manage_drone_imagery_calculate_statistics_response.application_name,
                                        'analysis_model_application_version': manage_drone_imagery_calculate_statistics_response.application_version,
                                        'analysis_model_file': '',
                                        'analysis_model_file_type': '',
                                        'analysis_model_training_data_file': drone_imagery_stats_training_data_file,
                                        'analysis_model_training_data_file_type': manage_drone_imagery_calculate_statistics_response.analysis_model_training_data_file_type,
                                        'analysis_model_auxiliary_files': JSON.stringify(drone_imagery_stats_auxiliary_files)
                                    },
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
                                        if (response.success) {
                                            alert('Analysis and/or model saved!');
                                            html = html + '<div>';
                                            if (response.analysis_id) {
                                                html = html + '<p>Go to saved <a href="/analyses/' + response.analysis_id + '" target=_blank >residuals analysis</a></p>';
                                            }
                                            html = html + '</div>';
                                            $('#generic_save_analysis_template_response_div').html(html);
                                        }
                                    },
                                    error: function (response) {
                                        alert('Error saving analysis multiple!');
                                    }
                                });
                            }
                        },
                        error: function (response) {
                            alert('Error saving analysis multiple!');
                        }
                    });
                }
            },
            error: function (response) {
                $('#working_modal').modal('hide');
                alert('Error saving analysis multiple!');
            }
        });
    });

    $('#drone_imagery_calculate_statistics_analysis_save_blups_genetic').click(function () {
        $('#generic_save_analysis_dialog').modal('show');

        var drone_imagery_stats_parameters = {};
        var drone_imagery_stats_protocol = '';
        var drone_imagery_stats_auxiliary_files = [];
        var drone_imagery_stats_result_summary = {};
        var statistical_ontology_term = '';

        var drone_imagery_stats_tolparinv_param = $('#drone_image_calculate_statistics_tolparinv_select').val();
        var drone_imagery_stats_numbers_traits = manage_drone_imagery_calculate_statistics_response.unique_traits.length;
        var drone_imagery_legendre_order = $('#drone_image_calculate_statistics_legendre_order_number_select').val();

        if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_spatial_genetic_blups') {

            var drone_imagery_stats_mv_traits = [];
            for (var i = 1; i < drone_imagery_stats_numbers_traits + 1; i++) {
                drone_imagery_stats_mv_traits.push('t' + i);
            }
            var drone_imagery_stats_mv_traits_string = drone_imagery_stats_mv_traits.join();

            drone_imagery_stats_protocol = 'mmer(' + drone_imagery_stats_mv_traits_string + '~1+replicate, random=~vs(id, Gu=geno_mat, Gtc=unsm(' + drone_imagery_stats_numbers_traits + ')) +vs(rowNumberFactor, Gtc=diag(' + drone_imagery_stats_numbers_traits + ')) +vs(colNumberFactor, Gtc=diag(' + drone_imagery_stats_numbers_traits + ')) + spl2Da(rowNumber, colNumber), rcov=~vs(units, Gtc=unsm(' + drone_imagery_stats_numbers_traits + ')), data=mat, tolparinv=' + drone_imagery_stats_tolparinv_param + ');';

            drone_imagery_stats_parameters = {
                'tolparinv': drone_imagery_stats_tolparinv_param,
                'genotyping_protocol_id': $('#drone_image_calculate_statistics_genotyping_protocol_select').val(),
                'compute_genotypes_from_parents': $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').val(),
                'protocol': drone_imagery_stats_protocol
            };

            drone_imagery_stats_auxiliary_files = [{ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_spatial_genetic_blups_grm_file' }];

            $('#generic_save_analysis_result_compose_trait_info').val(JSON.stringify(manage_drone_imagery_calculate_statistics_response.trait_composing_info));

            statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and row and column spatial effects computed using Sommer R|SGNSTAT:0000001";
        }
        if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_genetic_blups') {

            var drone_imagery_stats_mv_traits = [];
            for (var i = 1; i < drone_imagery_stats_numbers_traits + 1; i++) {
                drone_imagery_stats_mv_traits.push('t' + i);
            }
            var drone_imagery_stats_mv_traits_string = drone_imagery_stats_mv_traits.join();

            drone_imagery_stats_protocol = 'mmer(' + drone_imagery_stats_mv_traits_string + '~1+replicate, random=~vs(id, Gu=geno_mat, Gtc=unsm(' + drone_imagery_stats_numbers_traits + ')), rcov=~vs(units, Gtc=unsm(' + drone_imagery_stats_numbers_traits + ')), data=mat, tolparinv=' + drone_imagery_stats_tolparinv_param + ');';

            drone_imagery_stats_parameters = {
                'tolparinv': drone_imagery_stats_tolparinv_param,
                'genotyping_protocol_id': $('#drone_image_calculate_statistics_genotyping_protocol_select').val(),
                'compute_genotypes_from_parents': $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').val(),
                'protocol': drone_imagery_stats_protocol
            };

            drone_imagery_stats_auxiliary_files = [{ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_genetic_blups_grm_file' }];

            $('#generic_save_analysis_result_compose_trait_info').val(JSON.stringify(manage_drone_imagery_calculate_statistics_response.trait_composing_info));

            statistical_ontology_term = "Multivariate genetic BLUPs using genetic relationship matrix computed using Sommer R|SGNSTAT:0000024";
        }
        if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_temporal_random_regression_dap_genetic_blups') {

            drone_imagery_stats_protocol = 'mmer(value~1+replicate, random=~vs(id, Gu=geno_mat) +vs(leg(time_DAP, ' + drone_imagery_legendre_order + ', intercept=TRUE), id) +vs(leg(time_DAP, ' + drone_imagery_legendre_order + ', intercept=TRUE), plot_id), rcov=~vs(units), data=mat_long_format, tolparinv=' + drone_imagery_stats_tolparinv_param + ');';

            drone_imagery_stats_parameters = {
                'tolparinv': drone_imagery_stats_tolparinv_param,
                'genotyping_protocol_id': $('#drone_image_calculate_statistics_genotyping_protocol_select').val(),
                'compute_genotypes_from_parents': $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').val(),
                'legendre_polynomial_order': drone_imagery_legendre_order,
                'protocol': drone_imagery_stats_protocol
            };

            drone_imagery_stats_auxiliary_files = [
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_DAP_genetic_blups_grm_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_DAP_genetic_blups_genetic_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_DAP_genetic_blups_permanent_environment_coefficients_file' },
            ];

            statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on days after planting computed using Sommer R|SGNSTAT:0000004";
        }
        if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_temporal_random_regression_gdd_genetic_blups') {

            drone_imagery_stats_protocol = 'mmer(value~1+replicate, random=~vs(id, Gu=geno_mat) +vs(leg(time_GDD, ' + drone_imagery_legendre_order + ', intercept=TRUE), id) +vs(leg(time_GDD, ' + drone_imagery_legendre_order + ', intercept=TRUE), plot_id), rcov=~vs(units), data=mat_long_format, tolparinv=' + drone_imagery_stats_tolparinv_param + ');';

            drone_imagery_stats_parameters = {
                'tolparinv': drone_imagery_stats_tolparinv_param,
                'genotyping_protocol_id': $('#drone_image_calculate_statistics_genotyping_protocol_select').val(),
                'compute_genotypes_from_parents': $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').val(),
                'legendre_polynomial_order': drone_imagery_legendre_order,
                'protocol': drone_imagery_stats_protocol
            };

            drone_imagery_stats_auxiliary_files = [
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_GDD_genetic_blups_grm_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_GDD_genetic_blups_genetic_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_GDD_genetic_blups_permanent_environment_coefficients_file' }
            ];

            statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on growing degree days computed using Sommer R|SGNSTAT:0000006";
        }
        if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_genetic_only_random_regression_dap_genetic_blups') {

            drone_imagery_stats_protocol = 'mmer(value~1+replicate, random=~vs(id, Gu=geno_mat) +vs(leg(time_DAP, ' + drone_imagery_legendre_order + ', intercept=TRUE), id), rcov=~vs(units), data=mat_long_format, tolparinv=' + drone_imagery_stats_tolparinv_param + ');';

            drone_imagery_stats_parameters = {
                'tolparinv': drone_imagery_stats_tolparinv_param,
                'genotyping_protocol_id': $('#drone_image_calculate_statistics_genotyping_protocol_select').val(),
                'compute_genotypes_from_parents': $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').val(),
                'legendre_polynomial_order': drone_imagery_legendre_order,
                'protocol': drone_imagery_stats_protocol
            };

            drone_imagery_stats_auxiliary_files = [
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_genetic_legendre_polynomial_genetic_blups_grm_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_genetic_legendre_polynomial_genetic_blups_genetic_coefficients_file' },
            ];

            statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on days after planting computed using Sommer R|SGNSTAT:0000004";
        }
        if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_genetic_only_random_regression_gdd_genetic_blups') {

            drone_imagery_stats_protocol = 'mmer(value~1+replicate, random=~vs(id, Gu=geno_mat) +vs(leg(time_GDD, ' + drone_imagery_legendre_order + ', intercept=TRUE), id) +vs(leg(time_GDD, ' + drone_imagery_legendre_order + ', intercept=TRUE), plot_id), rcov=~vs(units), data=mat_long_format, tolparinv=' + drone_imagery_stats_tolparinv_param + ');';

            drone_imagery_stats_parameters = {
                'tolparinv': drone_imagery_stats_tolparinv_param,
                'genotyping_protocol_id': $('#drone_image_calculate_statistics_genotyping_protocol_select').val(),
                'compute_genotypes_from_parents': $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').val(),
                'legendre_polynomial_order': drone_imagery_legendre_order,
                'protocol': drone_imagery_stats_protocol
            };

            drone_imagery_stats_auxiliary_files = [
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_genetic_legendre_polynomial_genetic_blups_grm_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_genetic_legendre_polynomial_genetic_blups_genetic_coefficients_file' },
            ];

            statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on growing degree days computed using Sommer R|SGNSTAT:0000006";
        }

        var training_data_file = manage_drone_imagery_calculate_statistics_response.stats_tempfile;

        if (manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_gdd_blups' || manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_dap_blups' || manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_dap_blups' || manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_gdd_blups') {

            training_data_file = manage_drone_imagery_calculate_statistics_response.blupf90_training_file;
            var drone_imagery_permanent_env_structure = $('#drone_image_calculate_statistics_permanent_env_structure_select').val();

            if (manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_gdd_blups' || manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_dap_blups') {
                drone_imagery_stats_protocol = 'blupf90(random regression GRM and Permanent Environment ' + drone_imagery_permanent_env_structure + ', conv_crit=' + drone_imagery_stats_tolparinv_param + ');';
            }
            if (manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_dap_blups' || manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_gdd_blups') {
                drone_imagery_stats_protocol = 'airemlf90(random regression GRM and Permanent Environment ' + drone_imagery_permanent_env_structure + ', conv_crit=' + drone_imagery_stats_tolparinv_param + ');';
            }

            drone_imagery_stats_parameters = {
                'tolparinv': drone_imagery_stats_tolparinv_param,
                'genotyping_protocol_id': $('#drone_image_calculate_statistics_genotyping_protocol_select').val(),
                'compute_genotypes_from_parents': $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').val(),
                'legendre_polynomial_order': drone_imagery_legendre_order,
                'protocol': drone_imagery_stats_protocol,
                'permanent_environment_structure': drone_imagery_permanent_env_structure
            };

            if (manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_gdd_blups') {
                statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on growing degree days computed using BLUPf90|SGNSTAT:0000010";

                drone_imagery_stats_auxiliary_files = [
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_genetic_blups_grm_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_genetic_blups_param_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_genetic_blups_log_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_genetic_blups_genetic_coefficients_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_genetic_blups_permanent_environment_coefficients_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_blups_solutions_file' }
                ];
                if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                    drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_blups_permanent_environment_structure_file' });
                }
            }
            else if (manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_dap_blups') {
                statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on days after planting computed using BLUPf90|SGNSTAT:0000008";

                drone_imagery_stats_auxiliary_files = [
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_genetic_blups_grm_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_genetic_blups_param_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_genetic_blups_log_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_genetic_blups_genetic_coefficients_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_genetic_blups_permanent_environment_coefficients_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_blups_solutions_file' }
                ];
                if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                    drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_blups_permanent_environment_structure_file' });
                }
            }
            else if (manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_dap_blups') {
                statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on days after planting computed using AIREMLf90|SGNSTAT:0000018";

                drone_imagery_stats_auxiliary_files = [
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_genetic_blups_grm_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_genetic_blups_param_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_genetic_blups_log_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_genetic_blups_genetic_coefficients_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_genetic_blups_permanent_environment_coefficients_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_blups_solutions_file' }
                ];
                if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                    drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_blups_permanent_environment_structure_file' });
                }
            }
            else if (manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_gdd_blups') {
                statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on growing degree days computed using AIREMLf90|SGNSTAT:0000020";

                drone_imagery_stats_auxiliary_files = [
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_genetic_blups_grm_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_genetic_blups_param_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_genetic_blups_log_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_genetic_blups_genetic_coefficients_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_genetic_blups_permanent_environment_coefficients_file' },
                    { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_blups_solutions_file' }
                ];
                if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                    drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_blups_permanent_environment_structure_file' });
                }
            }
        }
        if (manage_drone_imagery_calculate_statistics_select == 'lmer_germplasmname_replicate') {
            drone_imagery_stats_protocol = 'lmer(t1~replicate + 1|germplasmName, data=mat, na.action = na.omit)';
            drone_imagery_stats_parameters = {
                'protocol': drone_imagery_stats_protocol
            };
            statistical_ontology_term = "Univariate linear mixed model genetic BLUPs using germplasmName computed using LMER R|SGNSTAT:0000002";
        }

        $('#generic_save_analysis_protocol').val(drone_imagery_stats_protocol);
        $('#generic_save_analysis_model_properties').val(JSON.stringify(drone_imagery_stats_parameters));
        //$('#generic_save_analysis_dataset_id').val();
        $('#generic_save_analysis_accession_names').val(JSON.stringify(manage_drone_imagery_calculate_statistics_response.unique_accessions));
        $('#generic_save_analysis_trait_names').val(JSON.stringify(manage_drone_imagery_calculate_statistics_response.unique_traits));
        $('#generic_save_analysis_statistical_ontology_term').val(statistical_ontology_term);
        //$('#generic_save_analysis_design').val();
        $('#generic_save_analysis_result_values').val(JSON.stringify(manage_drone_imagery_calculate_statistics_response.result_blup_genetic_data));
        $('#generic_save_analysis_result_values_type').val(manage_drone_imagery_calculate_statistics_response.analysis_result_values_type);
        $('#generic_save_analysis_result_summary_values').val(JSON.stringify(drone_imagery_stats_result_summary));
        $('#generic_save_analysis_model_language').val(manage_drone_imagery_calculate_statistics_response.analysis_model_language);
        $('#generic_save_analysis_model_type').val(manage_drone_imagery_calculate_statistics_response.analysis_model_type);
        $('#generic_save_analysis_model_application_name').val(manage_drone_imagery_calculate_statistics_response.application_name);
        $('#generic_save_analysis_model_application_version').val(manage_drone_imagery_calculate_statistics_response.application_version);
        //$('#generic_save_analysis_model_file').val();
        //$('#generic_save_analysis_model_archived_model_file_type').val();
        $('#generic_save_analysis_model_training_data_file').val(training_data_file);
        $('#generic_save_analysis_model_archived_training_data_file_type').val(manage_drone_imagery_calculate_statistics_response.analysis_model_training_data_file_type);
        $('#generic_save_analysis_model_auxiliary_files').val(JSON.stringify(drone_imagery_stats_auxiliary_files));

        return false;
    });

    $('#drone_imagery_calculate_statistics_analysis_save_blups_spatial').click(function () {
        if (manage_drone_imagery_calculate_statistics_field_trial_id_array.length > 1) {
            alert('Saving spatial BLUPs currently only implemented for a single trial, so only select one field trial in your analysis');
            return false;
        }

        $('#generic_save_analysis_dialog').modal('show');

        var drone_imagery_stats_result_summary = {};

        var drone_imagery_stats_tolparinv_param = $('#drone_image_calculate_statistics_tolparinv_select').val();
        var drone_imagery_stats_numbers_traits = manage_drone_imagery_calculate_statistics_response.unique_traits.length;

        var drone_imagery_stats_mv_traits = [];
        for (var i = 1; i < drone_imagery_stats_numbers_traits + 1; i++) {
            drone_imagery_stats_mv_traits.push('t' + i);
        }
        var drone_imagery_stats_mv_traits_string = drone_imagery_stats_mv_traits.join();

        var drone_imagery_stats_protocol = 'mmer(' + drone_imagery_stats_mv_traits_string + '~1, random=~vs(id, Gu=geno_mat, Gtc=unsm(' + drone_imagery_stats_numbers_traits + ')) +vs(rowNumberFactor, Gtc=diag(' + drone_imagery_stats_numbers_traits + ')) +vs(colNumberFactor, Gtc=diag(' + drone_imagery_stats_numbers_traits + ')), rcov=~vs(units, Gtc=unsm(' + drone_imagery_stats_numbers_traits + ')), data=mat, tolparinv=' + drone_imagery_stats_tolparinv_param + ');';

        var drone_imagery_stats_parameters = {
            'tolparinv': drone_imagery_stats_tolparinv_param,
            'genotyping_protocol_id': $('#drone_image_calculate_statistics_genotyping_protocol_select').val(),
            'compute_genotypes_from_parents': $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').val(),
            'protocol': drone_imagery_stats_protocol
        };

        var statistical_ontology_term = "Multivariate linear mixed model 2D spline spatial BLUPs using genetic relationship matrix and row and column spatial effects computed using Sommer R|SGNSTAT:0000003";

        $('#generic_save_analysis_result_compose_trait_info').val(JSON.stringify(manage_drone_imagery_calculate_statistics_response.trait_composing_info));

        var drone_imagery_stats_auxiliary_files = [{ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_spatial_genetic_blups_grm_file' }];

        $('#generic_save_analysis_protocol').val(drone_imagery_stats_protocol);
        $('#generic_save_analysis_model_properties').val(JSON.stringify(drone_imagery_stats_parameters));
        //$('#generic_save_analysis_dataset_id').val();
        $('#generic_save_analysis_accession_names').val(JSON.stringify(manage_drone_imagery_calculate_statistics_response.unique_accessions));
        $('#generic_save_analysis_trait_names').val(JSON.stringify(manage_drone_imagery_calculate_statistics_response.unique_traits));
        $('#generic_save_analysis_statistical_ontology_term').val(statistical_ontology_term);
        $('#generic_save_analysis_design').val(JSON.stringify(manage_drone_imagery_calculate_statistics_response.field_trial_design));
        $('#generic_save_analysis_result_values').val(JSON.stringify(manage_drone_imagery_calculate_statistics_response.result_blup_spatial_data));
        $('#generic_save_analysis_result_values_type').val('analysis_result_values_match_precomputed_design');
        $('#generic_save_analysis_result_summary_values').val(JSON.stringify(drone_imagery_stats_result_summary));
        $('#generic_save_analysis_model_language').val(manage_drone_imagery_calculate_statistics_response.analysis_model_language);
        $('#generic_save_analysis_model_type').val(manage_drone_imagery_calculate_statistics_response.analysis_model_type);
        $('#generic_save_analysis_model_application_name').val(manage_drone_imagery_calculate_statistics_response.application_name);
        $('#generic_save_analysis_model_application_version').val(manage_drone_imagery_calculate_statistics_response.application_version);
        //$('#generic_save_analysis_model_file').val();
        //$('#generic_save_analysis_model_archived_model_file_type').val();
        $('#generic_save_analysis_model_training_data_file').val(manage_drone_imagery_calculate_statistics_response.stats_tempfile);
        $('#generic_save_analysis_model_archived_training_data_file_type').val(manage_drone_imagery_calculate_statistics_response.analysis_model_training_data_file_type);
        $('#generic_save_analysis_model_auxiliary_files').val(JSON.stringify(drone_imagery_stats_auxiliary_files));

        return false;
    });

    $('#drone_imagery_calculate_statistics_analysis_save_blups_pe').click(function () {
        if (manage_drone_imagery_calculate_statistics_field_trial_id_array.length > 1) {
            alert('Saving spatial BLUPs currently only implemented for a single trial, so only select one field trial in your analysis');
            return false;
        }

        $('#generic_save_analysis_dialog').modal('show');

        var drone_imagery_stats_result_summary = {};

        var drone_imagery_stats_tolparinv_param = $('#drone_image_calculate_statistics_tolparinv_select').val();
        var drone_imagery_legendre_order = $('#drone_image_calculate_statistics_legendre_order_number_select').val();
        var drone_imagery_permanent_env_structure = $('#drone_image_calculate_statistics_permanent_env_structure_select').val();

        var drone_imagery_stats_protocol = '';
        var statistical_ontology_term;
        var drone_imagery_stats_auxiliary_files;
        var drone_imagery_stats_training_data_file;
        if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_temporal_random_regression_dap_genetic_blups') {

            drone_imagery_stats_protocol = 'mmer(value~1+replicate, random=~vs(id, Gu=geno_mat) +vs(leg(time_DAP, ' + drone_imagery_legendre_order + ', intercept=TRUE), id) +vs(leg(time_DAP, ' + drone_imagery_legendre_order + ', intercept=TRUE), plot_id), rcov=~vs(units), data=mat_long_format, tolparinv=' + drone_imagery_stats_tolparinv_param + ');';

            drone_imagery_stats_auxiliary_files = [
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_DAP_genetic_blups_grm_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_DAP_genetic_blups_genetic_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_DAP_genetic_blups_permanent_environment_coefficients_file' }
            ];

            statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on days after planting computed using Sommer R|SGNSTAT:0000004";

            drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.stats_tempfile;
        }
        if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_temporal_random_regression_gdd_genetic_blups') {

            drone_imagery_stats_protocol = 'mmer(value~1+replicate, random=~vs(id, Gu=geno_mat) +vs(leg(time_GDD, ' + drone_imagery_legendre_order + ', intercept=TRUE), id) +vs(leg(time_GDD, ' + drone_imagery_legendre_order + ', intercept=TRUE), plot_id), rcov=~vs(units), data=mat_long_format, tolparinv=' + drone_imagery_stats_tolparinv_param + ');';

            drone_imagery_stats_auxiliary_files = [
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_GDD_genetic_blups_grm_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_GDD_genetic_blups_genetic_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_GDD_genetic_blups_permanent_environment_coefficients_file' }
            ];

            statistical_ontology_term = "Multivariate linear mixed model genetic BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on growing degree days computed using Sommer R|SGNSTAT:0000006";

            drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.stats_tempfile;
        }
        if (manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_gdd_blups') {
            drone_imagery_stats_protocol = 'blupf90(random regression GRM and Permanent Environment ' + drone_imagery_permanent_env_structure + ', conv_crit=' + drone_imagery_stats_tolparinv_param + ');';

            statistical_ontology_term = "Multivariate linear mixed model permanent environment BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on growing degree days computed using BLUPf90|SGNSTAT:0000011";

            drone_imagery_stats_auxiliary_files = [
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_grm_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_param_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_log_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_genetic_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_permanent_environment_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_blups_solutions_file' }
            ];
            if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_blups_permanent_environment_structure_file' });
            }

            drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.blupf90_training_file;
        }
        else if (manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_dap_blups') {
            drone_imagery_stats_protocol = 'blupf90(random regression GRM and Permanent Environment ' + drone_imagery_permanent_env_structure + ', conv_crit=' + drone_imagery_stats_tolparinv_param + ');';

            statistical_ontology_term = "Multivariate linear mixed model permanent environment BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on days after planting computed using BLUPf90|SGNSTAT:0000009";

            drone_imagery_stats_auxiliary_files = [
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_grm_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_param_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_log_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_genetic_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_permanent_environment_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_blups_solutions_file' }
            ];
            if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_blups_permanent_environment_structure_file' });
            }

            drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.blupf90_training_file;
        }
        if (manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_gdd_blups') {
            drone_imagery_stats_protocol = 'airemlf90(random regression GRM and Permanent Environment ' + drone_imagery_permanent_env_structure + ', conv_crit=' + drone_imagery_stats_tolparinv_param + ');';

            statistical_ontology_term = "Multivariate linear mixed model permanent environment BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on growing degree days computed using AIREMLf90|SGNSTAT:0000021";

            drone_imagery_stats_auxiliary_files = [
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_grm_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_param_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_log_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_genetic_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_permanent_environment_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_blups_solutions_file' }
            ];
            if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_blups_permanent_environment_structure_file' });
            }

            drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.blupf90_training_file;
        }
        else if (manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_dap_blups') {
            drone_imagery_stats_protocol = 'airemlf90(random regression GRM and Permanent Environment ' + drone_imagery_permanent_env_structure + ', conv_crit=' + drone_imagery_stats_tolparinv_param + ');';

            statistical_ontology_term = "Multivariate linear mixed model permanent environment BLUPs using genetic relationship matrix and temporal Legendre polynomial random regression on days after planting computed using AIREMLf90|SGNSTAT:0000019";

            drone_imagery_stats_auxiliary_files = [
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_grm_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_param_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_log_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_genetic_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_permanent_environment_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_blups_solutions_file' }
            ];
            if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_blups_permanent_environment_structure_file' });
            }

            drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.blupf90_training_file;
        }

        var drone_imagery_stats_parameters = {
            'tolparinv': drone_imagery_stats_tolparinv_param,
            'genotyping_protocol_id': $('#drone_image_calculate_statistics_genotyping_protocol_select').val(),
            'compute_genotypes_from_parents': $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').val(),
            'legendre_polynomial_order': drone_imagery_legendre_order,
            'protocol': drone_imagery_stats_protocol,
            'permanent_environment_structure': drone_imagery_permanent_env_structure
        };

        $('#generic_save_analysis_protocol').val(drone_imagery_stats_protocol);
        $('#generic_save_analysis_model_properties').val(JSON.stringify(drone_imagery_stats_parameters));
        //$('#generic_save_analysis_dataset_id').val();
        $('#generic_save_analysis_accession_names').val(JSON.stringify(manage_drone_imagery_calculate_statistics_response.unique_accessions));
        $('#generic_save_analysis_trait_names').val(JSON.stringify(manage_drone_imagery_calculate_statistics_response.unique_traits));
        $('#generic_save_analysis_statistical_ontology_term').val(statistical_ontology_term);
        $('#generic_save_analysis_design').val(JSON.stringify(manage_drone_imagery_calculate_statistics_response.field_trial_design));
        $('#generic_save_analysis_result_values').val(JSON.stringify(manage_drone_imagery_calculate_statistics_response.result_blup_pe_data));
        $('#generic_save_analysis_result_values_type').val('analysis_result_values_match_precomputed_design');
        $('#generic_save_analysis_result_summary_values').val(JSON.stringify(drone_imagery_stats_result_summary));
        $('#generic_save_analysis_model_language').val(manage_drone_imagery_calculate_statistics_response.analysis_model_language);
        $('#generic_save_analysis_model_type').val(manage_drone_imagery_calculate_statistics_response.analysis_model_type);
        $('#generic_save_analysis_model_application_name').val(manage_drone_imagery_calculate_statistics_response.application_name);
        $('#generic_save_analysis_model_application_version').val(manage_drone_imagery_calculate_statistics_response.application_version);
        //$('#generic_save_analysis_model_file').val();
        //$('#generic_save_analysis_model_archived_model_file_type').val();
        $('#generic_save_analysis_model_training_data_file').val(drone_imagery_stats_training_data_file);
        $('#generic_save_analysis_model_archived_training_data_file_type').val(manage_drone_imagery_calculate_statistics_response.analysis_model_training_data_file_type);
        $('#generic_save_analysis_model_auxiliary_files').val(JSON.stringify(drone_imagery_stats_auxiliary_files));

        return false;
    });

    $('#drone_imagery_calculate_statistics_analysis_save_residuals').click(function () {
        $('#generic_save_analysis_dialog').modal('show');

        var drone_imagery_stats_result_summary = {};

        $('#generic_save_analysis_result_compose_trait_info').val(JSON.stringify(manage_drone_imagery_calculate_statistics_response.trait_composing_info));

        var drone_imagery_stats_tolparinv_param = $('#drone_image_calculate_statistics_tolparinv_select').val();
        var drone_imagery_legendre_order = $('#drone_image_calculate_statistics_legendre_order_number_select').val();
        var drone_imagery_permanent_env_structure = $('#drone_image_calculate_statistics_permanent_env_structure_select').val();

        var drone_imagery_stats_protocol = '';
        var statistical_ontology_term;
        var drone_imagery_stats_auxiliary_files;
        var drone_imagery_stats_training_data_file;
        if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_temporal_random_regression_dap_genetic_blups') {

            drone_imagery_stats_protocol = 'mmer(value~1+replicate, random=~vs(id, Gu=geno_mat) +vs(leg(time_DAP, ' + drone_imagery_legendre_order + ', intercept=TRUE), id) +vs(leg(time_DAP, ' + drone_imagery_legendre_order + ', intercept=TRUE), plot_id), rcov=~vs(units), data=mat_long_format, tolparinv=' + drone_imagery_stats_tolparinv_param + ');';

            drone_imagery_stats_auxiliary_files = [
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_DAP_genetic_blups_grm_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_DAP_genetic_blups_genetic_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_DAP_genetic_blups_permanent_environment_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.yhat_residual_tempfile, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_DAP_genetic_blups_residual_file' }
            ];

            statistical_ontology_term = "Multivariate linear mixed model residual using genetic relationship matrix and temporal Legendre polynomial random regression on days after planting computed using Sommer R|SGNSTAT:0000030";

            drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.stats_tempfile;
        }
        if (manage_drone_imagery_calculate_statistics_select == 'sommer_grm_temporal_random_regression_gdd_genetic_blups') {

            drone_imagery_stats_protocol = 'mmer(value~1+replicate, random=~vs(id, Gu=geno_mat) +vs(leg(time_GDD, ' + drone_imagery_legendre_order + ', intercept=TRUE), id) +vs(leg(time_GDD, ' + drone_imagery_legendre_order + ', intercept=TRUE), plot_id), rcov=~vs(units), data=mat_long_format, tolparinv=' + drone_imagery_stats_tolparinv_param + ');';

            drone_imagery_stats_auxiliary_files = [
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.grm_file, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_GDD_genetic_blups_grm_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_GDD_genetic_blups_genetic_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_GDD_genetic_blups_permanent_environment_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.yhat_residual_tempfile, auxiliary_model_file_archive_type: 'nicksmixedmodels_v1.01_sommer_grm_temporal_legendre_polynomial_GDD_genetic_blups_residual_file' }
            ];

            statistical_ontology_term = "Multivariate linear mixed model residual using genetic relationship matrix and temporal Legendre polynomial random regression on growing degree days computed using Sommer R|SGNSTAT:0000031";

            drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.stats_tempfile;
        }
        if (manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_gdd_blups') {
            drone_imagery_stats_protocol = 'blupf90(random regression GRM and Permanent Environment ' + drone_imagery_permanent_env_structure + ', conv_crit=' + drone_imagery_stats_tolparinv_param + ');';

            statistical_ontology_term = "Multivariate linear mixed model residual using genetic relationship matrix and temporal Legendre polynomial random regression on growing degree days computed using BLUPf90|SGNSTAT:0000029";

            drone_imagery_stats_auxiliary_files = [
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_grm_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_param_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_log_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_genetic_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_permanent_environment_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_blups_solutions_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.yhat_residual_tempfile, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_residual_file' }
            ];
            if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_GDD_blups_permanent_environment_structure_file' });
            }

            drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.blupf90_training_file;
        }
        else if (manage_drone_imagery_calculate_statistics_select == 'blupf90_grm_random_regression_dap_blups') {
            drone_imagery_stats_protocol = 'blupf90(random regression GRM and Permanent Environment ' + drone_imagery_permanent_env_structure + ', conv_crit=' + drone_imagery_stats_tolparinv_param + ');';

            statistical_ontology_term = "Multivariate linear mixed model residual using genetic relationship matrix and temporal Legendre polynomial random regression on days after planting computed using BLUPf90|SGNSTAT:0000028";

            drone_imagery_stats_auxiliary_files = [
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_grm_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_param_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_log_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_genetic_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_permanent_environment_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_blups_solutions_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.yhat_residual_tempfile, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_residual_file' }
            ];
            if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'blupf90_grm_temporal_leg_random_regression_DAP_blups_permanent_environment_structure_file' });
            }

            drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.blupf90_training_file;
        }
        if (manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_gdd_blups') {
            drone_imagery_stats_protocol = 'airemlf90(random regression GRM and Permanent Environment ' + drone_imagery_permanent_env_structure + ', conv_crit=' + drone_imagery_stats_tolparinv_param + ');';

            statistical_ontology_term = "Multivariate linear mixed model residual using genetic relationship matrix and temporal Legendre polynomial random regression on growing degree days computed using AIREMLf90|SGNSTAT:0000027";

            drone_imagery_stats_auxiliary_files = [
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_grm_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_param_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_log_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_genetic_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_permanent_environment_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_blups_solutions_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.yhat_residual_tempfile, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_permanent_environment_blups_residual_file' }
            ];
            if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_GDD_blups_permanent_environment_structure_file' });
            }

            drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.blupf90_training_file;
        }
        else if (manage_drone_imagery_calculate_statistics_select == 'airemlf90_grm_random_regression_dap_blups') {
            drone_imagery_stats_protocol = 'airemlf90(random regression GRM and Permanent Environment ' + drone_imagery_permanent_env_structure + ', conv_crit=' + drone_imagery_stats_tolparinv_param + ');';

            statistical_ontology_term = "Multivariate linear mixed model residual using genetic relationship matrix and temporal Legendre polynomial random regression on days after planting computed using AIREMLf90|SGNSTAT:0000026";

            drone_imagery_stats_auxiliary_files = [
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_grm_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_grm_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_param_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_param_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.stats_out_tempfile, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_log_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_genetic_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_genetic_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.rr_pe_coefficients, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_permanent_environment_coefficients_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_solutions, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_blups_solutions_file' },
                { 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.yhat_residual_tempfile, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_permanent_environment_blups_residual_file' }
            ];
            if (drone_imagery_permanent_env_structure == 'euclidean_rows_and_columns') {
                drone_imagery_stats_auxiliary_files.push({ 'auxiliary_model_file': manage_drone_imagery_calculate_statistics_response.blupf90_permanent_environment_structure_file, auxiliary_model_file_archive_type: 'airemlf90_grm_temporal_leg_random_regression_DAP_blups_permanent_environment_structure_file' });
            }

            drone_imagery_stats_training_data_file = manage_drone_imagery_calculate_statistics_response.blupf90_training_file;
        }

        var drone_imagery_stats_parameters = {
            'tolparinv': drone_imagery_stats_tolparinv_param,
            'genotyping_protocol_id': $('#drone_image_calculate_statistics_genotyping_protocol_select').val(),
            'compute_genotypes_from_parents': $('#drone_image_calculate_statistics_genotyping_protocol_compute_from_parents_select').val(),
            'legendre_polynomial_order': drone_imagery_legendre_order,
            'protocol': drone_imagery_stats_protocol,
            'permanent_environment_structure': drone_imagery_permanent_env_structure
        };

        $('#generic_save_analysis_protocol').val(drone_imagery_stats_protocol);
        $('#generic_save_analysis_model_properties').val(JSON.stringify(drone_imagery_stats_parameters));
        //$('#generic_save_analysis_dataset_id').val();
        $('#generic_save_analysis_accession_names').val(JSON.stringify(manage_drone_imagery_calculate_statistics_response.unique_accessions));
        $('#generic_save_analysis_trait_names').val(JSON.stringify(manage_drone_imagery_calculate_statistics_response.unique_residual_traits));
        $('#generic_save_analysis_statistical_ontology_term').val(statistical_ontology_term);
        $('#generic_save_analysis_design').val(JSON.stringify(manage_drone_imagery_calculate_statistics_response.field_trial_design));
        $('#generic_save_analysis_result_values').val(JSON.stringify(manage_drone_imagery_calculate_statistics_response.result_residual_data));
        $('#generic_save_analysis_result_values_type').val('analysis_result_values_match_precomputed_design');
        $('#generic_save_analysis_result_summary_values').val(JSON.stringify(drone_imagery_stats_result_summary));
        $('#generic_save_analysis_model_language').val(manage_drone_imagery_calculate_statistics_response.analysis_model_language);
        $('#generic_save_analysis_model_type').val(manage_drone_imagery_calculate_statistics_response.analysis_model_type);
        $('#generic_save_analysis_model_application_name').val(manage_drone_imagery_calculate_statistics_response.application_name);
        $('#generic_save_analysis_model_application_version').val(manage_drone_imagery_calculate_statistics_response.application_version);
        //$('#generic_save_analysis_model_file').val();
        //$('#generic_save_analysis_model_archived_model_file_type').val();
        $('#generic_save_analysis_model_training_data_file').val(manage_drone_imagery_calculate_statistics_response.stats_tempfile);
        $('#generic_save_analysis_model_archived_training_data_file_type').val(manage_drone_imagery_calculate_statistics_response.analysis_model_training_data_file_type);
        $('#generic_save_analysis_model_auxiliary_files').val(JSON.stringify(drone_imagery_stats_auxiliary_files));

        return false;
    });
});


$(document).ready(function () {

    $('#upload_drone_imagery_link').click(function () {
        window.location.href = "/breeders/drone_imagery_upload";
    });
});


$(document).ready(function () {
    $('#drone_imagery_analytics_link').click(function () {
        get_select_box('trials', 'drone_imagery_analytics_trial_select_div', { 'name': 'drone_imagery_analytics_field_trial_id', 'id': 'drone_imagery_analytics_field_trial_id', 'empty': 1, 'multiple': 1 });

        $('#drone_imagery_analytics_dialog').modal('show');
    });

    var manage_drone_imagery_analytics_field_trial_id_array = undefined;
    var manage_drone_imagery_analytics_field_trial_id_string = "";
    var manage_drone_imagery_analytics_observation_variable_type;
    var manage_drone_imagery_analytics_trait_ids = [];
    var manage_drone_imagery_analytics_trait_names = [];
    var manage_drone_imagery_analytics_accession_names = [];
    var manage_drone_imagery_analytics_plot_names = [];
    var manage_drone_imagery_analytics_statistics_select = '';
    var manage_drone_imagery_analytics_phenotype_training_file;
    var manage_drone_imagery_analytics_grm_training_file;
    var manage_drone_imagery_analytics_response = {};
    var manage_drone_imagery_analytics_name = "";
    var manage_drone_imagery_analytics_desc = "";
    var manage_drone_imagery_analytics_type = "";
    var manage_drone_imagery_analytics_protocol_id = undefined;

    $('#drone_imagery_analytics_field_trial_select_step').click(function () {
        manage_drone_imagery_analytics_field_trial_id_array = undefined;
        manage_drone_imagery_analytics_field_trial_id_string = "";
        manage_drone_imagery_analytics_field_trial_id_array = $('#drone_imagery_analytics_field_trial_id').val();

        if (!manage_drone_imagery_analytics_field_trial_id_array || manage_drone_imagery_analytics_field_trial_id_array.length > 1) {
            alert('Please only select a single field trial for now!');
            return false;
        }

        manage_drone_imagery_analytics_field_trial_id_string = manage_drone_imagery_analytics_field_trial_id_array.join(",");
        manage_drone_imagery_analytics_observation_variable_type = $('#drone_imagery_analytics_select_observation_variable_type').val();
        if (manage_drone_imagery_analytics_field_trial_id_string == '') {
            alert('Please select a field trial first!');
        } else {
            if (manage_drone_imagery_analytics_observation_variable_type == 'time_ontology') {
                get_select_box('traits', 'drone_imagery_analytics_trait_select_div', { 'name': 'drone_imagery_analytics_trait_id_select', 'id': 'drone_imagery_analytics_trait_id_select', 'empty': 1, 'multiple': 1, 'size': 20, 'trial_ids': manage_drone_imagery_analytics_field_trial_id_string, 'stock_type': 'plot', 'contains_composable_cv_type': manage_drone_imagery_analytics_observation_variable_type, 'select_format': 'component_table_select' });
            }
            else {
                get_select_box('traits', 'drone_imagery_analytics_trait_select_div', { 'name': 'drone_imagery_analytics_trait_id_select', 'id': 'drone_imagery_analytics_trait_id_select', 'empty': 1, 'multiple': 1, 'size': 20, 'trial_ids': manage_drone_imagery_analytics_field_trial_id_string, 'stock_type': 'plot', 'contains_composable_cv_type': manage_drone_imagery_analytics_observation_variable_type });
            }

            get_select_box('traits', 'drone_imagery_analytics_permanent_env_structure_phenotype_correlation_select_div', { 'name': 'drone_imagery_analytics_permanent_env_structure_phenotype_correlation_select', 'id': 'drone_imagery_analytics_permanent_env_structure_phenotype_correlation_select', 'empty': 1, 'multiple': 1, 'size': 20, 'trial_ids': manage_drone_imagery_analytics_field_trial_id_string, 'stock_type': 'plot' });

            get_select_box('traits', 'drone_imagery_analytics_permanent_env_structure_phenotype_select_div', { 'name': 'drone_imagery_analytics_permanent_env_structure_phenotype_select', 'id': 'drone_imagery_analytics_permanent_env_structure_phenotype_select', 'empty': 1, 'multiple': 1, 'size': 20, 'trial_ids': manage_drone_imagery_analytics_field_trial_id_string, 'stock_type': 'plot', 'contains_composable_cv_type': 'time_ontology', 'select_format': 'component_table_select' });

            get_select_box('traits', 'drone_imagery_analytics_simulated_environment_real_data_trait_select_div', { 'name': 'drone_imagery_analytics_simulated_environment_real_data_trait_select', 'id': 'drone_imagery_analytics_simulated_environment_real_data_trait_select', 'empty': 0, 'multiple': 0, 'trial_ids': manage_drone_imagery_analytics_field_trial_id_string, 'stock_type': 'plot' });

            get_select_box('traits', 'drone_imagery_analytics_fixed_effect_trait_select_div', { 'name': 'drone_imagery_analytics_fixed_effect_trait_select', 'id': 'drone_imagery_analytics_fixed_effect_trait_select', 'empty': 0, 'multiple': 0, 'trial_ids': manage_drone_imagery_analytics_field_trial_id_string, 'stock_type': 'plot' });

            get_select_box('genotyping_protocol', 'drone_imagery_analytics_genotyping_protocol_select_div', { 'name': 'drone_image_analytics_genotyping_protocol_select', 'id': 'drone_image_analytics_genotyping_protocol_select', 'empty': 1 });

            Workflow.complete("#drone_imagery_analytics_field_trial_select_step");
            Workflow.focus('#drone_imagery_analytics_workflow', 1);
        }
        return false;
    });

    $('#drone_imagery_analytics_simulated_environment_processes_select_div').change(function () {
        if ($(this).val() == '6sims') {
            $('#drone_imagery_analytics_simulated_environment_real_data_trait_select_section').show();
        }
        else {
            $('#drone_imagery_analytics_simulated_environment_real_data_trait_select_section').hide();
        }
    });

    $('#drone_imagery_analytics_simulated_environment_processes_select_example_button').click(function () {
        var drone_imagery_analytics_simulated_environment_processes_select_example_button_sims = $('#drone_imagery_analytics_simulated_environment_processes_select_div').val();
        var drone_imagery_analytics_simulated_environment_processes_select_example_button_trait = $('#drone_imagery_analytics_simulated_environment_real_data_trait_select').val();
        if (drone_imagery_analytics_simulated_environment_processes_select_example_button_sims == '6sims' && drone_imagery_analytics_simulated_environment_processes_select_example_button_trait == '') {
            alert('Please select the real data trait to show example of!');
            return false;
        }

        var drone_imagery_analytics_simulated_environment_processes_select_example_button_trait_ids = [];
        manage_drone_imagery_analytics_observation_variable_type = $('#drone_imagery_analytics_select_observation_variable_type').val();
        if (manage_drone_imagery_analytics_observation_variable_type == 'time_ontology') {
            $('input[name="drone_imagery_analytics_trait_id_select"]').each(function () {
                if (this.checked) {
                    drone_imagery_analytics_simulated_environment_processes_select_example_button_trait_ids.push($(this).val());
                }
            });

            if (drone_imagery_analytics_simulated_environment_processes_select_example_button_trait_ids.length < 1) {
                alert('Please select at least one observation variable first!');
                return false;
            }
        }
        else {
            drone_imagery_analytics_simulated_environment_processes_select_example_button_trait_ids = $('#drone_imagery_analytics_trait_id_select').val();
            if (drone_imagery_analytics_simulated_environment_processes_select_example_button_trait_ids == null || drone_imagery_analytics_simulated_environment_processes_select_example_button_trait_ids == undefined) {
                alert('Please select at least one observation variable first!');
                return false;
            }
        }

        jQuery.ajax({
            url: '/api/drone_imagery/show_example_simulations',
            beforeSend: function (xhr) {
                $("#working_modal").modal("show");
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            method: 'POST',
            data: {
                'field_trial_id': manage_drone_imagery_analytics_field_trial_id_string,
                'simulations': drone_imagery_analytics_simulated_environment_processes_select_example_button_sims,
                'real_data_trait_id': drone_imagery_analytics_simulated_environment_processes_select_example_button_trait,
                'trait_ids': JSON.stringify(drone_imagery_analytics_simulated_environment_processes_select_example_button_trait_ids),
                'change_over_time': $('#drone_imagery_analytics_select_sim_env_change_over_time_type').val(),
                'correlation_over_time': $('#drone_imagery_analytics_sim_env_change_over_time_correlation').val()
            },
            success: function (response) {
                console.log(response);
                $("#working_modal").modal("hide");

                if (response.error) {
                    alert(response.error);
                }
                else {
                    var html = '<img src="' + response.plot + '">';
                    $('#drone_imagery_analytics_temp_results_dialog_div').html(html);
                    $('#drone_imagery_analytics_temp_results_dialog').modal('show');
                }
            },
            error: function (response) {
                $("#working_modal").modal("hide");
                alert('Error showing example sims!')
            }
        });
    });

    $('#drone_imagery_analytics_select_observation_variable_type').change(function () {
        manage_drone_imagery_analytics_observation_variable_type = $('#drone_imagery_analytics_select_observation_variable_type').val();
        if (manage_drone_imagery_analytics_observation_variable_type == 'time_ontology') {
            get_select_box('traits', 'drone_imagery_analytics_trait_select_div', { 'name': 'drone_imagery_analytics_trait_id_select', 'id': 'drone_imagery_analytics_trait_id_select', 'empty': 1, 'multiple': 1, 'size': 20, 'trial_ids': manage_drone_imagery_analytics_field_trial_id_string, 'stock_type': 'plot', 'contains_composable_cv_type': manage_drone_imagery_analytics_observation_variable_type, 'select_format': 'component_table_select' });
        }
        else {
            get_select_box('traits', 'drone_imagery_analytics_trait_select_div', { 'name': 'drone_imagery_analytics_trait_id_select', 'id': 'drone_imagery_analytics_trait_id_select', 'empty': 1, 'multiple': 1, 'size': 20, 'trial_ids': manage_drone_imagery_analytics_field_trial_id_string, 'stock_type': 'plot', 'contains_composable_cv_type': manage_drone_imagery_analytics_observation_variable_type });
        }
    });

    $('#drone_imagery_analytics_select_input').change(function () {
        $("#drone_imagery_analytics_relationship_matrix_type_select_div").val('').change();
        $("#drone_image_analytics_genotyping_protocol_compute_from_parents_select").val('no').change();

        manage_drone_imagery_analytics_statistics_select = $('#drone_imagery_analytics_select_input').val();

        if (manage_drone_imagery_analytics_statistics_select == 'lmer_germplasmname_replicate') {
            $('#drone_imagery_analytics_genotyping_protocol_div').hide();
            $('#drone_imagery_analytics_analysis_save_blups_genetic_pe_residual').hide();
            $('#drone_imagery_analytics_analysis_save_blups_genetic').show();
            $('#drone_imagery_analytics_analysis_save_blups_spatial').hide();
            $('#drone_imagery_analytics_analysis_save_blups_pe').hide();
            $('#drone_imagery_analytics_analysis_save_residuals').hide();
            $('#drone_imagery_analytics_analysis_save_fitted').hide();
        }
        else if (manage_drone_imagery_analytics_statistics_select == 'sommer_grm_spatial_genetic_blups' || manage_drone_imagery_analytics_statistics_select == 'sommer_grm_spatial_pure_2dspl_genetic_blups') {
            $('#drone_imagery_analytics_genotyping_protocol_div').hide();
            $('#drone_imagery_analytics_analysis_save_blups_genetic_pe_residual').show();
            $('#drone_imagery_analytics_analysis_save_blups_genetic').hide();
            $('#drone_imagery_analytics_analysis_save_blups_spatial').hide();
            $('#drone_imagery_analytics_analysis_save_blups_pe').hide();
            $('#drone_imagery_analytics_analysis_save_residuals').hide();
            $('#drone_imagery_analytics_analysis_save_fitted').hide();
        }
        else if (manage_drone_imagery_analytics_statistics_select == 'sommer_grm_temporal_random_regression_dap_genetic_blups' || manage_drone_imagery_analytics_statistics_select == 'sommer_grm_temporal_random_regression_gdd_genetic_blups') {
            $('#drone_imagery_analytics_genotyping_protocol_div').hide();
            $('#drone_imagery_analytics_analysis_save_blups_genetic_pe_residual').hide();
            $('#drone_imagery_analytics_analysis_save_blups_genetic').show();
            $('#drone_imagery_analytics_analysis_save_blups_spatial').hide();
            $('#drone_imagery_analytics_analysis_save_blups_pe').show();
            $('#drone_imagery_analytics_analysis_save_residuals').hide();
            $('#drone_imagery_analytics_analysis_save_fitted').hide();
        }
        else if (manage_drone_imagery_analytics_statistics_select == 'sommer_grm_genetic_only_random_regression_dap_genetic_blups' || manage_drone_imagery_analytics_statistics_select == 'sommer_grm_genetic_only_random_regression_gdd_genetic_blups') {
            $('#drone_imagery_analytics_genotyping_protocol_div').hide();
            $('#drone_imagery_analytics_analysis_save_blups_genetic_pe_residual').hide();
            $('#drone_imagery_analytics_analysis_save_blups_genetic').show();
            $('#drone_imagery_analytics_analysis_save_blups_spatial').hide();
            $('#drone_imagery_analytics_analysis_save_blups_pe').hide();
            $('#drone_imagery_analytics_analysis_save_residuals').hide();
            $('#drone_imagery_analytics_analysis_save_fitted').hide();
        }
        else if (manage_drone_imagery_analytics_statistics_select == 'blupf90_grm_random_regression_dap_blups' || manage_drone_imagery_analytics_statistics_select == 'blupf90_grm_random_regression_gdd_blups' || manage_drone_imagery_analytics_statistics_select == 'airemlf90_grm_random_regression_dap_blups' || manage_drone_imagery_analytics_statistics_select == 'airemlf90_grm_random_regression_gdd_blups') {
            $('#drone_imagery_analytics_genotyping_protocol_div').hide();
            $('#drone_imagery_analytics_analysis_save_blups_genetic_pe_residual').show();
            $('#drone_imagery_analytics_analysis_save_blups_genetic').hide();
            $('#drone_imagery_analytics_analysis_save_blups_spatial').hide();
            $('#drone_imagery_analytics_analysis_save_blups_pe').hide();
            $('#drone_imagery_analytics_analysis_save_residuals').hide();
            $('#drone_imagery_analytics_analysis_save_fitted').hide();
        }
        else if (manage_drone_imagery_analytics_statistics_select == 'sommer_grm_genetic_blups') {
            $('#drone_imagery_analytics_genotyping_protocol_div').hide();
            $('#drone_imagery_analytics_analysis_save_blups_genetic_pe_residual').hide();
            $('#drone_imagery_analytics_analysis_save_blups_genetic').show();
            $('#drone_imagery_analytics_analysis_save_blups_spatial').hide();
            $('#drone_imagery_analytics_analysis_save_blups_pe').hide();
            $('#drone_imagery_analytics_analysis_save_residuals').hide();
            $('#drone_imagery_analytics_analysis_save_fitted').hide();
        }
        else {
            $('#drone_imagery_analytics_genotyping_protocol_div').hide();
            $('#drone_imagery_analytics_analysis_save_blups_genetic_pe_residual').hide();
            $('#drone_imagery_analytics_analysis_save_blups_genetic').hide();
            $('#drone_imagery_analytics_analysis_save_blups_spatial').hide();
            $('#drone_imagery_analytics_analysis_save_blups_pe').hide();
            $('#drone_imagery_analytics_analysis_save_residuals').hide();
            $('#drone_imagery_analytics_analysis_save_fitted').hide();
        }

        $('#drone_imagery_analytics_genotyping_protocol_div').hide();
        $('#drone_imagery_analytics_analysis_save_blups_genetic_pe_residual').hide();
        $('#drone_imagery_analytics_analysis_save_blups_genetic').hide();
        $('#drone_imagery_analytics_analysis_save_blups_spatial').hide();
        $('#drone_imagery_analytics_analysis_save_blups_pe').hide();
        $('#drone_imagery_analytics_analysis_save_residuals').hide();
        $('#drone_imagery_analytics_analysis_save_fitted').hide();
    });

    $('#drone_imagery_analytics_relationship_matrix_type_select_div').change(function () {
        if ($(this).val() == 'genotypes') {
            $('#drone_imagery_analytics_genotyping_protocol_div').show();
            $('#drone_imagery_analytics_htp_phenotypes_rel_matrix_div').hide();
        }
        else if ($(this).val() == 'htp_phenotypes') {
            $('#drone_imagery_analytics_genotyping_protocol_div').hide();
            $('#drone_imagery_analytics_htp_phenotypes_rel_matrix_div').show();
        }
        else {
            $('#drone_imagery_analytics_genotyping_protocol_div').hide();
            $('#drone_imagery_analytics_htp_phenotypes_rel_matrix_div').hide();
        }
    });

    $('#drone_image_analytics_htp_phenotypes_rel_matrix_select').change(function () {
        if ($(this).val() == 'blues') {
            $('#drone_image_analytics_htp_phenotypes_rel_matrix_inversion_select_div').show();
        }
        else {
            $('#drone_image_analytics_htp_phenotypes_rel_matrix_inversion_select_div').hide();
        }
    });

    $('#drone_image_analytics_genotyping_protocol_compute_from_parents_select').change(function () {
        if ($(this).val() == 'no') {
            $('#drone_image_analytics_genotyping_protocol_include_pedigree_select_div').hide();
            $('#drone_image_analytics_genotyping_protocol_use_parental_grms_select_div').hide();
            $('#drone_image_analytics_genotyping_protocol_include_pedigree_select option[value=no]').attr('selected', 'selected');
            $('#drone_image_analytics_genotyping_protocol_use_parental_grms_select option[value=no]').attr('selected', 'selected');
        }
    });

    $('#drone_image_analytics_genotyping_protocol_use_parental_grms_select').change(function () {
        if ($(this).val() == 'yes') {
            $('#drone_image_analytics_genotyping_protocol_include_pedigree_select option[value=no]').attr('selected', 'selected');
            $('#drone_image_analytics_genotyping_protocol_include_pedigree_select_div').hide();
        }
        if ($(this).val() == 'no') {
            $('#drone_image_analytics_genotyping_protocol_include_pedigree_select_div').show();
        }
    });

    $('#drone_image_analytics_permanent_env_structure_select').change(function () {
        if ($(this).val() == 'euclidean_rows_and_columns') {
            $('#drone_imagery_analytics_permanent_env_structure_phenotype_correlation_div').hide();
            $('#drone_imagery_analytics_permanent_env_structure_phenotype_effect_select_div').hide();
        }
        else if ($(this).val() == 'phenotype_correlation') {
            $('#drone_imagery_analytics_permanent_env_structure_phenotype_correlation_div').show();
            $('#drone_imagery_analytics_permanent_env_structure_phenotype_effect_select_div').hide();
        }
        else if ($(this).val() == 'phenotype_2dspline_effect' || $(this).val() == 'phenotype_2dspline_uni_effect') {
            $('#drone_imagery_analytics_permanent_env_structure_phenotype_correlation_div').hide();
            $('#drone_imagery_analytics_permanent_env_structure_phenotype_effect_select_div').show();
        }
        else if ($(this).val() == 'phenotype_ar1xar1_effect' || $(this).val() == 'phenotype_ar1xar1_uni_effect') {
            $('#drone_imagery_analytics_permanent_env_structure_phenotype_correlation_div').hide();
            $('#drone_imagery_analytics_permanent_env_structure_phenotype_effect_select_div').show();
        }
        else {
            $('#drone_imagery_analytics_permanent_env_structure_phenotype_correlation_div').hide();
            $('#drone_imagery_analytics_permanent_env_structure_phenotype_effect_select_div').hide();
        }
    });

    $('#drone_imagery_analytics_fixed_effect_select_div').change(function () {
        if ($(this).val() == 'replicate') {
            $('#drone_imagery_analytics_fixed_effect_select_trait_div').hide();
            $('#drone_imagery_analytics_fixed_effect_select_quantile_div').hide();
        }
        if ($(this).val() == 'fixed_effect_trait') {
            $('#drone_imagery_analytics_fixed_effect_select_trait_div').show();
            $('#drone_imagery_analytics_fixed_effect_select_quantile_div').show();
        }
    });

    $('#drone_imagery_analytics_select_step').click(function () {

        manage_drone_imagery_analytics_statistics_select = $('#drone_imagery_analytics_select_input').val();

        var manage_drone_imagery_analytics_protocol_ids = [];
        $('input[name="drone_imagery_analytics_analytics_protocols_select_id"]').each(function () {
            if (this.checked) {
                manage_drone_imagery_analytics_protocol_ids.push($(this).val());
            }
        });

        if (manage_drone_imagery_analytics_protocol_ids.length > 1) {
            alert('Please select only one protocol!');
            return false;
        }
        if (manage_drone_imagery_analytics_protocol_ids.length == 1) {
            manage_drone_imagery_analytics_protocol_id = manage_drone_imagery_analytics_protocol_ids[0];
        }

        manage_drone_imagery_analytics_name = $('#drone_imagery_analytics_select_analytics_name').val();
        manage_drone_imagery_analytics_desc = $('#drone_imagery_analytics_select_analytics_desc').val();
        manage_drone_imagery_analytics_type = $('#drone_imagery_analytics_select_analytics_type').val();

        if (!manage_drone_imagery_analytics_protocol_id && manage_drone_imagery_analytics_name == '') {
            alert('Please give an analytics name or select a previously saved analytics report.');
            return false;
        }
        if (!manage_drone_imagery_analytics_protocol_id && manage_drone_imagery_analytics_desc == '') {
            alert('Please give an analytics description.');
            return false;
        }
        if (manage_drone_imagery_analytics_protocol_id && manage_drone_imagery_analytics_name != '') {
            alert('Please give an analytics name OR select a previously saved analytics report, not both!');
            return false;
        }

        manage_drone_imagery_analytics_trait_ids = [];

        if (manage_drone_imagery_analytics_observation_variable_type == 'time_ontology') {
            $('input[name="drone_imagery_analytics_trait_id_select"]').each(function () {
                if (this.checked) {
                    manage_drone_imagery_analytics_trait_ids.push($(this).val());
                }
            });
        }
        else {
            manage_drone_imagery_analytics_trait_ids = $('#drone_imagery_analytics_trait_id_select').val();
            if (manage_drone_imagery_analytics_trait_ids == null || manage_drone_imagery_analytics_trait_ids == undefined) {
                alert('Please select at least one observation variable!');
                return false;
            }
        }

        if (!manage_drone_imagery_analytics_protocol_id && manage_drone_imagery_analytics_trait_ids.length < 1) {
            alert('Please select at least one observation variable!');
            return false;
        }

        if ($('#drone_image_analytics_genotyping_protocol_include_pedigree_select').val() == 'yes' && $('#drone_image_analytics_genotyping_protocol_compute_from_parents_select').val() != 'yes') {
            alert('You can only use pedigree info in the relationship matrix if you will compute the genotypes from the parents!');
            return false;
        }
        if ($('#drone_image_analytics_genotyping_protocol_use_parental_grms_select').val() == 'yes' && $('#drone_image_analytics_genotyping_protocol_compute_from_parents_select').val() != 'yes') {
            alert('You can only use parental relationship matrices if you will compute the genotypes from the parents!');
            return false;
        }

        var manage_drone_imagery_analytics_rr_structure_phenotype_correlation = [];
        if ($('#drone_image_analytics_permanent_env_structure_select').val() == 'phenotype_correlation') {
            manage_drone_imagery_analytics_rr_structure_phenotype_correlation = $('#drone_imagery_analytics_permanent_env_structure_phenotype_correlation_select').val();
            if (!manage_drone_imagery_analytics_rr_structure_phenotype_correlation || manage_drone_imagery_analytics_rr_structure_phenotype_correlation.length < 3) {
                alert('Please select at least three phenotypes to use in random regression permanent environment phenotype correlation structure!');
                return false;
            }
        }

        var manage_drone_imagery_analytics_rr_env_structure_trait_ids = [];
        $('input[name="drone_imagery_analytics_permanent_env_structure_phenotype_select"]').each(function () {
            if (this.checked) {
                manage_drone_imagery_analytics_rr_env_structure_trait_ids.push($(this).val());
            }
        });

        var analyticsDataInput = {
            'observation_variable_id_list': manage_drone_imagery_analytics_trait_ids.toString(),
            'field_trial_id_list': manage_drone_imagery_analytics_field_trial_id_array.toString(),
            'statistics_select': manage_drone_imagery_analytics_statistics_select,
            'analytics_protocol_id': manage_drone_imagery_analytics_protocol_id,
            'analytics_protocol_name': manage_drone_imagery_analytics_name,
            'analytics_protocol_desc': manage_drone_imagery_analytics_desc,
            'analytics_select': manage_drone_imagery_analytics_type,
            'number_iterations': $('#drone_imagery_analytics_number_iterations').val(),
            'relationship_matrix_type': $('#drone_imagery_analytics_relationship_matrix_type_select_div').val(),
            'protocol_id': $('#drone_image_analytics_genotyping_protocol_select').val(),
            'compute_from_parents': $('#drone_image_analytics_genotyping_protocol_compute_from_parents_select').val(),
            'use_parental_grms_if_compute_from_parents': $('#drone_image_analytics_genotyping_protocol_use_parental_grms_select').val(),
            'include_pedgiree_info_if_compute_from_parents': $('#drone_image_analytics_genotyping_protocol_include_pedigree_select').val(),
            'htp_pheno_rel_matrix_type': $('#drone_image_analytics_htp_phenotypes_rel_matrix_select').val(),
            'htp_pheno_rel_matrix_time_points': $('#drone_image_analytics_htp_phenotypes_rel_matrix_times_select').val(),
            'htp_pheno_rel_matrix_blues_inversion': $('#drone_image_analytics_htp_phenotypes_rel_matrix_inversion_select').val(),
            'tolparinv': $('#drone_image_analytics_tolparinv_select').val(),
            'legendre_order_number': $('#drone_image_analytics_legendre_order_number_select').val(),
            'use_area_under_curve': $('#drone_image_analytics_use_area_under_curve_select').val(),
            'permanent_environment_structure': $('#drone_image_analytics_permanent_env_structure_select').val(),
            'permanent_environment_structure_phenotype_correlation_traits': JSON.stringify(manage_drone_imagery_analytics_rr_structure_phenotype_correlation),
            'permanent_environment_structure_phenotype_trait_ids': JSON.stringify(manage_drone_imagery_analytics_rr_env_structure_trait_ids),
            'sim_env_change_over_time': $('#drone_imagery_analytics_select_sim_env_change_over_time_type').val(),
            'env_variance_percent': $('#drone_imagery_analytics_env_variance').val(),
            'simulated_environment_real_data_trait_id': $('#drone_imagery_analytics_simulated_environment_real_data_trait_select').val(),
            'sim_env_change_over_time_correlation': $('#drone_imagery_analytics_sim_env_change_over_time_correlation').val(),
            'fixed_effect_type': $('#drone_imagery_analytics_fixed_effect_select_div').val(),
            'fixed_effect_trait_id': $('#drone_imagery_analytics_fixed_effect_trait_select').val(),
            'fixed_effect_quantiles': $('#drone_imagery_analytics_fixed_effect_select_quantile').val(),
            'simulations_to_run': $('#drone_imagery_analytics_simulated_environment_processes_select_div').val()
        }

        jQuery.ajax({
            url: '/api/drone_imagery/calculate_analytics',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(analyticsDataInput),
            beforeSend: function (xhr) {
                $("#working_modal").modal("show");
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            success: function (response) {
                console.log(response);
                $("#working_modal").modal("hide");

                if (response.error) {
                    alert(response.error);
                }
                else {
                    manage_drone_imagery_analytics_response = response;
                    manage_drone_imagery_analytics_protocol_id = response.analytics_protocol_id;

                    var html = '<h4>Summary :</h4><ul>';
                    if (response.sum_square_residual_original) {
                        html = html + '<li>Sum square residual original: ' + response.sum_square_residual_original + '</li>';
                    }
                    if (response.sum_square_residual_altered) {
                        html = html + '<li>Sum square residual altered: ' + response.sum_square_residual_altered + '</li>';
                    }
                    if (response.genetic_effect_sum_original) {
                        html = html + '<li>Genetic effect sum original: ' + response.genetic_effect_sum_original + '</li>';
                    }
                    if (response.genetic_effect_sum_altered) {
                        html = html + '<li>Genetic effect sum altered: ' + response.genetic_effect_sum_altered + '</li>';
                    }
                    if (response.env_effect_sum_original) {
                        html = html + '<li>Env effect sum original: ' + response.env_effect_sum_original + '</li>';
                    }
                    if (response.env_effect_sum_altered) {
                        html = html + '<li>Env effect sum altered: ' + response.env_effect_sum_altered + '</li>';
                    }
                    html = html + '</ul>';

                    if (response.simulated_environment_to_effect_correlations) {
                        html = html + '<h4>Simulated Env to Effects Correlations:</h4><ul>';
                        for (var i = 0; i < response.simulated_environment_to_effect_correlations.length; i++) {
                            html = html + '<li>' + response.simulated_environment_to_effect_correlations[i] + '</li>';
                        }
                        html = html + '</ul><hr>';
                    }

                    if (response.spatial_effects_plots) {
                        for (i = 0; i < response.spatial_effects_plots.length; i++) {
                            html = html + '<p>' + response.spatial_effects_plots[i][1] + '</p><img src="' + response.spatial_effects_plots[i][0] + '"><hr>';
                        }
                    }

                    if (response.unique_accessions.length > 0 && response.unique_traits.length > 0 && response.result_blup_genetic_data_altered) {
                        manage_drone_imagery_analytics_accession_names = response.unique_accessions;
                        manage_drone_imagery_analytics_trait_names = response.unique_traits;
                        manage_drone_imagery_analytics_phenotype_training_file = response.stats_tempfile;
                        manage_drone_imagery_analytics_grm_training_file = response.grm_file;

                        html = html + '<table class="display"><thead><tr><th>Accessions</th>';
                        for (var i = 0; i < manage_drone_imagery_analytics_trait_names.length; i++) {
                            html = html + '<th>' + manage_drone_imagery_analytics_trait_names[i] + '</th>';
                        }
                        html = html + '</tr></thead><tbody>';
                        for (var k = 0; k < response.unique_accessions.length; k++) {
                            var acc = response.unique_accessions[k];
                            html = html + '<tr><td>' + acc + '</td>';
                            for (var i = 0; i < manage_drone_imagery_analytics_trait_names.length; i++) {
                                if (response.result_blup_genetic_data_altered[acc] && response.result_blup_genetic_data_altered[acc][manage_drone_imagery_analytics_trait_names[i]]) {
                                    html = html + '<td>' + response.result_blup_genetic_data_altered[acc][manage_drone_imagery_analytics_trait_names[i]][0] + '</td>';
                                }
                                else {
                                    html = html + '<td>NA</td>';
                                }
                            }
                            html = html + '</tr>';
                        }
                        html = html + '</tbody></table>';
                    }

                    if (response.unique_plots.length > 0 && response.unique_traits.length > 0 && response.result_blup_spatial_data_altered) {
                        manage_drone_imagery_analytics_plot_names = response.unique_plots;
                        manage_drone_imagery_analytics_trait_names = response.unique_traits;

                        html = html + '<table class="display"><thead><tr><th>Plots</th>';
                        for (var i = 0; i < response.unique_traits.length; i++) {
                            html = html + '<th>' + response.unique_traits[i] + '</th>';
                        }
                        html = html + '</tr></thead><tbody>';
                        for (var k = 0; k < response.unique_plots.length; k++) {
                            var plot = response.unique_plots[k];
                            html = html + '<tr><td>' + plot + '</td>';
                            for (var i = 0; i < response.unique_traits.length; i++) {
                                html = html + '<td>' + response.result_blup_spatial_data_altered[plot][response.unique_traits[i]][0] + '</td>';
                            }
                            html = html + '</tr>';
                        }
                        html = html + '</tbody></table>';
                    }

                    if (response.unique_plots.length > 0 && response.unique_traits.length > 0 && response.result_blup_pe_data_altered) {
                        manage_drone_imagery_analytics_plot_names = response.unique_plots;
                        manage_drone_imagery_analytics_trait_names = response.unique_traits;

                        html = html + '<table class="display"><thead><tr><th>Plots</th>';
                        for (var i = 0; i < response.unique_traits.length; i++) {
                            html = html + '<th>' + response.unique_traits[i] + '</th>';
                        }
                        html = html + '</tr></thead><tbody>';
                        for (var k = 0; k < response.unique_plots.length; k++) {
                            var plot = response.unique_plots[k];
                            html = html + '<tr><td>' + plot + '</td>';
                            for (var i = 0; i < response.unique_traits.length; i++) {
                                if (response.result_blup_pe_data_altered[plot] && response.result_blup_pe_data_altered[plot][response.unique_traits[i]]) {
                                    html = html + '<td>' + response.result_blup_pe_data_altered[plot][response.unique_traits[i]][0] + '</td>';
                                }
                                else {
                                    html = html + '<td>NA</td>';
                                }
                            }
                            html = html + '</tr>';
                        }
                        html = html + '</tbody></table>';
                    }

                    html = html + '<hr><a href="' + response.stats_out_tempfile_string + '.log" target=_blank>Stats file or log</a>';

                    if ($('#drone_imagery_analytics_relationship_matrix_type_select_div').val() == 'htp_phenotypes') {
                        html = html + '<hr><a href="' + response.stats_out_htp_rel_tempfile_out_string + '" target=_blank>HTP Relationship Matrix</a>';
                    }

                    $('#drone_imagery_analytics_result_div').html(html);

                    Workflow.complete("#drone_imagery_analytics_select_step");
                    Workflow.focus('#drone_imagery_analytics_workflow', 2);
                }
            },
            error: function (response) {
                console.log(response);
                $("#working_modal").modal("hide");
                alert('Error calculating statistics analytics!')
            }
        });
    });

});

$(document).ready(function () {

    $('#export_drone_imagery_events').on('click', function () {
        $('#export_drone_imagery_dialog').modal('show');
    });

    get_select_box('trials', 'export_drone_image_trial_select_div', { 'name': 'export_drone_run_field_trial_id', 'id': 'export_drone_run_field_trial_id', 'empty': 1, 'multiple': 0 });

    var export_imaging_events_field_trial_id;
    $(document).on('change', '#export_drone_run_field_trial_id', function () {
        export_imaging_events_field_trial_id = $(this).val();
        $('#drone_image_export_drone_runs_table').DataTable({
            destroy: true,
            ajax: {
                url: '/api/drone_imagery/drone_runs?select_checkbox_name=export_drone_imagery_drone_run_select&field_trial_ids=' + export_imaging_events_field_trial_id,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
                }
            }
        });
    });

    var export_imaging_events_drone_run_ids = [];
    $('#drone_image_export_drone_run_continue').click(function () {
        export_imaging_events_drone_run_ids = [];
        $('input[name="export_drone_imagery_drone_run_select"]:checked').each(function () {
            export_imaging_events_drone_run_ids.push($(this).val());
        });
        if (export_imaging_events_drone_run_ids.length < 1) {
            alert('Please select at least one imaging event.');
            return false;
        }
        else {
            Workflow.complete('#drone_image_export_drone_run_continue');
            Workflow.focus('#drone_imagery_export_workflow', 3);
        }
        return false;
    });


    $('#export_drone_imagery_submit').click(function () {
        jQuery.ajax({
            url: '/api/drone_imagery/export_drone_runs?drone_run_project_ids=' + JSON.stringify(export_imaging_events_drone_run_ids) + '&field_trial_id=' + export_imaging_events_field_trial_id,
            beforeSend: function (xhr) {
                $("#working_modal").modal("show");
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            success: function (response) {
                console.log(response);
                $("#working_modal").modal("hide");

                if (response.error) {
                    alert(response.error);
                    return false;
                }
                else {
                    var html = '<a href="' + response.imaging_events_spreadsheet + '">Download Imaging Event Spreadsheet</a><hr><a href="' + response.orthoimage_zipfile + '">Download Orthoimage Zipfile</a><hr><a href="' + response.geojson_zipfile + '">Download GeoJSON Pixels Zipfile</a><hr><a href="' + response.geojson_gps_zipfile + '">Download GeoJSON GPS Zipfile</a>';
                    $('#export_drone_imagery_submit_div').html(html);
                    return false;
                }
            },
            error: function (response) {
                alert('Error exporting imaging events!');
                $("#working_modal").modal("hide");
            }
        });
    });

});




$(document).ready(function () {
    get_select_box('years', 'generic_save_analysis_analysis_year_div', { 'auto_generate': 1, 'id': 'generic_save_analysis_analysis_year', 'name': 'generic_save_analysis_analysis_year' });
    get_select_box('breeding_programs', 'generic_save_analysis_breeding_program_div', { 'name': 'generic_save_analysis_breeding_program_id', 'id': 'generic_save_analysis_breeding_program_id' });
    get_select_box('models', 'save_new_analysis_model_select_div', { 'id': 'save_new_analysis_model_id', 'name': 'save_new_analysis_model_id', 'empty': 1 });

    get_select_box('years', 'generic_save_analysis_template_analysis_year_div', { 'auto_generate': 1, 'id': 'generic_save_analysis_template_analysis_year', 'name': 'generic_save_analysis_template_analysis_year' });
    get_select_box('breeding_programs', 'generic_save_analysis_template_breeding_program_div', { 'name': 'generic_save_analysis_template_breeding_program_id', 'id': 'generic_save_analysis_template_breeding_program_id' });

    $('#generic_save_analysis_next').click(function () {
        Workflow.complete("#generic_save_analysis_next");
        Workflow.focus('#generic_save_analysis_workflow', 2);
        $('#generic_save_analysis_dialog').scrollTop(0);
        return false;
    });

    $('#generic_save_analysis_analysis_to_save').change(function () {
        if ($(this).val() == 'yes') {
            $('#generic_save_analysis_analysis_form').show();
        }
        if ($(this).val() == 'no') {
            $('#generic_save_analysis_analysis_form').hide();
            $('#generic_save_analysis_analysis_name').val('');
        }
    });

    $('#generic_save_analysis_submit_button').click(function () {
        var generic_save_analysis_analysis_to_save_boolean = $('#generic_save_analysis_analysis_to_save').val();
        var generic_save_analysis_analysis_name = $('#generic_save_analysis_analysis_name').val();
        var generic_save_analysis_analysis_description = $('#generic_save_analysis_analysis_description').val();
        var generic_save_analysis_analysis_year = $('#generic_save_analysis_analysis_year').val();
        var generic_save_analysis_breeding_program_id = $('#generic_save_analysis_breeding_program_id').val();
        var generic_save_analysis_protocol = $('#generic_save_analysis_protocol').val();
        var generic_save_analysis_dataset_id = $('#generic_save_analysis_dataset_id').val();
        var generic_save_analysis_accession_names = $('#generic_save_analysis_accession_names').val();
        var generic_save_analysis_trait_names = $('#generic_save_analysis_trait_names').val();
        var generic_save_analysis_statistical_ontology_term = $('#generic_save_analysis_statistical_ontology_term').val();
        var generic_save_analysis_precomputed_design_optional = $('#generic_save_analysis_design').val();
        var generic_save_analysis_result_values = $('#generic_save_analysis_result_values').val();
        var generic_save_analysis_result_values_type = $('#generic_save_analysis_result_values_type').val();
        var generic_save_analysis_result_summary_values = $('#generic_save_analysis_result_summary_values').val();
        var generic_save_analysis_result_compose_trait_info = $('#generic_save_analysis_result_compose_trait_info').val();

        var generic_save_analysis_select_model_id = $('#save_new_analysis_model_id').val();
        var generic_save_analysis_model_id = $('#generic_save_analysis_model_id').val();
        var generic_save_analysis_model_name = $('#generic_save_analysis_model_name').val();
        var generic_save_analysis_model_description = $('#generic_save_analysis_model_description').val();
        var generic_save_analysis_model_is_public = $('#generic_save_analysis_model_is_public').val();
        var generic_save_analysis_model_language = $('#generic_save_analysis_model_language').val();
        var generic_save_analysis_model_type = $('#generic_save_analysis_model_type').val();
        var generic_save_analysis_model_properties = $('#generic_save_analysis_model_properties').val();
        var generic_save_analysis_model_application_name = $('#generic_save_analysis_model_application_name').val();
        var generic_save_analysis_model_application_version = $('#generic_save_analysis_model_application_version').val();
        var generic_save_analysis_model_file = $('#generic_save_analysis_model_file').val();
        var generic_save_analysis_model_archived_model_file_type = $('#generic_save_analysis_model_archived_model_file_type').val();
        var generic_save_analysis_model_training_data_file = $('#generic_save_analysis_model_training_data_file').val();
        var generic_save_analysis_model_archived_training_data_file_type = $('#generic_save_analysis_model_archived_training_data_file_type').val();
        var generic_save_analysis_model_auxiliary_files = $('#generic_save_analysis_model_auxiliary_files').val();

        if (generic_save_analysis_analysis_to_save_boolean == 'yes') {
            if (generic_save_analysis_analysis_name == '') {
                alert('Please give an analysis name');
                return false;
            }
            if (generic_save_analysis_analysis_description == '') {
                alert('Please give an analysis description');
                return false;
            }
            if (generic_save_analysis_analysis_year == '') {
                alert('Please give an analysis year');
                return false;
            }
            if (generic_save_analysis_breeding_program_id == '') {
                alert('Please give a breeding program');
                return false;
            }
            if (generic_save_analysis_protocol == '') {
                alert('Please give an analysis protocol e.g. lmer(grain_yield ~ replicate + 1|germplasmName)');
                return false;
            }
            if (generic_save_analysis_accession_names == '') {
                alert('Please give analysis accession names');
                return false;
            }
            if (generic_save_analysis_trait_names == '') {
                alert('Please give analysis trait names');
                return false;
            }
            if (generic_save_analysis_statistical_ontology_term == '') {
                alert('Please give a statistical ontology term');
                return false;
            }
            if (generic_save_analysis_result_values == '') {
                alert('Please give analysis result values');
                return false;
            }
            if (generic_save_analysis_result_values_type == '') {
                alert('Please give analysis result values type');
                return false;
            }
            if (generic_save_analysis_result_summary_values == '') {
                alert('Please give analysis result summary info');
                return false;
            }
        }
        if ((generic_save_analysis_model_id != '' || generic_save_analysis_select_model_id != '') && generic_save_analysis_model_name != '') {
            alert('If Model ID is given, then you should not give a new model name!');
            return false;
        }
        if ((generic_save_analysis_model_id != '' || generic_save_analysis_select_model_id != '') && generic_save_analysis_model_description != '') {
            alert('If Model ID is given, then you should not give a new model description!');
            return false;
        }
        if ((generic_save_analysis_model_id == '' && generic_save_analysis_select_model_id == '') && generic_save_analysis_model_name == '') {
            alert('Please give a model name');
            return false;
        }
        if ((generic_save_analysis_model_id == '' && generic_save_analysis_select_model_id == '') && generic_save_analysis_model_description == '') {
            alert('Please give a model description');
            return false;
        }
        if ((generic_save_analysis_model_id == '' && generic_save_analysis_select_model_id == '') && generic_save_analysis_model_is_public == '') {
            alert('Please tell if a model is public');
            return false;
        }
        if ((generic_save_analysis_model_id == '' && generic_save_analysis_select_model_id == '') && generic_save_analysis_model_language == '') {
            alert('Please give a model language');
            return false;
        }
        if ((generic_save_analysis_model_id == '' && generic_save_analysis_select_model_id == '') && generic_save_analysis_model_type == '') {
            alert('Please give a model type');
            return false;
        }
        if ((generic_save_analysis_model_id == '' && generic_save_analysis_select_model_id == '') && generic_save_analysis_model_properties == '') {
            alert('Please give a model properties JSON object');
            return false;
        }
        if ((generic_save_analysis_model_id == '' && generic_save_analysis_select_model_id == '') && generic_save_analysis_model_application_name == '') {
            alert('Please give a model application name');
            return false;
        }
        if ((generic_save_analysis_model_id == '' && generic_save_analysis_select_model_id == '') && generic_save_analysis_model_application_version == '') {
            alert('Please give a model application version');
            return false;
        }

        var analysis_model_id = generic_save_analysis_model_id;
        if (analysis_model_id == '') {
            analysis_model_id = generic_save_analysis_select_model_id;
        }

        jQuery.ajax({
            type: 'POST',
            url: '/ajax/analysis/store/json',
            data: {
                'analysis_to_save_boolean': generic_save_analysis_analysis_to_save_boolean,
                'analysis_name': generic_save_analysis_analysis_name,
                'analysis_description': generic_save_analysis_analysis_description,
                'analysis_year': generic_save_analysis_analysis_year,
                'analysis_breeding_program_id': generic_save_analysis_breeding_program_id,
                'analysis_protocol': generic_save_analysis_protocol,
                'analysis_dataset_id': generic_save_analysis_dataset_id,
                'analysis_accession_names': generic_save_analysis_accession_names,
                'analysis_trait_names': generic_save_analysis_trait_names,
                'analysis_statistical_ontology_term': generic_save_analysis_statistical_ontology_term,
                'analysis_precomputed_design_optional': generic_save_analysis_precomputed_design_optional,
                'analysis_result_values': generic_save_analysis_result_values,
                'analysis_result_values_type': generic_save_analysis_result_values_type,
                'analysis_result_summary': generic_save_analysis_result_summary_values,
                'analysis_result_trait_compose_info': generic_save_analysis_result_compose_trait_info,
                'analysis_model_id': analysis_model_id,
                'analysis_model_name': generic_save_analysis_model_name,
                'analysis_model_description': generic_save_analysis_model_description,
                'analysis_model_is_public': generic_save_analysis_model_is_public,
                'analysis_model_language': generic_save_analysis_model_language,
                'analysis_model_type': generic_save_analysis_model_type,
                'analysis_model_properties': generic_save_analysis_model_properties,
                'analysis_model_application_name': generic_save_analysis_model_application_name,
                'analysis_model_application_version': generic_save_analysis_model_application_version,
                'analysis_model_file': generic_save_analysis_model_file,
                'analysis_model_file_type': generic_save_analysis_model_archived_model_file_type,
                'analysis_model_training_data_file': generic_save_analysis_model_training_data_file,
                'analysis_model_training_data_file_type': generic_save_analysis_model_archived_training_data_file_type,
                'analysis_model_auxiliary_files': generic_save_analysis_model_auxiliary_files
            },
            beforeSend: function (xhr) {
                $('#working_modal').modal('show');
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            success: function (response) {
                $('#working_modal').modal('hide');
                console.log(response);
                if (response.error) {
                    alert(response.error);
                }
                if (response.success) {
                    alert('Analysis and/or model saved!');
                    var html = '<div>';
                    if (response.analysis_id) {
                        html = html + '<p>Go to saved <a href="/analyses/' + response.analysis_id + '" target=_blank >analysis</a></p>';
                    }
                    if (response.model_id) {
                        html = html + '<p>Go to saved <a href="/analyses_model/' + response.model_id + '" target=_blank >model</a></p>';
                    }
                    html = html + '</div>';
                    $('#generic_save_analysis_response_div').html(html);

                    Workflow.complete("#generic_save_analysis_submit_button");
                    Workflow.focus('#generic_save_analysis_workflow', 3);
                }
            },
            error: function (response) {
                $('#working_modal').modal('hide');
                alert('Error saving analysis!');
            }
        });
    });
});
