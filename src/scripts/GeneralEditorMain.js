define(["../data/TypeData"],function(typeData) {

	var sources = [];
	
	var metaData = null;
	
	var allFields = [];

	var allValues = [];
	
	var hiddenFields = ["identifier"];
	
	//Somehow Chrome choked on maing all these replacements into a single string
	var PARAMETER_FIELD_TEMPLATE = "<div><label class=\"AttributeLabel\">DISPLAY_NAME:</label><input id=\"FIELD_ID\" type=\"TYPE\" value=\"VALUE\" class=\"AttributeValue\"/></div>";
	
	var REGISTERED_TYPE_TEMPLATE = "<div><label class=\"AttributeLabel\">DISPLAY_NAME:</label><select id=\"FIELD_ID\" class=\"AttributeValue\"/></div>";

	var REGISTERED_REPEAT_TEMPLATE = "<div><div><label class=\"AttributeLabel\">DISPLAY_NAME:</label><select id=\"FIELD_ID\" class=\"AttributeValue\"/></div></div>";
		
	var REPEAT_VALUE_TEMPLATE = "<span class=\"repeatValue\">VALUE</span>";	
		
	var VALUE_FIELD_TEMPLATE = "<div>SUMMARY_STRING</div>";
	
	var GLOBAL_OPTION_TEMPLATE = "<option>DISPLAY_NAME</option>";
	
	var getFieldInfoFromDisplayName = function(displayName) {
		var fieldInfo = null;
		for (var index = 0; index < allFields.length; index++) {
			if (allFields[index].displayName === displayName) {
				fieldInfo = allFields[index];
				break;
			}
		}
		return fieldInfo;
	}
	
	var refreshValueTable = function(values) {
		var valueTable = $(".valueTable");
		valueTable.empty();
		
		var filterInput = $("#filterInput");
		var filterSelect = $("#filterSelect");
		var filterField = getFieldInfoFromDisplayName(filterSelect.val());
		var registeredValues = null;
		if (filterField !== null) {
			registeredValues = getRegisteredTypeValues(filterField);
		} 
		var filterValue = filterInput.val();
		var filteredFieldValue;
		var addHeader = true;
		
		for (var index = 0; index < values.length; index++) {
			if (values[index] === null) continue;
			if (filterField !== null) {
				filteredFieldValue = registeredValues[values[index][filterField.fieldName]];
				if (filteredFieldValue.displayName !== filterValue) {
					allValues.push(values[index]);
					continue;
				}
			}
			createValuesListField( values[index], addHeader);	
			addHeader = false;
		}
	}
	
	
	var getRegisteredTypeValues = function(fieldInfo) {
		return metaData[fieldInfo.type].values;
	}
	
	var findRegisteredValueFromDisplayName = function(fieldInfo, displayName) {
		var availableValues = getRegisteredTypeValues(fieldInfo); 
		var identifier = -1;
		for (var index = 0; index < availableValues.length; index++) {
			if (displayName === availableValues[index].displayName) {
				identifier = availableValues[index].identifier;
				break;
			}
		}
		return identifier;
	}
	
	var createRepeatField = function(selectInput, value, identifier, clear) {
		var repeatParent = selectInput.parent().parent().children(".repeatParent");
		if (clear) {
			repeatParent.empty();
			$("<span>Selected Values</span>").appendTo(repeatParent);	
		}
		var createString = REPEAT_VALUE_TEMPLATE.replace("VALUE",value);
		var storageObject = { "repeatFieldIndex" : identifier};
		$(createString).appendTo(repeatParent).data("repeatFieldIndex", storageObject);
	}
	
	//Removes spaces, makes camel case
	var processDisplayName = function (displayName) {
		displayName = displayName.toLowerCase();
		var words = displayName.split(" ");
		var fieldName = words[0];
		var abbreviation = fieldName.charAt(0);
		for (var index = 1; index < words.length; index++) {
			fieldName += words[index].substr(0,1).toUpperCase() + words[index].substr(1);
			abbreviation += words[index].charAt(0);
		}
		return {"fieldName"	: fieldName, "abbreviation" : abbreviation};
	}

	var repeatValueSelected = function() {
		var option = $(this);
		var value = option.val();
		var fieldInfo = option.data("fieldInfo");
		var identifier = findRegisteredValueFromDisplayName(fieldInfo, value);
		if (identifier > -1) {
			createRepeatField(option, value, identifier, false);
		}
	}
		
	var createParameterField = function (fieldInfo) {
		var currentValuePanel = $("#CurrentValuePanel");
		var fieldIndex = allFields.push(fieldInfo) - 1;//current index is length - 1
		var fieldId = "inputField" + fieldIndex ;
		var isRegisteredType = metaData[fieldInfo.type] !== undefined;

		var createString;
		if (fieldInfo.isList && isRegisteredType) {
			createString = REGISTERED_REPEAT_TEMPLATE.replace("DISPLAY_NAME", fieldInfo.displayName).replace("FIELD_ID",fieldId);
			var valueDiv = $(createString).appendTo(currentValuePanel);
			$("<div><span>Selected Values</span></div>").addClass("repeatParent").appendTo(valueDiv);
			var selectInput = valueDiv.find(".AttributeValue").change(repeatValueSelected).data("fieldInfo", fieldInfo);
			$("<option>No Value</option>").appendTo(selectInput);
			var availableValues = getRegisteredTypeValues(fieldInfo);
			for (var index = 0; index < availableValues.length; index++) {
				var optionValue = $("<option>" + availableValues[index].displayName +"</option>").data("storeObject", {"valueIndex" : availableValues[index].identifier});
				optionValue.appendTo(selectInput);
			}
		}  else if (isRegisteredType) {
			createString = REGISTERED_TYPE_TEMPLATE.replace("DISPLAY_NAME", fieldInfo.displayName).replace("FIELD_ID",fieldId);
			var valueDiv = $(createString).appendTo(currentValuePanel);
			var selectInput = valueDiv.children(".AttributeValue");
			var availableValues = getRegisteredTypeValues(fieldInfo);
			for (var index = 0; index < availableValues.length; index++) {
				var optionValue = $("<option>" + availableValues[index].displayName +"</option>").data("storeObject", {"valueIndex":  availableValues[index].identifier});
				optionValue.appendTo(selectInput);
			}
		} else {
			createString = PARAMETER_FIELD_TEMPLATE.replace("DISPLAY_NAME", fieldInfo.displayName).replace("FIELD_ID",fieldId).replace("TYPE",fieldInfo.type).replace("VALUE", fieldInfo.defaultValue);
			$(createString).appendTo(currentValuePanel);		
		}
	}
	
	var valuesListFieldSelected = function() {
		var selectedValue = $(this);
		$(".selectedValue").removeClass("selectedValue").addClass("unselectedValue");
		selectedValue.addClass("selectedValue");
		var currentValue = allValues[selectedValue.attr("values-list-index")];
		for (var index = 0; index < allFields.length; index++) {
			currentInput = $("#inputField" + index);
			currentFieldInfo = allFields[index];
			var isRegisteredType = metaData[currentFieldInfo.type] !== undefined;
			if (currentFieldInfo.type === "checkbox") {
				currentInput.attr("checked", currentValue[currentFieldInfo.fieldName]);
			} else if (currentFieldInfo.isList) {
				var values = currentValue[currentFieldInfo.fieldName];
				var first = true;
				var availableValues = getRegisteredTypeValues(currentFieldInfo);
				for (var jindex = 0; jindex < values.length; jindex++) {					
					createRepeatField(currentInput,availableValues[values[jindex]].displayName, values[jindex], first);
					first = false;
				}
			} else if (isRegisteredType) {
				var availableValues = getRegisteredTypeValues(currentFieldInfo);
				var textValue = availableValues[currentValue[currentFieldInfo.fieldName]].displayName;
				currentInput.children().filter(function() {
					var optionInput = $(this);
					return optionInput.text() === textValue;
				}).prop("selected",true);
			} else {
				currentInput.val(currentValue[currentFieldInfo.fieldName]);
			}
		}
	}
	
	var valueHeaderSelected = function() {
		var hiddenFieldName = $(this).attr("headerFieldName");
		hiddenFields.push(hiddenFieldName);
		temporaryValues = allValues;
		allValues = [];
		refreshValueTable(temporaryValues);		
	}
	
	var getSummaryValue = function(value, currentField) {
		var summaryString = "";
		var isRegisteredType = metaData[currentField.type] !== undefined;
		if (currentField.isList) {
			var valueArray = value[currentField.fieldName];
			var typeValues = getRegisteredTypeValues(currentField);
			for (var jindex = 0; jindex < valueArray.length; jindex++) {
				if (jindex === 0) {
					summaryString += " " + typeValues[valueArray[jindex]].abbreviation;
				} else {
					summaryString += "," + typeValues[valueArray[jindex]].abbreviation;
				}
			}
		} else if (isRegisteredType) {
			var typeValues = getRegisteredTypeValues(currentField);
			summaryString += typeValues[value[currentField.fieldName]].abbreviation;
		} else {
			summaryString += value[currentField.fieldName];			
		}		
		return summaryString
	}
	
	var createValuesListField = function(value, addHeader) {
		var table = $(".valueTable");
		var valuesListIndex = allValues.push(value) - 1;
		var currentRow = $("<tr></tr>");
		var headerRow = $("<tr></tr>");
		for (var jindex = 0; jindex < allFields.length; jindex++) {
			if (hiddenFields.indexOf(allFields[jindex].fieldName) > -1) continue;
			if (addHeader) {
				var valueHeader = $("<th>" + allFields[jindex].displayName+ "</th>");
				valueHeader.addClass("valueHeader").click(valueHeaderSelected);
				valueHeader.attr("headerFieldName", allFields[jindex].fieldName);
				valueHeader.appendTo(headerRow);
			}
			$("<td>" + getSummaryValue(value,allFields[jindex]) + "</td>").appendTo(currentRow);
		}
		if (addHeader) {
			headerRow.appendTo(table);
		}
		currentRow.appendTo(table).click(valuesListFieldSelected).attr("values-list-index", valuesListIndex).addClass("unselectedValue");
	}
	
	var initializeSources = function () {
		var sourcesList = $("#availableSources");
		sourcesList.empty();
		for (var index = 0; index < sources.length; index++) {
			var option =  sources[index];
			$("<option>" + option.name + "</option>").appendTo(sourcesList);
		}
	}
	
	var initializeGlobalFields = function() {
		var globalFields = $("#globalFields");
		globalFields.empty();
		var createString;
		for (var index = 0; index < metaData.globalFields.globalFields.length; index++) {
			createString = GLOBAL_OPTION_TEMPLATE.replace("DISPLAY_NAME", metaData.globalFields.globalFields[index].displayName);
			$(createString).appendTo(globalFields).attr("field-index", index);
		}
	}
	
	var loadFoundationTypes = function() {
		var valueTypeInput = $("#valueType");
		for ( var property in metaData) {
			if (metaData[property] !== metaData.globalFields) {
				$("<option>" + property + "</option>").appendTo(valueTypeInput);
			}
		}
	}
	
	var loadSource = function(source) {
		var currentValuePanel = $("#CurrentValuePanel");
		currentValuePanel.empty();
		
		for (var jindex = 0; jindex < source.fields.length; jindex++) {
			if (source.fields[jindex]["fieldName"] === "identifier") continue;
			createParameterField(source.fields[jindex]);
		}
		
		var filterSelect = $("#filterSelect");
		filterSelect.empty();
		$("<option>No Filter</option>").appendTo(filterSelect);
		for (var index = 0; index < allFields.length; index++) {
			var isRegisteredType = metaData[allFields[index].type] !== undefined;
			if(!isRegisteredType || allFields[index].isList) continue;
			$("<option>" + allFields[index].displayName + "</option>").appendTo(filterSelect);
		}
		refreshValueTable(source.values);
		
	}
								
	function initializeApp() {
		typeData.loadAllData();
		initializeSources();
		initializeGlobalFields();
		loadFoundationTypes();
		
		$("loadValues").click(function() {
			//initialize source and meta data parameters.
		});
		
		$("#addParameter").click(function() {
			var globalFields = $("#globalFields");
			var fieldIndex = globalFields.children(":selected").attr("field-index");
			createParameterField(metaData.globalFields.globalFields[fieldIndex]);
		});		
	
		$("#addGlobalField").click(function() {
			var typeInput = $("#valueType");
			var displayNameInput = $("#displayName");
			var defaultValueInput = $("#defaultValue");
			var isListInput = $("#isList");
			var abbreviationInput = $("#abbreviationValue");
			var displayName = displayNameInput.val();
			var values = processDisplayName(displayName);			
			var isList = isListInput.attr("checked") === "checked";
			var newParameter = {	"displayName"	: displayName, 
									"type" 			: typeInput.val(), 
									"fieldName" 	: values.fieldName, 
									"abbreviation" 	: abbreviationInput.val(), 
									"isList"		: isList,
									"defaultValue" 	: defaultValueInput.val()};
			metaData.globalFields.globalFields.push(newParameter);
			initializeGlobalFields();
		});
	
		$("#availableSources").change(function() {
			allFields = [];
			allValues = [];
			for( var index = 0; index < sources.length; index++) {
				if (sources[index].name === this.value) {
					loadSource(sources[index].value);
					break;
				}
			}
		});
		
		$("#filterSelect").change(function() {
			var filterValueDiv = $("#filterValueDiv");
			filterValueDiv.empty();
			var fieldInfo = null;
			for (var index = 0; index < allFields.length; index++) {
				if (this.value === allFields[index].displayName) {
					fieldInfo = allFields[index];
					break;
				}
			}
			var filterValueDiv = $("#filterValueDiv");
			filterValueDiv.empty();
			if (fieldInfo === null) {
				return;
			}

			var isRegisteredType = metaData[fieldInfo.type] !== undefined;

			if (!fieldInfo.isList && isRegisteredType) {
				createString = REGISTERED_TYPE_TEMPLATE.replace("DISPLAY_NAME", fieldInfo.displayName).replace("FIELD_ID","filterInput");
				var valueDiv = $(createString).appendTo(filterValueDiv);
				var selectInput = valueDiv.children(".AttributeValue");
				var availableValues = getRegisteredTypeValues(fieldInfo);
				for (var index = 0; index < availableValues.length; index++) {
					var optionValue = $("<option>" + availableValues[index].displayName +"</option>");
					optionValue.appendTo(selectInput);
				}
			}
		});
		
		$("#removeValue").click(function() {
			var selectedValue = $(".selectedValue");
			var valueIndex = selectedValue.attr("values-list-index");
			selectedValue.remove();
			allValues[valueIndex] = null;
		});
		
		$("#addValue").click(function() {
			var currentValue = {};
			var currentInput;
			var currentFieldInfo;
			var flushFields  = [];
			for (var index = 0; index < allFields.length; index++) {
				currentInput = $("#inputField" + index);
				currentFieldInfo = allFields[index];
				var isRegisteredType = metaData[currentFieldInfo.type] !== undefined;
				if (currentFieldInfo.type === "checkbox") {
					currentValue[currentFieldInfo.fieldName] = (currentInput.attr("checked") === "checked");
				} else if (currentFieldInfo.isList) {
					var repeatParent = currentInput.parent().parent().find(".repeatParent");
					flushFields.push(repeatParent);
					var arrayValue = [];
					repeatParent.children().each( function() {
						var currentValue = $(this);
						var valueObject = currentValue.data("repeatFieldIndex");
						if (valueObject !== undefined) {
							arrayValue.push(valueObject.repeatFieldIndex);
						}
					});
					currentValue[currentFieldInfo.fieldName] = arrayValue;	
				} else {
					if (isRegisteredType) {
						var valueIndex = findRegisteredValueFromDisplayName(currentFieldInfo, currentInput.val());
						currentValue[currentFieldInfo.fieldName] = valueIndex;
					} else {
						currentValue[currentFieldInfo.fieldName] = currentInput.val();
					}
				}
			}
			
			for (var jindex = 0; jindex < flushFields.length; jindex++) {
				flushFields[jindex].empty();
				$("<span>Selected Values</span>").appendTo(flushFields[jindex]);
			}
			currentValue["identifier"] = allValues.length;
			createValuesListField(currentValue, (allValues.length === 0));
		});
		
		$("#refresValues").click(function() {
			var newValues = [];
			for (var index = 0; index < allValues.length; index++) {
				if (allValues[index] !== null) {
					for (var jindex = 0; jindex < allFields.length; jindex++) {
						if (allValues[index][allFields[jindex].fieldName] === undefined) {
							if (allFields[jindex].fieldName === "identifier") {
								allValues[index][allFields[jindex].fieldName] = allFields.length + index;
							} else {
								allValues[index][allFields[jindex].fieldName] = allFields[jindex].defaultValue;
							}
						}
					}
					newValues.push(allValues[index]);
				}
			}
			var dataDefinition = {"fields" : allFields, "values" : newValues};
			$("#generalDataOutput").val(JSON.stringify(dataDefinition));			
		});
		
		$("#refreshTable").click(function() {
			hiddenFields = ["identifier"];
			temporaryValues = allValues;
			allValues = [];
			refreshValueTable(temporaryValues);
		});
		
		$("#refresGlobals").click(function() {
			$("#generalDataOutput").val(JSON.stringify(metaData.globalFields.globalFields));			
		});		
	}
	
	return {
		initializeApplication : function() {
			initializeApp();
		}
	};	
});