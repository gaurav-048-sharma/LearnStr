import React, { useState } from 'react';

const SyllabusPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <button
        onClick={openPopup}
        className="px-6 py-3 bg-amber-600 text-white rounded hover:bg-amber-700"
      >
        Open Popup
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white w-[80%] h-[80%] rounded-lg shadow-lg relative p-6 overflow-auto">
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
            >
              &times;
            </button>

            <h2 className="text-2xl mb-4">Popup Content</h2>
            <p>
              This is the content inside the popup. You can add forms, text,
              images, anything you like here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SyllabusPage;
