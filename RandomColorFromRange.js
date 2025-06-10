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
var mainPanelWindow = new Window("dialog", "Random Color (Range) \u00A9 randomill.com", undefined)
mainPanelWindow.orientation = "column"
mainPanelWindow.alignChildren = ["fill", "fill"]

// radios for fill method
var fillMethodSelect = mainPanelWindow.add("panel", undefined, "Apply to:")
fillMethodSelect.orientation = "column"
fillMethodSelect.alignChildren = ["fill", "fill"]
var fillMethodFillsOnly = fillMethodSelect.add("radiobutton", undefined, "Fills")
var fillMethodStrokesOnly = fillMethodSelect.add("radiobutton", undefined, "Stroke")
fillMethodFillsOnly.value = true

// mode tabs
var modeTabPanel = mainPanelWindow.add("tabbedpanel")
modeTabPanel.alignChildren = ["fill", "fill"]
var hslTab = modeTabPanel.add("tab", undefined, "HSL")
hslTab.alignChildren = "left"
var rgbTab = modeTabPanel.add("tab", undefined, "RGB")
rgbTab.alignChildren = "left"
var cmykTab = modeTabPanel.add("tab", undefined, "CMYK")
cmykTab.alignChildren = "left"

// hsl fields
var hslFields = hslTab.add("group")
hslFields.orientation = "column"
hslFields.alignChildren = ["fill", "fill"]
var hueFieldLabel = hslFields.add("statictext", undefined, "Hue min/max [0-360]:")
var hueMinMaxGroup = hslFields.add("group")
hueMinMaxGroup.orientation = "row"
var hueMin = hueMinMaxGroup.add("edittext", undefined, "0")
var hueMax = hueMinMaxGroup.add("edittext", undefined, "360")
var saturationFieldLabel = hslFields.add("statictext", undefined, "Saturation min/max [0-100]:")
var saturationMinMaxGroup = hslFields.add("group")
saturationMinMaxGroup.orientation = "row"
var saturationMin = saturationMinMaxGroup.add("edittext", undefined, "0")
var saturationMax = saturationMinMaxGroup.add("edittext", undefined, "100")
var lightnessFieldLabel = hslFields.add("statictext", undefined, "Lightness min/max [0-100]:")
var lightnessMinMaxGroup = hslFields.add("group")
lightnessMinMaxGroup.orientation = "row"
var lightnessMin = lightnessMinMaxGroup.add("edittext", undefined, "0")
var lightnessMax = lightnessMinMaxGroup.add("edittext", undefined, "100")

// rgb fields
var rgbFields = rgbTab.add("group")
rgbFields.orientation = "column"
rgbFields.alignChildren = ["fill", "fill"]
var redFieldLabel = rgbFields.add("statictext", undefined, "Red min/max [0-255]:")
var redMinMaxGroup = rgbFields.add("group")
redMinMaxGroup.orientation = "row"
var redMin = redMinMaxGroup.add("edittext", undefined, "0")
var redMax = redMinMaxGroup.add("edittext", undefined, "255")
var greenFieldLabel = rgbFields.add("statictext", undefined, "Green min/max [0-255]:")
var greenMinMaxGroup = rgbFields.add("group")
greenMinMaxGroup.orientation = "row"
var greenMin = greenMinMaxGroup.add("edittext", undefined, "0")
var greenMax = greenMinMaxGroup.add("edittext", undefined, "255")
var blueFieldLabel = rgbFields.add("statictext", undefined, "Blue min/max [0-255]:")
var blueMinMaxGroup = rgbFields.add("group")
blueMinMaxGroup.orientation = "row"
var blueMin = blueMinMaxGroup.add("edittext", undefined, "0")
var blueMax = blueMinMaxGroup.add("edittext", undefined, "255")

// cmyk fields
var cmykFields = cmykTab.add("group")
cmykFields.orientation = "column"
cmykFields.alignChildren = ["fill", "fill"]
var cyanFieldLabel = cmykFields.add("statictext", undefined, "Cyan min/max [0-100]:")
var cyanMinMaxGroup = cmykFields.add("group")
cyanMinMaxGroup.orientation = "row"
var cyanMin = cyanMinMaxGroup.add("edittext", undefined, "0")
var cyanMax = cyanMinMaxGroup.add("edittext", undefined, "100")
var magentaFieldLabel = cmykFields.add("statictext", undefined, "Magenta min/max [0-100]:")
var magentaMinMaxGroup = cmykFields.add("group")
magentaMinMaxGroup.orientation = "row"
var magentaMin = magentaMinMaxGroup.add("edittext", undefined, "0")
var magentaMax = magentaMinMaxGroup.add("edittext", undefined, "100")
var yellowFieldLabel = cmykFields.add("statictext", undefined, "Yellow min/max [0-100]:")
var yellowMinMaxGroup = cmykFields.add("group")
yellowMinMaxGroup.orientation = "row"
var yellowMin = yellowMinMaxGroup.add("edittext", undefined, "0")
var yellowMax = yellowMinMaxGroup.add("edittext", undefined, "100")
var blackFieldLabel = cmykFields.add("statictext", undefined, "Black min/max [0-100]:")
var blackMinMaxGroup = cmykFields.add("group")
blackMinMaxGroup.orientation = "row"
var blackMin = blackMinMaxGroup.add("edittext", undefined, "0")
var blackMax = blackMinMaxGroup.add("edittext", undefined, "100")

