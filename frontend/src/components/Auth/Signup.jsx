import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';


const Signup = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const Navigate = useNavigate();
    const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
      username,
      name,
      email,
      password,
      role,
    });

    // Store token first (if your backend sends it)
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      Navigate('/dashboard');
    }

    alert('Signup successful!');

    // // Navigate based on role
    // if (response.data.role === 'student') {
    //   Navigate('/student-dashboard');
    // } else if (response.data.role === 'teacher') {
    //   Navigate('/teacher-dashboard');
    // } else {
    //   // fallback if no role matched
    //   Navigate('/login');
    // }

  } catch (error) {
    console.error(error);
    alert(error.response?.data?.error || 'Signup failed');
  }
};


    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
    //         username,
    //         name,
    //         email,
    //         password,
    //         role,
    //       }) 
    //             if (response.data.role === 'student') {
    //     Navigate('/student-dashboard');
    //   } else {
    //     Navigate('/teacher-dashboard');
    //   }
    //        if (response.data.token) {
    //             localStorage.setItem('token', response.data.token);
    //             alert('Signup and verification successful!');
    //             Navigate('/login');
    //       }
    //       // localStorage.getItem("token", response.data.token);
    //       console.log(response.data.token)
    //     } catch(error) {
    //       console.log(error)
    //       Navigate("/login");
    //       alert(error.response?.data?.error || 'Signup failed');
    //     }
    // }

  //   const handleGoogleSignup = async (credentialResponse) => {
  //   try {
  //     const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google-login`, {
  //       token: credentialResponse.credential,
  //     });
  //     localStorage.setItem('token', response.data.token);
  //     console.log('Google Signup successful:', response.data);
  //     Navigate('/');
  //   } catch (err) {
  //     console.error('Google Signup error:', err);
  //     Navigate('/signup?error=google');
  //   }
  // };
  const handleGoogleSignup = () => {
  window.location.href = `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`;
  // This will redirect the user to the Google authentication page
  // After successful authentication, the user will be redirected back to your frontend

};


  return (
    <div className="flex items-center justify-center min-h-screen bg-black ">
        <div className="w-full bg-[#1D1C20] max-w-lg p-2 space-y-6  rounded-2xl shadow-lg shadow-amber-500" >
                  <h2 className="text-2xl font-bold  text-center text-gray-300">Welcome to learnStream</h2>
        <p className="text-gray-600 mb-6 text-center">Sign up to start your journey with us</p>
        

        {/* Google Auth Button */}
        <GoogleLogin
            onSuccess={handleGoogleSignup}
            onError={(error) => {
                console.error('Google Login failed:', error);
                Navigate('/login'); 
            }}
          type="button"
          className="flex items-center justify-center w-full border border-gray-200 py-2 rounded mb-6 bg-gray-200 transition-colors focus:outline-none"
          text="signup_with"
          shape="rectangular"
          size="large"
        />
        <form onSubmit={handleSubmit} className="bg-black p-10 rounded-2xl shadow-md w-full max-w-lg ">

         <div className="flex items-center my-6">
            <hr className="flex-grow border-t border-gray-700" />
            <span className="mx-4 text-gray-500">OR</span>
            <hr className="flex-grow border-t border-gray-700" />
        </div>

        <div className="mb-4">
          {/* <label htmlFor="email" className="block text-gray-700 mb-2">Email</label> */}
          <input
            type="text"
            id="username"
            className="w-full px-4 py-2 text-gray-500 border-1 border-gray-700 rounded focus:outline-none"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

                <div className="mb-4">
          {/* <label htmlFor="email" className="block text-gray-700 mb-2">Email</label> */}
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 text-gray-500 border-1 border-gray-700 rounded focus:outline-none"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email/Password Inputs */}
        <div className="mb-4">
          {/* <label htmlFor="email" className="block text-gray-700 mb-2">Email</label> */}
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 text-gray-500 border-1 border-gray-700 rounded focus:outline-none"
            placeholder="john@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

          <div className="mb-4 flex gap-4">
              <input
                type="password"
                id="password"
                className="flex-1 px-4 py-2 text-gray-500 border border-gray-700 rounded focus:outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="flex-1 px-4 py-3 text-gray-500 border border-gray-700 rounded-lg focus:outline-none  appearance-none transition"
              >
                <option className='bg-[#1D1C20]'  value="" disabled>Select role</option>
                <option className='bg-[#1D1C20]' value="student">Student</option>
                <option className='bg-[#1D1C20]' value="teacher">Teacher</option>
              </select>
            </div>



        <button

          type="submit"
          className="mt-4 w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-600 transition-colors cursor-pointer"
        >
          Sign Up
        </button>
        <div className="mt-6 ">
            <p className="mt-4 text-center text-gray-500">
                Don't have an account? <span onClick={() => Navigate("/login")} className="text-amber-600 hover:underline">Sign In</span>
            </p>
        </div>
      </form>
      </div>
    </div>
  )
}

export default Signup