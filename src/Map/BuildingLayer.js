
// let buildinglayer = {};
// let buildinglayerId = "building-3d-1";

// buildinglayer.init = (map) => {
//     const layers = map.getStyle().layers;

//     const labelLayerId = layers.find(
//         (layer) => layer.type === 'symbol' && layer.layout['text-field']
//     ).id;
//     map.addLayer(
//         {
//             "id": buildinglayerId,
//             "type": "fill-extrusion",
//             "source": "vntitles",
//             "source-layer": "building",
//             "filter": ["all"],
//             "paint": {
//                 // 'fill-extrusion-pattern': 'wall',
//                 "fill-extrusion-base": {
//                     "property": "render_min_height",
//                     "type": "identity"
//                 },
//                 "fill-extrusion-color": [
//                     "case",
//                     ["has", "colour"],
//                     ["get", "colour"],
//                     "hsl(39, 41%, 86%)"
//                 ],
//                 "fill-extrusion-height": {
//                     "property": "render_height",
//                     "type": "identity"
//                 },
//                 "fill-extrusion-opacity": 0.9
//             }
//         },
//         // "building"
//         labelLayerId
//     );

// }
// buildinglayer.show = (map, show) => {
//     const layer = map.getLayer(buildinglayerId)
//     console.log(layer);
//     map.setLayoutProperty(layer, 'visibility', show ? "visible" : 'none');
// }

// export default buildinglayer

import MapContext from "./MapContext";
import React, { useContext, useEffect } from 'react';

function BuildingLayer({ show }) {
    const { map } = useContext(MapContext)
    const buildinglayerId = "building-3d-1";

    useEffect(() => {
        if (!map) return;

        const layers = map.getStyle().layers;

        const labelLayerId = layers.find(
            (layer) => layer.type === 'symbol' && layer.layout['text-field']
        ).id;

        map.addLayer(
            {
                "id": buildinglayerId,
                "type": "fill-extrusion",
                "source": "vntitles",
                "source-layer": "building",
                "filter": ["all"],
                "paint": {
                    // 'fill-extrusion-pattern': 'wall',
                    "fill-extrusion-base": {
                        "property": "render_min_height",
                        "type": "identity"
                    },
                    "fill-extrusion-color": [
                        "case",
                        ["has", "colour"],
                        ["get", "colour"],
                        "hsl(39, 41%, 86%)"
                    ],
                    "fill-extrusion-height": {
                        "property": "render_height",
                        "type": "identity"
                    },
                    "fill-extrusion-opacity": 0.9
                }
            },
            labelLayerId
        );
    }, [map])
    return (
        <></>
    );
}

export default BuildingLayer;