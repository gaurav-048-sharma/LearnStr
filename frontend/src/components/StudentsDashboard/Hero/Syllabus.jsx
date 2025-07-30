import { Link } from "react-router-dom";
import { useState } from "react";

const syllabus = [
  {
    id: 1,
    title: "Data Structures & Algorithms",
    description: "Master fundamental concepts with Arrays, Trees, Graphs, Dynamic Programming, and advanced problem-solving techniques.",
    image: "https://source.unsplash.com/400x250/?coding,dsa",
    link: "/courses/dsa",
    icon: "🔗",
    color: "from-blue-500 to-cyan-500",
    topics: ["Arrays & Strings", "Trees & Graphs", "Dynamic Programming", "Sorting & Searching"]
  },
  {
    id: 2,
    title: "System Design",
    description: "Learn scalable architecture patterns, distributed systems, caching strategies, and database optimization.",
    image: "https://source.unsplash.com/400x250/?system,design",
    link: "/courses/system-design",
    icon: "⚡",
    color: "from-purple-500 to-pink-500",
    topics: ["Scalability", "Load Balancing", "Caching", "Microservices"]
  },
  {
    id: 3,
    title: "Core Subjects",
    description: "Deep dive into Operating Systems, Database Management, Computer Networks, and Object-Oriented Programming.",
    image: "https://source.unsplash.com/400x250/?computer,science",
    link: "/courses/core-subjects",
    icon: "💻",
    color: "from-green-500 to-teal-500",
    topics: ["Operating Systems", "DBMS", "Computer Networks", "OOP Concepts"]
  },
  {
    id: 4,
    title: "Interview Preparation",
    description: "Comprehensive preparation for technical rounds, HR interviews, mock sessions, and behavioral questions.",
    image: "https://source.unsplash.com/400x250/?interview,job",
    link: "/courses/interviews",
    icon: "🎯",
    color: "from-orange-500 to-red-500",
    topics: ["Technical Rounds", "HR Questions", "Mock Interviews", "Behavioral Skills"]
  },
];

const Syllabus = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 mt-20">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="inline-block">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
            Syllabus Overview
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-orange-500 to-pink-500 mx-auto rounded-full"></div>
        </div>
        <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
          Comprehensive curriculum designed to prepare you for success in technical interviews and beyond
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {syllabus.map((item, index) => (
          <div
            key={item.id}
            className="group relative"
            onMouseEnter={() => setHoveredCard(item.id)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Background Glow Effect */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.color} rounded-2xl blur opacity-0 group-hover:opacity-20 transition-all duration-500`}></div>
            
            {/* Main Card */}
            <div className="relative bg-[#1D1C20] rounded-2xl overflow-hidden transform transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2 border border-gray-800 group-hover:border-gray-700">
              {/* Image Section with Overlay */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                
                {/* Icon Badge */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl transform transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>

                {/* Topics Overlay (shows on hover) */}
                <div className={`absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${hoveredCard === item.id ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <div className="text-center p-4">
                    <h4 className="text-white font-semibold mb-3">Key Topics:</h4>
                    <div className="space-y-1">
                      {item.topics.map((topic, idx) => (
                        <div key={idx} className="text-sm text-gray-300 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" style={{ transitionDelay: `${idx * 0.1}s` }}>
                          • {topic}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                  {item.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {item.description}
                </p>

                {/* Action Button */}
                <Link
                  to={item.link}
                  className={`inline-flex items-center gap-2 bg-gradient-to-r ${item.color} text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform group-hover:shadow-lg group-hover:shadow-orange-500/25 hover:scale-105 active:scale-95`}
                >
                  <span>Explore More</span>
                  <svg className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Bottom Accent Line */}
              <div className={`h-1 bg-gradient-to-r ${item.color} transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl border border-gray-700">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-gray-800"></div>
            ))}
          </div>
          <span className="text-gray-300">Join 10,000+ students already learning</span>
        </div>
      </div>
    </section>
  );
};

export default Syllabus;


// import { Link } from "react-router-dom";

// const syllabus = [
//   {
//     id: 1,
//     title: "Data Structures & Algorithms",
//     description: "Detailed syllabus with topics like Arrays, Trees, Graphs, DP, and more.",
//     image: "https://source.unsplash.com/400x250/?coding,dsa",
//     link: "/courses/dsa",
//   },
//   {
//     id: 2,
//     title: "System Design",
//     description: "Low-level and high-level system design, scalability, caching, databases.",
//     image: "https://source.unsplash.com/400x250/?system,design",
//     link: "/courses/system-design",
//   },
//   {
//     id: 3,
//     title: "Core Subjects",
//     description: "OS, DBMS, CN, OOP — all essential CS core subjects explained in depth.",
//     image: "https://source.unsplash.com/400x250/?computer,science",
//     link: "/courses/core-subjects",
//   },
//   {
//     id: 4,
//     title: "Interview Preparation",
//     description: "HR + Technical rounds, mock interviews, and behavioral questions.",
//     image: "https://source.unsplash.com/400x250/?interview,job",
//     link: "/courses/interviews",
//   },
// ];

// const Syllabus = () => {
//   return (
//     <section className="max-w-7xl mx-auto px-4 py-16 mt-30">
//       <h2 className="flex justify-start text-4xl font-bold text-center mb-12 text-white">
//           Syllabus Overview
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {syllabus.map((item) => (
//           <div
//             key={item.id}
//             className="bg-[#1D1C20] rounded-2xl shadow-lg overflow-hidden flex flex-col"
//           >
//             <img
//               src={item.image}
//               alt={item.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-6 flex flex-col flex-grow">
//               <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
//               <p className="text-gray-300 mb-4 flex-grow">{item.description}</p>
//               <Link
//                 to={item.link}
//                 className="inline-block bg-orange-600 hover:bg-orange-500 text-white font-semibold px-4 py-2 rounded transition w-max"
//               >
//                 Explore More
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }

// export default Syllabus
