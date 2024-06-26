import React from "react";
import Timetable from "../../components/timetable/Timetable";
import { TimetablePopupProvider } from "../../contexts/TimetablePopupProvider";
import { TimeblockContext, TimeblockProvider } from "../../contexts/TimeblockProvider";
import TimetableRow from "../../components/timetable/TimetableRow";
import { TimeBlock } from "../../types/timetable";

function TimetablePage() { 
    return (
        <>
            {/* <TimeblockProvider>
                <TimetablePopupProvider>
                    <h1> Timetable </h1>
                    <Timetable/>
                </TimetablePopupProvider>
            </TimeblockProvider> */}
            <TimetablePopupProvider>
                <TimeblockContext.Provider value={{
                    timeBlocks: [
                        {
                        id: '1',
                        name: 'Test Block 1',
                        day: 'Mon',
                        startTime: '09:00',
                        duration: '02:00',
                        endTime: '11:00'
                        },
                        {
                        id: '2',
                        name: 'Test Block 2',
                        day: 'Mon',
                        startTime: '09:00',
                        duration: '02:00',
                        endTime: '11:00'
                        }
                    ],
                    setTimeBlocks: () => [],
                }}>
                    <TimetableRow day="Mon" />
                </TimeblockContext.Provider>
            </TimetablePopupProvider>
        </>
    )
}

export default TimetablePage;