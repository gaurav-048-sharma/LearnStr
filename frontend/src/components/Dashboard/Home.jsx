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
      className="relative min-h-screen flex flex-col justify-center items-center bg-cover bg-center "
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
          {/* BLACK ALPHA LAYER */}
       <div className="absolute inset-0 bg-black opacity-50"></div>


      <div className="bg-[#000]/70 opacity-70 p-12 rounded-2xl shadow-2xl text-center">
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
