import React, { useState } from 'react';
import Map from './Map';
import BuildingLayer from './Map/BuildingLayer'
import Controls from './Map/Control';
import OCPBuilding from './Map/OCPBuilding';
import OCPBus from './Map/OCPBus';
import OCPSecurity from './Map/OCPSecurity';
import IndoorLayer from './Map/IndoorLayer'

function App() {
  // const [isLoading, setIsLoading] = useState(false)
  const [showOCPBuilding, setShowOCPBuilding] = useState(true)
  const [showOCPBus, setShowOCPBus] = useState(true)
  const [showOCPSecurity, setShowOCPSecurity] = useState(true)

  return (
    <div>
      <Map>
        {/* <BuildingLayer /> */}
        <Controls
          onChangeShowOCP={setShowOCPBuilding}
          onChangeShowBus={setShowOCPBus}
          onChangeShowOCPSecurity={setShowOCPSecurity}
        />
        <OCPSecurity show={showOCPSecurity} />
        <OCPBuilding show={showOCPBuilding} />
        <OCPBus show={showOCPBus} />
        <IndoorLayer />
      </Map>
    </div>
  );
}

export default App;
