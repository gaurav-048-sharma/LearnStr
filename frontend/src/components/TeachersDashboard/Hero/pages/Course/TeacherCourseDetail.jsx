import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TeacherCourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/courses/teacher/${id}`, {
          withCredentials: true
        });
        setCourse(res.data);
      } catch (err) {
        console.error("Error fetching teacher's course:", err);
        setError(err.response?.data?.message || 'Error fetching course');
      }
    };

    fetchCourse();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!course) return <p>Loading course...</p>;

  return (
<div className="min-h-screen bg-[#1D1C20] flex items-center justify-center py-12 px-4">
  <div className="bg-black rounded-xl shadow-lg max-w-4xl w-full p-8 mt-12">
    {/* Header Section */}
    <div className="text-center mb-8 ">
      <h1 className="text-4xl font-bold text-amber-800 mb-4">{course.title}</h1>
      <p className="text-lg text-gray-300 leading-relaxed mb-6">{course.description}</p>
      <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-full">
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        Created by: {course.teacher.name}
      </div>
    </div>

    {/* Lessons Section */}
    <div className="border-t pt-8">
      <h2 className="text-2xl font-semibold text-gray-400 mb-6 text-center">Course Lessons</h2>
      
      {course.lessons.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {course.lessons.map((lesson, index) => (
            <div key={lesson._id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              
              <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2">{lesson.title}</h3>
              
              <a 
                href={lesson.videoURL} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch Video
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h2z" />
          </svg>
          <p className="text-gray-500 text-lg">No lessons available yet</p>
        </div>
      )}
    </div>
  </div>
</div>
  );
};

export default TeacherCourseDetail;




{/* <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
  <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full p-8">
   
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{course.title}</h1>
      <p className="text-lg text-gray-600 leading-relaxed mb-6">{course.description}</p>
      <div className="inline-flex items-center bg-amber-100 text-amber-800 px-4 py-2 rounded-full">
        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        Created by: {course.teacher.name}
      </div>
    </div>

   
    <div className="border-t pt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Course Lessons</h2>
      
      {course.lessons.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {course.lessons.map((lesson, index) => (
            <div key={lesson._id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="bg-amber-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              
              <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2">{lesson.title}</h3>
              
              <a 
                href={lesson.videoURL} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Watch Video
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1h2z" />
          </svg>
          <p className="text-gray-500 text-lg">No lessons available yet</p>
        </div>
      )}
    </div>
  </div>
</div> */}