import React, { useState } from 'react';
import styled from 'styled-components';
import MapView from '../../components/MapView';
import ScheduleList from './ScheduleList';
// import Controls from './Controls';


function MapSchedules() {

    return (
        <StyledContainer className='relative'>
            <MapView />
            <ScheduleList />
        </StyledContainer>
    );
}

const StyledContainer = styled.div`
    /* display: flex ;
    flex-direction: row ; */
    width: 100% ;
    height: 100% ;
`
export default MapSchedules;
