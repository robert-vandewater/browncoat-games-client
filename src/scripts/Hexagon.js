define(["./Settings"],function(settings) {	
	
	var counter = 0;
	
	var TANGENT_TEST_VALUE = Math.tan(Math.PI / 6);
	
       /**
          *    0
          * 1 / \ 5
          *  |   |
          * 2 \ / 4
          *    3
          */
	var ClassHexagon = function(col, row, gridPoints) {
		var hexagonIdentifier = col + "," + row;		
		
		var pathOfHex = function(context) {
			context.moveTo(gridPoints[0][0], gridPoints[0][1]);
			var currentX, currentY;
			for (var index = 1; index < gridPoints.length; index++) {
				currentX = gridPoints[index][0];
				currentY = gridPoints[index][1];
				context.lineTo(currentX, currentY);
			}				
			context.closePath();	
		}
		
		var outsideOuter = function(x,y) {
			if ((x < gridPoints[1][0]) || (x > gridPoints[5][0])) {
				return true;
			} else if (( y < gridPoints[0][1]) || (y > gridPoints[3][1])) {
				return true;
			}
			return false;
		}
		
		//Already performed the outside box test.  The inner box and outer box have same x boundaries
		var outsideInner = function(x,y) {
			if (( y < gridPoints[1][1]) || (y > gridPoints[2][1])) {
				return true;
			}
			return false;
		}
		

		//If outside outerbox return false
		//If inside innerbox return true
		//If in between do tangent test
		//Tangent test : for a line with a positive slope and points at origin and X,Y
		// Pt a is below the line if ya/xa < Y / X
		var containsPoint = function(x,y) {
			if (outsideOuter(x,y)) return false;
			if (!outsideInner(x,y)) return true;

			var testValue;
			var xterm,yterm;
			if (y < gridPoints[1][1]) {
				if (x < gridPoints[0][0]) {
					yterm = (gridPoints[1][1] - y);
					xterm = (x - gridPoints[1][0]);
				} else {
					yterm = (gridPoints[1][1] - y);
					xterm = Math.abs(x - gridPoints[5][0]);
				}
				testValue = yterm / xterm;
				return testValue <= TANGENT_TEST_VALUE;
			} else {
				if (x < gridPoints[0][0]) {
					testValue = (gridPoints[3][1] - y) / Math.abs(x - gridPoints[3][0]);
				} else {
					testValue = (gridPoints[3][1] - y) / (x - gridPoints[3][0] );
				}
				return testValue >= TANGENT_TEST_VALUE;
			}
		}
		
		var clearHexForDrawing = function(context) {
			var height = gridPoints[3][1] - gridPoints[0][1];
			var width = gridPoints[4][0] - gridPoints[2][0];
			context.clearRect(gridPoints[2][0], gridPoints[0][1], width, height);
		}

		var drawText = function(context) {
			context.font = "20pt";
	        context.fillText(col + " " + row, gridPoints[1][0] + 10, gridPoints[1][1] + 10);
		}
				
		return {
			getHexagonIdentifier : function() {
				return hexagonIdentifier;
			},
			
			getRow : function() {
				return row;
			},
			
			getColumn : function() {
				return col;
			},
			
			containsPoint : function(x,y) {
				return containsPoint(x,y);
			},
			
			clearHex : function(context) {
				clearHexForDrawing(context);
			},
			
			drawHexagon : function(context) {
				context.beginPath();
				pathOfHex(context);
				context.lineWidth = settings.getLineWidth();
				context.strokeStyle = settings.getStrokeStyle();
				context.stroke();
			},
			
			fillHexagon : function(context, color) {
				context.beginPath();
				pathOfHex(context);
				context.fillStyle = color;
				context.fill();
			}
		};
	}
	
	return {
		createHexagon : function(col,row, gridPoints) {
			return ClassHexagon(col, row, gridPoints);
		}
	}
});