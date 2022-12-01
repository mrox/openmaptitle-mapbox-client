import React from "react";


const MapContext = React.createContext({
    map: null,
    width: 0,
    height: 0,
});

export default MapContext;