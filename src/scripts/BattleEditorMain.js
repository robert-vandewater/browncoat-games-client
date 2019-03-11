define(["../data/TroopTypeData", "../data/CombatSimulatorUI/BattleDefinition"],function(troopTypes, definitionFile) {

	var battleDefinition = {};
		
	var currentSlot = null;
	
	var slotTypes = ["cavalry","frontTop","frontCenter","frontBottom","supportTop", "supportCenter","supportBottom","reserve1","reserve2","reserve3"];
	
	function getTroopTypeFromId(identifier) {
		return troopTypes.values[identifier].displayName;
	}
	
	function getIdForTroopTypeName(typeName) {
		var identifier = -1;
		for (var index = 0; index < troopTypes.values.length; index++) {
			if (troopTypes.values[index].displayName === typeName) {
				identifier = troopTypes.values[index].identifier;
				break;
			}
		}
		return identifier;
	}
	
	function refreshTroopTypes() {
		var troopTypeOptions = $("#TroopType");		
		troopTypeOptions.empty();
		var currentType;
		for (var index = 0; index < troopTypes.values.length; index++) {
			currentType = troopTypes.values[index];
			$("<option >" + currentType.displayName + " </option>").appendTo(troopTypeOptions);
		}	
	}

	function clearSlotUnits() {
		$(".SelectedSlotUnit").removeClass("SelectedSlotUnit").addClass("UnselectedSlotUnit");
	}
	
	function slotUnitSelected() {
		var currentSlotUnit = $(this);
		clearSlotUnits();
		currentSlotUnit.removeClass("UnselectedSlotUnit");
		currentSlotUnit.addClass("SelectedSlotUnit");
	}
	
	function readValues(prefix) {
		var returnValue = {};
		returnValue["armyMorale"] = $(prefix + "armyMorale").val();
		returnValue["commanderRating"] = $(prefix + "commanderRating").val();
		returnValue["casualtyThreshold"] = $(prefix + "casualtyThreshold").val();
		return returnValue;
	}
	
	function readSlotUnit() {
		var returnValue = {};
		var troopTypeId = getIdForTroopTypeName( $("#TroopType").val());
		returnValue["TroopType"] = troopTypeId;
		returnValue["numberTroops"] = $("#numberTroops").val();
		returnValue["levelTroops"] = $("#levelTroops").val();
		returnValue["armor"] = $("#armor").val();
		returnValue["weapons"] = $("#weapons").val();
		return returnValue;
	}
	
	function writeValues(army, prefix) {
		$(prefix + "armyMorale").val(army["armyMorale"]);
		$(prefix + "commanderRating").val(army["commanderRating"]);
		$(prefix + "casualtyThreshold").val(army["casualtyThreshold"]);	
	}
	
	function addSlotTroops(currentSlotTable, slotUnitValues) {
		var newRow = $("<tr></tr>").addClass("UnselectedSlotUnit").click(slotUnitSelected).data("associatedSlot", slotUnitValues);
		var troopTypeDisplayName = getTroopTypeFromId(slotUnitValues["TroopType"]); 
		$("<td>" + troopTypeDisplayName + "</td>").appendTo(newRow); 
		$("<td>" + slotUnitValues["numberTroops"] + "</td>").appendTo(newRow);
		$("<td>" + slotUnitValues["levelTroops"] + "</td>").appendTo(newRow);
		$("<td>" + slotUnitValues["armor"] + "</td>").appendTo(newRow);
   		$("<td>" + slotUnitValues["weapons"] + "</td>").appendTo(newRow);
		newRow.appendTo(currentSlotTable);
	}
	
	function writeSlotValues(army, prefix) {
		for (var index = 0; index < army.slots.length; index++) {
			var armySlot =  army.slots[index];
			var currentSlotDiv = $(prefix +armySlot["slotType"]);
			for (var jindex = 0; jindex < armySlot.slotTroops.length; jindex++) {
				var slotUnitValues = armySlot.slotTroops[jindex];
				addSlotTroops(currentSlotDiv, slotUnitValues);
			}
		}
	}

	function createEmptyArmy() {
		var returnArmy = {};
		returnArmy.slots = [];
		for (var index = 0; index < slotTypes.length; index++) {
			returnArmy.slots.push( {"slotType" : slotTypes[index], "slotTroops" : []} );		
		}
		return returnArmy;
	}
	
	function initializeExistingBattle() {
		battleDefinition = definitionFile;
		if ((battleDefinition === undefined) || (battleDefinition.attacker === undefined)) {
			battleDefinition = {};
			battleDefinition.attacker = createEmptyArmy();
			battleDefinition.defender = createEmptyArmy();
		} else {
			writeValues(battleDefinition.attacker, "#A");
			writeValues(battleDefinition.defender, "#D");
			writeSlotValues(battleDefinition.attacker, "#A");
			writeSlotValues(battleDefinition.defender, "#D");
			$("#terrainType").val(battleDefinition.terrainType);
		}
	}
	
	function slotTypeSelected() {
		currentSlot = $(this);
		var slots = $(".SelectedSlotTable");
		slots.removeClass("SelectedSlotTable");
		slots.addClass("UnselectedSlotTable");
		currentSlot.removeClass("UnselectedSlotTable");
		currentSlot.addClass("SelectedSlotTable");
	}	
	
	function initializeSlotListeners() {
		$(".UnselectedSlotTable").click(slotTypeSelected);
	}
	
	// Return the intersection of circles based on the binary code of the index where each digit maps to a letter (starting with 'A')
	function initializeApp() {
		refreshTroopTypes();
		
		initializeSlotListeners();
		
		initializeExistingBattle();

		$("#removeUnit").click(function() {
			var slotRow = $(".SelectedSlotUnit").remove();
			var removeData = slotRow.data("associatedSlot");
			var slotId = slotRow.parent().attr("id");
			var typeSlot = slotId.substr(1);
			var slotIndex = slotTypes.indexOf(typeSlot);
			if (slotId.charAt(0) === "A") {				
				var removeIndex = battleDefinition.attacker.slots[slotIndex].slotTroops.indexOf(removeData);			
				battleDefinition.attacker.slots[slotIndex].slotTroops.splice(removeIndex,1);			
			} else {
				var removeIndex = battleDefinition.attacker.slots[slotIndex].slotTroops.indexOf(removeData);			
				battleDefinition.defender.slots[slotIndex].slotTroops.splice(removeIndex,1);			
			}
			
		});
		
		$("#addUnit").click(function() {
			if (currentSlot === null) return;
			var slotUnitValues = readSlotUnit();
			addSlotTroops(currentSlot, slotUnitValues);
			var slotId = currentSlot.attr("id");
			var typeSlot = slotId.substr(1);
			var slotIndex = slotTypes.indexOf(typeSlot);
			if (slotId.charAt(0) === "A") {
				battleDefinition.attacker.slots[slotIndex].slotTroops.push(slotUnitValues);			
			} else {
				battleDefinition.defender.slots[slotIndex].slotTroops.push(slotUnitValues);			
			}
		});
		
		$("#refreshBattle").click(function() {
			$("#battleOutput").val(JSON.stringify(battleDefinition));
		});
	}
		
	return {
		initializeApplication : function() {
			initializeApp();
		}
	};	
});