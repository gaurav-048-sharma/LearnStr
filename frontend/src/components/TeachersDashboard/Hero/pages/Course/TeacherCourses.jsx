import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const TeacherCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const teacherId = localStorage.getItem('userId'); // store this after login

  useEffect(() => {
    if (!token || !teacherId) {
      navigate('/login');
      return;
    }

    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/courses/teacher/${teacherId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCourses(res.data);
      } catch (error) {
        console.error('Error fetching teacher courses:', error);
      }
    };

    fetchCourses();
  }, [token, teacherId, navigate]);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 text-white">
      <h1 className="text-3xl font-bold mb-6">📚 Your Created Courses</h1>
      {courses.length === 0 ? (
        <p className="text-gray-400">No courses created yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-[#1D1C20] border border-amber-500 rounded-lg p-5 shadow hover:shadow-amber-500 transition"
            >
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-300 mb-4">{course.description}</p>
              <Link
                to={`/course/${course._id}`}
                className="inline-block px-4 py-2 border border-amber-500 text-amber-500 rounded hover:bg-amber-500 hover:text-black transition"
              >
                View Course
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherCourses;
