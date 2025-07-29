// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// const TeacherCourses = () => {
//   const [courses, setCourses] = useState([]);
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');
//   const teacherId = localStorage.getItem('userId'); // store this after login

//   useEffect(() => {
//     // if (!token || !teacherId) {
//     //   navigate('/login');
//     //   return;
//     // }

//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/api/courses/teacher/${teacherId}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setCourses(res.data);
//       } catch (error) {
//         console.error('Error fetching teacher courses:', error);
//       }
//     };

//     fetchCourses();
//   }, [token, teacherId, navigate]);

//   return (
//     <div className="max-w-5xl mx-auto py-10 px-4 text-white">
//       <h1 className="text-3xl font-bold mb-6">📚 Your Created Courses</h1>
//       {courses.length === 0 ? (
//         <p className="text-gray-400">No courses created yet.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-6">
//           {courses.map((course) => (
//             <div
//               key={course._id}
//               className="bg-[#1D1C20] border border-amber-500 rounded-lg p-5 shadow hover:shadow-amber-500 transition"
//             >
//               <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
//               <p className="text-gray-300 mb-4">{course.description}</p>
//               <Link
//                 to={`/course/${course._id}`}
//                 className="inline-block px-4 py-2 border border-amber-500 text-amber-500 rounded hover:bg-amber-500 hover:text-black transition"
//               >
//                 View Course
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TeacherCourses;
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TeacherCourses = () => {
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/courses/teacher`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(res.data);
        console.log("Fetched teacher's courses:", res.data);
      } catch (error) {
        console.error("Error fetching teacher's courses:", error);
      }
    };

    if (token) fetchCourses();
  }, [token]);

  return (
<div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1D1C20] to-gray-800 py-20 px-4">
  <div className="max-w-7xl mx-auto">
    {/* Header Section */}
    <div className="text-center mb-12 mt-12">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
        Your Courses
      </h2>
      <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto rounded-full"></div>
    </div>

    {/* Empty State */}
    {courses.length === 0 && (
      <div className="text-center py-20">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto border border-gray-700/50">
          <svg className="w-20 h-20 text-gray-500 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No Courses Yet</h3>
          <p className="text-gray-500">Start creating your first course to share knowledge with students.</p>
        </div>
      </div>
    )}

    {/* Courses Grid */}
    {courses.length > 0 && (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course, index) => (
          <div 
            key={course._id} 
            className="group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/10"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* Course Number Badge */}
            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-amber-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
              {index + 1}
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/5 to-amber-600/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Content */}
            <div className="relative z-10">
              {/* Course Icon */}
              <div className="bg-amber-500/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber-500/30 transition-colors duration-300">
                <svg className="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              {/* Course Title */}
              <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-amber-100 transition-colors duration-300">
                {course.title}
              </h3>

              {/* Course Description */}
              <p className="text-gray-400 mb-6 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
                {course.description}
              </p>

              {/* Course Stats */}
              <div className="flex items-center gap-4 mb-6 text-xs text-gray-500">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {course.lessons?.length || 0} Lessons
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  {course.students?.length || 0} Students
                </div>
              </div>

              {/* Action Button */}
              <Link
                to={`/course/${course._id}`}
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25 group-hover:shadow-xl"
              >
                <span>Go to Course</span>
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-1 h-1 bg-amber-600/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        ))}
      </div>
    )}

    {/* Bottom Decoration */}
    {courses.length > 0 && (
      <div className="text-center mt-16">
        <div className="inline-flex items-center text-gray-500 text-sm">
          <div className="w-8 h-px bg-gray-600 mr-3"></div>
          <span>Total: {courses.length} Course{courses.length !== 1 ? 's' : ''}</span>
          <div className="w-8 h-px bg-gray-600 ml-3"></div>
        </div>
      </div>
    )}
  </div>
</div>
  );
};

export default TeacherCourses;
