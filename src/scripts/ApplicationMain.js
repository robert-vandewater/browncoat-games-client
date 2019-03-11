define(["./ImageLayer", "./HexagonGrid", "./SelectionListener","../data/HexData" ],function(imageLayer, hexagonGrid, selectionModule, hexDataModule) {

    var mapCanvas = $("#LayerMapCanvas")[0];

    var mapContext = mapCanvas.getContext("2d");

    var gridCanvas = $("#LayerGridCanvas")[0];

    var gridContext = gridCanvas.getContext("2d");
	
	var zocCanvas = $("#LayerZocCanvas")[0];
	
	var zocContext = zocCanvas.getContext("2d");
	
	var selectionCanvas = $("#LayerActionCanvas");
	
	var selectionContext = selectionCanvas[0].getContext("2d");
	
	var TERRAINS = ["mountains","swamp","desert","plains", "forest","hills", "forested hills"];

	var NUMBER_ROWS = 30;
	
	var NUMBER_COLS = 46;
	
	var LAYER_WIDTH = 1200;
	
	var LAYER_HEIGHT = 600;
	
	// Return the intersection of circles based on the binary code of the index 
    // where each digit maps to a letter (starting with 'A')
	function initializeApp() {
		imageLayer.loadLayerImage("./images/Shalea1.png", mapContext);
		$("#debugButton").click(function() {
			alert("Debug button clicked");
		});
		$("#clearSelection").click(function() {
			selectionModule.clearSelection();
		});
		$("#setHexButton").click(function() {
			var currentHex = selectionModule.getCurrentHex();
			if (currentHex === null) return;
			var hexagonData = {};
			hexagonData.row = currentHex.getRow();
			hexagonData.col = currentHex.getColumn();
			hexagonData.food = $("#FoodValue").val();
			hexagonData.metal = $("#MetalValue").val();
			hexagonData.mithral = $("#MithralValue").val();
			hexagonData.terrain = $("#TerrainValue").val();
			hexagonData.cm = $("#CMValue").val();
			hexagonData.gold = $("#GoldValue").val();
			hexagonData.trade = $("#TradeValue").val();
			var indexHex = null;
			for (var index = 0; index < hexDataModule.hexData.length; index++) {
				indexHex = hexDataModule.hexData[index];
				if ((indexHex.col === hexagonData.col) && (indexHex.row === hexagonData.row)) {
					arrayName.splice(index,1,hexagonData);
				}
			}
		});
		
		$("#zoomLevel").change(function() {
			var zoomValue = $(this).val();
			mapContext.canvas.width = LAYER_WIDTH * zoomValue;
			mapContext.canvas.height = LAYER_HEIGHT * zoomValue;
			mapContext.clearRect(0,0, mapContext.canvas.width, mapContext.canvas.height);
			mapContext.restore();
			mapContext.scale(1,1);
			mapContext.save();
			mapContext.scale(zoomValue, zoomValue);
			imageLayer.loadLayerImage("./images/Shalea1.png", mapContext);
			gridContext.canvas.width = LAYER_WIDTH * zoomValue;
			gridContext.canvas.height = LAYER_HEIGHT * zoomValue;
			gridContext.clearRect(0,0, mapContext.canvas.width, mapContext.canvas.height);
			gridContext.restore();
			gridContext.scale(1,1);
			gridContext.save();
			gridContext.scale(zoomValue, zoomValue);
			grid.drawGrid(gridContext);
			selectionContext.canvas.width = LAYER_WIDTH * zoomValue;
			selectionContext.canvas.height = LAYER_HEIGHT * zoomValue;
			selectionContext.clearRect(0,0, mapContext.canvas.width, mapContext.canvas.height);
			selectionContext.restore();
			selectionContext.scale(1,1);
			selectionContext.save();
			selectionContext.scale(zoomValue, zoomValue);			
			selectionModule.setZoomLevel(zoomValue);
		});
		
		//Random Generator for map attributes
		// $("#writeHexes").click(function() {
			// var counter = 0;
			// var writeText = "";
			
			// for (var index = 0; index < NUMBER_COLS; index++) {
				// for (var kindex = 0; kindex < NUMBER_ROWS; kindex++) {
					// var hexagonData = {};
					// hexagonData.row = kindex;
					// hexagonData.col = index;
					// hexagonData.food = Math.floor(Math.random() * 10) + 1;
					// hexagonData.metal = Math.floor(Math.random() * 10) + 1;
					// hexagonData.mithral = Math.floor(Math.random() * 10) + 1;
					// hexagonData.terrain = TERRAINS[Math.floor(Math.random() * 7) ];
					// hexagonData.cm = Math.floor(Math.random() * 10) + 1;
					// hexagonData.gold = Math.floor(Math.random() * 10) + 1;
					// hexagonData.trade = Math.floor(Math.random() * 10) + 1;
					// var hexDataText = JSON.stringify(hexagonData);
					// writeText += hexDataText + ",\n";
				// }
			// }
			// $('#HexOutput').val(writeText); 
		// });
		
		$("#RightPanelAccordion").accordion();
		
		var grid = hexagonGrid.createHexagonGrid(NUMBER_COLS, NUMBER_ROWS, 10);
		gridContext.globalAlpha = .8;
		grid.drawGrid(gridContext);
		zocContext.globalAlpha = .1;
		//grid.drawMarkerLines(zocContext);
		selectionModule.registerListener(selectionCanvas, selectionContext, grid);
		selectionModule.setGridSize(NUMBER_COLS, NUMBER_ROWS);
	}
	
	return {
		initializeApplication : function() {
			initializeApp();
		}
		
	};	
});
