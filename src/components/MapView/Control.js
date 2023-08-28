

import React from 'react';
import styled from "styled-components"

const Container = styled.div`
  display: inline-block;
  position: absolute;
  /* top: 0;
  left: 0; */
  bottom: 50px;
  right: 0 ;
  margin: 12px;
  background-color: #404040;
  color: #ffffff;
  z-index: 1 !important;
  padding: 6px;
  font-weight: bold;
min-width: 200px ;
`;

const StyledRow = styled.div`
    display: flex;
    flex-direction: row ;
`


const Controls = ({
    onChangeShowOCP,
    onChangeShowBus,
    onChangeShowOCPSecurity,
    isLoading
}) => {

    return (
        <Container>
            <StyledRow>
                <input onChange={(e) => {
                    onChangeShowOCP(e.target.checked)
                }}
                    type="checkbox" id="ocpbuilding" defaultChecked={true}
                />
                <label htmlFor="ocpbuilding"> OCP building 3D </label>
            </StyledRow>
            <StyledRow>
                <input onChange={(e) => {
                    onChangeShowBus(e.target.checked)
                }}
                    type="checkbox" id="ocpbus" defaultChecked={true}
                />
                <label htmlFor="ocpbus"> OCP Bus 3D </label>
            </StyledRow>
            <StyledRow>
                <input onChange={(e) => {
                    onChangeShowOCPSecurity(e.target.checked)
                }}
                    type="checkbox" id="ocpsecurity" defaultChecked={true}
                />
                <label htmlFor="ocpsecurity"> OCP Security 3D </label>
            </StyledRow>

        </Container >
    );
};

export default Controls;
