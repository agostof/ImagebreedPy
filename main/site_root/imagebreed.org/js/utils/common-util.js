
function get_select_box(type, div_id, options) {

    // var previous_html = $('#'+div_id).html();

    //alert(JSON.stringify(options));
    jQuery.ajax({
        url: '/ajax/html/select/' + type,
        data: options,
        beforeSend: function (xhr) {
            var html = '<div class="card bg-light"><center><img src="/img/wheel.gif" /></center></div>';
            $('#' + div_id).html(html);
            xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
        },
        success: function (response) {
            if (response.error) {
                alert(response.error);
                // $('#'+div_id).html(previous_html);
            }
            else if (response.options) {
                var optionsHTML = ""
                optionsHTML = optionsHTML + "<option disabled selected value> -- Select -- </option>";

                for (const selectOption of response.options) {
                    optionsHTML = optionsHTML + "<option title='" + selectOption.name + "' value='" + selectOption.id + "' >" + selectOption.name + "</option>"
                }
                var selectHTML = "<select class='form-control' id='" + options.id + "' name='" + options.name + "'>" +
                    optionsHTML + "</select>"
                $('#' + div_id).empty();
                $('#' + div_id).html(selectHTML);
                if (options.live_search) {
                    var select = $("#" + options.id);
                    select.selectpicker('render');
                    select.data('selectpicker').$button.focus();
                    select.data('selectpicker').$button.attr("style", "background-color:#fff");
                }
                if (options.multiple) {
                    var select = $("#" + options.id).prop('multiple', 'multiple');
                }
                if (options.workflow_trigger) {
                    // console.log("this is a workflow trigger. Response.select is: \n");
                    // console.log(JSON.stringify(response.select));
                    var select = $("#" + options.id).attr('onChange', 'Workflow.complete(this);');
                }
            }
        },
        error: function (response) {
            alert("An error occurred");
        }
    });
}

function filter_options(filter, filterType, targetSelect) {

    if (filter) { // If filter is defined, then show only options that are associated with it's value
        $('#' + targetSelect + ' option').each(function () {
            if (this.getAttribute('data-' + filterType) == filter) {
                $(this).show();
            }
            else {
                $(this).hide();
            }
        });
    }
    else { // Otherwise display all options
        $('#' + targetSelect + ' option').each(function () {
            $(this).show();
        });
    }

}

function set_daterangepicker_default(date_element) {
    date_element[0].valueAsDate = new Date();
}

var Effects = {
	//These, on the other hand, are generic and belong in CXGN.Effects:
	showElement: function(elementId, displayMethod) {
		var element = document.getElementById(elementId);
		var dispMethod;
		if(displayMethod) {
			dispMethod = displayMethod;
		}
		else { dispMethod = "inline"; }
		element.style.display = dispMethod;
	},
	hideElement: function(elementId, displayMethod) {
		var element = document.getElementById(elementId);
		var dispMethod = "";
		if(displayMethod) {
			dispMethod = displayMethod;
		}
		else { dispMethod = "none"; } //alternative is "hidden", which causes it to continue occupying space on the page
		element.style.display = dispMethod;
	},
	swapElements: function(elementIdFrom, elementIdTo, displayMethod){
		try {	
			var dispMethod = displayMethod || "inline";
			var elementFrom = document.getElementById(elementIdFrom);
			var elementTo = document.getElementById(elementIdTo);
			elementFrom.style.display = "none";
			elementTo.style.display = dispMethod;
		}
		catch(e) { console.error(e, e.stack); }
	}
};


