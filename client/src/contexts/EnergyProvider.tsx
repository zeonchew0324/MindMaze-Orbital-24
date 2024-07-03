import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthProvider';

interface EnergyContextType {
  energy: number;
  increaseEnergy: (num: number) => void;
  decreaseEnergy: (num: number) => void;
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
  const [energy, setEnergy] = useState<number>(99999999);

  // useEffect(() => {
  //   const getUid = async () => currentUser?.uid
  //   const fetchEnergy = async (token: string) => {
  //     try {
  //       const uid = await getUid()
  //       console.log(uid)
  //       const response = await axios.get(`/api/energy/${uid}`, {
  //         headers: {
  //           Authorization: "Bearer " + token
  //         }
  //       })
  //       setEnergy(response.data)
  //       console.log('Successfully fetched habits')
  //     } catch (error) {
  //       console.error('Error fetching habits:', error)
  //     }
  //   };
  
  //   fetchEnergy(token);
  // }, [])

  // useEffect(() => {
  //   const getUid = async () => currentUser?.uid
  //   const fetchEnergy = async (token: string) => {
  //     try {
  //       const uid = await getUid()
  //       console.log(uid)
  //       const response = await axios.put(`/api/energy/${uid}`, {
  //         headers: {
  //           Authorization: "Bearer " + token
  //         }
  //       })
  //       setEnergy(response.data)
  //       console.log('Successfully fetched habits')
  //     } catch (error) {
  //       console.error('Error fetching habits:', error)
  //     }
  //   };
  
  //   fetchEnergy(token);
  // }, [])

  const increaseEnergy = (num: number) => {
    setEnergy(x => x + num);
  };

  const decreaseEnergy = (num: number) => {
    setEnergy(x => x - num);
  };

  return (
    <EnergyContext.Provider value={{energy, increaseEnergy, decreaseEnergy}}>
      {children}
    </EnergyContext.Provider>
  );
};