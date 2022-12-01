import React, { useState } from 'react';
import MapView from '../Components/MapView';
import BuildingLayer from '../Components/MapView/BuildingLayer'
import Controls from '../Components/MapView/Control';
import OCPBuilding from '../Components/MapView/OCPBuilding';
import OCPBus from '../Components/MapView/OCPBus';
import OCPSecurity from '../Components/MapView/OCPSecurity';
import IndoorLayer from '../Components/MapView/IndoorLayer'


function Map() {
    // const [isLoading, setIsLoading] = useState(false)
    const [showOCPBuilding, setShowOCPBuilding] = useState(true)
    const [showOCPBus, setShowOCPBus] = useState(true)
    const [showOCPSecurity, setShowOCPSecurity] = useState(true)

    return (
        <div>
            <MapView>
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
            </MapView>
        </div>
    );
}

export default Map;
