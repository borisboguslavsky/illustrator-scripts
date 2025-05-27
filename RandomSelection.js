/**
Script © 2022 Boris Boguslavsky
https://github.com/borisboguslavsky

Based on the Random Selection Functionality from the Randomill Illustrator Plugin
https://randomill.com/

It may take some time to run the script on large sets of objects. 
This is because of the fact that the core of this script works by flipping 
the `.selected` flag of objects within Illustrator via ExtendScript. 
This necessarily means that Illustrator redraws the whole screen every time a 
single object has its `.selected` flag modified. It's an unfortunate limitation 
of how Adobe has implemented this particular feature within ExtendScript. 

This script is a stripped-down version of Randomill's (https://randomill.com/) 
random select function.

The main difference between the two is that the full version of this 
function within Randomill has an 'experimental' fast-select mode that 
circumvents the above speed limitation by creating an executing an action 
dynamically instead of iterating over objects and flipping their `.selected` 
flags. This means that random selection can happen almost instantaneously, 
regardless of how large the initial set of objects is.

Feel free to modify this script as you see fit. I hope you find it useful.
*/

/**
 * PANEL UI
 */
var mainPanelWindow = new Window(
	"dialog",
	"Random Selection \u00A9 randomill.com",
	undefined
)
mainPanelWindow.orientation = "column"
mainPanelWindow.alignChildren = ["fill", "fill"]
// Radios for selection method
var selectionMethodSelect = mainPanelWindow.add(
	"panel",
	undefined,
	"Selection Method:"
)
selectionMethodSelect.orientation = "column"
selectionMethodSelect.alignChildren = ["fill", "fill"]
var selMethodPercentageRadio = selectionMethodSelect.add(
	"radiobutton",
	undefined,
	"Percentage"
)
var selMethodCountRadio = selectionMethodSelect.add(
	"radiobutton",
	undefined,
	"Count"
)
selMethodPercentageRadio.value = true // percentage method is selected by default
// Text field for entering desired value
var valueInputTextField = mainPanelWindow.add("panel", undefined, "Value:")
valueInputTextField.orientation = "row"
valueInputTextField.alignChildren = ["fill", "fill"]
var selectionValue = valueInputTextField.add("edittext", undefined, 50)
// selectionValue.minimumSize = [1, undefined];
// selectionValue.active = true;
// OK and Cancel Buttons
var cancelAndOkButtons = mainPanelWindow.add("group")
cancelAndOkButtons.alignChildren = ["fill", "fill"]
cancelAndOkButtons.margins = [0, 0, 0, 0]
var cancel = cancelAndOkButtons.add("button", undefined, "Cancel")
cancel.helpTip = "Press Esc to Close"
cancel.onClick = function () {
	mainPanelWindow.close()
}
var ok = cancelAndOkButtons.add("button", undefined, "OK")
ok.helpTip = "Press Enter to Run"
ok.onClick = function () {
	randomizeSelection()
	mainPanelWindow.close()
}
ok.active = true

/**
 * MAIN
 */
function randomizeSelection() {
	// Ensure there's an active document
	if (app.documents.length === 0) {
		alert("Error: No currently active document.")
		mainPanelWindow.close()
		return
	}

	var objects = app.activeDocument.selection

	// Ensure there's at least two objects in the selection
	if (objects.length < 2) {
		alert(
			"Error: Please select at least two items. If more than two items are selected, make sure they're ungrouped."
		)
		return
	}

	// Establish the selection method
	var selectionMethod = selMethodPercentageRadio.value ? "percentage" : "count"

	// Make sure the entered value is valid
	var value = parseFloat(selectionValue.text)
	if (isNaN(value)) {
		alert("Error: Could not parse entered value.")
		return
	}

	// Determine the number of objects that should end up selected
	var numberOfObjectsInFinalSelection = calculateNumberOfObjectsToSelect(
		objects.length,
		selectionMethod,
		value
	)

	// If the number of objects calculated ends up being zero, deslect everything
	if (numberOfObjectsInFinalSelection <= 0) {
		app.activeDocument.selection = []
		return
	}

	// If the number of objects to select is somehow greater than the selection length, just return
	if (numberOfObjectsInFinalSelection >= objects.length) {
		return
	}

	// Determine whether the most efficient way is to select objects starting from an empty array,
	// or to deslect objects from the currently selected object array
	var whatToDo = selectOrDeselect(
		objects.length,
		numberOfObjectsInFinalSelection
	)
	var deselect = whatToDo.deselect

	// How many objects must be either selected or deselected?
	var howManyTimes = whatToDo.number

	// Create a randomized array of indices with the length of the current selection
	var selectionIndexList = randomizedIndexListFischerYates(objects.length)

	// If selecting instead of deselecting, start with an empty array
	if (!deselect) app.activeDocument.selection = []

	// Set selection by modifying each object's 'selected' attribute
	for (i = 0; i < howManyTimes; i++) {
		var j = selectionIndexList[i]
		if (objects[j] !== undefined) {
			objects[j].selected = !deselect
		}
	}

	return
}

/**
 * HELPERS
 */
function calculateNumberOfObjectsToSelect(
	selectionLength,
	selectionMethod,
	value
) {
	var numberOfObjectsToSelect =
		selectionMethod === "percentage"
			? Math.round((selectionLength * value) / 100)
			: value

	$.writeln("	Number of objects to select: " + numberOfObjectsToSelect)

	if (numberOfObjectsToSelect <= 0) return 0
	if (numberOfObjectsToSelect >= selectionLength) return selectionLength

	return numberOfObjectsToSelect
}

function selectOrDeselect(selectionLength, numObjToSelect) {
	var deselect = false
	var modeTippingPoint = 0.6
	var remainingSelectionPercentage = numObjToSelect / selectionLength
	if (remainingSelectionPercentage <= modeTippingPoint) {
		// Select
		var numberOfItemsToOperateOn = numObjToSelect
		$.writeln("	Select " + numberOfItemsToOperateOn + " objects")
	} else {
		// Deselect
		var numberOfItemsToOperateOn = selectionLength - numObjToSelect
		deselect = true
		$.writeln("	Deselect " + numberOfItemsToOperateOn + " objects")
	}

	return { deselect: deselect, number: numberOfItemsToOperateOn }
}

function shuffleArray(array) {
	var curId = array.length
	// There remain elements to shuffle
	while (0 !== curId) {
		// Pick a remaining element
		var randId = Math.floor(Math.random() * curId)
		curId -= 1
		// Swap it with the current element.
		var tmp = array[curId]
		array[curId] = array[randId]
		array[randId] = tmp
	}
	return array
}

function randomizedIndexListFischerYates(length) {
	// Create an unshuffled array
	var randomizedArray = new Array()
	for (var i = 0; i < length; i++) {
		randomizedArray.push(i)
	}
	// Shuffle the array using fischer-yates
	return shuffleArray(randomizedArray)
}

mainPanelWindow.center()
mainPanelWindow.show()
