$(document).ready(function () {
    $('#drone_run_imaging_vehicle_add_new').click(function (e) {
        e.preventDefault();
        if (!private_company_id) {
            $('#new_imaging_vehicle_company_hide_div').show();
        }

        $('#drone_run_imaging_vehicle_add_new_modal').modal('show');
    });

    $('#drone_run_new_imaging_vehicle_submit').click(function (e) {
        e.preventDefault();
        var vehicle_name = $('#drone_run_new_imaging_vehicle_name').val();
        var vehicle_desc = $('#drone_run_new_imaging_vehicle_desc').val();
        var vehicle_batteries = $('#drone_run_new_imaging_vehicle_battery_names').val();

        if (!private_company_id) {
            private_company_id = $('#drone_run_new_imaging_vehicle_company_id').val();
        }

        if (vehicle_name == '' || vehicle_desc == '') {
            alert('Please give a vehicle name and description!');
            return false;
        }
        if (vehicle_batteries == '') {
            alert('Please give at least default battery name!');
            return false;
        }

        jQuery.ajax({
            url: '/api/drone_imagery/new_imaging_vehicle',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                'vehicle_name': vehicle_name,
                'vehicle_description': vehicle_desc,
                'battery_names': vehicle_batteries,
                'private_company_id': private_company_id
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
                else if (response.success) {
                    alert('Vehicle added!');
                    get_select_box('imaging_event_vehicles', 'drone_run_imaging_vehicle_div', { 'id': 'drone_run_imaging_vehicle_id', 'name': 'drone_run_imaging_vehicle_id', 'private_company_id': private_company_id });
                    upload_drone_imagery_vehicle_id = response.new_vehicle_id;
                }

                return false;
            },
            error: function (response) {
                console.log(response);
                alert('Error adding new imaging vehicle!');
            }
        });
    });

});