// script: Rio Fujimiya (r.2238@outlook.com, https://i2for.me)
// 2023.09.11

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

debug_alert("Hello");

function processLayers(o) {
    var i;
    var layer;
    for (i = 0; i < o.layers.length; i++) {
        layer = o.layers[i];

        if (layer instanceof LayerSet) {
            processLayers(layer);

        } else {
            // レイヤーの不透明度を取得
            var opacityPercentage = Math.floor(layer.opacity);
            var newLayerName = layer.name;
            var percentage_key = "%_";
            if (layer.name.indexOf("_") !== -1) {
                var nameParts = newLayerName.split(percentage_key);
                nameParts.shift();
                newLayerName = opacityPercentage + percentage_key + nameParts.join(percentage_key);
            } else {
                newLayerName = opacityPercentage + percentage_key + newLayerName;
            }

            layer.name = newLayerName

        }
    }
}

if (Window.confirm("This script will get opacity of layers and prepend them to layer names. \nPlease backup psd before running this script.\n\nPush YES to start.\n\nRio Fujimiya (r.2238@outlook.com, https://i2for.me)\n2023.09.11")) {

    activate(activeDocument.layers[0]);
    activeDocument.layerSets.add();
    processLayers(activeDocument);
    activeDocument.layers[0].remove();
    alert("Finished.\nPlease check all layers visually.");

}
