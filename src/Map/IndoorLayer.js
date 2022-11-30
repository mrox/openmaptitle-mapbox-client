import MapContext from "./MapContext";
import React, { useContext, useEffect } from 'react';
// import IndoorData from '../indoor-3d-map.geojson'


function IndoorLayer({ show }) {
    const { map } = useContext(MapContext)
    const layerId = "indoor-3d";

    useEffect(() => {
        if (!map) return;

        // const layers = map.getStyle().layers;

        // const labelLayerId = layers.find(
        //     (layer) => layer.type === 'symbol' && layer.layout['text-field']
        // ).id;
        console.log(`add layer`);
        map.addSource('floorplan', {
            'type': 'geojson',
            /*
            * Each feature in this GeoJSON file contains values for
            * `properties.height`, `properties.base_height`,
            * and `properties.color`.
            * In `addLayer` you will use expressions to set the new
            * layer's paint properties based on these values.
            */
            // 'data': IndoorData
            // 'data': 'https://docs.mapbox.com/mapbox-gl-js/assets/indoor-3d-map.geojson'
            'data': '/indoor-3d-map.geojson'
        });
        map.addLayer({
            'id': layerId,
            'type': 'fill-extrusion',
            'source': 'floorplan',
            'paint': {
                // Get the `fill-extrusion-color` from the source `color` property.
                'fill-extrusion-color': ['get', 'color'],

                // Get `fill-extrusion-height` from the source `height` property.
                'fill-extrusion-height': ['get', 'height'],

                // Get `fill-extrusion-base` from the source `base_height` property.
                'fill-extrusion-base': ['get', 'base_height'],

                // Make extrusions slightly opaque to see through indoor walls.
                'fill-extrusion-opacity': 0.5
            }
        });
    }, [map])
    return null
}

export default IndoorLayer;