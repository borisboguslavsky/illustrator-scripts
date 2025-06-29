/**
 * Script © 2025 Boris Boguslavsky
 * https://github.com/borisboguslavsky
 *
 * Based on the Random Position Functionality from the Randomill Illustrator Plugin
 * https://randomill.com/
 *
 * Feel free to modify this script as you see fit. I hope you find it useful.
 */

// dialog window
var dialog = new Window("dialog")
dialog.text = "Random Position - randomill.com"
dialog.orientation = "column"
dialog.alignChildren = ["fill", "top"]
dialog.spacing = 10
dialog.margins = 16

// x field group
var xInputGroup = dialog.add("group")
xInputGroup.orientation = "row"
xInputGroup.alignChildren = ["left", "center"]
xInputGroup.spacing = 10
xInputGroup.margins = 0
xInputGroup.alignment = ["fill", "top"]

// y field group
var yInputGroup = dialog.add("group")
yInputGroup.orientation = "row"
yInputGroup.alignChildren = ["left", "center"]
yInputGroup.spacing = 10
yInputGroup.margins = 0
yInputGroup.alignment = ["fill", "top"]

// x min field
var xMinGroup = xInputGroup.add("group")
xMinGroup.orientation = "column"
xMinGroup.alignChildren = ["fill", "center"]
xMinGroup.spacing = 10
xMinGroup.margins = 0
xMinGroup.alignment = ["left", "fill"]
var xMinLabel = xMinGroup.add("statictext")
xMinLabel.text = "X Min (pt)"
var xMinField = xMinGroup.add("edittext")
xMinField.text = "-72.00"
xMinField.preferredSize.width = 95
xMinField.onChanging = sanitizeInput

// x max field
var xMaxGroup = xInputGroup.add("group")
xMaxGroup.orientation = "column"
xMaxGroup.alignChildren = ["fill", "center"]
xMaxGroup.spacing = 10
xMaxGroup.margins = 0
xMaxGroup.alignment = ["left", "fill"]
var xMaxLabel = xMaxGroup.add("statictext")
xMaxLabel.text = "X Max (pt)"
var xMaxField = xMaxGroup.add("edittext")
xMaxField.text = "72.00"
xMaxField.preferredSize.width = 95
xMaxField.onChanging = sanitizeInput

// x step field
var xStepGroup = xInputGroup.add("group")
xStepGroup.orientation = "column"
xStepGroup.alignChildren = ["fill", "center"]
xStepGroup.spacing = 10
xStepGroup.margins = 0
xStepGroup.alignment = ["left", "fill"]
var xStepLabel = xStepGroup.add("statictext")
xStepLabel.text = "X Step (pt)"
var xStepField = xStepGroup.add("edittext")
xStepField.text = "1.00"
xStepField.preferredSize.width = 95
xStepField.onChanging = sanitizeInput

// y min field
var yMinGroup = yInputGroup.add("group")
yMinGroup.orientation = "column"
yMinGroup.alignChildren = ["fill", "center"]
yMinGroup.spacing = 10
yMinGroup.margins = 0
yMinGroup.alignment = ["left", "fill"]
var yMinLabel = yMinGroup.add("statictext")
yMinLabel.text = "Y Min (pt)"
var yMinField = yMinGroup.add("edittext")
yMinField.text = "-72.00"
yMinField.preferredSize.width = 95
yMinField.onChanging = sanitizeInput

// y max field
var yMaxGroup = yInputGroup.add("group")
yMaxGroup.orientation = "column"
yMaxGroup.alignChildren = ["fill", "center"]
yMaxGroup.spacing = 10
yMaxGroup.margins = 0
yMaxGroup.alignment = ["left", "fill"]
var yMaxLabel = yMaxGroup.add("statictext")
yMaxLabel.text = "Y Max (pt)"
var yMaxField = yMaxGroup.add("edittext")
yMaxField.text = "72.00"
yMaxField.preferredSize.width = 95
yMaxField.onChanging = sanitizeInput

// y step field
var yStepGroup = yInputGroup.add("group")
yStepGroup.orientation = "column"
yStepGroup.alignChildren = ["fill", "center"]
yStepGroup.spacing = 10
yStepGroup.margins = 0
yStepGroup.alignment = ["left", "fill"]
var yStepLabel = yStepGroup.add("statictext")
yStepLabel.text = "Y Step (pt)"
var yStepField = yStepGroup.add("edittext")
yStepField.text = "1.00"
yStepField.preferredSize.width = 95
yStepField.onChanging = sanitizeInput

// options panel
var optionsPanel = dialog.add("panel")
optionsPanel.text = "Options"
optionsPanel.orientation = "column"
optionsPanel.alignChildren = ["fill", "top"]
optionsPanel.spacing = 10
optionsPanel.margins = 12
optionsPanel.alignment = ["fill", "top"]
var randomizeWithinGroupsCheckbox = optionsPanel.add("checkbox")
randomizeWithinGroupsCheckbox.text = "Randomize Within Groups"
randomizeWithinGroupsCheckbox.value = true
var randomizeWithinCompoundPaths = optionsPanel.add("checkbox")
randomizeWithinCompoundPaths.text = "Randomize Within Compound Paths"

// footer buttons
var footerButtons = dialog.add("group")
footerButtons.orientation = "row"
footerButtons.alignChildren = ["right", "fill"]
footerButtons.spacing = 10
footerButtons.margins = 0
footerButtons.alignment = ["fill", "top"]

