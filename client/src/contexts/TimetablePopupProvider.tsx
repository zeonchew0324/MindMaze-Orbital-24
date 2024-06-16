import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { createContext } from "react"

type TTPopupContextType = {
  isPopupOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
};

const PopupContext = createContext<TTPopupContextType | undefined>(undefined);

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
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  return (
    <PopupContext.Provider value={{ isPopupOpen, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
};
