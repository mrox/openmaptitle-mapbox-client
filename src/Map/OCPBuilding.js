import MapContext from "./MapContext";
import React, { useContext, useEffect, useMemo } from 'react';
import ListBuilding from './data.json'

function OCPBuilding({ show }) {
    const { map } = useContext(MapContext)
    const layerId = "OCPBuilding";
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
                    for (const v of ListBuilding) {
                        let building = {
                            obj: `ocp/${v.name}.glb`,
                            type: 'gltf',
                            scale: 1,
                            units: 'meters',
                            rotation: { x: 90, y: 180, z: 0 },
                            anchor: 'center'

                        };
                        map.tb.loadObj(building, function (model) {
                            model.setCoords(v.location.reverse());
                            map.tb.add(model, layerId);
                        });
                        map.tb.setLayerZoomRange(layerId, 15, 24)
                    }
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

export default OCPBuilding;