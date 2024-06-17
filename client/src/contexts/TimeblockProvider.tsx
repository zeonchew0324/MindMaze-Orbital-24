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
    {
      id: '1',
      name: 'Lic',
      startTime: '10:00',
      duration: '1:00',
      endTime: '11:00',
      day: 'Sat',
    },
    {
      id: '0',
      name: 'Lic',
      startTime: '11:00',
      duration: '1:00',
      endTime: '12:00',
      day: 'Mon',
    },
    // add more blocks as needed
  ]);

  return (
    <TimeblockContext.Provider value={{ timeBlocks, setTimeBlocks }}>
      {children}
    </TimeblockContext.Provider>
  );
};
