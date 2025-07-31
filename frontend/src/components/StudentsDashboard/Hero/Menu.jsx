import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const navigate = useNavigate();

  const features = [
    { text: "Data Structures & Algorithms", icon: "🔗" },
    { text: "System Design", icon: "⚡" },
    { text: "Core Computer Science", icon: "💻" },
    { text: "Interview Preparation", icon: "🎯" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    
    navigate('/student-courses');
  };

  const handleLearnMore = () => {
    navigate('/learn');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/5 to-teal-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-20 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        ></div>
      ))}

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-16 mt-12">
        <div className={`max-w-7xl mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          
          {/* Main Hero Card */}
          <div className="relative bg-gradient-to-br from-[#1D1C20]/90 to-[#2A2831]/90 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 md:p-12 shadow-2xl">
            
            {/* Glowing Border Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r rounded-3xl blur opacity-20 animate-pulse"></div>
            
            <div className="relative flex flex-col lg:flex-row items-center gap-12">
              
              {/* Left: Enhanced Text Content */}
              <div className="flex-1 text-center lg:text-left space-y-8">
                
                {/* Animated Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full text-amber-400 text-sm font-medium backdrop-blur-sm">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <span>✨ Transform Your Career</span>
                </div>

                {/* Main Heading with Gradient Text */}
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                      Unlock Knowledge with
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 bg-clip-text text-transparent animate-gradient-x">
                      LearnStream
                    </span>
                  </h1>
                  
                  {/* Rotating Feature Text */}
                  <div className="h-8 overflow-hidden">
                    <div 
                      className="transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateY(-${currentFeature * 2}rem)` }}
                    >
                      {features.map((feature, index) => (
                        <div key={index} className="h-8 flex items-center justify-center lg:justify-start">
                          <span className="text-xl text-amber-400 mr-2">{feature.icon}</span>
                          <span className="text-xl text-gray-300">Master {feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enhanced Description */}
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Experience a revolutionary learning platform designed for the modern developer. 
                  Master essential concepts with interactive content, real-world projects, and expert guidance.
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                  {[
                    { number: "10K+", label: "Students" },
                    { number: "500+", label: "Problems" },
                    { number: "95%", label: "Success Rate" }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                    onClick={handleGetStarted}
                    className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-gray-900 font-semibold rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center gap-2">
                      Get Started Free
                      <svg className="w-5 h-5 transform transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  </button>
                  
                  <button
                    onClick={handleLearnMore}
                    className="group px-8 py-4 border-2 border-amber-500/50 text-amber-400 font-semibold rounded-xl hover:border-amber-400 hover:bg-amber-500/10 transition-all duration-300 backdrop-blur-sm"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m-9-3h12a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2z" />
                      </svg>
                      Learn More
                    </span>
                  </button>
                </div>
              </div>

              {/* Right: Enhanced Visual Content */}
              <div className="flex-1 relative">
                <div className="relative group">
                  
                  {/* Main Image Container */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 p-8 backdrop-blur-sm border border-amber-500/30">
                    
                    {/* Floating Code Snippets */}
                    <div className="absolute top-4 left-4 px-3 py-2 bg-black/60 backdrop-blur-sm rounded-lg text-green-400 text-xs font-mono border border-green-500/30">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>function solve()</span>
                      </div>
                    </div>
                    
                    <div className="absolute top-20 right-4 px-3 py-2 bg-black/60 backdrop-blur-sm rounded-lg text-blue-400 text-xs font-mono border border-blue-500/30">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span>O(log n)</span>
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 px-3 py-2 bg-black/60 backdrop-blur-sm rounded-lg text-purple-400 text-xs font-mono border border-purple-500/30">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                        <span>System Design</span>
                      </div>
                    </div>

                    {/* Central Logo/Illustration */}
                    <div className="relative z-10 flex items-center justify-center h-80">
                      <div className="w-64 h-64 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-6xl font-bold text-gray-900 shadow-2xl transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                        LS
                      </div>
                    </div>

                    {/* Orbiting Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(6)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-orbit opacity-60"
                          style={{
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: '8s'
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Features Strip */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-center">
            {[
              { icon: "🚀", text: "Fast Learning" },
              { icon: "🎯", text: "Job Ready" },
              { icon: "💡", text: "Expert Guidance" },
              { icon: "🏆", text: "Proven Results" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700/50">
                <span className="text-xl">{item.icon}</span>
                <span className="text-gray-300 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-orbit {
          animation: orbit 8s linear infinite;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Menu;





// import { Link } from 'react-router-dom'

// const Menu = () => {
//   return (
//       <div className="relative translate-y-30 max-w-7xl bg-[#1D1C20] mx-auto p-10 sm:p-10 flex flex-col md:flex-row items-center gap-12 rounded-2xl">
        
//         {/* Left: Text */}
//         <div className="flex-1 text-center md:text-left">
//           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
//             Unlock Knowledge with <span className="text-amber-400">LearnStream</span>
//           </h1>
//           <p className="text-lg md:text-xl mb-8 text-gray-300">
//             Master DSA, System Design, Core Subjects, and Interview Prep with a modern, seamless learning experience.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//             <Link to={"/student-courses"} className="px-6 py-3 bg-amber-500 text-gray-900 font-semibold rounded hover:bg-amber-600 transition">
//               Get Started
//             </Link>

//             <Link to={"/learn"} className="px-6 py-3 border border-amber-500 text-amber-500 font-semibold rounded hover:bg-amber-500 hover:text-gray-900 transition">
//               Learn More
//             </Link>
//           </div>
//         </div>

//         {/* Right: Image */}
//         <div className="flex-1">
//           <img
//             src="/public/logo.png" // 👈 Replace with your image path
//             alt="LearnStream Hero"
//             className="w-full rounded-lg shadow-lg shadow-amber-500/30 transition-transform transform hover:scale-105"
//           />
//         </div>
//       </div>
//   )
// }

// export default Menu


                {/* {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                  <div className="bg-white w-[80%] h-[80%] rounded-lg shadow-lg relative p-6 overflow-auto">
                    <button
                      onClick={closePopup}
                      className="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
                    >
                      &times;
                    </button>

                    <h2 className="text-2xl mb-4">Popup Content</h2>
                    <p>
                      This is the content inside the popup. You can add forms, text,
                      images, anything you like here.
                    </p>
                  </div>
                </div>
              )} */}