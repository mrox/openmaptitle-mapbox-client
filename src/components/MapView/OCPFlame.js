import MapContext from "./MapContext";
import React, { useContext, useEffect, useMemo } from 'react';


function OCPFlame({ show }) {
    const { map } = useContext(MapContext)
    const layerId = "OCPFlame";
    // const context = useContext(MapContext);
    // const ctrl = useMemo(() => onCreate(context), []);

    useEffect(() => {
        if (!map) return;
        if (show) {
            var mapLayer = map.getLayer(layerId);
            if (mapLayer) {
                map.setLayoutProperty(layerId, 'visibility', 'visible')
                map.tb.setLayoutProperty(layerId, 'visibility', 'visible')

                return
            }
            map.addLayer({
                id: layerId,
                type: "custom",
                renderingMode: "3d",
                onAdd: function (map, mbxContext) {

                    let building = {
                        obj: `fireplace.gltf`,
                        type: 'glb',
                        scale: 10,
                        units: 'meters',
                        rotation: { x: 90, y: 180, z: 0 },
                        anchor: 'center'

                    };
                    map.tb.loadObj(building, function (model) {
                        model.setCoords([105.94483690768, 20.98849176347]);
                        console.log(`model.animations`, model.animations);
                        console.log(`model.material`, map.tb.material(model));
                        map.tb.add(model, layerId);
                    });
                    map.tb.setLayerZoomRange(layerId, 15, 24)

                },
                render: function (gl, matrix) {
                    map.tb.update();
                }
            })
        }
        else {
            map.setLayoutProperty(layerId, 'visibility', 'none')
            map.tb.setLayoutProperty(layerId, 'visibility', 'none')
            // var mapLayer = map.getLayer(layerId);
            // if (mapLayer) map.removeLayer(layerId)
        }
    }, [map, show])

    return null
}

export default OCPFlame;