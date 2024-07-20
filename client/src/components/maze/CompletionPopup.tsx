import React from 'react';

type PopupProps = {
  onClose: () => void;
  onGenerateMaze: () => void;
};

const CompletionPopup: React.FC<PopupProps> = ({ onClose, onGenerateMaze }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl text-black font-bold mb-4">Congratulations!</h2>
        <p className="mb-4 text-black">You have completed the maze.</p>
        <button
          onClick={() => {
            onGenerateMaze();
            onClose();
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default CompletionPopup;