var upgradeBannerString =
	'\u0089PNG\r\n\x1A\n\x00\x00\x00\rIHDR\x00\x00\x00l\x00\x00\x00\x1E\b\x06\x00\x00\x00\u00C9\u008C\u00FB\x07\x00\x00\x00\x19tEXtSoftware\x00Adobe ImageReadyq\u00C9e<\x00\x00\x03viTXtXML:com.adobe.xmp\x00\x00\x00\x00\x00<?xpacket begin="\u00EF\u00BB\u00BF" id="W5M0MpCehiHzreSzNTczkc9d"?> <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 9.1-c003 79.9690a87fc, 2025/03/06-20:50:16        "> <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"> <rdf:Description rdf:about="" xmlns:xmpMM="http://ns.adobe.com/xap/1.0/mm/" xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmpMM:OriginalDocumentID="xmp.did:f3ca1607-9356-4e46-a113-d4dc1137e106" xmpMM:DocumentID="xmp.did:E19453AA465F11F0B5CAAA6CA062EF99" xmpMM:InstanceID="xmp.iid:E19453A9465F11F0B5CAAA6CA062EF99" xmp:CreatorTool="Adobe Photoshop 26.7 (Windows)"> <xmpMM:DerivedFrom stRef:instanceID="xmp.iid:fb0ab408-3b6b-dc4e-bd6f-867f11548e25" stRef:documentID="xmp.did:f3ca1607-9356-4e46-a113-d4dc1137e106"/> </rdf:Description> </rdf:RDF> </x:xmpmeta> <?xpacket end="r"?>F}h\x02\x00\x00\x10\u009CIDATx\u00DA\u00EC[\ttU\u00D5\u00B9>\u00E7\x0E\u00B97\t\x19\b&!\tsB\u00C2$\u0083 V\x1E>\x10\u00C1\tckR\x10\b\n\u0096 3\u00CDb\u00AA UQ\u00ABX\x1A\u00C0\n\u00C4\x06\x10\x19\u00C2T\n2hA\u00C6\b\u0089\u00B56$\u0080@\u0084\x00\u00C1\f\x102\u00DF\fw8S\u00FF\u00FF\u00E4\u00DF\u00D7\u009D\u00DB0\u0084\u00BE\u00C5\u00E2\u00AD\u00C5^\u00EB[7g\u009F}\u00CE\x1E\u00BE\x7F\u00DC\u00FBD\u00D44M\u00B8\x07\u00C5\b\x10\x01*\u00E1A\u00B9\u00CBb\u00B8\x07}\u0098+\u00BF\u00DA\u00D3\u00EE\u00EA\u00C2\u00DF\u00C5J\u00A57\u00DA\u00C0\u00B5\u0095\u00C8{P\u00FE\x0F\b\x13I\x1B\u00BC\b\u00A6\u00FF\u0092T|\u009Fo\u00F9\u00B6Ms\u00AA\u00F6\u00EF\u00DB\u0099\u00FBr\u00FC\u0097U\u0087\x0F\u00F5\u0086:\u009F\x07\u00A4\u00DD]1y.\u00EE\u00BA\u00B5k\u00BB\x15\x17_\u00EB B\t\b\b\u00A8\x19:lXAL\u0097\x18\x1B\u00DC\u00B3\x03\u00EA\x00\x0E\u0080r\x0B\x01\u00B0\x10!\u00BEr\u00C1%?\u00C7\u00B9\u00D3Q\u009A\u00D3\u00DE\x01oJ\x15\u0095=.\u00CD_\u00B0#|J\u00D1\u00E4\u00B0\u00D7\u00C6}\x03U\u00B5\x0FLd35\u0080\u00F3a\u00C6\u008D\u00EB7\u00F4yo\u00D1\u00A2LUU\u00CD|#\u008B\u00C5R\x11\x1C\x12r\u00A6g\u00AF\u009E{\u0097$\'\u00EF\u0080\u00EBR"P\u00E3\u00C8F\u008D\frn\u00FEp\u0088+\'c\u00A4\u00B3\u00A8\u00A8\u00AF\u00D3\u00E6\fw\u00DA\x05\u00D1\u00E5\x10\x05Y\u0086\x07\u00EADAA\u00AA\u008Df[\u00C8\u00AFG\u00CC\u00EE\u00F4\u00F6\u0082\u009DpU\r\u00B2\u00A1\u0091f\x1B\b"\u00BD[\u00F5\u00E8\u00C3\u00F3\u009EJ\u00C2\u00A3\u00FE?\u00B0d\u0086\u009B\u00CCOm\u008Eo\u00E75\u00CCX\\\\\u00D4\u00DE\u0093,,N\u00A73\u00A8\u00B0\u00A0`\x10"\u00F3D\u00C6\u00C4W\u00C7\u008F{cfR\u00D2Q\u00B8UC\x1D\u00FB\u00AA\u00DF\u00EF{X\u00DE\u0099\u00FC\u0091|\u00ED\u00DA\x13*\u0090cTE\u00C1`lXg\u00E4CU\u00F1\u00B7\u00A1\u00B5\u00EA\u0092\u00FC\x0B7n[YWp=4\u00E0\u00AD9\u00AB\u00A0\u00B6\u009E4\u00D3B\u00C4\x1B\u0088\b\u0089\u009B\b\u00D6\u0099\u0089X\u00ACs\u00E1\u00D0\b\u00D2}L\u009A\u00A7\u009B\u00F1\u00A2k\u008D\u00E6\u00C0pGsh\u00E4\u009F\u008C\x06\u00E3m\u00FDUUUU\u00CC\u00CA\x15+\u00D2\u00DE\u0098;/\x0E.\u00BD\u00D1\u00FC\u00A9_\u00FFe\u00B0\u00BAe\u00E1N\u00AD\u00A2\u00F8\t#,\u00A9\x01\u00DE\u00A2+\u008D\u00D60\\\x15\u0086\u00A1\u0092\x11E\u0085Vd\u00D04I\u00F5*9p\u00EC=\u00D9V\u00D3\u0092\x02\x11\x7F\u00C0C\x00\fL\u00DA\x02\u00C2\x01\u00C1\u00A8\u00B5\u0084`\u00AAkKm\x1E\u00A2g\u00AC\u00B4\x00\u00C2}L\u0098\u0089\u00DCD  \x14\x10Asi\u00F6\x1CLw3\x02EV|\u008E\x1F?>\x11\u00FE\u00DC\u00AFe\u00EF\u00EF\u00A0}\u009D\u0092*H\u00F6\u00D6"\x10\u0085&O\'\u0085\b2{5\u0090\u00A5\x00i.\u00A7\u00A0k\u009AN\x1C\\{\x05\x05\u009E\u00BBV]%\x13\u00F1\u00AD\x00!\x04/\u00D2\u00BAJ\u00F2\u0099\x02M\u00AA%M\x1C\u009FA\u00B3\\FZg")e\u0081\u008C\u00E6a.=\u00CD\u00AA\u00913M\x02w_\x13\u00DCb\u00E66[|\u00BD\u00EAa\u00E2n\u00D6\x1F\u00DF\x17\u00CE\u00C5\u008F\u00E6\x17\u00C4\u00CDA\u00A2\u00F1Wp\u00E3qy\u0098K\u0085\u00E0\u00EE\u009B\'L\u0095\x15\u00B9\u00FENI\u00EB\u00DA\u00B5k:\u00A8I\u0090\u00B6\u00EB\u00FDO\x04\u0097=\u008CM\u00CD`\u00D4\x04\u0083Y\x14T\u00A7(\u00A0\u00B6\u00C9\u00B2&H.\u0083 9\x1B\u0088D\u00CDS\u00804k\u00DB\u00F0\u00F4\u0087S\u0097O\u009D\u00BEdq\x1DM\x04%\u00AF#\u00F8\u00D4O\u00F1=\u00C5\u00C5\u00C5W"""\u00FEDf\x17\u008B_QQ\u00D1\u009C\u00F0\u00F0\u00F0\u008E\u00FAj\u0088\u00E2ll\u0086\u00E6\x18\u00FD M\u00D6\u00C8\u0099S\u00DEd\u00CA4i3-\u00A0\u00953M\u008CP\u0085\u0083\u0081\u0093x\u00FE\u00BE\u00CCR\x15\u00CE<\x1B\u00A8\u00DEA\u00908e@\x13\u00DF\u0082\u00B3\x1C\u00A1\u0087\x0E\x1D\u008A}\u00EA\u00A9\u00A7\x06\u00D3\x1C\u00A6\u00C1\u00CF5j\u00C3\u00CF\u0081\u008D\u00DFN`f_iD\u00D8\u00C4I\u0093\u00FE\u0095~,}\u008B\u00CDf\u008B\u0094%\u00C9[\x02\u00D4\u00D5\u00D5\u00B5S\x14\u00C5\u008B\'+((\u00E8\u00CC\u00A7\u00ABS\u00B7k\u009FM\u009D \u00D4\u0094\u00F6u\u00CB\u0092\u00DA\u00A0A\x06\u009A\u00AAh\x14U\u0083\u008FO\u00A1`\u00D7\u00AC\u0082\u00DD\x11b27\u0090\x16\u00D0\u00B3\u00EB\u00B6^\u00DB7\u00FE\u00CE`\u00B1\\\u00DB\u00B0a\u00837\u00A7am8\u00BF\u00E9M\u00D7UT\x15Hu\u00ACD\x13Y-\u0088T\u0099#A"\r\u00AD\u00A5\u00C8\u00D6\u00C9\u00E2\'\u00EE\x19_ZT\u0095\u009E\u0095\b2\u00D5{\u00FD<+\u00B7\u00CF\u00AC\u00E7\u00DEc\u00E5HsQ_6\u00CE"\u00B0\u00BEP\u00A3\u00C2\x00\x18)\u0087\u0083K\u0089\u00E0\u00E5\u009E\u00B4/\u0090\u009Ee}\u00CB4\u00EE*\u00D2@\x1B\u00F5\u00EDlDX\u00ABV\u00AD*\u00FE\u00FE\u00F5\u0081\u00A9\u009CM5efd\u00B4\u009B;{Nr\u00C9\u00F5\u00EB\u008F\u00EA\x1Ad0\u00C8\u00AFO\u009E\u00FC\u00811{o[-\u00F7\u00C4d\u00B7\u00F2\u00A3\u00F6\u00C0\x13\x064\u00870m\u00B3\u00BFo\u00BEu\u00EC\u0082\x19\u00D6\u00C1qW\u00A5I\u00A3\u00E79\u00FEuz\u00AC&\u0088J\u00D0\u00A0\u0081\u00CB\u00A3SR\u0092\u00C9\x1CH\u00B4x\u00BC\x0F\u00D3\u008B,\u00CB\x16\u00F2[L\u00D2\u0083\u00A8\u008E\u0095H2--=\x16\u0089\x11f#\u00A9\u00AD\u00E1\x16\u00DA\u0087\x16(\u0080\u00FA\u00B3p\u009A\u00E3\u00E24\u00C4\u008B\x16\u00DB\u00C0\u0091\u00C8\x16Pei\x0B\t\u009A\u0099\u009E\u00AD&\x13^\u00CB\u00F5\u00E5O\u00D6\x03IB\u00CB\x10\n\n\u00D0\u00DA\u00830\x7Fr\x03\u00B54\x16/\u00EA\x13\u00FB*!+r\u00DD\u00AD\u00ED\x18\u00D6\u00DF\x02\x18\u00F6[srrz\u00F5y\u00B8\u00E7\u008F\u0091\u00ED;hq\u00BF\u00FC\u00D5gP\u00D7S^4\u00F8\x1B9)Zc\u0090fFk\u00AE\u00E9\u00D1\u009AsZ\u00B4f\u009F\u00D6\u00BD\u00C6y(\u00EDYh\u00E7\u008B\u00C8\u009B9ej\u00F6/\x1E\u00B9qy\u00C1\x1B3\u00E1:\x18`d}\x10I\u00FF\x03H\x02\u00A4iTrssq\u00C1\u00B7\x01V\x11\u00B6a\x1D\u00BB\x0F\u00D7\x17\x01\u00DF\u00ED\u00D8\u00B1#\u008F\u00D5%&&\u009E\u00C9\u00CA\u00CA\u00AA\u00C0\u00BF\u00C1\u00A4V\u00ED\u00D9\u00B3\'\x07\u00DA\u00FC\x05\u0080\x02\u0082\u00E6\u00F5\u00D3\u00BD{\u00F7f\u00E3=l\x03m+\'L\u0098p\u008E=\x0F\u00EF\u00BA\x00m\u00F6\u00C1\u00EFEV\u00D7\u00ABW\u00AF\u00CC\u00BC\u00BC\u00BC2\u00EA\u00F3c\u00C0\u00D2\u00A4\u00A4\u00A4=\u00A7O\u009F.bm\u00CA\u00CB\u00CB\u00ED\u00BBv\u00ED:\u00D7\u00BF\x7F\u00FFMp\x7F\t\u00E0\u008F\u0080\u0095iii\u00FF`}]\u00B9rEJNNV\u00D7\u00ACY\u00A3qs@2NA\x1F\u00FF\u00C0y\u0080\u00C9\u00D7\u00E7\u0087\u00BF\u00BBw\u00EF>=p\u00E0\u00C0?\u00C3\u00FDD\u00C0 \x12P\u00FF\u00DB\x11\u00C6`\u00FD\u00FE\u009F\u00DFw\u00FA\u00C3{\u00EF?\x05\x7Fw\u0094\u00B7,\u009C%!I\f\u00BFm\u0080\x0BHs\x02i\u00AE\u00D5I\u00BF\u0087v\u0081D8\u0092\u00E3GD\u00F9\u00F1dq\u0084=\x01\u0098\x03\u00D8\u00C1&s\u00FE\u00FCy\u0094\u00E8/\x00k\b_`\x1D7Y\u0094\u00C0\u00A2\u008D\x1B7V\u00B2:\u0090^U\u00F3(\u00FB\u00F6\u00EDC)\u00FD\x16\u0090\u00B9u\u00EB\u00D6"\u00CF\u00FB\u00FC3\u009F\x7F\u00FE9Jy\u00E1\u00BAu\u00EB\u00EAY\u00DD\x0F?\u00FC\u00E0\u00E2\u00FA\u00DC\x1D\x17\x17w\u00D0n\u00B7KZ\x13\x05\x04\u00A4\x1C\u00DA\x1C\x07\u00A4C_?5\u00D5\u00A6\u00B6\u00B6\u0096\'L\u00C7\u00E5\u00CB\u0097\u00D5\u00A6\u00DA"q\x03\x06\fH\u00816\u00AF\x02\u00FA\x03Z\u00DF\u00E9\u00B6\u0093\u00A3\u00DF\u00A3\u00FD\u00F2\x17,|3C+\u00FD\u00C9[\u00CD\u00DA7[S\u009B\u00DEY2\u00B4l\u009DiN\\\u00B6\u008E\u00CB\u00D1\x14\u00FA\u00BB\u0094~\u0095f\u0086\u00C47+\u00BA\x7Fp\u00B9\\\u00BE\u00AC\x02,\u0081\x10\x13\x13#\x0F\x1D:\u00D4\x01\x12\u00AD\u00F73|\u00F8\u00F0\x10p\u00F2\u008FDGG?\u00F2\u00F2\u00CB/c(-\u00E0=h\u00E3\u0082z\u00E1\u00FA\u00F5\u00EB"g\u0086\u00F1]\x11\u00E0\u00B3\u00DD\u00BE\u00B2{\u00F7\u00EE|^\u00EA?z\u00F4\u00E8H\u00AB\u00D5j\u00AA\u00AF\u00AF\u00D7\u00A0/\f\x1C\u0084\u00CC\u00CCL\u00FDfll,\u009A\u00BF\u00DE\u00F0\u00EE\u00DE\u00D0\x17\u00A6\x1F\u00C2\u00D5\u00ABW\u00A5\u00B1c\u00C7\u00DAps`\u00ED\u00DA\u00B5\u0082\u00AF\u00AFo\u00A3I\u0080\u00C6\t\x1D;v\u00D4\u00C7\u00B0t\u00E9R\u00FD}\u00D8\x0E\x0B\x04X~\u00F3\u00E6\u00CD\x1BH\u00AEA7\u00E1\u00CD\u00D9\'\u00D4\x13d9m\u00FEl\u00CDi\x0F\u00C7+$M\u0087\u00D0\x00\u00C1hr\x18\u009E\u009D\u00F2\x0E\u00F9\'\u00A5\u0099\u00EFn\\\x01\u00DAI\x0E\u0098Edf\u00AA\u00E3S\x12o\u00A8s/\u00E8[o\u00BD\u00A5\\\u00B8pA=|\u00F8\u00B0\u00B2l\u00D92\x16\u00D1\t\u00CF?\u00FF\u00BC\x17,\u00A0\u00DB\u00FF-\\\u00B8\u00D0\u0085m\u008E\x1C9\u00A2\u00E2"\u00DD\u00AA\x1C8p@\x05\u00D2\u00AE\u00C1Bf\u00A1\u00D3?x\u00F0`\u00E5\u00EC\u00D9\u00B3K\u00C0\u0094\u008A\u00D0\u0097\x00\u0082\u00E0\u00F9H\u008B\u00E7\u009E{\u00CE\u009F],_\u00BE\u00BC\x06L#Z\u008Bj0\u00D9vx_\u00A3\u00C6O>\u00F9\u00A4\u00FE\u008B\u00A4\u00C3{\u00F5\u00BF\u00A1\u009D\u00C0\u00DAu\u00EB\u00D6-\u0082\u0082\x12\u00DF\u00E6\x12fQ\u008E\u00A5\u00F5S.\u00E6$\u00A8RCn\u00A5Qn\u00CC\u0096[\u00EC\u00D0{\u00B3a\u00C0\u00A8\u0093\\Tv\u00A7d\u00FD\u00C7\x16\x13\x10a\u00A0\u0081\u00B2\u00C4\u00D9\u009F\u00EAnZ\u0080\x04F\u00A8\u00F8\u00C9\'\u009F\u00B8\u00C9\r\b\b\x10\u00DA\u00B7o\u00EFn\u00B7y\u00F3fv\u00DC\u00A3\u00AD\\\u00B9\u00F2\u0096\u0083\u009B5kV\u00F9\u00B9s\u00E7J)\u00A8\u0090RSS\u009D\u00FE\u00FE\u00FE\u00BE3f\u00CC\x10JJJ\u0084\x1F\x7F\u00FCQ\x00\u00B3\u00D5\u00E8\x19\u00EC\u008F#L\u00E1\u00D3\u008C\u00C2\u00C2\u00C2Fm;u\u00EA\u00A4\u00FFFEE\t\u00A7N\u009Dr\u00A3O\u009F>z}\u00E7\u00CE\u009DY\u00DE\u00A6\x07Tw\u009A8\u00E3\x04\u0083]_\u00A6.\x12U\u00C5\u00A2)\r\u00AB\u008C;\x1A\u00EE4\u00D3\u00E2ShJX\u00BC\u009C"*+\rP\u00B9\u0083\u00F30\u0095\u00A2"\'\x17\u00EDAz\u00A0\x1A\u00C9\u00BFY\u0099v{\x10\u00C6\u0092L\u00F3\u009Djm\x13\u00F7n{b\x00d\x15S\u00B4\u0086A\u0090\x00\u00BE\u00A9\rh+F\u00B6\x02\u00F8\x1E!==]\x00\x02\u0085g\u009EyF\u00B8\u008Bq\u00B8KHH\u0088\u008E\u009B\x14\u0099%\u00D0\u0086;\u00F4#\x01\u00F6%\u0093\u00A7(\u00D7J\x1ES\x1C\r\u009A\u00A5/*g\u00F4\f\u008F\u00BC\u00B0\u00AC\u00A0V\u00D5\u00E2\x7F\u00F5\u00D2\u00C2\u00D7\'L\u0098H\u00DA\u00A1\u00A7\x06\u00E9\u00C7\u008E\u0085%\u00CD\u0098\x19K\u00B6\u00D8s\u0081\x15"K\u00CFc\u00C0\u00A1\u00EBo\r\r\r5p;\x04\b?\u0098\u0090\x1E\u00E2\u0097\u0096\u0096\u00AA$\u00F1\u00B5`\u00AA\u00DC\x020d\u00C8\x10#\u00BD\u00DF\x00\u00E6\u00D1\u00DDAvv6\u00FA\x12\u00F7\u00F5\u00981c4\u00B6[1j\u00D4\u00A8\u00DB\u00CD\u00BF\u0098\u0092[4\u00F35O?\u00FD\u00F4Cd*\u0085\u00C8\u00C8Ha\u00E4\u00C8\u0091\u0082\u00A7\u00D6\u00F0}\u00BD\u00FB\u00EE\u00BBfnwDl\u00D3\u00A6M\u00A3\u00B67n\u00DC\u00D0\x7F\u00D1o\u00A1\u00FF\u00F2\u00C0e\u00C0\x17\u0094\u008B\u00D5\u00E9Bz\u008Bp\x1E\u00A39/@\u0090\u00E3o)#m\t]\u00ED\u00B6Q\u00D1Z\u00ED\u00F8\x18\u00ADnB\u008CV;1F\u00AB\u009F\f\x7F\x03\x1C\x0B\x07\x7F\u0083\x11\u00F0K/\u00BE\u0098\u0086\u00A1?@\x05\u0082\u00DE\u0080\u00BAP@+ \u00F1OX\u00FF\u00EC\u00B0\u00A7\u00F7\u0094\u0095\u0095EB\u009D\u0085\u008B\x12\u00D16w\x06\u00BC\u0088n\u00E8\u00DBo\u00BF\u00BD\u00CA\u00A2$\u00F0\x17\u00F6.]\u00BA\u0094\x03\u00CA lvG\u0088G\u008F\x1E\u00C5|\u00E7,\n9L\u00D4\x1D\u00C5\u0081)\u00D1\u00804\u0084\x02\u00D2/\u00B3\u00A8\f\u00FC\u008C\x03\u00E0n\u0087Q\x19\u00B5\u00D3.]\u00BA\u00E4\u008E\u00CA0\u00E4F)\u00F6\b\u00BD1B\u00FD\b\u00F0>`\x19\u00AB\u00DF\u00BE}\u00BB\u00DE\x16\u00DE\u00DB\u00E8\x1DT\'\u00B1h\x10\u00C8s\x02\u00C9\u00C8\u008A\u008D\x1F+k\u00BB\x7F\u00FF~w\u00F48m\u00DA4\u00BD\x0E\u00C7\u00C5\u00C6\u009F\u009F\u009F_\x04uS\x00\u00FF\u00AB\u00EF\u00A3z\u0086\u00EF\u00800)\u00E7t\x0F\u00E7\u0091#\u00FD\u00ED\x1BV\x0F\u00AF]0\u00F3\u00FD\u00CAgz\u0094W\u00BD\x18\u00ADU\u008F\x04$\u00C4h6 \u00CD\u00F6Z\u008CV\u0093\b\u00C4M\u00EAV+}\u00B7{x\u00CA\u00AAU\tQ\x1D:JD\u0098\u00D6\u00B9c\'\u00E7\u00AB\t\t)\x1B>_?6\u00F6\u00F9\u00E1\u00DBY\u00FD\u0080\u00C7~\u00F1\x1D\u00A4\b\u00BD\u00A0\x1F\x1F\n",\u0094Xb.6!!!a\u00FD\u00CD\u00C2f, \u00CD5`\u00DF\x0F\u00A2\u0090\x03\u00BE\u0087P\u00BC\u00AE\u00A9\u0090\u0099\x15\u00F0W\u0098tf\x03\u00CEc\u00D8~\u00AB0\u009B\b\u0093\u00D6\u00AF_\u00CF\u00E7{H\u00D4\\\x00F\x04oC\u0084Y\u00CC\x0B\b>\u00EF\x11\u00AA\u00E7bn\u0085\u00FD65~>\u008D@\u00AD\x05a\u00ACl*\x1D\u00C1\x02\u00EB\u00E0z\u00F3\u00CD7Q`F`\u00F4\u00A9[(^\u00AB\u00A4\u00F3\x17\u00DA\u0095\u00B5\u00EFQT\x1A\x1E\u00A9\u0095\u00B6\u008D\u00D4\u00CA{Gi\x15\u00FD:k\u0095\u00C3\u00A2\u00B5\u00CA\u00D8h\u00AD\u00EA\u00D7@\u00D8\u00D8\x06\u00C2\u00AA\u00C75\x10f_9\u00F5CI\u0092z\u00F7\u00ED\u00DD\u00E7,#\u00E5v\u0080$<o\u00DB\u0096\u00ADC0/\x1B1b\u0084\x17\u00EDV\u00C4\x00\u0086\u00A24\u0081\x13_\x05\u0089\u00E3\u00A9\u008B\x17/\u0096\u00B3\u00C1c\u00F2\u008A\u0089\u00F0\u00E3\u008F?\u009EJ\u0089\u00F0j\u00C0W\u0090\u0087U\u00B06`\u00DE\u00B4\u008C\u008C\f\x05\u00FF\u00C6g7m\u00DA\u00F4Oh\u00B3\x1E\u00B0\x01s(\u00C0\u00C9\u008F?\u00FE\u00D8\u00C64\x02\x7F\u00F1\x19\x0F\u00C2.\u0081\u00F6\\\u00E1\x16\x15ws\x12\x00\u00A31\u0080\x1B4h\u00D0b\u00F0k\u00F9\u00940;\u00C0\u00A7\x15\u00CE\u009F?\u00DF\u009D|\u00AFZ\u00B5\n\x0Ff?\u00C3>W\u00ACX\u0091\x01}\u00DC\u00C0\u00FA\u0082\u0082\u0082Zh[\u0080\u00E0\u00F3:\u00C0.\x10\u00C0\x030\u00EEBL\u00C0\u0089(\u00E9\u00EC\u00D9\u00B3W\u0081,\u008C\u00EF\u00C7\x01\x06\u00D2N\u0089?\x7F\u0080ip\u00FEmO\u00BF\u009A\u00A9\u00B3\u00BEc\u00E7\u00C6\u00A27\u00D8Q?\u0080?\u00C0\u00A7a\u00D3D\u00B4\u008A\u00BAW\u00C3m(cp\u00C4q\u00DF%\u0087\x13\x13_\u00FB\u00CD\u0098cG\u008F\u00BE\u00DD\u009C\x1D\x7F\u00C8eJ\u00C7\u00BD6~\u00FAK\u00F1\u00F1\u00FB!\x12\u00928\x7F\x15F\x1A\x17B~\u0090\u00E5Dl\u00F7\u00DEF\u00FE\x00\u00B7x:\u00C1\x02\f\u0083  \u00826S\u00D9V\u00CE%@\x1E\u00E5~\x1A\x05.\u00F8\u00BE(|\u0086&\u00AF\u00BF\x17\u00C3r\u008C\u00F4\u00B0\x00\u00C1\x15\u00AF\u00BC\u00F2\n&\u00D9\u00F9\u0080\u009F01G7\u00C3\x1D\u00D6z\u00D1\x18CI\u00C8|\u00C9O\u00CB\u00DC^c-\u00B7\'h\u00A1~\u00FC\u00B8y\u00C8\x04;\u0097\u0097\u009A\u00B9\u00B323\u00F9t~k\u00AA\u0084\u00FCXm\u00E3O\x04\u00BC\u00CCF\u00F7\u00E9\r\u009E6\u00D2^\u00B4&\u00C1X\u009D\u00E2\u00CF{\u00DBH\u0098\u008F\x7F\u009E\u00E57\x1F\u00CC@\u00B5\u00AE\u00A8(\x0Fh\u00EE\x11\u008D\u00C3\u00E1\b^\u00B3z\u00F5g/\u00C4\u00C6\u00F6\u00E8\u00DB\u00B7oQVVV\x1D-\u008AD\u0093.\u00A1\u0089\u00B2\u00FC\u00C9A\x13\u00B4\u00D3\u00E4\u00F5==\u008B\u00C5b#\u0082\x052G?\u00D1\u00B6U\x1E\x11\u008C\x0B\x10\bAH\u009BE\u008B\x16\u00BD\u0080\u008Dv\u00EE\u00DC\u00E9\u0088\u008F\u008F\u00D7\x1F\u0080\u00C4\u00D4=&\u00C8\u0085\u00CEc`\u0088\u00B95\u00EEx\x10Y6"C\u00A3\u0095\u00C1`\u00A7\u009C\u00DB\x03\u00F5<\x1D\u00B0\u00D3\u00B5\u0091;\x19 qw\x13\u00C6\u00B7Ui\u008C\u00EC\x00\u00D7Lm\u0098\u0080Vr\u009B\u00CA\u008A\u00A9\u00C9\x00\u00DE(\u00BA\u00B7\\5xT\u00B4\x10I\x06Q\x1F\u008A\x18\u00D8\u00F2\u00AC\u00F7\u00F8\u00DF\'\u009A\u00BA>\u0086{o\u00F2\x07\x1F}\u00F4\u00E7\u00E9S\u00A6t\u00CF\u00BF\u0092?\u00ACY\u009FS\u0099\u00CC\u008E\x16-Z\u00A8\u00B1\u00B1\u00B1\n\x10\u00E6\u00E4&^KQ\u0099\u0095;\x02\u0092h\u00D0*G\u00A4\u00AF\u00B7\u00B7w\x15\u00F7\u00CA\x1F0H\u00C3`\u0084\u00B4\u00C4F\u008Be\u0087h-{\u00FA\u00F4\u00E97\u0082\u0083\u0083C\u00E2\u00E2\u00E2\u00AC\u009E\u009F\u00F7\u009D9s\u00E6zJJJ&\u0091~\u00956\\\u00AB\u00B9oXXdi#ig\u008B+ry\u00A4\u00C4\u009D\x1C\u00F3\u0089?\u00FB\u00A0\u0089?\u00A6\u0091\u00B8\u00A3\x18\u00A3\u00C7\u0091\u008D\u00CA\x11Z\u00CFmJ\u00CB\u00A6F\u00F9\u0082$\u00B9\u00DCG%\x1AE\u00F4t:\u00A3\u00E9\u00FB\x06\u0086Zst\u00AF\u00AD>IK\x17\x1BZ\u0085\x15\u00D1K5p\u009CE\u0087\u008E\x1E\x1D?\u00E5\u00F5I\x13O\u009C81\u00C9^_\x1Fv;\u00B2\u00FC\u00FC\u00FC.\u00CF\u009A3gb\u00DBv\u00ED\u00CA\u00DEy\u00E7\x1D\u00FE\u00BB\x06\u0089\x06Z\u00CD\u009D7\t\u00DC\u00A20\x13\u0084\u00E6\u00C8\n\u0084Wx\x10\u0086\u009AQ@\u00A1\u00B8\u0083\u00DA\u00E1\u00B3^\x10\u00CE/\u009F;w\u00EE\u00F0\u00FE\u00FD\u00FB\u00F7\x0E\f\f\u00F4\u00A5s7\u00DB\u00C9\u0093\'/\u0081\u00D0|I\u009Ay\u0085\u00C8\u00AA\u00A0q\u00C8\x1E\x07\u009B\x06\u00EE\u00BCL\u00F4\u00C8\u00B7n\u00F6\x1D\u008A\u00E7a\'\u00DFN\u00F3\u00F8^E\u00F4\u0098\u00AF\u00C2o*\u00F0>LT\n\u008BZW\u00C7\u008F\u00D9\u00A0Iu\u00E1\u00A8e\x06_s\u00BD\x18\u00E0Se\b\r,1\u00B4o{\u00D2\x1A\u00FF\u00EAAS\u0097>E\u00DC\u00D9\u008D\u00A7n\u00FA\u0082\u00E3\f\u00FE\u00E3\u0087\u008B\u0087\u00E5\u00E6\u00E6\x0E\u0086\x10\u00BE=\u0090\u00D7\u00AA\u00BE\u00BE\u00BE\u00B5,\u00CB~\\\u0092\u0098\u0095\u00BC|\u00D9\u00EB\u008F\x0F\x18\u0080\u00D2l\u00A7\u008Fp\u009A\u00F3\u00A5\x17;\x14dhA\u0093b\u00A7\u00D0e\u00E4\x03d\u00EEh>\u0098Lg\x18\u00F7\u008CH\x12\\A\x043\u009F\u00C5\u008EI\u00A4\u00FB\u00F9\u00AB)\u0081T\u0097\u00D9fOUg\u00A7\u00B7\u00B7\u00DB#d\u00B6\u00DB\u009B~[B\x1E\u00B6\u00E0TN\u00CEX\u00FD\x10+*\u00EA\u00AB-\u00DB\u00B7\u00FD6((\b5\u00C1\u00D9L\u00B2\u00F8O\u00E9Z\x10\u0098yTi\u0091\x19\u00EA\u0099fy\u009CM\u00B5\u00E4\u00BE\u00A3\u00D0H\u008B\u0098\u0099c\u00FE\u00C2N\u00A6\u00F9\u00BE\u00FB\u00B0\u00C7\u00D3\u0087\u00B9h\u00E0\u00FFMQ\u00B8\u00A3m,5&\u0093\t\u00CD\u008C\u00D0\u00EF\u00D1~\u00A9[\u00FF\u00FA\u00D7\u00F7H\u008A]w\u00F9~\u008Ds\u00CA\u00EC\u00B7\u00A9\u00AF\u0090\x14\u00EE\u00A4X\u00E3"\u00B3J\x12&\u00DE72_a\u00E7>)\u00B8/\u00BF\u00C2\x12\u00EF\u00C1\u00B7\u00F5\u00B8\u0098~\u0090[\u00F8@\u0080`\u00E7\u008E\u00F3\x05\n\u00C5\u00EF\u00C5w~|[\u0093\u0087\u00FFi\u00CAWh\u00C2}Z\u00C4{\u00F4\u00CF\x107\x1F\u0080\u00F8\u00E0\u008B\u00ED\u00E6\u0094\x7F\x0B0\x00p\u00AC\u00A0Jrr\u009A\x16\x00\x00\x00\x00IEND\u00AEB`\u0082'

