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