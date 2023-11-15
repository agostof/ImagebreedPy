// Depends on CXGN.BreedersToolbox.HTMLSelect

function delete_phenotype_data_by_trial_id(trial_id) {
    var yes = confirm("Are you sure you want to delete all phenotypic data associated with trial "+trial_id+" ? This action cannot be undone.");
    if (yes) {

	jQuery.ajax( {
      url: '/ajax/breeders/trial/'+trial_id+'/delete/phenotypes',
      beforeSend: function(xhr){
        $('#working_modal').modal('show');
        xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
      },
      success: function(response) {
        $('#working_modal').modal('hide');
        if (response.error) {
           alert(response.error);
		       }
		    else {
		       alert('The phenotypic data has been deleted.'); // to do: give some idea how many items were deleted.
		    window.location.href="/breeders/trial/"+trial_id;
		}
            },
      error: function(response) {
		    $('#working_modal').modal('hide');
		    alert("An error occurred.");
            }
	});
 }
}


function delete_layout_data_by_trial_id(trial_id) {
    var yes = confirm("Are you sure you want to delete the layout data associated with trial "+trial_id+" and the trial entry itself? This action cannot be undone.");
    if (yes) {

        jQuery.ajax( {
            url: '/ajax/breeders/trial/'+trial_id+'/delete/layout',
            beforeSend: function(xhr){
                $('#working_modal').modal('show');
                $('#working_msg').html("Deleting trial layout...<br />");
                xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
            },
            success: function(response) {
                if (response.error) {
                    alert(response.error);
                }
                else {
                    $('#working_modal').modal('hide');
                    $('#working_msg').html('');
                    alert('The field trial has been deleted.'); // to do: give some idea how many items were deleted.
                    window.location.href="/breeders/trial/"+trial_id;
                }
            },
            error: function(response) {
                $('#working_modal').modal('hide');
                $('#working_msg').html('');
                alert("An error occurred.");
            }
        });
    }
}


function associate_breeding_program() {
    var program = $('#breeding_program_select').val();

    var trial_id = get_trial_id();
    jQuery.ajax( {
	url: '/breeders/program/associate/'+program+'/'+ trial_id,
	async: false,
	success: function(response) {
            alert("Associated program with id "+program + " to trial with id "+ trial_id);

	}
    });
}

function load_breeding_program_info(trial_id) {
    jQuery.ajax( {
	url:'/breeders/programs_by_trial/'+trial_id,
	success: function(response) {
            if (response.error) {
		$('#breeding_programs').html('[ An error occurred fetching the breeding program information ]');
            }
            else {
		var programs = response.projects;
		for (var i=0; i< programs.length; i++) {
		    var html =  programs[0][1] + ' (' + programs[0][2] + ') ';
		}
		if (programs.length == 0) { html = "(none)"; }
		$('#breeding_programs').html(html);
            }
	},
	error: function() {
	    $('#breeding_programs').html('[ An error occurred ]');
	}
    });
}


function open_create_DataCollector_dialog() {
    //$('#working').dialog("open");
    $('#working_modal').modal("show");
    var list = new CXGN.List();
    $("#trait_list_dc").html(list.listSelect("trait_list", [ 'traits' ], undefined, undefined, undefined));
    //$('#working').dialog("close");
    $('#working_modal').modal("hide");
    $('#create_DataCollector_dialog').dialog("open");
}


function create_DataCollector() {
    //$('#working').dialog("open");
    $('#working_modal').modal("show");
    var trialID = parseInt($('#trialIDDiv').text());
    var list = new CXGN.List();
    var trait_list_id = $('#trait_list_list_select').val();
    var trait_list;
    if (! trait_list_id == "") {
	trait_list = JSON.stringify(list.getList(trait_list_id));
    }
     new jQuery.ajax({
	 type: 'POST',
	 url: '/ajax/phenotype/create_DataCollector',
	 dataType: "json",
	 data: {
             'trial_id': trialID,
             'trait_list': trait_list,
	 },

	 success: function (response) {
     //console.log("success "+JSON.stringify(response));
     $('#working_modal').modal("hide");

     if (response.error) {
       console.log("error: "+response.error);
       alert("error: "+response.error);
       $('#open_create_DataCollector_dialog').dialog("close");
     } else {
       //alert("success: "+response.filename);
       $('#open_create_DataCollector_dialog').dialog("close");
       $('#working_modal').modal("hide");
       window.location.href = "/download/"+response.filename;
     }
	 },
	 error: function () {
	     //$('#working').dialog("close");
	     $('#working_modal').modal("hide");
             alert('An error occurred creating a DataCollector file.');
             $('#open_download_DataCollector_dialog').dialog("close");
	 }
     });
}

