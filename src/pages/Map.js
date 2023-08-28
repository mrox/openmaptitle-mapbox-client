import React, { useState } from 'react';
import MapView from '../components/MapView';
import BuildingLayer from '../components/MapView/BuildingLayer'
import Controls from '../components/MapView/Control';
import OCPBuilding from '../components/MapView/OCPBuilding';
import OCPBus from '../components/MapView/OCPBus';
import OCPSecurity from '../components/MapView/OCPSecurity';
import IndoorLayer from '../components/MapView/IndoorLayer'
import OCPFlame from '../components/MapView/OCPFlame';


function Map() {
    // const [isLoading, setIsLoading] = useState(false)
    const [showOCPBuilding, setShowOCPBuilding] = useState(true)
    const [showOCPBus, setShowOCPBus] = useState(true)
    const [showOCPSecurity, setShowOCPSecurity] = useState(true)
    const [showFlame, setShowFlame] = useState(true)

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
                {/* <OCPFlame show={showFlame} /> */}
                <IndoorLayer />
            </MapView>
        </div>
    );
}

export default Map;
