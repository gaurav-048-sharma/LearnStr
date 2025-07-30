import { useState } from "react";

const resources = [
  {
    id: 1,
    title: "DSA Notes",
    description: "Comprehensive notes covering all data structures and algorithms with visual examples and complexity analysis.",
    image: "https://source.unsplash.com/400x250/?dsa,study",
    link: "https://example.com/dsa-notes.pdf",
    icon: "🔗",
    type: "PDF",
    size: "2.4 MB",
    pages: "156",
    color: "from-blue-500 to-indigo-600",
    category: "Notes"
  },
  {
    id: 2,
    title: "System Design Handbook",
    description: "Complete guide to system design patterns, scalability principles, and real-world architecture examples.",
    image: "https://source.unsplash.com/400x250/?system,design",
    link: "https://example.com/system-design.pdf",
    icon: "⚡",
    type: "PDF",
    size: "5.1 MB",
    pages: "248",
    color: "from-purple-500 to-pink-500",
    category: "Handbook"
  },
  {
    id: 3,
    title: "Core Subjects Cheat Sheet",
    description: "Quick reference guide for OS, DBMS, Computer Networks, and OOP concepts with key formulas and diagrams.",
    image: "https://source.unsplash.com/400x250/?computer,science",
    link: "https://example.com/core-subjects.pdf",
    icon: "💻",
    type: "PDF",
    size: "1.8 MB",
    pages: "92",
    color: "from-green-500 to-emerald-500",
    category: "Cheat Sheet"
  },
  {
    id: 4,
    title: "Interview Preparation Guide",
    description: "Strategic approach to technical and behavioral interviews with sample questions and expert tips.",
    image: "https://source.unsplash.com/400x250/?interview,job",
    link: "https://example.com/interview-guide.pdf",
    icon: "🎯",
    type: "PDF",
    size: "3.2 MB",
    pages: "184",
    color: "from-orange-500 to-red-500",
    category: "Guide"
  },
];

const Resources = () => {
  const [hoveredResource, setHoveredResource] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  const handleDownload = async (resource) => {
    setDownloadingId(resource.id);
    
    // Simulate download delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, you'd handle the actual download here
    window.open(resource.link, "_blank");
    
    setDownloadingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <section className="max-w-7xl mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-4">
              📚 Study Resources
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
            Download comprehensive study materials, notes, and guides to accelerate your learning journey
          </p>
        </div>

        {/* Stats Bar */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-8 px-8 py-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{resources.length}</div>
              <div className="text-sm text-gray-400">Resources</div>
            </div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">680</div>
              <div className="text-sm text-gray-400">Total Pages</div>
            </div>
            <div className="w-px h-8 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">Free</div>
              <div className="text-sm text-gray-400">Download</div>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {resources.map((resource, index) => (
            <div
              key={resource.id}
              className="group relative animate-fade-in-up"
              onMouseEnter={() => setHoveredResource(resource.id)}
              onMouseLeave={() => setHoveredResource(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Glow */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${resource.color} rounded-2xl blur opacity-0 group-hover:opacity-25 transition-all duration-500`}></div>
              
              {/* Main Card */}
              <div className="relative bg-[#1D1C20] rounded-2xl overflow-hidden transform transition-all duration-500 group-hover:scale-[1.02] group-hover:-translate-y-2 border border-gray-800 group-hover:border-gray-600 cursor-pointer">
                
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${resource.color} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-white/20">
                    {resource.category}
                  </div>

                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                    {resource.icon}
                  </div>

                  {/* Download Overlay */}
                  <div className={`absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${hoveredResource === resource.id ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <button
                      onClick={() => handleDownload(resource)}
                      disabled={downloadingId === resource.id}
                      className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${resource.color} text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed`}
                    >
                      {downloadingId === resource.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Downloading...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>Download</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                      {resource.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {resource.description}
                    </p>
                  </div>

                  {/* Resource Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"/>
                          <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd"/>
                        </svg>
                        {resource.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                        </svg>
                        {resource.pages} pages
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                        </svg>
                        {resource.size}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className={`h-1 bg-gradient-to-r ${resource.color} transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-300">All resources are free and regularly updated</span>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Resources;


// const resources = [
//   {
//     id: 1,
//     title: "DSA Notes",
//     image: "https://source.unsplash.com/400x250/?dsa,study",
//     link: "https://example.com/dsa-notes.pdf",
//   },
//   {
//     id: 2,
//     title: "System Design Handbook",
//     image: "https://source.unsplash.com/400x250/?system,design",
//     link: "https://example.com/system-design.pdf",
//   },
//   {
//     id: 3,
//     title: "Core Subjects Cheat Sheet",
//     image: "https://source.unsplash.com/400x250/?computer,science",
//     link: "https://example.com/core-subjects.pdf",
//   },
//   {
//     id: 4,
//     title: "Interview Preparation Guide",
//     image: "https://source.unsplash.com/400x250/?interview,job",
//     link: "https://example.com/interview-guide.pdf",
//   },
// ];

// const Resources = () => {
//   return (
//     <section className="max-w-7xl mx-auto px-4 py-16">
//       <h2 className="text-4xl font-bold text-center mb-12">
//         📚 Study Resources
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {resources.map((resource) => (
//           <div
//             key={resource.id}
//             className="bg-[#1D1C20] rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
//             onClick={() => window.open(resource.link, "_blank")}
//           >
//             <img
//               src={resource.image}
//               alt={resource.title}
//               className="w-full h-40 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold text-white">
//                 {resource.title}
//               </h3>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>

//   )
// }

// export default Resources