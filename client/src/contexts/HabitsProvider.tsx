import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import axios from 'axios';
import { unpackHabitData } from '../utils/habits';

interface Habit {
  id: number;
  name: string;
  day: string;
}

interface HabitsContextType {
  habits: Habit[];
  addHabit: (habit: Habit) => void;
  deleteHabit: (id: number) => void
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

export const useHabits = (): HabitsContextType => {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitsProvider');
  }
  return context;
};


export const HabitsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser, token } = useAuth()
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const getUid = async () => currentUser?.uid
    const fetchHabits = async (token: string) => {
      try {
        const uid = await getUid()
        const response = await axios.get(`/api/habits/${uid}`, {
          headers: {
            Authorization: 'Bearer ' + token,
          }
        })
        const habits = (response.data)
        setHabits(habits)
      } catch (error) {
        console.error('Error fetching time blocks:', error)
      }
    };
  
    fetchHabits(token);
  }, [])

  const addHabit = (habit: Habit) => {
    setHabits((prevHabits) => [...prevHabits, habit]);
  };

  const deleteHabit = (id: number) => {
    setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
  }

  return (
    <HabitsContext.Provider value={{ habits, addHabit, deleteHabit}}>
      {children}
    </HabitsContext.Provider>
  );
};