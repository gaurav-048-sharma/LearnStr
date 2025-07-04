import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      console.log('Login successful:', response.data);
      Navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);

    }
}

  const handleGoogleLogin = () => {
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
            onSuccess={handleGoogleLogin}
            onError={(error) => {
                console.error('Google Login failed:', error);
                Navigate('/signup'); 
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

        {/* Email/Password Inputs */}
        <div className="mb-4">
          {/* <label htmlFor="email" className="block text-gray-700 mb-2">Email</label> */}
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 text-gray-500 border-1 border-gray-700 rounded focus:outline-none"
            placeholder="john@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="mb-6">
          {/* <label htmlFor="password" className="block text-gray-700 mb-2">Password</label> */}
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 text-gray-500 border-1 border-gray-700 rounded   focus:outline-none"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div className="mt-4 text-right  text-gray-500">
          <a href="#" className="text-amber-600 hover:underline">Forgot Password?</a>
        </div>
                <button
          type="submit"
          className="mt-4 w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-600 transition-colors cursor-pointer"
        >
          Login
        </button>
        <div className="mt-6 ">
            <p className="mt-4 text-center text-gray-500">
                Don't have an account? <span onClick={() => Navigate('/signup')} className="text-amber-600 hover:underline">Sign Up</span>
            </p>
        </div>
      </form>
      </div>
    </div>
  );
}


export default Login