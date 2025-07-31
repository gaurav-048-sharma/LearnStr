const NotFound = () => {
  const role = localStorage.getItem('role');

  const handleGoHome = () => {
    if (role === 'student') {
      window.location.href = '/student/dashboard';
    } else if (role === 'teacher' || role === 'admin') {
      window.location.href = '/teacher/dashboard';
    } else {
      window.location.href = '/login';
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      {/* Floating 404 Numbers */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-6xl font-bold text-gray-800/20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          >
            404
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Main 404 Display */}
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-transparent animate-pulse">
              404
            </h1>
            
            {/* Glowing Effect */}
            <div className="absolute inset-0 text-8xl md:text-9xl font-black text-red-500/20 blur-sm animate-pulse">
              404
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Oops! The page you're looking for seems to have wandered off into the digital void. 
            It might have been moved, deleted, or you may have entered the wrong URL.
          </p>
        </div>

        {/* Error Details */}
        <div className="mb-8 p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <span className="text-red-400 font-semibold">Error Details</span>
          </div>
          <div className="text-gray-300 space-y-2">
            <div className="flex justify-between">
              <span>Status Code:</span>
              <span className="text-red-400">404</span>
            </div>
            <div className="flex justify-between">
              <span>Error Type:</span>
              <span className="text-red-400">Page Not Found</span>
            </div>
            <div className="flex justify-between">
              <span>Current Path:</span>
              <span className="text-red-400 break-all">{window.location.pathname}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m0-14a1 1 0 00-1 1v3h5V5a1 1 0 00-1-1h-3z" />
              </svg>
              Go to Dashboard
            </span>
          </button>
          
          <button
            onClick={handleGoBack}
            className="group px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-gray-500 hover:bg-gray-800/50 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 transform transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Go Back
            </span>
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">Popular Pages</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {role === 'student' ? (
              <>
                <button
                  onClick={() => navigateTo('/student/courses')}
                  className="px-4 py-2 text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                >
                  My Courses
                </button>
                <button
                  onClick={() => navigateTo('/student/syllabus')}
                  className="px-4 py-2 text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                >
                  Syllabus
                </button>
              </>
            ) : role === 'teacher' || role === 'admin' ? (
              <>
                <button
                  onClick={() => navigateTo('/teacher/courses')}
                  className="px-4 py-2 text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                >
                  My Courses
                </button>
                <button
                  onClick={() => navigateTo('/teacher/create-course')}
                  className="px-4 py-2 text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                >
                  Create Course
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigateTo('/login')}
                  className="px-4 py-2 text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigateTo('/signup')}
                  className="px-4 py-2 text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.1;
          }
          50% { 
            transform: translateY(-20px) rotate(180deg); 
            opacity: 0.3;
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;