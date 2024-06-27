import React from "react";
import Timetable from "../../components/timetable/Timetable";
import { TimetablePopupProvider } from "../../contexts/TimetablePopupProvider";
import { TimeblockContext, TimeblockProvider } from "../../contexts/TimeblockProvider";

function TimetablePage() { 
    return (
        <>
            <TimeblockProvider>
                <TimetablePopupProvider>
                    <h1> Timetable </h1>
                    <Timetable/>
                </TimetablePopupProvider>
            </TimeblockProvider>
        </>
    )
}

export default TimetablePage;