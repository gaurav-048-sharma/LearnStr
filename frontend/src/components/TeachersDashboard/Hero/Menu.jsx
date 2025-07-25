import { Button } from '@headlessui/react';
import React,{useState}  from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);
  return (
      <div className="relative translate-y-30 max-w-7xl bg-[#1D1C20] mx-auto p-10 sm:p-10 flex flex-col md:flex-row items-center gap-12 rounded-2xl">
        
        {/* Left: Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Unlock Knowledge with <span className="text-amber-400">LearnStream</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-300">
            Master DSA, System Design, Core Subjects, and Interview Prep with a modern, seamless learning experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <button onClick={openPopup}  className="px-6 py-3 bg-amber-500 text-gray-900 font-semibold rounded hover:bg-amber-600 transition">
              Upload
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

                    <h2 className="text-gray-700 text-2xl mb-4">Popup Content</h2>
                    <p className='text-gray-700'>
                      This is the content inside the popup. You can add forms, text,
                      images, anything you like here.
                    </p>
                  </div>
                </div>
              )}
            <button className="px-6 py-3 border border-amber-500 text-amber-500 font-semibold rounded hover:bg-amber-500 hover:text-gray-900 transition">
               Courses
            </button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1">
          <img
            src="/public/logo.png" // 👈 Replace with your image path
            alt="LearnStream Hero"
            className="w-full rounded-lg shadow-lg shadow-amber-500/30 transition-transform transform hover:scale-105"
          />
        </div>

{/* 
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <button
        onClick={openPopup}
        className="px-6 py-3 bg-amber-600 text-white rounded hover:bg-amber-700"
      >
        Open Popup
      </button>


    </div> */}
      </div>
  )
}

export default Menu
