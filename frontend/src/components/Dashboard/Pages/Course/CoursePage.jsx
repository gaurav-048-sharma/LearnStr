import React from 'react';

const Courses = () => {
  const courses = [
    {
      id: 1,
      title: 'React for Beginners',
      description: 'Learn the basics of React.js and build interactive UIs.',
      image: 'https://source.unsplash.com/400x200/?react',
    },
    {
      id: 2,
      title: 'Node.js Essentials',
      description: 'Master backend development with Node.js and Express.',
      image: 'https://source.unsplash.com/400x200/?nodejs',
    },
    {
      id: 3,
      title: 'Fullstack Development',
      description: 'Combine frontend and backend to build real-world apps.',
      image: 'https://source.unsplash.com/400x200/?programming',
    },
    {
      id: 4,
      title: 'Database Design',
      description: 'Understand relational databases and how to model data.',
      image: 'https://source.unsplash.com/400x200/?database',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Our Courses
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-[#1D1C20] rounded-lg shadow-lg overflow-hidden hover:shadow-amber-500 transition-shadow"
          >
            <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />

            <div className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-2">
                {course.title}
              </h2>
              <p className="text-gray-400 mb-4">{course.description}</p>
              <button className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
