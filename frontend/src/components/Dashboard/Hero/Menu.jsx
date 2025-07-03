import React from 'react'

const Menu = () => {
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
            <button className="px-6 py-3 bg-amber-500 text-gray-900 font-semibold rounded hover:bg-amber-600 transition">
              Get Started
            </button>
            <button className="px-6 py-3 border border-amber-500 text-amber-500 font-semibold rounded hover:bg-amber-500 hover:text-gray-900 transition">
              Learn More
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

      </div>
  )
}

export default Menu