var upgadeButton = footerButtons.add("iconbutton", undefined, upgradeBannerString)
upgadeButton.helpTip = "Visit Randomill.com"
upgadeButton.onClick = function () {
	try {
		var URL = new File(Folder.temp + "/Randomill.html")
		URL.open("w")
		URL.writeln("<html><head>")
		URL.writeln('<meta HTTP-EQUIV="REFRESH" content="0; url=https://randomill.com/">')
		URL.writeln("</head></html>")
		URL.close()
		URL.execute()
	} catch (e) {
		alert("Error opening the Randomill site. Visit randomill.com directly.")
	}
}

var close = footerButtons.add("button")
close.text = "Close"
close.helpTip = "Press Esc to Close"
close.onClick = function () {
	dialog.close()
}
var apply = footerButtons.add("button")
apply.text = "Apply"
apply.onClick = function () {
	try {
		// ensure a document is open
		if (app.documents.length === 0 || !app.activeDocument) {
			throw new Error("No currently active document.")
		}
		// ensure some objects are selected
		var objects = app.activeDocument.selection
		if (!app.activeDocument.selection || app.activeDocument.selection.length === 0) {
			throw new Error("No currently selected objects. Select objects first.")
		}

		randomizePosition(
			objects,
			randomizeWithinGroupsCheckbox.value,
			randomizeWithinCompoundPaths.value
		)
		app.redraw()
	} catch (err) {
		alert("Error: \n" + err.message)
	}
}
apply.active = true

