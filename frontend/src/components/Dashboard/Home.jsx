import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Home = () => {
  const navigate = useNavigate();
    const chooseRole = async (role) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/update-role`,{ role },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
      localStorage.setItem('token', response.data.token);
      console.log('Update successful:', response.data);
      navigate('/dashboard');
  } catch (error) {
    console.log(error);
    alert('Failed to update role');
  }
};


  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://source.unsplash.com/1600x900/?classroom,education')`,
      }}
    >
      <div className="bg-black bg-opacity-70 p-12 rounded-2xl shadow-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Welcome to LearnStream
        </h1>
        <p className="text-gray-300 mb-8">
          Please select how you would like to log in:
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          <button
            onClick={() => chooseRole('teacher')}
            className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Login as Student
          </button>
          <button
            onClick={() => chooseRole('student')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login as Teacher
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
