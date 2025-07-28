import { Button } from '@headlessui/react';
import axios from 'axios';
import React,{useState}  from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const openPopup = () => setIsOpen(true);
    const closePopup = () => setIsOpen(false);
      const [title, setTitle] = useState('');
      const [description, setDescription] = useState('');
      const [videos, setVideos] = useState([]);
    
      const handleFileChange = (e) => {
        setVideos(e.target.files); // multiple files
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
    
        for (let i = 0; i < videos.length; i++) {
          formData.append('videos', videos[i]); // backend expects 'videos'
        }
    
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/courses`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          );
    
          console.log('Course created:', response.data);
          alert('Course created successfully!');
        } catch (error) {
          console.error('Error creating course:', error);
          alert(error.response?.data?.message || 'Error creating course');
        }
      };


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
                <div className="fixed inset-0 flex items-center justify-center  bg-opacity-70 z-50">
                  <div className="bg-black w-full max-w-2xl rounded-xl shadow-2xl relative p-8 overflow-auto">
                    <button
                      onClick={ closePopup}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-600 text-3xl font-bold"
                    >
                      &times;
                    </button>

                    <h2 className="text-2xl font-bold text-center mb-6 text-amber-500">Create Course</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block mb-1 text-gray-700 font-medium py-2">Title</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500"
                          placeholder="Enter course title"
                        />
                      </div>

                      <div>
                        <label className="block mb-1 text-gray-700 font-medium py-2">Description</label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                          className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 resize-none focus:outline-none focus:border-amber-500"
                          placeholder="Enter course description"
                        ></textarea>
                      </div>

                      <div>
                        <label className="block mb-1 text-gray-700 font-medium py-2">Upload Videos</label>
                        <input
                          type="file"
                          multiple
                          accept="video/*"
                          onChange={handleFileChange}
                          required
                          className="block w-full text-gray-700 focus:border-amber-500 border border-gray-300 rounded-lg px-4 py-2"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                      >
                        Create Course
                      </button>
                    </form>
                  </div>
                </div>
              )}

            <Link to={"/courses/teacher"} className="px-6 py-3 border border-amber-500 text-amber-500 font-semibold rounded hover:bg-amber-500 hover:text-gray-900 transition">
               Courses
            </Link>
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
