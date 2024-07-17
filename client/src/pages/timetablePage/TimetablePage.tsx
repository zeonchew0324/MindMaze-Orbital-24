import React from "react";
import Timetable from "../../components/timetable/Timetable";
import { TimetablePopupProvider } from "../../contexts/TimetablePopupProvider";
import { TimeblockProvider } from "../../contexts/TimeblockProvider";

function TimetablePage() { 
    return (
        <>
            <TimeblockProvider>
                <TimetablePopupProvider>
                    <div className="pt-[30px] pb-[100px] h-screen">
                        <h1 className="text-3xl font-bold text-center text-gray-800 my-4">
                            Timetable
                        </h1>
                        <div className="flex w-[99vw] justify-center items-center flex-col">
                            <Timetable/>    
                        </div>
                    </div>
                </TimetablePopupProvider>
            </TimeblockProvider>
        </>
    )
}

export default TimetablePage;