
import { Route, Routes } from 'react-router-dom'
import Login from './components/Auth/Login.jsx'
import Signup from './components/Auth/Signup.jsx'
import Layout from './components/Layout.jsx'
// import Hero from './components/Dashboard/Hero.jsx'
import StudentsDashboard from './components/StudentsDashboard/Dashboard.jsx';
import TeacherDashboard from './components/TeachersDashboard/Dashboard.jsx';

import AuthCallback from './components/Auth/AuthCallback.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';
import SyllabusPage from './components/StudentsDashboard/Pages/SyllabusPage.jsx'
import TeacherCourses from './components/TeachersDashboard/Hero/pages/Course/TeacherCourses.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const Navigate = useNavigate();

  
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}, []);


  return (
    <>
<Routes>
{/* <Route path='/' element={<Login/>}></Route> */}
  {/* Shell layout */}
  <Route element={<Layout />}>
    <Route path='/teacher-dashboard' element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>}/>
    <Route path="/student-dashboard" element={<ProtectedRoute><StudentsDashboard /></ProtectedRoute>}/>
    <Route path='/syllabuspage' element={<ProtectedRoute><SyllabusPage/></ProtectedRoute> }/>
    <Route path='/courses/teacher' element={<ProtectedRoute><TeacherCourses /></ProtectedRoute>}/>
  </Route>

  {/* Public routes */}
  <Route
    path="/login"
    element={
      <PublicRoute>
        <Login />
      </PublicRoute>
    }
  />
  <Route
    path="/signup"
    element={
      <PublicRoute>
        <Signup />
      </PublicRoute>
    }
  />

  <Route path="/auth/callback" element={<AuthCallback />} />

</Routes>

</>
  )
}

export default App