var groupItemTypes = [
	"pathItems",
	"groupItems",
	"compoundPathItems",
	"textFrames",
	"placedItems",
	"rasterItems",
	"symbolItems",
	"pluginItems",
	"legacyTextItems",
	"meshItems",
	"nonNativeItems",
	"graphItems"
]

function randomizePosition(objects, separateGroups, separateCompoundPaths) {
	var xMin = parseFloat(xMinField.text)
	var xMax = parseFloat(xMaxField.text)
	var xStep = parseFloat(xStepField.text)
	var yMin = parseFloat(yMinField.text)
	var yMax = parseFloat(yMaxField.text)
	var yStep = parseFloat(yStepField.text)

	if (isNaN(xMin) || isNaN(xMax) || isNaN(xStep) || isNaN(yMin) || isNaN(yMax) || isNaN(yStep)) {
		throw new Error(
			"Invalid input values. Please ensure all fields are filled with valid numbers." +
				"\n" +
				"xMin:" +
				xMin +
				", xMax: " +
				xMax +
				", xStep: " +
				"xStep" +
				"\n" +
				"yMin:" +
				yMin +
				", yMax: " +
				yMax +
				", yStep: " +
				yStep
		)
	}

	for (var i = 0; i < objects.length; i++) {
		var obj = objects[i]
		if (obj.typename == "CompoundPathItem" && separateCompoundPaths) {
			randomizePosition(obj.pathItems, separateGroups, separateCompoundPaths)
		} else if (obj.typename == "GroupItem" && separateGroups) {
			for (var j = 0; j < groupItemTypes.length; j++) {
				randomizePosition(obj[groupItemTypes[j]], separateGroups, separateCompoundPaths)
			}
		} else {
			var xPosOffset = randomValueBetween(xMin, xMax, xStep)
			var yPosOffset = randomValueBetween(yMin, yMax, yStep)
			obj.translate(xPosOffset, yPosOffset)
		}
	}
}

function randomValueBetween(min, max, step) {
	if (step > max - min) {
		step = max - min
	}
	var maxOriginal = max
	var max = max + step

	var delta, range, rand

	if (arguments.length < 2) {
		max = min
		min = 0
	}
	if (!step) {
		step = 1
	}

	delta = max - min
	range = delta / step
	rand = Math.random()
	rand *= range
	rand = Math.floor(rand)
	rand *= step
	rand += min

	if (rand > maxOriginal) {
		rand = maxOriginal
	}
	return rand
}

function sanitizeInput() {
	var cleanString = this.text.replace(/[^0-9.-]/g, "")
	if (cleanString === "") {
		cleanString = "0"
	}
	val = parseFloat(cleanString)
	if (isNaN(val)) {
		val = 0
	}
	this.text = val.toFixed(2).toString()
}

dialog.center()
dialog.show()
