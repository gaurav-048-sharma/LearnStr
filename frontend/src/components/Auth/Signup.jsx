import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
// import axios from 'axios';


const Signup = () => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const Navigate = useNavigate ();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Here you would typically handle the signup logic, e.g., API call
        console.log(username);
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(confirmPassword);
        // For now, let's just navigate to the home page after "signing up"
        if (username && name && email && password && confirmPassword) {
            Navigate('/dashboard');
        }

    }

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
        <div className="w-full bg-gray-900 max-w-lg p-2 space-y-6  rounded-2xl shadow-lg shadow-amber-500" >
      <form onClick={handleSubmit} className="bg-black p-10 rounded-2xl shadow-md w-full max-w-lg ">
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
          {/* <svg
            className="w-5 h-5 mr-2"
            viewBox="0 0 533.5 544.3"
          >
            <path
              fill="#4285F4"
              d="M533.5 278.4c0-18.8-1.5-37-4.4-54.6H272v103.3h147.3c-6.3 33.7-25.2 62.2-53.9 81.3v67h87.1c51.1-47.1 80.5-116.5 80.5-197z"
            />
            <path
              fill="#34A853"
              d="M272 544.3c72.8 0 133.8-24.1 178.4-65.3l-87.1-67c-24.3 16.3-55.4 25.8-91.3 25.8-70 0-129.3-47.2-150.6-110.6h-90v69.3C85.8 486.7 171.3 544.3 272 544.3z"
            />
            <path
              fill="#FBBC05"
              d="M121.4 326.2c-10.1-30.2-10.1-62.7 0-92.9v-69.3h-90c-39.2 77.2-39.2 168.8 0 246l90-69.3z"
            />
            <path
              fill="#EA4335"
              d="M272 107.7c39.7 0 75.4 13.7 103.5 40.7l77.5-77.5C405.8 24.1 344.8 0 272 0 171.3 0 85.8 57.6 31.4 146.7l90 69.3C142.7 154.9 202 107.7 272 107.7z"
            />
          </svg>
          Continue with Google
      </GoogleLogin> */}


         
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

        <div className="flex gap-4">
        <div className="w-1/2">
            <input
            type="password"
            id="password"
            className="w-full px-4 py-2 text-gray-500 border border-gray-700 rounded focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>

        <div className="w-1/2">
            <input
            type="password"
            id="confirmPassword"
            className="w-full px-4 py-2 text-gray-500 border border-gray-700 rounded focus:outline-none"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
        </div>
        </div>

        <button

          type="submit"
          className="mt-4 w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-600 transition-colors"
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