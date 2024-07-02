import React from 'react'
import { TimeBlock } from '../../types/timetable';

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  editingBlock?: TimeBlock;
};


function TimetablePopup({ isOpen, onClose, children }: PopupProps) {
  if (!isOpen) return null
   
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <button
        onClick={onClose}
        className="absolute z-50 top-4 right-4 px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        Close
      </button>
      {children}  
    </div>
  );
}


export default TimetablePopup