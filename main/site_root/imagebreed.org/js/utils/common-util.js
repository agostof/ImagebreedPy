
function get_select_box(type, div_id, options) {

    // var previous_html = $('#'+div_id).html();

    //alert(JSON.stringify(options));
    jQuery.ajax({
        url: '/ajax/html/select/' + type,
        data: options,
        beforeSend: function (xhr) {
            $('#' + div_id + " div").show();
            $('#' + div_id + " select").hide();
            xhr.setRequestHeader('Authorization', localStorage.getItem("access_token"));
        },
        success: function (response) {
            if (response.error) {
                alert(response.error);
            }
            else if (response.options) {
                var select = $('#' + div_id + " select");
                select.empty()
                select.append("<option disabled selected> -- Select -- </option>")

                for (const selectOption of response.options) {
                    select.append("<option title='" + selectOption.name + "' value='" + selectOption.id + "' >" + selectOption.name + "</option>");
                }

                if (options.live_search) {
                    select.selectpicker('render');
                    select.data('selectpicker').$button.focus();
                    select.data('selectpicker').$button.attr("style", "background-color:#fff");
                }
                if (options.multiple) {
                    select.prop('multiple', 'multiple');
                }
                if (options.workflow_trigger) {
                    select.attr('onChange', 'Workflow.complete(this);');
                }
                
                $('#' + div_id + " div").hide();
                select.show();
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


