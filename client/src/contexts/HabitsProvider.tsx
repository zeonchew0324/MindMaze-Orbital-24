import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import axios from 'axios';
import { unpackHabitData } from '../utils/habits';

interface Habit {
  id: string;
  name: string;
  day: string;
}

interface HabitsContextType {
  habits: Habit[];
  addHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void
  fetchHabits: () => void
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

  const getUid = async () => currentUser?.uid
  const fetchHabits = async () => {
    try {
      const uid = await getUid()
      console.log(uid)
      const response = await axios.get(`/api/habits/${uid}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      const habits = unpackHabitData(response.data)
      setHabits(habits)
      console.log('Successfully fetched habits')
    } catch (error) {
      console.error('Error fetching habits:', error)
    }
  };

  const addHabit = (habit: Habit) => {
    setHabits((prevHabits) => [...prevHabits, habit]);
  };

  const deleteHabit = async (id: string) => {
    const uid = currentUser?.uid;
    try {
      await axios.delete(`/api/habits/${uid}/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(id + 'Habit deleted successfully!');
      setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  return (
    <HabitsContext.Provider value={{ habits, addHabit, deleteHabit, fetchHabits}}>
      {children}
    </HabitsContext.Provider>
  );
};