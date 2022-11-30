import MapContext from "./MapContext";
import React, { useContext, useEffect } from 'react';
import PoliceData from '../police.json'

function OCPSecurity({ show }) {
    const { map } = useContext(MapContext)
    const layerId = "OCPSecurity";

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
                console.log(`show layer security`);
                return
            }
            map.addLayer({
                id: layerId,
                type: "custom",
                renderingMode: "3d",
                onAdd: function (map, mbxContext) {

                    let options = {
                        obj: "models/policeman.glb",
                        type: 'gltf',
                        scale: 8,
                        units: 'meters',
                        rotation: { x: 90, y: 180, z: 0 },
                        anchor: 'center'//default rotation

                    };

                    map.tb.loadObj(options, function (model) {
                        model.setCoords(PoliceData[0].path[0]);
                        map.tb.add(model, layerId);
                        model.playAnimation({ animation: 1, duration: 10000000000000000 });
                        flp(model, PoliceData[0])
                    });
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

export default OCPSecurity;