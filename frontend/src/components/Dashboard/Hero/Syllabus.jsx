import { Link } from "react-router-dom";

const syllabus = [
  {
    id: 1,
    title: "Data Structures & Algorithms",
    description: "Detailed syllabus with topics like Arrays, Trees, Graphs, DP, and more.",
    image: "https://source.unsplash.com/400x250/?coding,dsa",
    link: "/courses/dsa",
  },
  {
    id: 2,
    title: "System Design",
    description: "Low-level and high-level system design, scalability, caching, databases.",
    image: "https://source.unsplash.com/400x250/?system,design",
    link: "/courses/system-design",
  },
  {
    id: 3,
    title: "Core Subjects",
    description: "OS, DBMS, CN, OOP — all essential CS core subjects explained in depth.",
    image: "https://source.unsplash.com/400x250/?computer,science",
    link: "/courses/core-subjects",
  },
  {
    id: 4,
    title: "Interview Preparation",
    description: "HR + Technical rounds, mock interviews, and behavioral questions.",
    image: "https://source.unsplash.com/400x250/?interview,job",
    link: "/courses/interviews",
  },
];

const Syllabus = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16 mt-30">
      <h2 className="flex justify-start text-4xl font-bold text-center mb-12 text-white">
          Syllabus Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {syllabus.map((item) => (
          <div
            key={item.id}
            className="bg-[#1D1C20] rounded-2xl shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
              <p className="text-gray-300 mb-4 flex-grow">{item.description}</p>
              <Link
                to={item.link}
                className="inline-block bg-orange-600 hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded transition w-max"
              >
                Explore More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Syllabus
