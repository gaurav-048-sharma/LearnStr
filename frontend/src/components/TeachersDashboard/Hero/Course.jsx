import { Link } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "Data Structures & Algorithms",
    description: "Master the fundamentals of coding with our DSA course.",
    link: "/courses/dsa",
    details: [
      "What's included",
      "All features",
      "DSA, Core, Design & Aptitude",
      "AI Doubt Support",
      "Biweekly Sessions",
      "Code Review",
    ],
  },
  {
    id: 2,
    title: "System Design",
    description: "Learn to architect scalable systems with our System Design course.",
    link: "/courses/system-design",
    details: [
      "What's included",
      "All features",
      "Design Patterns & Case Studies",
      "AI Doubt Support",
      "Biweekly Sessions",
      "Code Review",
    ],
  },
  {
    id: 3,
    title: "Core Subjects",
    description: "Strengthen your Computer Science core concepts.",
    link: "/courses/core-subjects",
    details: [
      "What's included",
      "All features",
      "OS, DBMS, Networks",
      "AI Doubt Support",
      "Biweekly Sessions",
      "Code Review",
    ],
  },
  {
    id: 4,
    title: "Interviews",
    description: "Ace technical and HR interviews with confidence.",
    link: "/courses/interviews",
    details: [
      "What's included",
      "All features",
      "Mock Interviews & HR Prep",
      "AI Doubt Support",
      "Biweekly Sessions",
      "Resume Review",
    ],
  },
];

const Course = () => {
  return (


     <section className="w-full mt-40 py-10 px-5 bg-[#1D1C20] text-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold mb-4">Explore Our Courses</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Upgrade your skills with our comprehensive programs designed for developers & aspiring engineers.
          </p>
        </div>

        {/* Cards */}
        <div className="flex overflow-x-auto overflow-y-hidden space-x-6 pb-4 bg-black rounded-2xl p-4 hide-scrollbar">
          {courses.map((course) => (
            <div
              key={course.id}
              className="w-[350px] bg-black rounded-2xl p-6 shadow-lg  flex-shrink-0 border border-amber-700"
            >
              <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
              <p className="mb-4 text-gray-400">{course.description}</p>

              <ul className="mb-4 text-gray-300 list-disc list-inside space-y-1">
                {course.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>

              <Link
                to={course.link}
                className="inline-block bg-amber-700 text-black font-semibold px-4 py-2 rounded hover:bg-amber-900 transition"
              >
                Explore
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>


    
  
  )
}

export default Course
