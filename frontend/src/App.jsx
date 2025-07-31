// import { Route, Routes, Navigate } from 'react-router-dom'
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// // Auth Components
// import Login from './components/Auth/Login.jsx'
// import Signup from './components/Auth/Signup.jsx'
// import AuthCallback from './components/Auth/AuthCallback.jsx';

// // Layout Components
// import Layout from './components/Layout.jsx'
// import StudentLayout from './components/StudentsLayout.jsx'; // You'll need to create this
// import TeacherLayout from './components/TeachersLayout.jsx'; // You'll need to create this

// // Student Components
// import StudentsDashboard from './components/StudentsDashboard/Dashboard.jsx';
// import LearnMorePage from './components/StudentsDashboard/Pages/LearnMorePage.jsx';
// import CoursePage from './components/StudentsDashboard/Pages/Course/CoursePage.jsx';
// import CourseDetails from './components/StudentsDashboard/Pages/Course/CourseDetaiils.jsx';
// import SyllabusPage from './components/StudentsDashboard/Pages/SyllabusPage.jsx'

// // Teacher Components
// import TeacherDashboard from './components/TeachersDashboard/Dashboard.jsx';
// import CreateCourse from './components/TeachersDashboard/Hero/pages/Course/CreateCourse.jsx';
// import TeacherCourses from './components/TeachersDashboard/Hero/pages/Course/TeacherCourses.jsx';
// import TeacherCourseDetail from './components/TeachersDashboard/Hero/pages/Course/TeacherCourseDetail.jsx';

// // Route Protection Components
// import ProtectedRoute from './components/ProtectedRoute.jsx';
// import PublicRoute from './components/PublicRoute.jsx';
// import RoleBasedRoute from './components/RoleBasedRoute.jsx'; // You'll need to create this

// // 404 Component
// import NotFound from './components/Error/NotFound.jsx'; // You'll need to create this

// // Home Page Component
// import HomePage from './components/HomePage.jsx'; // You'll need to create this

// function App() {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     //const role = localStorage.getItem('role');
    
//     if (token) {
//       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
//       // Validate token and role
//       const validateAuth = async () => {
//         try {
//           // You can add API call to verify token validity here
//           setIsLoading(false);
//         } catch (error) {
//           // If token is invalid, clear storage and redirect to login
//           localStorage.removeItem('token');
//           localStorage.removeItem('role');
//           navigate('/login');
//           setIsLoading(false);
//           console.error('Authentication error:', error);
//         }
//       };
      
//       validateAuth();
//     } else {
//       setIsLoading(false);
//     }
//   }, [navigate]);

