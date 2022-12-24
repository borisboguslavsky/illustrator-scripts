/**
Script © 2022 Boris Boguslavsky
https://github.com/borisboguslavsky

Based on the Random Layer Order Functionality from the Randomill Illustrator Plugin
https://randomill.com/

Feel free to modify this script as you see fit. I hope you find it useful.
*/

// ########     ###    ##    ## ######## ##          ##     ## ####
// ##     ##   ## ##   ###   ## ##       ##          ##     ##  ##
// ##     ##  ##   ##  ####  ## ##       ##          ##     ##  ##
// ########  ##     ## ## ## ## ######   ##          ##     ##  ##
// ##        ######### ##  #### ##       ##          ##     ##  ##
// ##        ##     ## ##   ### ##       ##          ##     ##  ##
// ##        ##     ## ##    ## ######## ########     #######  ####
var mainPanelWindow = new Window('dialog', 'Random Order \u00A9 randomill.com', undefined);
	mainPanelWindow.orientation = 'column';
	mainPanelWindow.alignChildren = ['fill', 'fill'];
// Radios for selection method
var optionsGroup = mainPanelWindow.add('panel', undefined, 'Options:');
	optionsGroup.orientation = 'column';
	optionsGroup.alignChildren = ['fill', 'fill'];
	var respectParentLayers = optionsGroup.add('checkbox', undefined, 'Respect Parent Layers');
			respectParentLayers.value = true;
var cancelAndOkButtons = mainPanelWindow.add('group');
	cancelAndOkButtons.alignChildren = ['fill', 'fill'];
	cancelAndOkButtons.margins = [0, 0, 0, 0];
	var cancel = cancelAndOkButtons.add('button', undefined, 'Cancel');
		cancel.helpTip = 'Press Esc to Close';
		cancel.onClick = function () { 
			mainPanelWindow.close(); 
		}
	var ok = cancelAndOkButtons.add('button', undefined, 'OK');
		ok.helpTip = 'Press Enter to Run';
		ok.onClick = function () {
			try {
				randomizeLayerOrder();
			} catch(err) {
				alert(err)
			}
			mainPanelWindow.close();
		}
		ok.active = true;


// ##     ##    ###    #### ##    ##
// ###   ###   ## ##    ##  ###   ##
// #### ####  ##   ##   ##  ####  ##
// ## ### ## ##     ##  ##  ## ## ##
// ##     ## #########  ##  ##  ####
// ##     ## ##     ##  ##  ##   ###
// ##     ## ##     ## #### ##    ##
function randomizeLayerOrder(objects) {
	// Error Checks
	if (app.documents.length === 0) {
		alert("Error: No currently active document.");
		return;
	}

	var objects = app.activeDocument.selection;

	if (objects.length < 2) {
		alert("Error: Please select at least two items. If more than two items are selected, make sure they're ungrouped.");
		return;
	}

	if (respectParentLayers.value) {
		shuffleLayersRespectParents(objects)
	} else {
		shuffleLayers(objects)
	}

	return;

}

function shuffleLayers(objects) {
	var shuffled = shuffleArray(objects)
	var loopLength = objects.length%2===0 ? objects.length / 2 : Math.floor(objects.length / 2) + 1
	for (var i=0; i < loopLength; i++) {
		var a = shuffled[i*2]
		var b = shuffled[(i*2)+1]
		if (!b) {
			b = shuffled[0]
		}
		swapTwoLayers(a, b)
	}
}

function shuffleLayersRespectParents(objects) {
	// There must be at least two objects
	if (objects.length < 2) return;
	// Create a dictionary of arrays of all the objects where each array represents a parent layer
	var separatedObjects = collectObjectsByParentLayers(objects);
	// Get the keys for that dictionary (will be the absoluteZOrderPosition) of each parent layer
	var separatedParentLayers = getKeys(separatedObjects)
	// For every parent layer in the dictionary
	for (var i=0; i < separatedParentLayers.length; i++) {
		// Arrange all the objects in order for that parent layer
		shuffleLayers(separatedObjects[separatedParentLayers[i]])
	};
}


// ##     ## ######## ##       ########  ######## ########   ######
// ##     ## ##       ##       ##     ## ##       ##     ## ##    ##
// ##     ## ##       ##       ##     ## ##       ##     ## ##
// ######### ######   ##       ########  ######   ########   ######
// ##     ## ##       ##       ##        ##       ##   ##         ##
// ##     ## ##       ##       ##        ##       ##    ##  ##    ##
// ##     ## ######## ######## ##        ######## ##     ##  ######
function swapTwoLayers(a, b) {
	/*
	Swaps the layer stack position of two objects
	Currently relies on a temporary object to retain the position of the first object that has to be moved
	*/
	var temp = b.duplicate(b)
	b.move(a, ElementPlacement.PLACEBEFORE)
	a.move(temp, ElementPlacement.PLACEAFTER)
	temp.remove()
}

function collectObjectsByParentLayers(objects) {
	/*
	Takes a collection of objects, and subdivides them into arrays based on their parent layers.
	The function returns a dictionary of arrays containing objects that are within the same parent layer.
	The dictionary keys are the parent layers' `absoluteZOrderPosition` values.
	*/
	var objects = app.activeDocument.selection;
	var topArr = new Object();
	// For each object
	for (var i=0; i < objects.length; i++) {
		// Make sure that the topArr has an entry for the parent layer of the object
		if (!topArr[objects[i].layer.absoluteZOrderPosition]) topArr[objects[i].layer.absoluteZOrderPosition] = new Array();
		// Push that object to the parent layer array
		topArr[objects[i].layer.absoluteZOrderPosition].push(objects[i])
	}
	return topArr;
}

function getKeys(obj) {
	if (Object(obj) !== obj) {
		throw new TypeError('Object.keys can only be called on Objects.');
	}
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var result = [];
	for (var prop in obj) {
		if (hasOwnProperty.call(obj, prop)) {
			result.push(prop);
		}
	}
	return result;
};

function shuffleArray(array) {
	var curId = array.length;
	// There remain elements to shuffle
	while (0 !== curId) {
		// Pick a remaining element
		var randId = Math.floor(Math.random() * curId);
		curId -= 1;
		// Swap it with the current element.
		var tmp = array[curId];
		array[curId] = array[randId];
		array[randId] = tmp;
	}
	return array;
}

// Show script UI when script is run
mainPanelWindow.center();
mainPanelWindow.show();