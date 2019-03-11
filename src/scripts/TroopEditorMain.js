define(["../data/TroopTypeData"],function(troopTypes) {

	var currentTroopTypes = troopTypes;
	
	var selectedTroopType = null;
	
	var selectedBonus = null;
	
	var bonusSelected = function() {
		var currentControl = $(this);
		var selectedName = currentControl.attr("data-bonusName");
		var currentBonus;
		for ( var index = 0; index < selectedTroopType.bonuses.length; index++ ) {
			currentControl = $("#BonusRow" + index);
			currentBonus = selectedTroopType.bonuses[index];
			if (selectedName === currentBonus.bonusName) {
				currentControl.addClass("SelectedBonus");
				currentControl.removeClass("UnselectedBonus");
				selectedBonus = currentBonus;
			} else {
				currentControl.removeClass("SelectedBonus");
				currentControl.addClass("UnselectedBonus");
			}
		}
		$("#bonusName").val(selectedBonus.bonusName);
		$("#levelNumber").val(selectedBonus.levelNumber);		
		$("#bonusAgainstType").val(selectedBonus.bonusAgainstType);		
		$("#improvesAttribute").val(selectedBonus.bonusEffect);			
		$("#terrainType").val(selectedBonus.terrainType);
		$("#bonusValue").val(selectedBonus.bonusValue);		
	}
	
	var troopTypeSelected = function() {
		var currentControl = $(this);		
		var currentId = parseInt(currentControl.attr("data-typeId"));
		var currentType;
		for (var index = 0; index < currentTroopTypes.troopTypes.length; index++) {
			currentControl = $("#TroopTypeRow" + currentTroopTypes.troopTypes[index].id);
			if ( currentTroopTypes.troopTypes[index].id === currentId) {
				currentControl.addClass("SelectedTroopType");
				currentControl.removeClass("UnselectedTroopType");
				currentType = currentTroopTypes.troopTypes[index];
				selectedTroopType = currentType;
			} else {
				currentControl.addClass("UnselectedTroopType");
				currentControl.removeClass("SelectedTroopType");			
			}
		}
		refreshTroopType();
	}
	
	function refreshTroopType() {
		var bonusPanel = $("#TroopTypeBonusPanel");
		bonusPanel.empty();
		if (selectedTroopType === null) return;
		
		$("#troopTypeName").val(selectedTroopType.name);
		$("#basicTroopType").val(selectedTroopType.type);
		$("#attackRating").val(selectedTroopType.attackValue);
		$("#defenseRating").val(selectedTroopType.defenseValue);
		$("#movementRating").val(selectedTroopType.movement);
		$("#goldCost").val(selectedTroopType.cost);
		
		var currentBonus;
		for(var index = 0; index < selectedTroopType.bonuses.length; index++) {
			currentBonus = selectedTroopType.bonuses[index];
			$("<div>" + currentBonus.bonusName+ "</div>").attr("id", "BonusRow" + index).attr("data-bonusName", currentBonus.bonusName).addClass("UnselectedBonus").click(bonusSelected).appendTo(bonusPanel);
		}	
	}
	
	function refreshTroopTypes() {
		var troopTypePanel = $("#TroopTypePanel");
		troopTypePanel.empty();
		var currentType;
		for (var index = 0; index < currentTroopTypes.troopTypes.length; index++) {
			currentType = currentTroopTypes.troopTypes[index];
			$("<div >" + currentType.name + " </div>").attr("id", "TroopTypeRow" + currentTroopTypes.troopTypes[index].id).attr("data-typeId", currentType.id).addClass("UnselectedTroopType").click(troopTypeSelected).appendTo(troopTypePanel);
		}	
	}

	function createTroopType() {
		var troopType = {};
		troopType.name = $("#troopTypeName").val();
		troopType.type = $("#basicTroopType").val();
		troopType.attackValue = $("#attackRating").val();
		troopType.defenseValue = $("#defenseRating").val();
		troopType.movement = $("#movementRating").val();
		troopType.cost = $("#goldCost").val();
		troopType.bonuses = [];
		selectedTroopType = troopType;
	}
	
	// Return the intersection of circles based on the binary code of the index where each digit maps to a letter (starting with 'A')
	function initializeApp() {
		refreshTroopTypes();
	
		$("#refreshTroopTypes").click(function() {		
			$("#troopTypesOutput").val(JSON.stringify(currentTroopTypes.troopTypes));
			alert("Refreshing Troop Type content.  ");
		});
		
		$("#addBonus").click(function() {
			if (selectedTroopType === null) createTroopType();
		
			var bonusName = $("#bonusName").val();
			var terrainType = $("#terrainType").val();
			var levelNumber = $("#levelNumber").val();
			var bonusEffect = $("#improvesAttribute") .val();
			var bonusAgainstType = $("#bonusAgainstType").val();
			var bonusValue = $("#bonusValue").val();
		
			var newBonus = {"bonusName" : bonusName , "terrainType" : terrainType, "levelNumber" : levelNumber, "bonusAgainstType": bonusAgainstType, "bonusEffect" : bonusEffect, "bonusValue" : bonusValue};
			var found = -1;
			for (var index = 0; index < selectedTroopType.bonuses.length; index++) {
				if (selectedTroopType.bonuses[index].bonusName === bonusName) {
					found = index;
					break;
				}
			}
			
			if ( found < 0 ) {
				selectedTroopType.bonuses[selectedTroopType.bonuses.length] = newBonus;
			} else {
				selectedTroopType.bonuses[found] = newBonus;
			}
	
			refreshTroopType(selectedTroopType);
		});
		
		$("#removeBonus").click(function() {
			if (selectedBonus === null) return;
			var removeIndex = selectedTroopType.bonuses.indexOf(selectedBonus);
			selectedTroopType.bonuses.splice(removeIndex, 1);			
			selectedBonus = null;
			refreshTroopType();
		});

		$("#removeTroopType").click(function() {	
			if(selectedTroopType === null) return;
			var removeIndex = currentTroopTypes.troopTypes.indexOf(selectedTroopType);
			currentTroopTypes.troopTypes.splice(removeIndex, 1);
			selectedTroopType = null;
			refreshTroopTypes();
			refreshTroopType();
		});

		
		$("#addTroopType").click(function() {
			createTroopType();
			var found = -1;

			var currentTroopType;
			for(var index = 0; index < currentTroopTypes.troopTypes.length; index++) {
				currentTroopType = currentTroopTypes.troopTypes[index];
				if( selectedTroopType.name === currentTroopType.name ) {
					found = index;
					break;
				}
			}
			
			if ( found < 0) {
			    var newIndex = currentTroopTypes.troopTypes.length;
				currentTroopTypes.troopTypes[newIndex] = selectedTroopType;
				selectedTroopType.id = newIndex;
			} else {
				currentTroopTypes.troopTypes[found] = selectedTroopType;
				selectedTroopType.id = found;
			}
			refreshTroopTypes();
		});
	}
	
	return {
		initializeApplication : function() {
			initializeApp();
		}		
	};	
});