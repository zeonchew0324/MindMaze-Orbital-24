import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { createContext } from "react"
import { TimeBlock } from '../types/timetable';

type TTPopupContextType = {
  isPopupOpen: boolean
  openPopup: (content: TimeBlock | undefined) => void
  closePopup: () => void
  popupContent: TimeBlock | undefined
};

export const PopupContext = createContext<TTPopupContextType | undefined>(undefined);

export const useTimetablePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};

type TTPopupProviderProps = {
  children: ReactNode;
};

export const TimetablePopupProvider: React.FC<TTPopupProviderProps> = ({ children }) => {
  const [isPopupOpen, setPopupOpen] = useState(false)
  const [popupContent, setPopupContent] = useState<TimeBlock | undefined>(undefined)

  const openPopup = (content: TimeBlock | undefined) => {
    console.log('popup opened')
    setPopupContent(content)
    setPopupOpen(true)
  }
  const closePopup = () => {
    setPopupOpen(false)
  };

  return (
    <PopupContext.Provider value={{ isPopupOpen, openPopup, closePopup, popupContent }}>
      {children}
    </PopupContext.Provider>
  );
};