var fieldsAndConstraints = [
	[hueMin, [0, 360]],
	[hueMax, [0, 360]],
	[saturationMin, [0, 100]],
	[saturationMax, [0, 100]],
	[lightnessMin, [0, 100]],
	[lightnessMax, [0, 100]],
	[redMin, [0, 255]],
	[redMax, [0, 255]],
	[greenMin, [0, 255]],
	[greenMax, [0, 255]],
	[blueMin, [0, 255]],
	[blueMax, [0, 255]],
	[cyanMin, [0, 100]],
	[cyanMax, [0, 100]],
	[magentaMin, [0, 100]],
	[magentaMax, [0, 100]],
	[yellowMin, [0, 100]],
	[yellowMax, [0, 100]],
	[blackMin, [0, 100]],
	[blackMax, [0, 100]]
]
var getOnChange = function (min, max) {
	return function () {
		this.text = this.text.replace(/[^0-9]/g, "")
		if (this.text.length > 3) {
			this.text = this.text.slice(0, 3)
		}
		if (this.text !== "" && parseInt(this.text) < min) {
			this.text = min.toString()
		}
		if (this.text !== "" && parseInt(this.text) > max) {
			this.text = max.toString()
		}
		if (this.text === "") {
			this.text = "0"
		}
	}
}
for (var i = 0; i < fieldsAndConstraints.length; i++) {
	var field = fieldsAndConstraints[i][0]
	var constraints = fieldsAndConstraints[i][1]
	var min = constraints[0]
	var max = constraints[1]
	field.characters = 10
	// add event listener to each field to ensure only numbers are entered
	// and all entered numbers are within the specified range
	field.onChanging = getOnChange(min, max)
}

// checkboxes for options
var optionsGroup = mainPanelWindow.add("panel", undefined, "Options:")
optionsGroup.orientation = "column"
optionsGroup.alignChildren = ["fill", "fill"]
var randomizeWithinGroups = optionsGroup.add("checkbox", undefined, "Randomize Within Groups")
randomizeWithinGroups.value = true

// close and apply buttons
var closeAndApplyButtons = mainPanelWindow.add("group")
closeAndApplyButtons.alignChildren = ["fill", "fill"]
closeAndApplyButtons.margins = [0, 0, 0, 0]
var close = closeAndApplyButtons.add("button", undefined, "Close")
close.onClick = function () {
	mainPanelWindow.close()
}
var apply = closeAndApplyButtons.add("button", undefined, "Apply")
apply.onClick = function () {
	try {
		randomizeColorsFromRange(modeTabPanel.selection.text)
		app.redraw()
	} catch (err) {
		alert("Error: \n" + err.message)
	}
}
apply.active = true

/**
 * MAIN
 */
function randomizeColorsFromRange(colorMode) {
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

	var hMin = parseFloat(hueMin.text)
	var hMax = parseFloat(hueMax.text)
	var sMin = parseFloat(saturationMin.text)
	var sMax = parseFloat(saturationMax.text)
	var lMin = parseFloat(lightnessMin.text)
	var lMax = parseFloat(lightnessMax.text)
	var rMin = parseInt(redMin.text)
	var rMax = parseInt(redMax.text)
	var gMin = parseInt(greenMin.text)
	var gMax = parseInt(greenMax.text)
	var bMin = parseInt(blueMin.text)
	var bMax = parseInt(blueMax.text)
	var cMin = parseFloat(cyanMin.text)
	var cMax = parseFloat(cyanMax.text)
	var mMin = parseFloat(magentaMin.text)
	var mMax = parseFloat(magentaMax.text)
	var yMin = parseFloat(yellowMin.text)
	var yMax = parseFloat(yellowMax.text)
	var kMin = parseFloat(blackMin.text)
	var kMax = parseFloat(blackMax.text)

	// generate colors
	var generatorFn = function () {
		alert("Error: Could not generate a new color. Check the input values.")
	}
	if (colorMode === "HSL") {
		generatorFn = function () {
			return generateRandomHSLColor(hMin, hMax, sMin, sMax, lMin, lMax)
		}
	} else if (colorMode === "RGB") {
		generatorFn = function () {
			return generateRandomRGBColor(rMin, rMax, gMin, gMax, bMin, bMax)
		}
	} else if (colorMode === "CMYK") {
		generatorFn = function () {
			return generateRandomCMYKColor(cMin, cMax, mMin, mMax, yMin, yMax, kMin, kMax)
		}
	}

	// establish the fill method
	var fillOrStroke = fillMethodFillsOnly.value === true ? "fillColor" : "strokeColor"

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

		setColorProperty(item, generatorFn, randomizeWithinGroups.value === true, fillOrStroke)
	}

	if (someObjectsNotPathItems) {
		alert(
			"Color randomization was not able to be applied to some objects.\nOnly select groups, path items, or compound path items.\nPlease select valid objects.\n" +
				item.typename
		)
	}
}

