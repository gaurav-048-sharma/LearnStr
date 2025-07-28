import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  //   const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem('role', response.data.user.role);
      console.log("Manual Login successful:", response.data);
      // navigate('/dashboard'); // Redirect to dashboard
      if (response.data.role === "teacher") {
        navigate("/teacher-dashboard");
      } else if (response.data.role === "student") {
        navigate("/student-dashboard"); 
      } else {
        navigate("/login"); 
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login failed."); 
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {

  //     const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
  //       email,
  //       password,
  //     });

  //     console.log('Login response:', response.data);

  //     if (response.data.token) {
  //       localStorage.setItem('token', response.data.token);
  //       axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
  //       console.log('Saved token:', localStorage.getItem('token'));

  //       if (response.data.role === 'student') {
  //         navigate('/dashboard');
  //       } else if (response.data.role === 'teacher') {
  //         navigate('/teacher-dashboard');
  //       } else {
  //         navigate('/dashboard');
  //       }
  //     } else {
  //       console.error('No token received!');
  //     }

  //   } catch (error) {
  //     console.error('Login error:', error);
  //     alert(error.response?.data?.message || 'Login failed.');
  //   }
  // };

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/auth/google`;
    // This will redirect the user to the Google authentication page
    // After successful authentication, the user will be redirected back to your frontend
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-black ">
      <div className="w-full bg-black max-w-lg p-2 space-y-6  rounded-2xl shadow-sm shadow-amber-500">
        <h2 className="text-2xl font-bold  text-center text-gray-300">
          Welcome to learnStream
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Sign up to start your journey with us
        </p>
        {/* Google Auth Button */}
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={(error) => {
            console.error("Google Login failed:", error);
            navigate("/signup");
          }}
          type="button"
          className="flex items-center justify-center w-full border border-gray-200 py-2 rounded mb-6 bg-gray-200 transition-colors focus:outline-none"
          text="signup_with"
          shape="rectangular"
          size="large"
        />
        <div className="flex items-center my-3">
          <hr className="flex-grow border-t border-gray-700" />
          <span className="mx-4 text-gray-500">OR</span>
          <hr className="flex-grow border-t border-gray-700" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-black  p-10 rounded-2xl shadow-sm shadow-amber-500 w-full max-w-lg "
        >
          {/* Email/Password Inputs */}
          <div className="mb-4">
            {/* <label htmlFor="email" className="block text-gray-700 mb-2">Email</label> */}
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 text-gray-500 border-1 border-gray-700 rounded focus:outline-none"
              placeholder="john@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              // onChange={handleChange}
              // value={formData?.email}
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
            <a href="#" className="text-amber-600 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-600 transition-colors cursor-pointer"
          >
            Login
          </button>
          <div className="mt-6 ">
            <p className="mt-4 text-center text-gray-500">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-amber-600 hover:underline"
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
