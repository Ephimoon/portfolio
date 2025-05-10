import React from 'react';

const ConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 bg-second/30 flex justify-center items-center">
      <div className="bg-white rounded-3xl border-3 border-second p-8 max-w-sm w-full text-center shadow-xl">
        <h2 className="text-second text-xl font-bold font-gaegu pb-6">Confirm before sending?</h2>
        <div className="flex justify-center gap-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 border-2 border-red-400 text-red-400 rounded-md font-gaegu hover:bg-red-50 cursor-pointer"
          >
            cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 border-2 border-green-400 text-green-500 rounded-md font-gaegu hover:bg-green-50 cursor-pointer"
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
