const Unauthorized = () => {
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/login';
  };

  const handleGoHome = () => {
    if (role === 'student') {
      window.location.href = '/student/dashboard';
    } else if (role === 'teacher' || role === 'admin') {
      window.location.href = '/teacher/dashboard';
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-yellow-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        {/* Lock Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Access Denied
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            You don't have permission to access this page. Please check your role or contact an administrator.
          </p>
        </div>

        {/* Error Details */}
        <div className="mb-8 p-6 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700">
          <div className="text-gray-300 space-y-2">
            <div className="flex justify-between">
              <span>Status Code:</span>
              <span className="text-yellow-400">403</span>
            </div>
            <div className="flex justify-between">
              <span>Your Role:</span>
              <span className="text-yellow-400">{role || 'Unknown'}</span>
            </div>
            <div className="flex justify-between">
              <span>Current Path:</span>
              <span className="text-yellow-400 break-all">{window.location.pathname}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Go to Dashboard
          </button>
          
          <button
            onClick={handleLogout}
            className="px-8 py-4 border-2 border-red-500 text-red-400 font-semibold rounded-xl hover:bg-red-500/10 transition-all duration-300"
          >
            Logout & Login Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;