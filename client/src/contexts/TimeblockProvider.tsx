import React, { ReactNode, createContext, useContext, useState } from 'react';
import { TimeBlock } from '../types/timetable';

type TimeblockContextType = {
  timeBlocks: TimeBlock[];
  setTimeBlocks: React.Dispatch<React.SetStateAction<TimeBlock[]>>;
}

const TimeblockContext = createContext<TimeblockContextType | undefined>(undefined);

export const useTimeblock = () => {
  const context = useContext(TimeblockContext);
  if (!context) {
    throw new Error('useTimeblock must be used within a TimeblockProvider');
  }
  return context;
}

type TimeblockProviderProps = {
  children: ReactNode;
};

export const TimeblockProvider = ({ children }: TimeblockProviderProps) => {
  const [timeBlocks, setTimeBlocks] = useState([
    // TIMEBLOCKS NEED TO BE SORTED ACCORDING TO START TIME!!!!!!
    {
      id: '0',
      name: 'Lic',
      startTime: '3:00',
      duration: '3:00',
      endTime: '6:00',
      day: 'Tue',
    },
    {
      id: '1',
      name: 'Mic',
      startTime: '0:00',
      duration: '3:00',
      endTime: '3:00',
      day: 'Tue',
    },
    
    

    // {
    //   id: '2',
    //   name: 'Dig',
    //   startTime: '9:00',
    //   duration: '2:00',
    //   endTime: '11:00',
    //   day: 'Mon',
    // },
    // {
    //   id: '10',
    //   name: 'Mic',
    //   startTime: '9:00',
    //   duration: '2:00',
    //   endTime: '11:00',
    //   day: 'Mon',
    // },
  ]);

  return (
    <TimeblockContext.Provider value={{ timeBlocks, setTimeBlocks }}>
      {children}
    </TimeblockContext.Provider>
  );
};