function open_derived_trait_dialog() {
    $('#working_modal').modal("show");
    $('#compute_derived_trait_dialog').dialog("open");
    var trait = $('#sel1').val();
    $("#test_xyz").html(trait);
    $('#working_modal').modal("hide");

}

function close_view_plot_image_dialog() {
    $("#view_plot_image_dialog").modal("hide");
    $("#hm_replace_plot_accessions_dialog").modal("hide");
}

function compute_derived_trait() {
    $('#working_modal').modal("show");
    var trait = $('#derived_trait_select').val();
    var trialID = parseInt($('#trialIDDiv').text());
    if (trait === '') {
		alert("No trait selected");
	    }

     new jQuery.ajax({
	 type: 'POST',
	 url: '/ajax/phenotype/create_derived_trait',
	 dataType: "json",
	 data: {
             'trial_id': trialID,
             'trait': trait,
	 },

	 success: function (response) {
	     $('#working_modal').modal("hide");

             if (response.error) {
		 alert("Computation stopped: "+response.error);
		 //alert("Computation for "+trait+" stopped: "+response.error);
		 $('#open_derived_trait_dialog').dialog("close");

             } else {
		 $('#open_derived_trait_dialog').dialog("close");
		 $('#working_modal').modal("hide");
		 $('derived_trait_saved_dialog_message');
		 alert("Successfully derived and uploaded phenotype");
		// alert("Successfully derived and uploaded ' "+trait+" ' values for this trial");
             }
	 },
	 error: function () {
	     $('#working_modal').modal("hide");
             alert('An error occurred creating trait.');
	 }
     });
}


function delete_field_map() {
    $('#working_modal').modal("show");

    var trialID = parseInt($('#trialIDDiv').text());
    new jQuery.ajax({
        type: 'POST',
        url: '/ajax/breeders/trial/'+trialID+'/delete_field_coords',
        dataType: "json",
        success: function (response) {
            $('#working_modal').modal("hide");
            if (response.error) {
                alert("Error Deleting Field Map: "+response.error);
            } else {
                //alert("Field map deletion Successful...");
                $('#delete_field_map_dialog_message').dialog("open");
            }
        },
        error: function () {
            $('#working_modal').modal("hide");
            alert('An error occurred deleting field map.');
        }
    });
}

function replace_accessions() {
  $('#working_modal').modal("show");

  var trialID = parseInt($('#trialIDDiv').text());
  var old_accession_name = $('#old_accession').val();
  var new_accession_name = $('#new_accession').val();
  new jQuery.ajax({
    type: 'POST',
    url: '/ajax/phenotype/replace_accessions',
    dataType: "json",
    data: {
      'trial_id': trialID,
      'old_accession_name': old_accession_name,
      'new_accession_name': new_accession_name,
    },

    success: function (response) {
 	     $('#working_modal').modal("hide");

       if (response.error) {
 		      alert("Error replacing accessions: "+response.error);
       } else {
           //alert("Field map deletion Successful...");
 		      $('#replace_accessions_dialog_message').dialog("open");
           }
 	 },
 	 error: function () {
 	     $('#working_modal').modal("hide");
              alert('An error occurred replacing accessions.');
 	 }
 });
}


