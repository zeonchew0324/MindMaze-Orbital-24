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
        console.log(uid)
        const response = await axios.get(`/api/habits/O88bAP4mzfYKKtm41LqVHafNuVA2`, {
          headers: {
            Authorization: "Bearer: eyJhbGciOiJSUzI1NiIsImtpZCI6ImYwOGU2ZTNmNzg4ZDYwMTk0MDA1ZGJiYzE5NDc0YmY5Mjg5ZDM5ZWEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTmlnZXMiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWluZC1tYXplLThkYzYyIiwiYXVkIjoibWluZC1tYXplLThkYzYyIiwiYXV0aF90aW1lIjoxNzE5MDY4NDE1LCJ1c2VyX2lkIjoiTzg4YkFQNG16ZllLS3RtNDFMcVZIYWZOdVZBMiIsInN1YiI6Ik84OGJBUDRtemZZS0t0bTQxTHFWSGFmTnVWQTIiLCJpYXQiOjE3MTkwNjg0MTUsImV4cCI6MTcxOTA3MjAxNSwiZW1haWwiOiJ0ZXN0MkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdDJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.TE37DfXZnPGOQcXF8nOHmH825-H6pbY99Q0ZWJ9oFueqpBJj-ZqBTTxjJEfFjHc7cGGBVMx8mORoVNlQNdFTIirhMwScHtmhJP9mC85Ymko7vHILrkwnE783dvkGgHzfqqWU0EqQiJ4YvOXtgd28IYNjLVshS3QL5sPCsiQzBtRxrQvfxScHQe3JGUZLbVhcXguUhXEN5d7I5szBaDX8M51RHwANFxtQobDUuvd2OfO-9psL2WipbIwAzcFzuCJs7mBUW-wLKrtLm7AgIhqd4Hxr-CNCnHNSpnIocGrtEAjX7MdEC2bnUVH_mhXdJHgf2lRDPVnTWYGDwxIJb7DWgw"
          }
        })
        const habits = unpackHabitData(response.data)
        setHabits(habits)
        console.log('Successfully fetched habits')
      } catch (error) {
        console.error('Error fetching habits:', error)
      }
    };
  
    fetchHabits(token);
  }, [])

  const addHabit = (habit: Habit) => {
    setHabits((prevHabits) => [...prevHabits, habit]);
  };

  const deleteHabit = async (id: string) => {
    const uid = currentUser?.uid;
    try {
      await axios.delete(`/api/habits/${uid}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(id + 'Habit deleted successfully!');
      setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  return (
    <HabitsContext.Provider value={{ habits, addHabit, deleteHabit}}>
      {children}
    </HabitsContext.Provider>
  );
};