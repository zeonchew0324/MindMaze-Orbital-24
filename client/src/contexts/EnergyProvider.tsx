import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';

interface EnergyContextType {
  energy: number;
  increaseEnergy: (num: number) => void;
  decreaseEnergy: (num: number) => void;
  fetchInfo: () => void;
  completeMaze: () => void;
  completedNum: number;
}

const EnergyContext = createContext<EnergyContextType | undefined>(undefined);

export const useEnergy = () => {
  const context = useContext(EnergyContext);
  if (!context) {
    throw new Error('useEnergy must be used within a EnergyProvider');
  }
  return context;
};

export const EnergyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser, token } = useAuth()
  const [energy, setEnergy] = useState<number>(0);
  const [completedNum, setCompletedNum] = useState(0)

  const getUid = async () => currentUser?.uid
  const fetchInfo = async () => {
    try {
      const uid = await getUid()
      console.log(uid)
      const response = await axios.get(`/api/energy/${uid}`, {
        headers: {
          Authorization: "Bearer " + token
        }
      })
      setEnergy(response.data.energy)
      setCompletedNum(response.data.completedNum)
      console.log('Successfully fetched energy info')
    } catch (error) {
      console.error('Error fetching energy:', error)
    }
  };

  useEffect(() => {
    const getUid = async () => currentUser?.uid
    const updateEnergy = async (token: string) => {
      try {
        const uid = await getUid()
        console.log(uid)
        const reqBody = { value: energy, completedNum: completedNum }
        await axios.put(`/api/energy/${uid}`, reqBody, {
          headers: {
            Authorization: "Bearer " + token
          }
        })
        console.log('Successfully updated energy info')
      } catch (error) {
        console.error('Error updating energy and info', error)
      }
    };
  
    updateEnergy(token);
  }, [energy, completedNum])

  const increaseEnergy = (num: number) => {
    setEnergy(x => x + num);
  };

  const decreaseEnergy = (num: number) => {
    setEnergy(x => x - num);
  };

  const completeMaze = () => {
    setCompletedNum(x => x + 1)
  }

  return (
    <EnergyContext.Provider value={{energy, increaseEnergy, decreaseEnergy, fetchInfo, completeMaze, completedNum}}>
      {children}
    </EnergyContext.Provider>
  );
};