import React from 'react'

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};


function TimetablePopupCreate({ isOpen, onClose, children }: PopupProps) {
  if (!isOpen) return null
   
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"> 
        <button
          onClick={onClose}
          className="relative top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}


export default TimetablePopupCreate