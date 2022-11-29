import React, { useState } from 'react';
import Map from './Map';
// import BuildingLayer from './Map/BuildingLayer'
import Controls from './Map/Control';
import OCPBuilding from './Map/OCPBuilding';
import OCPBus from './Map/OCPBus';

function App() {
  // const [isLoading, setIsLoading] = useState(false)
  const [showOCPBuilding, setShowOCPBuilding] = useState(true)
  const [showOCPBus, setShowOCPBus] = useState(true)


  return (
    <div>
      <Map>
        {/* <BuildingLayer /> */}
        <Controls
          onChangeShowOCP={setShowOCPBuilding}
          onChangeShowBus={setShowOCPBus}
        // isLoading={isLoading} 
        />
        <OCPBuilding show={showOCPBuilding} />
        <OCPBus show={showOCPBus} />
      </Map>
    </div>
  );
}

export default App;
