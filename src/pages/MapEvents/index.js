import React, { useState } from 'react';
import styled from 'styled-components';
import MapView from '../../components/MapView';
// import Controls from './Controls';


function MapEvents() {

    return (
        <StyledContainer className='relative'>
            {/* <StyledMapView> */}
            <MapView />
            {/* <Controls /> */}
            {/* </StyledMapView> */}
        </StyledContainer>
    );
}

const StyledContainer = styled.div`
    /* display: flex ;
    flex-direction: row ; */
    width: 100% ;
    height: 100% ;
`
export default MapEvents;