//   // Show loading spinner while checking authentication
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   return (
//     <Routes>
//       {/* Root Route - Smart Redirect */}
//       <Route path="/" element={<RootRedirect />} />
      
//       {/* Public Routes */}
//       <Route
//         path="/login"
//         element={
//           <PublicRoute>
//             <Login />
//           </PublicRoute>
//         }
//       />
//       <Route
//         path="/signup"
//         element={
//           <PublicRoute>
//             <Signup />
//           </PublicRoute>
//         }
//       />
//       <Route path="/auth/callback" element={<AuthCallback />} />
      
//       {/* Public Home Page (when not authenticated) */}
//       <Route path="/home" element={<HomePage />} />

//       {/* Student Routes - Nested under /student */}
//       <Route path="/student/*" element={
//         <RoleBasedRoute allowedRoles={['student']}>
//           <StudentLayout />
//         </RoleBasedRoute>
//       }>
//         <Route index element={<Navigate to="dashboard" replace />} />
//         <Route path="dashboard" element={<StudentsDashboard />} />
//         <Route path="courses" element={<CoursePage />} />
//         <Route path="courses/:id" element={<CourseDetails />} />
//         <Route path="syllabus" element={<SyllabusPage />} />
//         <Route path="learn" element={<LearnMorePage />} />
//         {/* Catch any other student routes that don't exist */}
//         <Route path="*" element={<NotFound />} />
//       </Route>

//       {/* Teacher Routes - Nested under /teacher */}
//       <Route path="/teacher/*" element={
//         <RoleBasedRoute allowedRoles={['teacher', 'admin']}>
//           <TeacherLayout />
//         </RoleBasedRoute>
//       }>
//         <Route index element={<Navigate to="dashboard" replace />} />
//         <Route path="dashboard" element={<TeacherDashboard />} />
//         <Route path="courses" element={<TeacherCourses />} />
//         <Route path="courses/:id" element={<TeacherCourseDetail />} />
//         <Route path="create-course" element={<CreateCourse />} />
//         {/* Catch any other teacher routes that don't exist */}
//         <Route path="*" element={<NotFound />} />
//       </Route>

//       {/* Legacy Route Redirects (for backward compatibility) */}
//       <Route path="/student-dashboard" element={<Navigate to="/student/dashboard" replace />} />
//       <Route path="/student-courses" element={<Navigate to="/student/courses" replace />} />
//       <Route path="/student-courses/:id" element={<Navigate to="/student/courses/:id" replace />} />
//       <Route path="/syllabuspage" element={<Navigate to="/student/syllabus" replace />} />
//       <Route path="/teacher-dashboard" element={<Navigate to="/teacher/dashboard" replace />} />
//       <Route path="/courses" element={<Navigate to="/teacher/courses" replace />} />
//       <Route path="/course/:id" element={<Navigate to="/teacher/courses/:id" replace />} />
//       <Route path="/create-course" element={<Navigate to="/teacher/create-course" replace />} />

//       {/* 404 Route - Must be last */}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }

// // Root Redirect Component
// function RootRedirect() {
//   const token = localStorage.getItem('token');
//   const role = localStorage.getItem('role');

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   // Redirect based on role
//   switch (role) {
//     case 'student':
//       return <Navigate to="/student/dashboard" replace />;
//     case 'teacher':
//     case 'admin':
//       return <Navigate to="/teacher/dashboard" replace />;
//     default:
//       // If role is invalid, redirect to login
//       localStorage.removeItem('token');
//       localStorage.removeItem('role');
//       return <Navigate to="/login" replace />;
//   }
// }

// export default App


import { Route, Routes } from 'react-router-dom'
import Login from './components/Auth/Login.jsx'
import Signup from './components/Auth/Signup.jsx'
import Layout from './components/Layout.jsx'
// import Hero from './components/Dashboard/Hero.jsx'
import StudentsDashboard from './components/StudentsDashboard/Dashboard.jsx';
import TeacherDashboard from './components/TeachersDashboard/Dashboard.jsx';
import CreateCourse from './components/TeachersDashboard/Hero/pages/Course/CreateCourse.jsx';
import AuthCallback from './components/Auth/AuthCallback.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';
import LearnMorePage from './components/StudentsDashboard/Pages/LearnMorePage.jsx';
import CoursePage from './components/StudentsDashboard/Pages/Course/CoursePage.jsx';
import CourseDetails from './components/StudentsDashboard/Pages/Course/CourseDetaiils.jsx';
import SyllabusPage from './components/StudentsDashboard/Pages/SyllabusPage.jsx'
import TeacherCourses from './components/TeachersDashboard/Hero/pages/Course/TeacherCourses.jsx';
import TeacherCourseDetail from './components/TeachersDashboard/Hero/pages/Course/TeacherCourseDetail.jsx';
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
      {/* student routes */}
    <Route path="/student-dashboard" element={<ProtectedRoute><StudentsDashboard /></ProtectedRoute>}/>
    <Route path='/syllabuspage' element={<ProtectedRoute><SyllabusPage/></ProtectedRoute> }/>
    <Route path='/student-courses' element={<ProtectedRoute><CoursePage/></ProtectedRoute> }/>
    <Route path='/student-courses/:id' element={<ProtectedRoute><CourseDetails/></ProtectedRoute> }/>
    <Route path='/learn' element={<ProtectedRoute><LearnMorePage/></ProtectedRoute> }/>
    {/* Teacher routes */}
    <Route path='/teacher-dashboard' element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>}/>
    <Route path='/create-course' element={<ProtectedRoute><CreateCourse/></ProtectedRoute> }/>
    <Route path="/courses" element={<ProtectedRoute> <TeacherCourses /> </ProtectedRoute> } />
    <Route path="/course/:id" element={<ProtectedRoute> <TeacherCourseDetail /> </ProtectedRoute> } />
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
