import React, { useState } from 'react';
import styled from 'styled-components';
import MapView from '../../Components/MapView';
import Controls from '../../Components/MapView/Control';


function MapEditor() {



    return (
        <StyledContainer>
            <StyledMenu>
                menu

            </StyledMenu>
            <StyledMapView>
                <MapView />
            </StyledMapView>


        </StyledContainer>
    );
}

const StyledContainer = styled.div`
    display: flex ;
    flex-direction: row ;
    width: 100% ;
    height: 100% ;
`

const StyledMapView = styled.div`
    position: relative;
    width: 100% ;
    height: 100% ;
`
const StyledMenu = styled.div`
    width: 400px;
    padding: 10px;
`
export default MapEditor;
