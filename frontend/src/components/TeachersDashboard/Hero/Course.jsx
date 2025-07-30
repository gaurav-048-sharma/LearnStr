import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/courses`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setCourses(response.data);
        console.log('Fetched courses:', response.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-12 px-5 bg-[#1D1C20] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-extrabold mb-4">Explore Our Courses</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Upgrade your skills with our comprehensive programs designed for developers & aspiring engineers.
            </p>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            <span className="ml-4 text-gray-400">Loading courses...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-12 px-5 bg-[#1D1C20] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-extrabold mb-4">Explore Our Courses</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Upgrade your skills with our comprehensive programs designed for developers & aspiring engineers.
            </p>
          </div>
          <div className="text-center py-20">
            <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6 max-w-md mx-auto">
              <p className="text-red-400">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-12 px-5 bg-[#1D1C20] text-white mt-40">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-10 text-center ">
          <h2 className="text-4xl font-extrabold mb-4">Explore Our Courses</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Upgrade your skills with our comprehensive programs designed for developers & aspiring engineers.
          </p>
        </div>

        {/* Empty State */}
        {courses.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 max-w-md mx-auto border border-gray-700/50">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No Courses Available</h3>
              <p className="text-gray-500">Check back later for new courses to explore.</p>
            </div>
          </div>
        )}

        {/* Cards Container */}
        {courses.length > 0 && (
          <div className="relative">
            <div className="flex overflow-x-auto overflow-y-hidden space-x-6 pb-4 bg-black rounded-2xl p-4 hide-scrollbar">
              {courses.map((course, index) => (
                <div
                  key={course._id}
                  className="group w-[350px] bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-700/50 hover:border-amber-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/10 flex-shrink-0"
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
                    <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-amber-100 transition-colors duration-300">
                      {course.title}
                    </h3>

                    {/* Course Description */}
                    <p className="text-gray-400 mb-4 text-sm leading-relaxed line-clamp-3 group-hover:text-gray-300 transition-colors duration-300">
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
                      {course.teacher && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          {course.teacher.name}
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <Link
                      to={`/student-courses/${course._id}`}
                      className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25 group-hover:shadow-xl"
                    >
                      <span>Explore Course</span>
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

              {/* View All Courses Button - At the end of scroll */}
              <div className="w-[300px] flex-shrink-0 flex items-center justify-center">
                <div className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 backdrop-blur-sm rounded-2xl p-8 border border-amber-500/30 text-center hover:border-amber-400/50 transition-all duration-300 hover:transform hover:scale-105 w-full">
                  <div className="bg-amber-500/30 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-amber-400 mb-3">
                    Explore All Courses
                  </h3>
                  <p className="text-gray-400 mb-6 text-sm">
                    Discover our complete catalog of courses and find the perfect learning path for you.
                  </p>
                  <Link
                    to="/student-courses"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-amber-500/25"
                  >
                    <span>View All</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Course Count Indicator */}
            <div className="text-center mt-6">
              <div className="inline-flex items-center text-gray-500 text-sm">
                <div className="w-8 h-px bg-gray-600 mr-3"></div>
                <span>Showing {Math.min(courses.length, 6)} of {courses.length} courses</span>
                <div className="w-8 h-px bg-gray-600 ml-3"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Course;

// import axios from "axios";
// import { useState, useEffect } from "react";
// // import { useParams } from "react-router-dom";

// const Course = () => {
//   const [courses, setCourses] = useState([]);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/courses/teacher`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setCourses(res.data);
//         console.log("Fetched teacher's courses:", res.data);
//       } catch (error) {
//         console.error("Error fetching teacher's courses:", error);
//       }
//     };

//     if (token) fetchCourses();
//   }, [token]);

//   // if (!course) {
//   //   return <div className="text-center mt-20 text-white">Loading course...</div>;
//   // }

//   return (
//     <section className="w-full mt-40 py-10 px-5 bg-[#1D1C20] text-white">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-10 text-center">
//           <h2 className="text-4xl font-extrabold mb-4">Explore Our Courses</h2>
//           <p className="text-gray-300 max-w-2xl mx-auto">
//             Upgrade your skills with our comprehensive programs designed for developers & aspiring engineers.
//           </p>
//         </div>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {courses.length === 0? (
//             courses.map((course) => (
//               <div
//                 key={course._id}
//                 className="bg-black rounded-2xl p-6 shadow-lg border border-amber-700"
//               >
//                 <h3 className="text-xl font-bold mb-2">{course.title}</h3>
//                 <video className="w-full rounded" controls src={course.videoURL}></video>
//                 {/* {lesson.duration && (
//                   <p className="text-sm mt-2 text-gray-400">Duration: {lesson.duration} sec</p>
//                 )} */}
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-400 col-span-full">
//               No lessons available yet.
//             </p>
//           )}

//         </div>
//       </div>
//     </section>
//   );
// };

// export default Course;
