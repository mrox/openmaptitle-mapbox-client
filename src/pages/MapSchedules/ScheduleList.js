import React, { useState } from 'react';
import ScheduleItem from './ScheduleItem';


function ScheduleList() {

    return (

        <div className='w-96 top-0.5 left-0.5 bottom-12 z-10 m-6 rounded-lg shadow-lg absolute bg-white p-4 flex flex-col'>

            <div className='flex flex-row px-2 w-full font-medium text-sm'>
                Schedules
            </div>
            <div className='py-3'>
                <ScheduleItem />
            </div>
        </div>
    );
}


export default ScheduleList;
