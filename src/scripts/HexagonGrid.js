define(["./Hexagon", "./Settings"],function(hexagonModule, settings) {	
	var WIDTH = Math.cos(Math.PI / 6);
	
	var HEIGHT = Math.sin(Math.PI / 6);	
	
	var ClassHexagonGrid = function( numberColumns, numberRows, sideLength) {
		
		var rowMarkers = new Array();
		
		var columnMarkers = new Array();

		var gridHexagons = createGridHexagons();
					
		function createGridHexagons() {
			var returnGrid = new Array(numberRows);
            var gridPoints = createGridPoints();
            for (var col = 0; col < numberColumns; col++) {
				returnGrid[col] = new Array(numberRows);
				for (var row = 0; row < numberRows; row++) {
                     returnGrid[col][row] = hexagonModule.createHexagon(col, row, gridPoints[col][row]);
                 }
            }
			return returnGrid;
		}
		
		function createGridPoints() {
			var currentYValue, currentXValue = 2;

			var returnArray = new Array(numberColumns);
			for (var col = 0; col < numberColumns; col++) {
				currentYValue = 0;
				returnArray[col] = new Array(numberRows);
				for (var row = 0; row < numberRows; row++) {
					if ( row % 2 == 0) {
						returnArray[col][row] = createEvenRow(col,row, currentXValue, currentYValue, sideLength, returnArray);
					} else {
						returnArray[col][row] = createOddRow(col, row, currentXValue, currentYValue, sideLength, returnArray); 
					}
					if (col === 0) {
						rowMarkers[row] = currentYValue;
					}
                    currentYValue += sideLength + sideLength * HEIGHT;					
				}
				columnMarkers[columnMarkers.length] = currentXValue;
				currentXValue += 2 * sideLength * WIDTH;			
			}
			return returnArray;
		}
		
		function createEvenRow(col, row, currentXValue, currentYValue, sideLength, existingPoints) {
			var returnPoints = new Array(6);
            if (row > 0) { //if not top row, share pts 0,5 with cell above.
                returnPoints[0] = existingPoints[col][row - 1][2];
                returnPoints[5] = existingPoints[col][row - 1][3];
            } else { //topmost row pts 0,5 not shared must be created
                returnPoints[0] = [	currentXValue + sideLength * WIDTH, 0];
                returnPoints[5] = [	currentXValue + 2 * sideLength * WIDTH,
                                    sideLength * HEIGHT ];
            }
            if (col > 0) { //if not leftmost column share pts 1,2 with cell above
                returnPoints[1] = existingPoints[col - 1][row][5];
                returnPoints[2] = existingPoints[col - 1][row][4];
            } else { //leftmost column pts 1,2 not shared must be created
                returnPoints[1] = [	currentXValue, 
									currentYValue + sideLength * HEIGHT];
                returnPoints[2] = [	currentXValue,
                                    currentYValue + sideLength + sideLength * HEIGHT];
            }
            //Pts 3,4 always created
            returnPoints[3] = 	[	currentXValue + sideLength * WIDTH,
                                    currentYValue + sideLength + 2 * sideLength * HEIGHT];
            returnPoints[4] = 	[	currentXValue + 2 * sideLength * WIDTH,
                                    currentYValue + sideLength + sideLength * HEIGHT];
			return returnPoints;
		}
		
		function createOddRow(col, row, currentXValue, currentYValue, sideLength, existingPoints) {
			var returnPoints = new Array(6);
           //share pts 0,5 with cell above.
            returnPoints[0] = existingPoints[col][row - 1][4];
            returnPoints[1] = existingPoints[col][row - 1][3];
            if (col > 0) { //if not leftmost column share pts 1,2 with cell above
                returnPoints[2] = existingPoints[col - 1][row][4];
            } else { //leftmost column pts 1,2 not shared must be created
                returnPoints[2] = [	currentXValue + sideLength * WIDTH,
									currentYValue + sideLength + sideLength * HEIGHT];
            }
            //Pts 3,4 always created
            returnPoints[3] = [	currentXValue + 2 * sideLength * WIDTH,
                                currentYValue + sideLength + 2 * sideLength * HEIGHT];
            returnPoints[4] = [	currentXValue + 3 * sideLength * WIDTH,
                                currentYValue + sideLength + sideLength * HEIGHT];
            returnPoints[5] = [	currentXValue + 3 * sideLength * WIDTH,
                                currentYValue + sideLength * HEIGHT];
			return returnPoints;
		}
		
		function drawGrid(context) {
			for (var colIndex = 0; colIndex < gridHexagons.length; colIndex++) {
				for (var rowIndex = 0; rowIndex < gridHexagons[colIndex].length; rowIndex++) {
					gridHexagons[colIndex][rowIndex].drawHexagon(context);
				}
			}
		}
				
		
        /**
          *    0
          * 1 / \ 5
          *  |   |
          * 2 \ / 4
          *    3
          */
		function findHexagonByXY(x, y) {
			var clickedHexagon = null;
			var columnCounter = columnMarkers.length - 1, rowCounter = rowMarkers.length - 1;
			for (var index = 0; index < columnMarkers.length; index++) {
				if (columnMarkers[index] > x) {
					columnCounter = index - 1;
					break;
				}
			}
			
			for (var jIndex = 0; jIndex < rowMarkers.length; jIndex++) {
				if (rowMarkers[jIndex] > y) {
					rowCounter = jIndex - 1;
					break;
				}
			}
			
			for (var colIndex = columnCounter > 0 ? columnCounter - 1 : 0; colIndex < columnCounter + 2; colIndex++) {
				for (var rowIndex = rowCounter > 0 ? rowCounter -1 : 0; rowIndex < rowCounter + 2; rowIndex++) {
					if ((colIndex < gridHexagons.length) && (rowIndex < gridHexagons[0].length)) {
						if (gridHexagons[colIndex][rowIndex].containsPoint(x,y)) {
							clickedHexagon = gridHexagons[colIndex][rowIndex];
						}
					}
				}
			}
			
			
			return clickedHexagon;
		}
		
		var drawMarkerLinesDebug = function(context) {
  			context.beginPath();
			context.lineWidth = 2;
			context.strokeStyle = "black";
			for (var index = 0; index < columnMarkers.length; index++) {
				context.moveTo(columnMarkers[index], 0);
				context.lineTo(columnMarkers[index], 480);
			}
			
			for (var jindex = 0; jindex < rowMarkers.length; jindex++) {
				context.moveTo(0, rowMarkers[jindex]);
				context.lineTo(800, rowMarkers[jindex]);
			}
			context.stroke();
		}		
		
		return {
			drawGrid : function(context) {
				drawGrid(context);
			},
						
			getHexagon : function(identifier) {
			},
			
			drawMarkerLines : function(context) {
				drawMarkerLinesDebug(context);
			},
			
			findHexagon : function(x, y) {
				return findHexagonByXY(x,y);
			}
		};
	}
	
	return {	
		createHexagonGrid : function( numberColumns, numberRows, length) {
			return ClassHexagonGrid(numberColumns, numberRows, length);
		},
		
        areAdjacent : function(firstHex, secondHex) {
			if ((firstHex === null) || (secondHex === null)) return false;
            var returnValue = true;
            var firstColumn = firstHex.getColumn();
            var secondColumn = secondHex.getColumn();
            var firstRow = firstHex.getRow();
            var secondRow = secondHex.getRow();
            var rowDelta = Math.abs(firstRow - secondRow);
            var columnDelta = Math.abs(firstColumn - secondColumn);
            if ((rowDelta == 0) && (columnDelta == 0)) {
                returnValue = false;  //identical
            } else if ((rowDelta > 1) || (columnDelta > 1)) {
                returnValue = false;
            } else if ((rowDelta == 0) || (columnDelta == 0)) {
                //do nothing simplifies following expressions
            } else if ((firstRow % 2 == 0) && (firstColumn < secondColumn)) {
                returnValue = false;
            } else if ((firstRow % 2 == 1) && (firstColumn > secondColumn)) {
                returnValue = false;
            }
            return returnValue;
        }		
		
	}
});