requirejs.config({
	shim : {
		"jquery-ui-1.8.23.custom.min" : ["jquery"],
	}
	
	
});


// Start the main app logic.
requirejs(["jquery-ui-1.8.23.custom.min"],
function   (jquerycustom) {
	require(["../combatSimScripts/BattleEditorMain"], function(application) {
		application.initializeApplication();
	});
});