import React, { useState } from 'react';
import styled from 'styled-components';
import MapView from '../../components/MapView';
import AssetCreate from './AssetCreate';
import AssetList from './AssetList';



function MapAssets() {
    const [mode, setMode] = useState("list")

    return (
        <StyledContainer className='relative'>
            <MapView />

            <div className='w-96 top-0.5 left-0.5 bottom-12 z-10 m-6 rounded-lg shadow-lg absolute bg-white p-4 flex flex-col'>
                <div className='flex flex-row px-2 w-full text-sm justify-between items-center'>
                    <div className='font-medium'>Assets</div>
                    <div>
                        {
                            mode === "list" ?
                                <button
                                    type='button'
                                    className='inline-block px-3 py-1.5 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out'
                                    onClick={() => setMode("create")}>New</button> :
                                <button
                                    className='inline-block px-3 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                                    onClick={() => setMode("list")}
                                >Save</button>
                        }
                    </div>
                </div>
                <div className='py-3'>
                    {mode === "list" && <AssetList />}
                    {mode === "create" && <AssetCreate />}
                </div>
            </div>

        </StyledContainer>
    );
}

const StyledContainer = styled.div`
    /* display: flex ;
    flex-direction: row ; */
    width: 100% ;
    height: 100% ;
`
export default MapAssets;
