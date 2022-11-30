import MapContext from "./MapContext";
import React, { useContext, useEffect } from 'react';
import Bus from '../bus.json'

function OCPBus({ show }) {
    const { map } = useContext(MapContext)
    const layerId = "OCPBus";


    useEffect(() => {
        if (!map) return;

        const flp = (obj, options) => {
            obj.followPath(options, function () {
                flp(obj, options)
            });
        }

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

                    let options = {
                        type: "fbx",
                        obj: "vehicles/bus.fbx",
                        scale: 0.02,
                        units: "meters",
                        anchor: 'center',
                        adjustment: { x: 0, y: 0, z: 0 },
                        rotation: { x: 90, y: 180, z: 0 },
                    };

                    map.tb.loadObj(options, function (model) {

                        Bus.forEach(b => {
                            const a = model.duplicate()
                            a.setCoords(b.path[0]);
                            map.tb.add(a, layerId);
                            flp(a, b)
                        });

                    })
                    map.tb.setLayerZoomRange(layerId, 15, 24)
                },
                render: function (gl, matrix) {
                    map.tb.update();
                }
            })
        }
        else {
            map.tb.setLayoutProperty(layerId, 'visibility', 'none')
            map.setLayoutProperty(layerId, 'visibility', 'none')
        }
    }, [map, show])

    return null
}

export default OCPBus;