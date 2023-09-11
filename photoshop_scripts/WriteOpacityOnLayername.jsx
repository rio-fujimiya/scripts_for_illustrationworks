// script: Rio Fujimiya (r.2238@outlook.com, https://i2for.me)
// 2023.09.11

function activate(layer) {
    try {
        var idslct = charIDToTypeID("slct");
        var desc954 = new ActionDescriptor();
        var idnull = charIDToTypeID("null");
        var ref116 = new ActionReference();
        var idLyr = charIDToTypeID("Lyr ");
        ref116.putName(idLyr, layer.name);
        desc954.putReference(idnull, ref116);
        var idMkVs = charIDToTypeID("MkVs");
        desc954.putBoolean(idMkVs, false);
        var idLyrI = charIDToTypeID("LyrI");
        var list64 = new ActionList();
        list64.putInteger(7);
        desc954.putList(idLyrI, list64);
        executeAction(idslct, desc954, DialogModes.NO);
    } catch (e) { debug_alert("layer activation fail") }
}

function processLayers(o) {
    var i;
    var layer;
    for (i = 0; i < o.layers.length; i++) {
        layer = o.layers[i];

        if (layer instanceof LayerSet) {
            processLayers(layer);
        }

        var opacityPercentage = Math.floor(layer.opacity + 0.5);
        var newLayerName = layer.name;
        var opacityPercentageKey = "%_";
        if (layer.name.indexOf(opacityPercentageKey) !== -1) {
            var splitLayerName = newLayerName.split(opacityPercentageKey);
            splitLayerName.shift();
            newLayerName = splitLayerName.join(opacityPercentageKey);
        }
        if (opacityPercentage != 100) newLayerName = opacityPercentage + opacityPercentageKey + newLayerName;
        layer.name = newLayerName;
    }
}

if (Window.confirm("This script will get opacity of layers and prepend them to layer names. \nPlease backup psd before running this script.\n\nPush YES to start.\n\nRio Fujimiya (r.2238@outlook.com, https://i2for.me)\n2023.09.11")) {

    activate(activeDocument.layers[0]);
    activeDocument.layerSets.add();
    processLayers(activeDocument);
    activeDocument.layers[0].remove();
    alert("Finished.\nPlease check all layers visually.");

}
