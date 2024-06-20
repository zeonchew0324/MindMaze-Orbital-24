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
    // FORMAT: HH:MM String
    {
      id: '0',
      name: 'Lic',
      startTime: '03:00',
      duration: '03:00',
      endTime: '06:00',
      day: 'Tue',
    },
    { 
      id: '1',
      name: 'Mic',
      startTime: '00:00',
      duration: '03:00',
      endTime: '03:00',
      day: 'Tue',
    },
    {
      id: '2',
      name: 'Dig',
      startTime: '13:00',
      duration: '03:00',
      endTime: '16:00',
      day: 'Wed',
    },
    {
      id: '10',
      name: 'Mic',
      startTime: '09:00',
      duration: '03:00',
      endTime: '12:00',
      day: 'Mon',
    },
  ]);

  return (
    <TimeblockContext.Provider value={{ timeBlocks, setTimeBlocks }}>
      {children}
    </TimeblockContext.Provider>
  );
};
