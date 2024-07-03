import React from 'react'
import { useEnergy } from '../../contexts/EnergyProvider';

type PopupProps = {
  isOpen: boolean;
  groupSize: number;
  onReveal: () => void;
  onCancel: () => void;
};

function MazePopup({ isOpen, groupSize, onReveal, onCancel }: PopupProps) {
  const { energy } = useEnergy()
  
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="text-gray-800 bg-white p-4 rounded shadow-md text-center">
        <p>This will cost you {groupSize} points of energy.</p>
        <div className='text-red-600'>
          {energy < groupSize ? 'Insufficient Energy!': undefined}
        </div>
        <div className="mt-4">
          {
            energy < groupSize 
            ? <button className="px-4 py-2 bg-blue-300 text-white rounded mr-2">
                Unlock
              </button>
            : <button onClick={onReveal} className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
                Unlock
              </button>
          }
          <button onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default MazePopup