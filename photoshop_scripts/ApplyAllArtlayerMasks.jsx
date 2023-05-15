// script: Rio Fujimiya (r.2238@outlook.com, https://i2for.me)
// 2023.05.15

function debug_alert(msg) {
    //alert(msg);
}

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

function applyLayerMask() {
    try {
        var id1949 = charIDToTypeID("Dlt ");
        var desc398 = new ActionDescriptor();
        var id1950 = charIDToTypeID("null");
        var ref291 = new ActionReference();
        var id1951 = charIDToTypeID("Chnl");
        var id1952 = charIDToTypeID("Chnl");
        var id1953 = charIDToTypeID("Msk ");
        ref291.putEnumerated(id1951, id1952, id1953);
        desc398.putReference(id1950, ref291);
        var id1954 = charIDToTypeID("Aply");
        desc398.putBoolean(id1954, true);
        executeAction(id1949, desc398, DialogModes.NO);
    } catch (e) { debug_alert("no mask") }
}

debug_alert("Hello");

function processLayers(o) {
    var i;
    var layer;
    for (i = 0; i < o.layers.length; i++) {
        layer = o.layers[i];

        if (layer instanceof LayerSet) {
            processLayers(layer);

        } else {
            activate(layer);
            applyLayerMask();
        }

    }
}

if (Window.confirm("This script will apply all masks of artlayers in the active psd document.\nPlease backup psd before running this script.\n\nPush YES to start.\n\nRio Fujimiya (r.2238@outlook.com, https://i2for.me)\n2023.05.15")) {

    activate(activeDocument.layers[0]);
    activeDocument.layerSets.add();
    processLayers(activeDocument);
    activeDocument.layers[0].remove();
    alert("Finished.\nPlease check all layers visually.");

}