function edit_trial_details(){

    $('#clear_planting_date').click(function(){
        planting_date_element.val('');
        highlight_changed_details(planting_date_element);
    });

    $('#clear_harvest_date').click(function(){
        harvest_date_element.val('');
        highlight_changed_details(harvest_date_element);
    });

    $('[id^="edit_trial_"]').change(function (){
        var this_element = $(this);
        highlight_changed_details(this_element);
    });

    //save dialog body html for resetting on close
    var edit_details_body_html = document.getElementById('trial_details_edit_body').innerHTML;

    //populate breeding_programs, locations, years, and types dropdowns, and save defaults
    var default_bp = document.getElementById("edit_trial_breeding_program").getAttribute("value");
    get_select_box('breeding_programs', 'edit_trial_breeding_program', { 'default' : default_bp });
    $('#edit_trial_breeding_program').data("originalValue", default_bp);

    var default_loc = document.getElementById("edit_trial_location").getAttribute("value");
    get_select_box('locations', 'edit_trial_location', { 'default' : default_loc });
    $('#edit_trial_location').data("originalValue", default_loc);

    var default_year = document.getElementById("edit_trial_year").getAttribute("value");
    get_select_box('years', 'edit_trial_year', { 'default' : default_year, 'auto_generate': 1 });
    $('#edit_trial_year').data("originalValue", default_year);

    var default_company = document.getElementById("edit_trial_company").getAttribute("value");
    get_select_box('private_companies', 'edit_trial_company', { 'selected' : default_company });
    $('#edit_trial_company').data("originalValue", default_company);

    var default_type = document.getElementById("edit_trial_type").getAttribute("value");
    get_select_box('trial_types', 'edit_trial_type',  { 'default' : default_type });
    $('#edit_trial_type option[value="'+default_type+'"]').attr('selected','selected');

    var default_type = document.getElementById("edit_trial_plot_width").getAttribute("value");
    $('#edit_trial_plot_width option[value="'+default_type+'"]').attr('selected','selected');

    var default_type = document.getElementById("edit_trial_plot_length").getAttribute("value");
    $('#edit_trial_plot_length option[value="'+default_type+'"]').attr('selected','selected');

    var default_type = document.getElementById("edit_trial_plan_to_genotype").getAttribute("value");
    $('#edit_trial_plan_to_genotype option[value="'+default_type+'"]').attr('selected','selected');

    var default_type = document.getElementById("edit_trial_plan_to_cross").getAttribute("value");
    $('#edit_trial_plan_to_cross option[value="'+default_type+'"]').attr('selected','selected');

    $(document).on('change', '#edit_trial_company', function(){
        get_select_box('breeding_programs', 'edit_trial_breeding_program', { 'private_company_id':$(this).val() });
        get_select_box('locations', 'edit_trial_location', { 'private_company_id':$(this).val() });
        $('#edit_trial_breeding_program').data("originalValue", default_bp);
        $('#edit_trial_location').data("originalValue", default_loc);
    });

    //create bootstrap daterangepickers for planting and harvest dates
    var planting_date_element = $("#edit_trial_planting_date");
    set_daterangepicker_default (planting_date_element);
    $('input[title="planting_date"]').daterangepicker(
        {
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
        },
        function(start){
            planting_date_element.val(start.format('MM/DD/YYYY'));
            highlight_changed_details(planting_date_element);
        }
    );

    var harvest_date_element = $("#edit_trial_harvest_date");
    set_daterangepicker_default (harvest_date_element);
    harvest_date_element.daterangepicker(
        {
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
        },
        function(start){
            harvest_date_element.val(start.format('MM/DD/YYYY'));
            highlight_changed_details(harvest_date_element);
        }
    );

    $('#edit_trial_details_cancel_button').click(function(){
        reset_dialog_body('trial_details_edit_body', edit_details_body_html);
    });

    $('#save_trial_details').click(function(){
        var changed_elements = document.getElementsByName("changed");
        var categories = [];
        var new_details = {};
        var success_message = '';
        for(var i=0; i<changed_elements.length; i++){
            var id = changed_elements[i].id;
            var type = changed_elements[i].title;
            var new_value = changed_elements[i].value;
            if (type.match(/date/)){
                if (new_value){
                    new_value = moment(new_value).format('YYYY/MM/DD HH:mm:ss') || 'remove' ;
                } else {
                    new_value = 'remove';
                }
            }
            categories.push(type);
            new_details[type] = new_value;
            if($('#'+id).is("select")){
                new_value = changed_elements[i].options[changed_elements[i].selectedIndex].text
            }
            success_message += "<li class='list-group-item list-group-item-success'> Changed "+type+" to: <b>"+new_value+"</b></li>";
        }

        save_trial_details(categories, new_details, success_message);

    });

    $('#trial_details_error_close_button').click( function() {
        document.getElementById('trial_details_error_message').innerHTML = "";
        location.reload();
    });

    $('#trial_details_saved_close_button').click( function() {
        location.reload();
    });

}

