/**
Script © 2025 Boris Boguslavsky
https://github.com/borisboguslavsky

Based on the Random Color Functionality from the Randomill Illustrator Plugin
https://randomill.com/

Feel free to modify this script as you see fit. I hope you find it useful.
*/

/**
 * PANEL UI
 */
var mainPanelWindow = new Window(
	"dialog",
	"Random Color \u00A9 randomill.com",
	undefined
)
mainPanelWindow.orientation = "column"
mainPanelWindow.alignChildren = ["fill", "fill"]

// radios for fill method
var fillMethodSelect = mainPanelWindow.add("panel", undefined, "Apply to:")
fillMethodSelect.orientation = "column"
fillMethodSelect.alignChildren = ["fill", "fill"]
var fillMethodFillsOnly = fillMethodSelect.add(
	"radiobutton",
	undefined,
	"Fills"
)
var fillMethodStrokesOnly = fillMethodSelect.add(
	"radiobutton",
	undefined,
	"Stroke"
)
fillMethodFillsOnly.value = true

// checkboxes for options
var optionsGroup = mainPanelWindow.add("panel", undefined, "Options:")
optionsGroup.orientation = "column"
optionsGroup.alignChildren = ["fill", "fill"]
var randomizeWithinGroups = optionsGroup.add(
	"checkbox",
	undefined,
	"Randomize Within Groups"
)
randomizeWithinGroups.value = true

// ok and Cancel Buttons
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
	try {
		randomizeColorsFromSwatch()
	} catch (err) {
		alert("Error: \n" + err.message)
	}
	mainPanelWindow.close()
}
ok.active = true

/**
 * MAIN
 */
function randomizeColorsFromSwatch() {
	// ensure there's an active document
	if (app.documents.length === 0) {
		alert("No currently active document.")
		return
	}

	var objects = app.activeDocument.selection

	// ensure there's at least one object selected
	if (objects.length < 1) {
		alert("No objects selected. Select at least one object.")
		mainPanelWindow.close()
		return
	}

	var swatches = app.activeDocument.swatches.getSelected()

	if (!swatches || swatches.length === 0) {
		alert(
			"Error: No currently selected swatches. Select objects first, then select swatches."
		)
		mainPanelWindow.close()
		return
	}

	// establish the fill method
	var fillOrStroke =
		fillMethodFillsOnly.value === true ? "fillColor" : "strokeColor"

	// flag to display alert if some objects are unable to be processed
	var someObjectsNotPathItems = false

	// apply swatches randomly to the selected objects
	for (i = 0; i < objects.length; i++) {
		var item = objects[i]

		// objects must be either PathItem or CompoundPathItem
		if (
			item.typename !== "PathItem" &&
			item.typename !== "CompoundPathItem" &&
			item.typename !== "GroupItem" &&
			item.typename !== "TextFrame"
		) {
			someObjectsNotPathItems = true
			continue
		}

		setColorProperty(
			item,
			swatches,
			randomizeWithinGroups.value === true,
			fillOrStroke
		)
	}

	if (someObjectsNotPathItems) {
		alert(
			"Color randomization was not able to be applied to some objects.\nOnly select groups, path items, or compound path items.\nPlease select valid objects.\n" +
				item.typename
		)
	}
}

function getRandomColor(swatches) {
	var index = Math.round(Math.random() * (swatches.length - 1))
	var color = swatches[index].color
	return color
}

/**
 * HELPERS
 */
function setColorProperty(item, swatches, separateGroups, fillOrStroke) {
	if (item.typename == "PathItem") {
		item[fillOrStroke] = getRandomColor(swatches)
		return
	}
	if (item.typename == "CompoundPathItem") {
		item.pathItems[0][fillOrStroke] = getRandomColor(swatches)
		return
	}
	if (item.typename == "TextFrame") {
		item.textRange.characterAttributes[fillOrStroke] = getRandomColor(swatches)
		return
	}
	if (item.typename == "GroupItem") {
		var groupItemTypes = ["pathItems", "compoundPathItems"]
		// if separateGroups is true, we want to apply a random color to each path item
		// if not, we want the same color to be applied to all items in the group
		var randomSwatchIndex = Math.round(Math.random() * (swatches.length - 1))
		var newSwatches = separateGroups ? swatches : [swatches[randomSwatchIndex]]
		for (var i = 0; i < groupItemTypes.length; i++) {
			if (item[groupItemTypes[i]].length > 0) {
				for (var j = 0; j < item[groupItemTypes[i]].length; j++) {
					setColorProperty(
						item[groupItemTypes[i]][j],
						newSwatches,
						separateGroups,
						fillOrStroke
					)
				}
			}
		}
		return
	}
	return
}

// show script UI when script is run
mainPanelWindow.center()
mainPanelWindow.show()
