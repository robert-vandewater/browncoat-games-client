define(function() {

	var loadImage = function(imagePath, context) {
        var imageObj = new Image();

        imageObj.onload = function() {
			context.drawImage(imageObj, 0, 0,800,460);
        };
        imageObj.src = imagePath;
	}

	return {
		loadLayerImage : function(imagePath, context) {
			loadImage(imagePath, context);
		}
	}
});