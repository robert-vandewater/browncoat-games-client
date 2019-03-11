define(function() {

	var dataTypes = ["Artifacts", "Buildings", "Spells", "TroopTypes", "GlobalFields", "TerrainTypes", "TroopTypeBonuses","BasicTroopTypes","BasicArtifactTypes" ];

	var loadedData = [];
	
	var dataLoaded = function(msg) {
		loadedData.push(JSON.parse(msg.data));
	}
	
	var loadData = function(requestedType) {
			$.ajax({
			url: '/dataRequest',
			type: 'GET',
			data: requestedType,
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			async: false,
			success: dataLoaded
		});	
	}

	return {
		loadAllData : function() {
			for (var index = 0; index < dataTypes.length; index++) {
				loadData(dataTypes[index]);
			}		
		},
		
		getLoadedData : function() {
			var returnValue = null;
			if (loadedData.length === dataTypes.length) {
				returnValue = {};
				for (var index = 0; index < loadedData.length; index++) {
					returnValue[loadedData[index].dataType] = loadedData[index];
				}
			}
			return returnValue;
		},
		
		updateDataOfType : function(dataString, typeData) {
			$.ajax({
				url: '/dataRequest',
				type: 'PUT',
				data: "datatype="+ typeData + "&data=" + dataString,
				contentType: 'application/json; charset=utf-8',
				dataType: 'json',
				async: false,
				success: function(msg) { alert(msg.textStatus);}
			});	
		}
	};	
});