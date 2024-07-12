import React from "react";
import Timetable from "../../components/timetable/Timetable";
import { TimetablePopupProvider } from "../../contexts/TimetablePopupProvider";
import { TimeblockContext, TimeblockProvider } from "../../contexts/TimeblockProvider";

function TimetablePage() { 
    return (
        <>
            <TimeblockProvider>
                <TimetablePopupProvider>
                    <div className="pt-[100px] pb-[100px] h-screen">
                        <h1> Timetable </h1>
                        <Timetable/>
                    </div>
                </TimetablePopupProvider>
            </TimeblockProvider>
        </>
    )
}

export default TimetablePage;