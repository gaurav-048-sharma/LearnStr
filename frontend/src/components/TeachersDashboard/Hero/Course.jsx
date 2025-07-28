import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Course = () => {
  const { id } = useParams(); // Get course ID from URL
  const [course, setCourse] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/courses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourse(res.data);
        console.log("Fetched course:", res.data);
      } catch (error) {
        console.error("Failed to fetch course:", error);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id, token]);

  // if (!course) {
  //   return <div className="text-center mt-20 text-white">Loading course...</div>;
  // }

  return (
    <section className="w-full mt-40 py-10 px-5 bg-[#1D1C20] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold mb-4">Explore Our Courses</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Upgrade your skills with our comprehensive programs designed for developers & aspiring engineers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {course?.lessons?.length > 0 ? (
            course.lessons.map((lesson, index) => (
              <div
                key={index}
                className="bg-black rounded-2xl p-6 shadow-lg border border-amber-700"
              >
                <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
                <video className="w-full rounded" controls src={lesson.videoURL}></video>
                {/* {lesson.duration && (
                  <p className="text-sm mt-2 text-gray-400">Duration: {lesson.duration} sec</p>
                )} */}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full">
              No lessons available yet.
            </p>
          )}

        </div>
      </div>
    </section>
  );
};

export default Course;
