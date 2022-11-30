import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapContext from './MapContext';
import './Map.css';
import Style from "../style.json"
import { Threebox } from "threebox-plugin";


const Map = ({ children }) => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);


  // const [lng, setLng] = useState(-87.618312);
  // const [lat, setLat] = useState(41.866282);
  const [lng, setLng] = useState(105.94483690768);
  const [lat, setLat] = useState(20.98849176347);
  const [zoom, setZoom] = useState(16);

  useEffect(() => {
    const newMap = new mapboxgl.Map({
      container: mapContainerRef.current ?? "",
      style: Style,
      // attributionControl: false,
      // transformRequest,
      // accessToken: token,
      center: [lng, lat],
      zoom: zoom
    });

    window.tb = new Threebox(newMap,
      newMap.getCanvas().getContext('webgl')
      , {
        defaultLights: true,
        // enableSelectingObjects: true,
        // enableTooltips: true,
        // enableHelpTooltips: true,
        multiLayer: true,
      });

    newMap.on("load", () => {
      setMap(newMap);
    });

    newMap.on('move', () => {
      setLng(newMap.getCenter().lng.toFixed(4));
      setLat(newMap.getCenter().lat.toFixed(4));
      setZoom(newMap.getZoom().toFixed(2));
    });
    newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');


    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const containerBounds = mapContainerRef.current?.getBoundingClientRect();

  return (
    <div>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className='map-container' ref={mapContainerRef} />
      <MapContext.Provider
        value={{
          map,
          width: containerBounds?.width || 0,
          height: containerBounds?.height || 0,
          // transform,
        }}
      >
        {children}
      </MapContext.Provider>
    </div>
  );
};

export default Map;
