import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { TimeBlock } from '../types/timetable';
import axios from 'axios';
import { packTTData, sortWithStartTime, unpackTTData } from '../utils/timetable';
import { useAuth } from './AuthProvider';

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
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>([
    // TIMEBLOCKS NEED TO BE SORTED ACCORDING TO START TIME!!!!!!
    // FORMAT: HH:MM String
  ]);

  const { currentUser, token } = useAuth()

  useEffect(() => {
    const getUid = async () => currentUser?.uid
    const fetchTimeBlocks = async (token: string) => {
      try {
        const uid = await getUid()
        const response = await axios.get(`/api/timetables/${uid}/0`, {
          headers: {
            Authorization: 'Bearer ' + token,
          }
        })
        const sortedTimeBlocks = unpackTTData(response.data).sort(sortWithStartTime) 
        setTimeBlocks(sortedTimeBlocks)
      } catch (error) {
        console.error('Error fetching time blocks:', error)
      }
    };

    fetchTimeBlocks(token);
  }, [])

  useEffect(() => {
    const getUid = async () => currentUser?.uid
    const updateTimeBlocks = async (updatedTimeBlocks: TimeBlock[]) => {
      try {   
        const uid = await getUid()
        const reqBody = packTTData(updatedTimeBlocks) 
        await axios.put(`/api/timetables/${uid}/0`, reqBody, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        console.log('Timetable updated successfully!');
      } catch (error) {
        console.error('Error fetching time blocks:', error)
      }
    };

    updateTimeBlocks(timeBlocks);
  }, [timeBlocks])

  return (
    <TimeblockContext.Provider value={{ timeBlocks, setTimeBlocks }}>
      {children}
    </TimeblockContext.Provider>
  );
};