function trial_detail_page_setup_dialogs() {

     $('#compute_derived_trait_dialog').dialog({
	autoOpen: false,
	modal: true,
	autoResize:true,
	width: 500,
	position: ['top', 75],
	modal: true,
	buttons: {
	    Cancel: function() {
		$( this ).dialog( "close" );
		return;
	    },
	    Create: {text: "Create", id:"create_derived_trait_submit_button", click:function() {
		compute_derived_trait();
		$( this ).dialog( "close" );
		}
	    },
	},
    });

    $('#delete_phenotype_data_by_trial_id').click(function() {
        $('#delete_phenotype_data_dialog').modal("show");
	});

    $('#delete_layout_data_by_trial_id').click(
	function() {
	    var trial_id = get_trial_id();
	    delete_layout_data_by_trial_id(trial_id);
	});


    $('#view_layout_link').click(function () {
        $('#trial_design_view_layout').dialog("open");
    });

    $('#compute_derived_trait_link').click( function () {
	$('#compute_derived_trait_dialog').dialog("open");
	jQuery.ajax( {
		url: '/ajax/breeders/trial/trait_formula',
		success: function(response) {
		//console.log(response);
		if (response.error) {
		    alert(response.error);
		}
		else {
		    var html = "";
		    if (response.derived_traits) {
			var selected = 'selected="selected"';
			for(var n=0; n<response.derived_traits.length; n++) {
			    //alert("derived trait: +derived_traits"+response.derived_traits[n]);
			    html += '<option value="'+response.derived_traits[n]+'" title="'+response.formula[n]+'" >'+response.derived_traits[n]+' </option> ';
			}

		    }
		    else {
			html = '<option active="false">No derived trait available</option>';
		    }
		}
		$('#derived_trait_select').html(html);
	    },
	    error: function(response) {
		alert("An error occurred trying to retrieve derived traits.");
	    }
	});

});

$("#delete_field_map_dialog").dialog({
autoOpen: false,
modal: true,
autoResize:true,
    width: 500,
    position: ['top', 75],
buttons: {
        "Cancel": function () {
            $('#delete_field_map_dialog').dialog("close");
        },
  "Ok": {text: "Ok", id:"delete_field_coords_ok_button", click:function () {
delete_field_map();
            $('#delete_field_map_dialog').dialog("close");
    }
  }
}
});


$('#delete_field_map_hm_link').click(function () {
    $('#delete_field_map_dialog').dialog("open");
});

$("#delete_field_map_dialog_message").dialog({
autoOpen: false,
modal: true,
buttons: {
        Ok: { id: "dismiss_delete_field_map_dialog",
              click: function() {
                location.reload();
              },
              text: "OK"
            }
    }

});

$("#update_field_map_dialog_message").dialog({
autoOpen: false,
modal: true,
buttons: {
        Ok: { id: "dismiss_update_field_map_dialog",
              click: function() {
                location.reload();
              },
              text: "OK"
            }
    }

});

$("#replace_accessions_dialog_message").dialog({
autoOpen: false,
modal: true,
buttons: {
        Ok: { id: "dismiss_replace_accessions_dialog_message",
              click: function() {
                location.reload();
              },
              text: "OK"
            }
    }

});

$('#update_field_map_link').click(function () {
    $('#update_field_map_dialog').dialog("open");
});

}

function set_daterangepicker_default (date_element) {
  var date = date_element.val() || '';
  if (date) {
    date = moment(date, 'YYYY-MMMM-DD').format('MM/DD/YYYY');
  }
  date_element.val(date);
}

function highlight_changed_details(element) { // compare changed value to default. If different, add class and feedback span, if same, remove them
  var id = element.attr('id');
  var current_value = element.val();
  var default_value = document.getElementById(id).defaultValue;
  var title = element.attr('title');
  if (title && title.match(/date/)) { default_value = moment(document.getElementById(id).defaultValue, 'YYYY-MMMM-DD').format('MM/DD/YYYY');}
  if (!default_value) { default_value = element.data("originalValue");}
  if ((current_value || default_value) && current_value !== default_value) {
    element.parent().siblings('#change_indicator').remove();
    element.attr("name", "changed");
    element.parent().parent().addClass("has-success has-feedback");
    element.parent().after('<span class="glyphicon glyphicon-pencil form-control-feedback" id="change_indicator" aria-hidden="true" style="right: -20px;"></span>');
  } else {
    element.attr("name", "");
    element.parent().parent().removeClass("has-success has-feedback");
    element.parent().siblings('#change_indicator').remove();
  }
}

function reset_dialog_body (body_id, body_html) {
  document.getElementById(body_id).innerHTML = body_html;
}

