import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
// import { MapboxOverlay as DeckOverlay } from '@deck.gl/mapbox';
// import { GeoJsonLayer } from '@deck.gl/layers';
// import { MVTLayer } from '@deck.gl/geo-layers';
// import { Tile3DLayer } from '@deck.gl/geo-layers';
import { Threebox } from "threebox-plugin";
import Bus from './bus.json'
import Police from './police.json'

import './Map.css';
import Style from "./style.json"

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

function onObjectChanged(e) {
  let model = e.detail.object; //here's the object already modified
  let action = e.detail.action; //here's the action that changed the object
  // console.log(action);
}

function createLabelIcon(text) {
  let popup = document.createElement('div');
  popup.innerHTML = '<b title="' + text + '" style="font-size: 10px;color: black;">OCP02</b>';
  return popup;
}

const Map = () => {
  const mapContainerRef = useRef(null);
  //20.988521, 105.942125


  const [lng, setLng] = useState(105.942125);
  const [lat, setLat] = useState(20.988521);
  const [zoom, setZoom] = useState(16);

  var origin = [105.942166, 20.987999];
  var truck;


  // Initialize map when component mounts
  useEffect(() => {

    // const deckOverlay = new DeckOverlay({
    //   layers: [
    //     new MVTLayer({
    //       data: `http://192.168.1.32:8080/data/openmaptiles/{z}/{x}/{y}.pbf`,
    //       minZoom: 14,
    //       maxZoom: 14,
    //       getFillColor: [255, 255, 255, 255],
    //       lineWidthMinPixels: 1,
    //       pickable: true,
    //       extruded: true, //3d
    //       opacity: 0.3,
    //       autoHighlight: true,
    //       highlightColor: [255, 0, 0],
    //       getElevation: (d) => d.properties.render_height,
    //       wireframe: true,
    //       lineWidthMinPixels: 1,
    //       getLineColor: [0, 0, 0],
    //       // material: {
    //       //   ambient: 0.1,
    //       //   diffuse: 0.1,
    //       //   shininess: 32,
    //       //   specularColor: [30, 30, 30]
    //       // },
    //       onClick: ({ object }) => console.log(`ob`, object),
    //       // renderSubLayers: (props) => {
    //       //   console.log(props);
    //       // }

    //     })
    //   ]
    // });



    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: Style,
      center: [lng, lat],
      zoom: zoom
    });
    const g = []

    map.on('click', (e) => {
      g.push([e.lngLat.lng, e.lngLat.lat])
      console.log(g);
    })
    // Add navigation control (the +/- zoom buttons)
    // map.addControl(deckOverlay);

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on('load', () => {

      map.addLayer({
        id: "custom_layer",
        type: "custom",
        renderingMode: "3d",
        onAdd: function (map, mbxContext) {
          window.tb = new Threebox(map, mbxContext, {
            defaultLights: true,
            enableSelectingObjects: true,
            enableTooltips: true,
            enableHelpTooltips: true,
            multiLayer: true,
          });

          // Royalty Free License: Vehicles by https://www.cgtrader.com/antonmoek
          // from https://www.cgtrader.com/free-3d-models/car/concept/cartoon-low-poly-city-cars-pack

          let options = {
            type: "fbx",
            obj: "vehicles/bus.fbx",
            scale: 0.02,
            units: "meters",
            anchor: 'center',
            adjustment: { x: 0, y: 0, z: 0 },
            rotation: { x: 90, y: 180, z: 0 },
          };

          window.tb.loadObj(options, function (model) {

            Bus.forEach(b => {
              const a = model.duplicate()
              a.setCoords(b.path[0]);
              window.tb.add(a);
              flp(a, b)
            });

          });

          let police = {
            // obj: 'models/policeman.fbx',
            // type: 'fbx',
            // scale: 100,
            // units: 'meters',
            // rotation: { x: 90, y: 180, z: 0 },
            // anchor: 'center'
            //default rotation

            // type: 'gltf',
            // obj: "vehicles/police.glb",
            // scale: 0.1,

            // units: "meters",
            // anchor: 'center',
            // adjustment: { x: 0, y: 0, z: 0 },
            // rotation: { x: 90, y: 180, z: 0 },


            obj: "models/policeman.glb",
            type: 'gltf',
            scale: 8,
            units: 'meters',
            rotation: { x: 90, y: 180, z: 0 },
            anchor: 'center'//default rotation

          };
          window.tb.loadObj(police, function (model) {
            const b = Police[0]
            const a = model.setCoords(b.path[0]);
            console.log(`animations`, model.animations);
            window.tb.add(a);
            a.playAnimation({ animation: 1, duration: 10000000000000000 });

            flp(a, b)

            // Police.forEach(b => {
            //   const a = model.duplicate()
            //   a.setCoords(b.path[0]);
            //   window.tb.add(a);
            //   // a.playAnimation({ animation: 1, duration: 10000 });
            //   // flp(a, b)
            // });

          });

        },

        render: function (gl, matrix) {
          window.tb.update();
        },
      });

      const flp = (obj, options) => {
        obj.followPath(options, function () {
          flp(obj, options)
          // obj.playAnimation({ animation: 1, duration: options.duration });
        });
      }
      //http://192.168.1.32:8080/styles/OSM%20OpenMapTiles/style.json
      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;

      const labelLayerId = layers.find(
        (layer) => layer.type === 'symbol' && layer.layout['text-field']
      ).id;

      // The 'building' layer in the Mapbox Streets
      // vector tileset contains building height data
      // from OpenStreetMap.



      map.addLayer(
        {
          "id": "building-3d",
          "type": "fill-extrusion",
          "source": "openmaptiles",
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

      // map.addLayer(
      //   {
      //     "id": "building-3d-1",
      //     "type": "fill-extrusion",
      //     "source": "vntitles",
      //     "source-layer": "building",
      //     "filter": ["all"],
      //     "paint": {
      //       // 'fill-extrusion-pattern': 'wall',
      //       "fill-extrusion-base": {
      //         "property": "render_min_height",
      //         "type": "identity"
      //       },
      //       "fill-extrusion-color": [
      //         "case",
      //         ["has", "colour"],
      //         ["get", "colour"],
      //         "hsl(39, 41%, 86%)"
      //       ],
      //       "fill-extrusion-height": {
      //         "property": "render_height",
      //         "type": "identity"
      //       },
      //       "fill-extrusion-opacity": 0.9
      //     }
      //   },
      //   labelLayerId
      // );





    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Map;