/**
 * HELPERS
 */

function generateRandomHSLColor(hueMin, hueMax, satMin, satMax, briMin, briMax) {
	var h = getRandomFloatFromRange(hueMin, hueMax, 2)
	var s = getRandomFloatFromRange(satMin, satMax, 2)
	var l = getRandomFloatFromRange(briMin, briMax, 2)
	var converted = convertHSLtoRGB(h, s, l)
	var newColor = new RGBColor()
	newColor.red = converted[0]
	newColor.green = converted[1]
	newColor.blue = converted[2]
	return newColor
}

function generateRandomRGBColor(rMin, rMax, gMin, gMax, bMin, bMax) {
	var r = getRandomIntFromRange(rMin, rMax)
	var g = getRandomIntFromRange(gMin, gMax)
	var b = getRandomIntFromRange(bMin, bMax)
	var newColor = new RGBColor()
	newColor.red = r
	newColor.green = g
	newColor.blue = b
	return newColor
}

function generateRandomCMYKColor(cMin, cMax, mMin, mMax, yMin, yMax, kMin, kMax) {
	var c = getRandomFloatFromRange(cMin, cMax, 2)
	var m = getRandomFloatFromRange(mMin, mMax, 2)
	var y = getRandomFloatFromRange(yMin, yMax, 2)
	var k = getRandomFloatFromRange(kMin, kMax, 2)
	var newColor = new CMYKColor()
	newColor.cyan = c
	newColor.magenta = m
	newColor.yellow = y
	newColor.black = k
	return newColor
}

function setColorProperty(item, generatorFn, separateGroups, fillOrStroke) {
	if (item.typename == "PathItem") {
		var newColor = generatorFn()
		item[fillOrStroke] = newColor
		return
	}
	if (item.typename == "CompoundPathItem") {
		var newColor = generatorFn()
		item.pathItems[0][fillOrStroke] = newColor
		return
	}
	if (item.typename == "TextFrame") {
		var newColor = generatorFn()
		item.textRange.characterAttributes[fillOrStroke] = newColor
		return
	}
	if (item.typename == "GroupItem") {
		var groupItemTypes = ["pathItems", "compoundPathItems", "textFrames"]
		var singleColor = generatorFn()
		var newGeneratorFn = separateGroups
			? generatorFn
			: function () {
					return singleColor
				}
		for (var i = 0; i < groupItemTypes.length; i++) {
			if (item[groupItemTypes[i]].length > 0) {
				for (var j = 0; j < item[groupItemTypes[i]].length; j++) {
					setColorProperty(item[groupItemTypes[i]][j], newGeneratorFn, separateGroups, fillOrStroke)
				}
			}
		}
		return
	}
	return
}

// returns a random float between a min and max values with specified precision
function getRandomFloatFromRange(min, max, precision) {
	if (!precision) {
		var answer = getRandomIntFromRange(min, max)
		return answer
	}
	if (min == max) {
		return min
	}
	if (min > max) {
		var temp = min
		min = max
		max = temp
	}

	var diff = max - min
	var diffInt = Math.floor(diff)
	var randInt = getRandomIntFromRange(0, diffInt)

	if (precision) {
		if (randInt == diffInt) {
			randInt--
		}
		var diffDec = Math.floor(min + 1) - min + (max - Math.floor(max))
		if (randInt < 0 && diffDec > 1) {
			randInt++
			diffDec--
		}
		diffDec = diffDec * Math.pow(10, precision)
		var randDec = getRandomIntFromRange(0, diffDec) / Math.pow(10, precision)
	} else {
		var randDec = 0
	}

	var answer = min + randInt + randDec
	var answerTrimmed = Number(answer.toFixed(precision))
	return answerTrimmed
}

// return a random integer between the min and max
function getRandomIntFromRange(min, max) {
	if (min > max) {
		return max + parseInt(Math.random() * (min - max + 1))
	}
	if (min == max) {
		return min
	}
	return min + parseInt(Math.random() * (max - min + 1))
}

// converts HSL values to RGB
function convertHSLtoRGB(h, s, l) {
	h /= 360
	s /= 100
	l /= 100

	var r, g, b

	if (s == 0) {
		r = g = b = l // achromatic
	} else {
		function hue2rgb(p, q, t) {
			if (t < 0) t += 1
			if (t > 1) t -= 1
			if (t < 1 / 6) return p + (q - p) * 6 * t
			if (t < 1 / 2) return q
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
			return p
		}

		if (l < 0.5) {
			var q = l * (1 + s)
		} else {
			var q = l + s - l * s
		}
		var p = 2 * l - q
		r = hue2rgb(p, q, h + 1 / 3)
		g = hue2rgb(p, q, h)
		b = hue2rgb(p, q, h - 1 / 3)
	}

	r = Math.round(r * 255)
	g = Math.round(g * 255)
	b = Math.round(b * 255)

	return [r, g, b]
}

// show script UI when script is run
mainPanelWindow.center()
mainPanelWindow.show()
