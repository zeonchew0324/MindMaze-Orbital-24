import React from "react";
import Timetable from "../../components/timetable/Timetable";
import { TimetablePopupProvider } from "../../contexts/TimetablePopupProvider";
import { TimeblockProvider } from "../../contexts/TimeblockProvider";
import TimetableCell from "../../components/timetable/TimetableCell";
import { TimeBlock } from "../../types/timetable";

function TimetablePage() { 
    const block: TimeBlock = {
        id: '1',
        name: 'Test Block',
        day: 'Mon',
        startTime: '09:00',
        duration: '01:00',
        endTime: '10:00'
      };
    return (
        <>
            {/* <TimeblockProvider>
                <TimetablePopupProvider>
                    <h1> Timetable </h1>
                    <Timetable/>
                </TimetablePopupProvider>
            </TimeblockProvider> */}
            <TimetablePopupProvider>
                <TimetableCell block={block} />
            </TimetablePopupProvider>
        </>
    )
}

export default TimetablePage;