function save_trial_details (categories, details, success_message) {
  var trial_id = get_trial_id();
  jQuery.ajax( {
    url: '/ajax/breeders/trial/'+trial_id+'/details/',
    type: 'POST',
    data: { 'categories' : categories, 'details' : details },

    success: function(response) {
      if (response.success) {
        document.getElementById('trial_details_saved_message').innerHTML = success_message;
        $('#trial_details_saved_dialog').modal("show");
        return;
      }
      else {
        document.getElementById('trial_details_error_message').innerHTML = "<li class='list-group-item list-group-item-danger'>"+response.error+"</li>";
        $('#trial_details_error_dialog').modal("show");
      }
    },
    error: function(response) {
      document.getElementById('trial_details_error_message').innerHTML = "<li class='list-group-item list-group-item-danger'> Trial detail update AJAX request failed. Update not completed.</li>";
      $('#trial_details_error_dialog').modal("show");
    },
  });
}

function trial_folder_dialog() {
    $('#set_folder_dialog').dialog("open");

}


function get_trial_id() {
    var trial_id = parseInt($('#trialIDDiv').text());
    return trial_id;
}


var $j = jQuery.noConflict();

$(document).ready(function ($) {

    $('#upload_trial_coords_link').click(function () {
        open_upload_trial_coord_dialog();
    });

    $('#heatmap_upload_trial_coords_link').click(function () {
        open_upload_trial_coord_dialog();
    });

    $('#upload_trial_coords_ok_button').click(function(){
        upload_trial_coord_file();
    });

     $("#trial_coordinates_upload_spreadsheet_format_info").click( function () {
         $("#trial_coord_upload_spreadsheet_info_dialog" ).modal("show");
    });

     $('#upload_trial_coordinates_form').iframePostForm({
	json: true,
	post: function () {
            var uploadedtrialcoordFile = $("#trial_coordinates_uploaded_file").val();
	    $('#working_modal').modal("show");
            if (uploadedtrialcoordFile === '') {
		$('#working_modal').modal("hide");
		alert("No file selected");
            }
	},
	complete: function (response) {
	    $('#working_modal').modal("hide");
            if (response.error_string) {
		$("#upload_trial_coord_error_display tbody").html('');
		$("#upload_trial_coord_error_display tbody").append(response.error_string);
        $('#upload_trial_coord_error_display').modal('show');

		return;
            }
            if (response.error) {
		alert(response.error);
		return;
            }
            if (response.success) {
		$('#trial_coord_upload_success_dialog_message').modal("show");
		//alert("File uploaded successfully");
            }
	}
    });

	function upload_trial_coord_file() {
        var uploadFile = $("#trial_coordinates_uploaded_file").val();
        $('#upload_trial_coordinates_form').attr("action", "/ajax/breeders/trial/"+get_trial_id()+"/coordsupload");
        if (uploadFile === '') {
	    alert("Please select a file");
	    return;
        }
        $("#upload_trial_coordinates_form").submit();
    }

    function open_upload_trial_coord_dialog() {
	     $('#upload_trial_coord_dialog').modal("show");
    }

    function open_replace_trial_accession_dialog() {
      $('#replace_trial_stocks_dialog').modal('show');
    }

    $('#replace_trial_stock_submit').click(function () {
      $('#edit_field_map_dialog').modal('hide');
      open_replace_trial_accession_dialog();
    });

    function open_subtitute_plot_accession_dialog() {
      $('#substitute_plot_stocks_dialog').modal('show');
    }

    $('#substitute_stock_submit').click(function () {
      $('#edit_field_map_dialog').modal('hide');
      open_subtitute_plot_accession_dialog();
    });

    $('#generate_trial_barcode_link').click(function () {
        $('#generate_trial_barcode_button_dialog').modal("show");
    });

    $('#trial_plot_barcode').click(function () {
        $('#generate_trial_barcode_button_dialog').modal("hide");
        $('#generate_trial_barcode_dialog').modal("show");
    });

    $('#trial_stock_barcode').click(function () {
        $('#generate_trial_barcode_button_dialog').modal("hide");
        $('#generate_trial_barcode_dialog').modal("show");
    });

    $('#trial_plant_barcode').click(function () {
        $('#generate_trial_barcode_button_dialog').modal("hide");
        $('#generate_trial_barcode_dialog').modal("show");
    });
});
