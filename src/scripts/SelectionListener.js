define(["./HexagonGrid", "./Settings", "../data/HexData"], function(hexagonModule, settings, hexDataModule) {

	var currentHex = null;

	var selectedHexes = new Array();
	
	var selectionChangeListeners = new Array();
		
	var selectionContext;
	
	var offset;
	
	var zoomLevel = 1;
	
	var NUMBER_ROWS;

	var	NUMBER_COLS;
	
	var selectedHexesChanged = function() {
		for (var index = 0; index < selectedHexes.length; index++) {
			selectedHexes[index].clearHex(selectionContext);
		}
		
		var fillColor = settings.getSelectionColors()[0];
		for (var jindex = 0; jindex < selectedHexes.length; jindex++) {
			selectedHexes[jindex].fillHexagon(selectionContext, fillColor);
			fillColor = settings.getSelectionColors()[1];
		}
	}
	
	var drawCircle = function(centerX, centerY) {
	    var radius = 3;
	    selectionContext.beginPath();
            selectionContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            selectionContext.fillStyle = "#8ED6FF";
            selectionContext.fill();
            selectionContext.lineWidth = 1;
            selectionContext.strokeStyle = "black";
            selectionContext.stroke();   
	}
	
	var clearSelectedHexes = function(deleteSelection) {
		for (var index = 0; index < selectedHexes.length; index++) {
			selectedHexes[index].clearHex(selectionContext);
		}
		if (deleteSelection) {
			currentHex = null;
			selectedHexes = new Array();
		}
	}
	
	var translateClick = function(clickEvent) {
		var returnValue = new Array(2);
		//The correction for the scrollable parent
		var parent = $("#CanvasParent")[0];
		returnValue[0] = (clickEvent.pageX + offset[0] + parent.scrollLeft) / zoomLevel;
		returnValue[1] = (clickEvent.pageY + offset[1] + parent.scrollTop) / zoomLevel;
		
		return returnValue;
	}
	
	var viewHexagonValues = function(hexagon) {
		var hexRow = hexagon.getRow();
		var hexCol = hexagon.getColumn();
		var hexagonData = null;
		var hexData = hexDataModule.hexData;
		$("#CurrentHexViewer").val(hexagon.getHexagonIdentifier());
		
		var projectedIndex = hexCol * NUMBER_ROWS + hexRow
		hexagonData = hexData[projectedIndex];
		$("#CurrentHexViewer").val(hexagonData.col + " " + hexagonData.row);

		if (hexagonData === null) {
			$("#FoodValue").val(10);
			$("#MetalValue").val(0);
			$("#MithralValue").val(0);
			$("#TerrainValue").val("Unknown");
			$("#CMValue").val(0);
			$("#GoldValue").val(0);
			$("#TradeValue").val(0);
		} else {
			$("#FoodValue").val(hexagonData.food);
			$("#MetalValue").val(hexagonData.metal);
			$("#MithralValue").val(hexagonData.mithral);
			$("#TerrainValue").val(hexagonData.terrain);
			$("#CMValue").val(hexagonData.cm);
			$("#GoldValue").val(hexagonData.gold);
			$("#TradeValue").val(hexagonData.trade);
		}
	}
	
	var registerSelectionListener = function(selectionCanvas, layerContext, hexagonGrid) {
		selectionCanvas.click( function(clickEvent) {
			var translatedClick = translateClick(clickEvent);
			var clickedHexagon = hexagonGrid.findHexagon(translatedClick[0], translatedClick[1]);
			if ((clickedHexagon === null) || (clickedHexagon === undefined)) return;			
			if (currentHex === null) {
				selectedHexes[selectedHexes.length] = clickedHexagon;
				currentHex = clickedHexagon;
			} else if (clickedHexagon === currentHex) {
				if (selectedHexes.length === 1) {
					clearSelectedHexes(true);
				} else {
					clearSelectedHexes(false);
					selectedHexes.splice(selectedHexes.length - 1 ,1);
					currentHex = selectedHexes[selectedHexes.length - 1];
				}
			} else if (hexagonModule.areAdjacent(currentHex, clickedHexagon)) {
				if (selectedHexes.indexOf(clickedHexagon) === -1) {
					currentHex = clickedHexagon;
					selectedHexes[selectedHexes.length] = clickedHexagon;
				}
			}
			selectedHexesChanged();
		});
		
		selectionCanvas.mousemove(function(clickEvent) {
			var translatedMove = translateClick(clickEvent);
			var enteredHexagon = hexagonGrid.findHexagon(translatedMove[0], translatedMove[1]);
			if (enteredHexagon !== null) {
				viewHexagonValues(enteredHexagon);
			}
		});
		
		offset = new Array();
		offset[0] = -selectionCanvas.offset().left;
		offset[1] = -selectionCanvas.offset().top;
		selectionContext = layerContext;
	}
		
	var addSelectionChangeListener = function(changeListener) {
		selectionChangeListeners[selectionChangeListeners.length] = changeListener;
	}

	var getCurrentlySelectedHex = function() {
		return currentHex;
	}
	
	var setZoomLevel = function(zoomValue) {
		zoomLevel = zoomValue;
	}
	
	return {
		registerListener : function(selectionCanvas, layerContext, hexagonGrid) {
			registerSelectionListener(selectionCanvas, layerContext, hexagonGrid);
		},
		
		clearSelection : function() {
			clearSelectedHexes(true);
		},
		
		setZoomLevel : function(zoomValue) {
			setZoomLevel(zoomValue);
		},
		
		getCurrentHex : function() {
			return getCurrentlySelectedHex();
		},
		
		setGridSize : function(numCols, numRows) {
			NUMBER_ROWS = numRows;
			NUMBER_COLS = numCols;
		}
	}
});