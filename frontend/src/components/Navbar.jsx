import { useEffect, useState, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, LogoutIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setUsers(response.data);
        
        // Store role in localStorage for quick access
        localStorage.setItem('userRole', response.data.role);
      } catch (error) {
        console.error('Profile fetch error:', error);
        // Clear invalid token
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout Error:', error);
    } finally {
      // Always clear localStorage and redirect, regardless of server response
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      // Close mobile menu before navigating
      setIsOpen(false);
      navigate('/login');
    }
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsOpen(false);
  };

  // Get user role - check from state first, then localStorage as fallback
  const userRole = users.role || localStorage.getItem('userRole');
  const isTeacher = userRole === 'teacher';
  const isStudent = userRole === 'student';

  // Navigation items based on role
  const getNavigationItems = () => {
    const baseItems = [
      { name: 'Home', href: '/', show: true },
    ];

    // Add role-specific items
    if (isTeacher) {
      baseItems.push(
        { name: 'Dashboard', href: '/teacher-dashboard', show: true },
        { name: 'My Courses', href: '/courses', show: true },
        { name: 'Create Course', href: '/create-course', show: true }
      );
    } else if (isStudent) {
      baseItems.push(
        { name: 'Pricing', href: '/pricing', show: true },
        { name: 'Dashboard', href: '/student-dashboard', show: true },
        { name: 'My Courses', href: '/my-courses', show: true }
      );
    }

    return baseItems.filter(item => item.show);
  };

  // Resources dropdown items (only for students)
  const resourcesItems = [
    { name: 'DSA', icon: '🧮', desc: 'Data Structures & Algorithms', href: '/resources/dsa' },
    { name: 'System Design', icon: '🏗️', desc: 'Scalable Architecture', href: '/resources/system-design' },
    { name: 'Core Subjects', icon: '📚', desc: 'Fundamental Concepts', href: '/resources/core-subjects' },
    { name: 'Interviews', icon: '💼', desc: 'Technical Interviews', href: '/resources/interviews' }
  ];

  if (isLoading) {
    return (
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl
           bg-gradient-to-r from-[#1D1C20]/95 via-[#252229]/95 to-[#1D1C20]/95 
           backdrop-blur-xl text-white rounded-2xl shadow-2xl border border-gray-700/30 z-50">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <div className="h-10 w-12 bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="hidden md:flex space-x-4">
              <div className="h-8 w-20 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-8 w-24 bg-gray-700 rounded animate-pulse"></div>
              <div className="h-8 w-32 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl
         bg-gradient-to-r from-[#1D1C20]/95 via-[#252229]/95 to-[#1D1C20]/95 
         backdrop-blur-xl text-white rounded-2xl shadow-2xl border border-gray-700/30 z-50">
      
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 group">
            <Link to="/" className="relative block" onClick={closeMobileMenu}>
              <img
                className="h-10 w-12 object-contain filter group-hover:drop-shadow-lg transition-all duration-300 group-hover:scale-105"
                src="/logo.png"
                alt="LearnStream Logo"
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/20 to-amber-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            
            {/* Dynamic Navigation Links */}
            {getNavigationItems().map((item, index) => (
              <Link 
                key={index}
                to={item.href} 
                className="relative px-3 py-2 text-gray-300 hover:text-white transition-colors duration-300 group"
              >
                <span className="relative z-10">{item.name}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}

            {/* Resources Dropdown - Only for Students */}
            {isStudent && (
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="group inline-flex items-center px-3 py-2 text-gray-300 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5">
                  <span className="mr-2">Resources</span>
                  <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95 translate-y-1"
                  enterTo="transform opacity-100 scale-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="transform opacity-100 scale-100 translate-y-0"
                  leaveTo="transform opacity-0 scale-95 translate-y-1"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-3 w-56 rounded-xl 
                                       bg-gradient-to-br from-[#1D1C20]/95 to-[#252229]/95 
                                       backdrop-blur-xl shadow-2xl border border-gray-600/30 
                                       focus:outline-none overflow-hidden">
                    
                    {/* Dropdown Header */}
                    <div className="px-4 py-3 border-b border-gray-600/30 bg-gradient-to-r from-amber-500/10 to-amber-600/10">
                      <p className="text-sm font-semibold text-amber-400">Learning Resources</p>
                    </div>
                    
                    <div className="py-2">
                      {resourcesItems.map((item, index) => (
                        <Menu.Item key={index}>
                          {({ active }) => (
                            <Link 
                              to={item.href}
                              className={`group flex items-center px-4 py-3 text-sm transition-all duration-200 ${
                                active 
                                  ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-white' 
                                  : 'text-gray-300 hover:text-white'
                              }`}
                            >
                              <span className="text-lg mr-3">{item.icon}</span>
                              <div className="flex-1">
                                <div className="font-medium">{item.name}</div>
                                <div className="text-xs text-gray-400 group-hover:text-gray-300">{item.desc}</div>
                              </div>
                              <ChevronDownIcon className="w-4 h-4 -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}

            {/* User Profile Dropdown */}
            <Menu as="div" className="relative inline-block text-left ml-4">
              <Menu.Button className="group inline-flex items-center px-4 py-2 
                                    bg-gradient-to-r from-amber-600 to-amber-700 
                                    hover:from-amber-700 hover:to-amber-800 
                                    text-white rounded-xl shadow-lg hover:shadow-xl 
                                    transition-all duration-300 transform hover:scale-105">
                
                {/* User Avatar */}
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold">
                    {users.name ? users.name.charAt(0).toUpperCase() : 'U'}
                  </span>
                </div>
                
                <div className="text-left mr-2">
                  <div className="text-sm font-medium truncate max-w-32">
                    {users.email || 'Loading...'}
                  </div>
                </div>
                
                <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95 translate-y-1"
                enterTo="transform opacity-100 scale-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="transform opacity-100 scale-100 translate-y-0"
                leaveTo="transform opacity-0 scale-95 translate-y-1"
              >
                <Menu.Items className="origin-top-right absolute right-0 mt-3 w-64 rounded-xl 
                                     bg-gradient-to-br from-[#1D1C20]/95 to-[#252229]/95 
                                     backdrop-blur-xl shadow-2xl border border-gray-600/30 
                                     focus:outline-none overflow-hidden">
                  
                  {/* User Info Header */}
                  <div className="px-4 py-4 border-b border-gray-600/30 bg-gradient-to-r from-amber-500/10 to-amber-600/10">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-lg font-bold text-white">
                          {users.name ? users.name.charAt(0).toUpperCase() : 'U'}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-white">{users.name || 'Loading...'}</p>
                        <p className="text-sm text-gray-400">{users.email || 'Loading...'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-2">
                    <Menu.Item>
                      <div className="px-4 py-3 border-b border-gray-600/20">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-2 animate-pulse ${
                            isTeacher ? 'bg-purple-500' : 'bg-green-500'
                          }`}></div>
                          <span className="text-sm text-gray-300">Role: </span>
                          <span className={`text-sm font-semibold ml-1 capitalize ${
                            isTeacher ? 'text-purple-400' : 'text-green-400'
                          }`}>
                            {users.role || 'Loading...'}
                          </span>
                        </div>
                      </div>
                    </Menu.Item>
                    
                    <Menu.Item>
                      {({ active }) => (
                        <button 
                          onClick={handleLogout}
                          className={`group w-full flex items-center px-4 py-3 text-sm transition-all duration-200 ${
                            active 
                              ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400' 
                              : 'text-gray-300 hover:text-red-400'
                          }`}
                          type="button"
                        >
                          <LogoutIcon className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
                          <span className="font-medium">Sign Out</span>
                          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <ChevronDownIcon className="w-4 h-4 -rotate-90" />
                          </div>
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="group inline-flex items-center justify-center p-2 rounded-xl 
                       hover:bg-white/10 focus:outline-none transition-all duration-300"
              type="button"
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <XIcon className="block h-6 w-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
              ) : (
                <MenuIcon className="block h-6 w-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Using conditional rendering instead of Transition */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-600/30 bg-gradient-to-b from-transparent to-black/20 animate-fadeIn">
            <div className="px-4 pt-4 pb-6 space-y-2">
              
              {/* Mobile Navigation Links */}
              {getNavigationItems().map((item, index) => (
                <Link 
                  key={index}
                  to={item.href}
                  className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white 
                           hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-amber-600/20 
                           transition-all duration-300 transform hover:scale-[1.02]"
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile Resources Section - Only for Students */}
              {isStudent && (
                <>
                  <div className="border-t border-gray-600/30 my-4"></div>
                  <div className="space-y-2">
                    <p className="px-4 py-2 text-sm font-semibold text-amber-400">Resources</p>
                    {resourcesItems.map((item, index) => (
                      <Link 
                        key={index}
                        to={item.href}
                        className="flex items-center px-6 py-3 rounded-xl text-gray-300 hover:text-white 
                                 hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-amber-600/20 
                                 transition-all duration-300 transform hover:scale-[1.02]"
                        onClick={closeMobileMenu}
                      >
                        <span className="mr-3 text-lg">{item.icon}</span>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-400">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
              
              <div className="border-t border-gray-600/30 my-4"></div>
              
              {/* Mobile User Section */}
              <div className="space-y-3">
                <div className="px-4 py-3 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-xl">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mr-3">
                      <span className="text-sm font-bold text-white">
                        {users.name ? users.name.charAt(0).toUpperCase() : 'U'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{users.name || 'Loading...'}</p>
                      <p className="text-xs text-gray-400 capitalize">
                        {users.role || 'Loading...'} • {users.email || 'Loading...'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={handleLogout} 
                  className="flex items-center w-full px-4 py-3 
                           bg-gradient-to-r from-red-600 to-red-700 
                           hover:from-red-700 hover:to-red-800 
                           text-white rounded-xl shadow-lg hover:shadow-xl 
                           transition-all duration-300 transform hover:scale-[1.02]"
                  type="button"
                >
                  <LogoutIcon className="w-5 h-5 mr-3" />
                  <span className="font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
}



// import { useEffect, useState  } from "react";
// import { Menu, Transition } from "@headlessui/react";
// import { ChevronDownIcon, LogoutIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
// import { useNavigate } from 'react-router-dom'
// import axios from "axios";


// // import jwtDecode from 'jwt-decode';

// // const decoded = jwtDecode(token);
// // const _id = decoded.id;

// export default function Navbar() {
//   const Navigate = useNavigate();
//   // State to manage mobile menu open/close
//   const [isOpen, setIsOpen] = useState(false);
//   const [users, setUsers] = useState({});
//   // const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

//   // useEffect(() => {
//   //   const token = localStorage.getItem('token');
//   //   // setIsAuthenticated(!!token);
//   // }, [Navigate]);


//     useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           Navigate('/login');
//           return;
//         }

//         const response = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`,
//           {
//             headers: { Authorization: `Bearer ${token}` }
//           }
//         );
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Profile fetch error:', error);
//         Navigate('/login');
//       }
//     };

//     fetchUserProfile();
//   }, [Navigate]);

//  const handleLogout = async () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       // setIsAuthenticated(false);
//       Navigate('/login');
//       return;
//     }

//     try {
//       const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!response.ok) throw new Error('Logout failed');
//       localStorage.removeItem('token');
//       // setIsAuthenticated(false);
//       Navigate('/login');
//     } catch (error) {
//       console.error('Logout Error:', error);
//       // Proceed with logout even if server fails (client-side cleanup)
//       localStorage.removeItem('token');
//       // setIsAuthenticated(false);
//       Navigate('/login');
//     }
//   };


// // // useEffect to call it when component mounts:
// // useEffect(() => {
// //   const handleUserProfile = async () => {
// //   try {
// //     const token = localStorage.getItem('token');
// //     if (!token) {
// //       Navigate('/login');
// //       return;
// //     }

// //     const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`, 
// //     //   {
// //     //   headers: { Authorization: `Bearer ${token}` }
// //     // }
// //   );
// //     localStorage.setItem("token", response.data.token)
// //     console.log("response",response.data); // 👉 contains _id, username, email, etc.
// //     // Do whatever with response.data
// //     setUsers(response.data)
// //   } catch (error) {
// //     console.log(error);
// //     Navigate('/dashboard');
// //   }
// // };

// //   handleUserProfile();
// // }, []);


//   return (
// <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[95%] max-w-7xl
//      bg-gradient-to-r from-[#1D1C20]/95 via-[#252229]/95 to-[#1D1C20]/95 
//      backdrop-blur-xl text-white rounded-2xl shadow-2xl border border-gray-700/30 z-50">
  
//   {/* Animated background gradient */}
//   <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
  
//   <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
//     <div className="flex justify-between h-16 items-center">
      
//       {/* Logo Section */}
//       <div className="flex-shrink-0 group">
//         <div className="relative">
//           <img
//             className="h-10 w-12 object-contain filter group-hover:drop-shadow-lg transition-all duration-300 group-hover:scale-105"
//             src="/public/logo.png"
//             alt="LearnStream Logo"
//           />
//           <div className="absolute -inset-2 bg-gradient-to-r from-amber-400/20 to-amber-600/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
//         </div>
//       </div>

//       {/* Desktop Menu */}
//       <div className="hidden md:flex space-x-8 items-center">
        
//         {/* Navigation Links */}
//         <a href="#" className="relative px-3 py-2 text-gray-300 hover:text-white transition-colors duration-300 group">
//           <span className="relative z-10">Home</span>
//           <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//         </a>
        
//         <a href="#" className="relative px-3 py-2 text-gray-300 hover:text-white transition-colors duration-300 group">
//           <span className="relative z-10">Pricing</span>
//           <div className="absolute inset-0 bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//         </a>

//         {/* Resources Dropdown */}
//         <Menu as="div" className="relative inline-block text-left">
//           <Menu.Button className="group inline-flex items-center px-3 py-2 text-gray-300 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5">
//             <span className="mr-2">Resources</span>
//             <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
//           </Menu.Button>

//           <Transition
//             enter="transition ease-out duration-200"
//             enterFrom="transform opacity-0 scale-95 translate-y-1"
//             enterTo="transform opacity-100 scale-100 translate-y-0"
//             leave="transition ease-in duration-150"
//             leaveFrom="transform opacity-100 scale-100 translate-y-0"
//             leaveTo="transform opacity-0 scale-95 translate-y-1"
//           >
//             <Menu.Items className="origin-top-right absolute right-0 mt-3 w-56 rounded-xl 
//                                  bg-gradient-to-br from-[#1D1C20]/95 to-[#252229]/95 
//                                  backdrop-blur-xl shadow-2xl border border-gray-600/30 
//                                  focus:outline-none overflow-hidden">
              
//               {/* Dropdown Header */}
//               <div className="px-4 py-3 border-b border-gray-600/30 bg-gradient-to-r from-amber-500/10 to-amber-600/10">
//                 <p className="text-sm font-semibold text-amber-400">Learning Resources</p>
//               </div>
              
//               <div className="py-2">
//                 {[
//                   { name: 'DSA', icon: '🧮', desc: 'Data Structures & Algorithms' },
//                   { name: 'System Design', icon: '🏗️', desc: 'Scalable Architecture' },
//                   { name: 'Core Subjects', icon: '📚', desc: 'Fundamental Concepts' },
//                   { name: 'Interviews', icon: '💼', desc: 'Technical Interviews' }
//                 ].map((item, index) => (
//                   <Menu.Item key={index}>
//                     {({ active }) => (
//                       <a 
//                         href="#" 
//                         className={`group flex items-center px-4 py-3 text-sm transition-all duration-200 ${
//                           active 
//                             ? 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-white' 
//                             : 'text-gray-300 hover:text-white'
//                         }`}
//                       >
//                         <span className="text-lg mr-3">{item.icon}</span>
//                         <div className="flex-1">
//                           <div className="font-medium">{item.name}</div>
//                           <div className="text-xs text-gray-400 group-hover:text-gray-300">{item.desc}</div>
//                         </div>
//                         <ChevronDownIcon className="w-4 h-4 -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
//                       </a>
//                     )}
//                   </Menu.Item>
//                 ))}
//               </div>
//             </Menu.Items>
//           </Transition>
//         </Menu>

//         {/* User Profile Dropdown */}
//         <Menu as="div" className="relative inline-block text-left ml-4">
//           <Menu.Button className="group inline-flex items-center px-4 py-2 
//                                 bg-gradient-to-r from-amber-600 to-amber-700 
//                                 hover:from-amber-700 hover:to-amber-800 
//                                 text-white rounded-xl shadow-lg hover:shadow-xl 
//                                 transition-all duration-300 transform hover:scale-105">
            
//             {/* User Avatar */}
//             <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
//               <span className="text-sm font-bold">
//                 {users.name ? users.name.charAt(0).toUpperCase() : 'U'}
//               </span>
//             </div>
            
//             <div className="text-left mr-2">
//               <div className="text-sm font-medium truncate max-w-32">
//                 {users.email || 'Loading...'}
//               </div>
//             </div>
            
//             <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
//           </Menu.Button>

//           <Transition
//             enter="transition ease-out duration-200"
//             enterFrom="transform opacity-0 scale-95 translate-y-1"
//             enterTo="transform opacity-100 scale-100 translate-y-0"
//             leave="transition ease-in duration-150"
//             leaveFrom="transform opacity-100 scale-100 translate-y-0"
//             leaveTo="transform opacity-0 scale-95 translate-y-1"
//           >
//             <Menu.Items className="origin-top-right absolute right-0 mt-3 w-64 rounded-xl 
//                                  bg-gradient-to-br from-[#1D1C20]/95 to-[#252229]/95 
//                                  backdrop-blur-xl shadow-2xl border border-gray-600/30 
//                                  focus:outline-none overflow-hidden">
              
//               {/* User Info Header */}
//               <div className="px-4 py-4 border-b border-gray-600/30 bg-gradient-to-r from-amber-500/10 to-amber-600/10">
//                 <div className="flex items-center">
//                   <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mr-3">
//                     <span className="text-lg font-bold text-white">
//                       {users.name ? users.name.charAt(0).toUpperCase() : 'U'}
//                     </span>
//                   </div>
//                   <div>
//                     <p className="font-semibold text-white">{users.name || 'Loading...'}</p>
//                     <p className="text-sm text-gray-400">{users.email || 'Loading...'}</p>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="py-2">
//                 <Menu.Item>
//                   <div className="px-4 py-3 border-b border-gray-600/20">
//                     <div className="flex items-center">
//                       <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
//                       <span className="text-sm text-gray-300">Role: </span>
//                       <span className="text-sm font-semibold text-amber-400 ml-1 capitalize">
//                         {users.role || 'Loading...'}
//                       </span>
//                     </div>
//                   </div>
//                 </Menu.Item>
                
//                 <Menu.Item>
//                   {({ active }) => (
//                     <button 
//                       onClick={handleLogout}
//                       className={`group w-full flex items-center px-4 py-3 text-sm transition-all duration-200 ${
//                         active 
//                           ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400' 
//                           : 'text-gray-300 hover:text-red-400'
//                       }`}
//                     >
//                       <LogoutIcon className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:scale-110" />
//                       <span className="font-medium">Sign Out</span>
//                       <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                         <ChevronDownIcon className="w-4 h-4 -rotate-90" />
//                       </div>
//                     </button>
//                   )}
//                 </Menu.Item>
//               </div>
//             </Menu.Items>
//           </Transition>
//         </Menu>
//       </div>

//       {/* Mobile Hamburger */}
//       <div className="flex md:hidden">
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="group inline-flex items-center justify-center p-2 rounded-xl 
//                    hover:bg-white/10 focus:outline-none transition-all duration-300"
//         >
//           <div className="relative w-6 h-6">
//             {isOpen ? (
//               <XIcon className="block h-6 w-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
//             ) : (
//               <MenuIcon className="block h-6 w-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
//             )}
//           </div>
//         </button>
//       </div>
//     </div>
//   </div>

//   {/* Mobile Menu */}
//   <Transition
//     show={isOpen}
//     enter="transition ease-out duration-200"
//     enterFrom="opacity-0 scale-95"
//     enterTo="opacity-100 scale-100"
//     leave="transition ease-in duration-150"
//     leaveFrom="opacity-100 scale-100"
//     leaveTo="opacity-0 scale-95"
//   >
//     <div className="md:hidden border-t border-gray-600/30 bg-gradient-to-b from-transparent to-black/20">
//       <div className="px-4 pt-4 pb-6 space-y-2">
        
//         {/* Mobile Navigation Links */}
//         {['Home', 'Pricing'].map((item, index) => (
//           <a 
//             key={index}
//             href="#" 
//             className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white 
//                      hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-amber-600/20 
//                      transition-all duration-300"
//           >
//             {item}
//           </a>
//         ))}
        
//         <div className="border-t border-gray-600/30 my-4"></div>
        
//         {/* Mobile Resources Section */}
//         <div className="space-y-2">
//           <p className="px-4 py-2 text-sm font-semibold text-amber-400">Resources</p>
//           {[
//             { name: 'DSA', icon: '🧮' },
//             { name: 'System Design', icon: '🏗️' },
//             { name: 'Core Subjects', icon: '📚' },
//             { name: 'Interviews', icon: '💼' }
//           ].map((item, index) => (
//             <a 
//               key={index}
//               href="#" 
//               className="flex items-center px-6 py-3 rounded-xl text-gray-300 hover:text-white 
//                        hover:bg-gradient-to-r hover:from-amber-500/20 hover:to-amber-600/20 
//                        transition-all duration-300"
//             >
//               <span className="mr-3">{item.icon}</span>
//               {item.name}
//             </a>
//           ))}
//         </div>
        
//         <div className="border-t border-gray-600/30 my-4"></div>
        
//         {/* Mobile User Section */}
//         <div className="space-y-3">
//           <div className="px-4 py-3 bg-gradient-to-r from-amber-500/10 to-amber-600/10 rounded-xl">
//             <div className="flex items-center">
//               <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mr-3">
//                 <span className="text-sm font-bold text-white">
//                   {users.name ? users.name.charAt(0).toUpperCase() : 'U'}
//                 </span>
//               </div>
//               <div>
//                 <p className="text-sm font-semibold text-white">{users.name || 'Loading...'}</p>
//                 <p className="text-xs text-gray-400">{users.role || 'Loading...'}</p>
//               </div>
//             </div>
//           </div>
          
//           <button 
//             onClick={handleLogout} 
//             className="flex items-center w-full px-4 py-3 
//                      bg-gradient-to-r from-red-600 to-red-700 
//                      hover:from-red-700 hover:to-red-800 
//                      text-white rounded-xl shadow-lg hover:shadow-xl 
//                      transition-all duration-300 transform hover:scale-105"
//           >
//             <LogoutIcon className="w-5 h-5 mr-3" />
//             <span className="font-medium">Sign Out</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   </Transition>
// </nav>
//   );
// }
//     // <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[95%]
//     //  bg-[#1D1C20] text-white rounded-xl shadow-md z-50">
//     //   <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
//     //     <div className="flex justify-between h-16 items-center">
//     //       {/* Logo */}
//     //       <div className="flex-shrink-0">
//     //         <img
//     //           className="h-30 w-35"
//     //           src="/public/logo.png" // 👈 Replace with your logo path
//     //           alt="LearnStream Logo"
//     //         />
//     //       </div>

//     //       {/* Desktop Menu */}
//     //       <div className="hidden md:flex space-x-6 items-center">
//     //         <a href="#" className="hover:text-gray-300">
//     //           Home
//     //         </a>
//     //         <a href="#" className="hover:text-gray-300">
//     //           Pricing
//     //         </a>

//     //         {/* Resources Dropdown */}
//     //         <Menu as="div" className="relative inline-block text-left">
//     //           <Menu.Button className="inline-flex items-center text-gray-300">
//     //             Resources
//     //             <ChevronDownIcon className="ml-1 w-5 h-5" />
//     //           </Menu.Button>

//     //           <Transition
//     //             enter="transition ease-out duration-100"
//     //             enterFrom="transform opacity-0 scale-95"
//     //             enterTo="transform opacity-100 scale-100"
//     //             leave="transition ease-in duration-75"
//     //             leaveFrom="transform opacity-100 scale-100"
//     //             leaveTo="transform opacity-0 scale-95"
//     //           >
//     //             <Menu.Items className="border-none origin-top-left absolute 
//     //             left-0 mt-2 w-40 rounded-md shadow-lg bg-[#1D1C20] text-white  focus:outline-none">
//     //               <div className="py-1">
//     //                 <Menu.Item>
//     //                   {({ active }) => (
//     //                     <a href="#" className={`block px-4 py-2 ${active && "bg-black/80 hover:bg-amber-700"}`}>
//     //                       DSA
//     //                     </a>
//     //                   )}
//     //                 </Menu.Item>
//     //                 <Menu.Item>
//     //                   {({ active }) => (
//     //                     <a href="#" className={`block px-4 py-2 ${active && "bg-black/80 hover:bg-amber-700"}`}>
//     //                       System Design
//     //                     </a>
//     //                   )}
//     //                 </Menu.Item>
//     //                 <Menu.Item>
//     //                   {({ active }) => (
//     //                     <a href="#" className={`block px-4 py-2 ${active && "bg-black/80 hover:bg-amber-700"}`}>
//     //                       Core Subjects
//     //                     </a>
//     //                   )}
//     //                 </Menu.Item>
//     //                 <Menu.Item>
//     //                   {({ active }) => (
//     //                     <a href="#" className={`block px-4 py-2 ${active && "bg-black/80 hover:bg-amber-700"}`}>
//     //                       Interviews
//     //                     </a>
//     //                   )}
//     //                 </Menu.Item>
//     //               </div>
//     //             </Menu.Items>
//     //           </Transition>
//     //         </Menu>


//     //         <Menu as="div" className="relative inline-block text-left">
//     //           <Menu.Button className="inline-flex items-center text-gray-300 bg-amber-700 p-2 rounded-lg cursor-pointer">
//     //              {users.email || 'Loading...'} 
//     //             <ChevronDownIcon className="ml-1 w-5 h-5" />
//     //           </Menu.Button>

//     //           <Transition
//     //             enter="transition ease-out duration-100"
//     //             enterFrom="transform opacity-0 scale-95"
//     //             enterTo="transform opacity-100 scale-100"
//     //             leave="transition ease-in duration-75"
//     //             leaveFrom="transform opacity-100 scale-100"
//     //             leaveTo="transform opacity-0 scale-95"
//     //           >
//     //             <Menu.Items className="border-none origin-top-left absolute 
//     //             left-0 mt-2 w-40 rounded-md shadow-lg bg-[#1D1C20] text-white  focus:outline-none">
//     //               <div className="py-1">
//     //                 <Menu.Item>
                     
//     //                     <a href="#" className={`block px-4 py-2 `}>
//     //                         {users.name || 'Loading...'}
//     //                     </a>
//     //                       {/* <a href="#" className={`block px-4 py-2 `}>
//     //                         {users.role}
//     //                     </a> */}
                    
//     //                 </Menu.Item>
//     //                 <Menu.Item>
//     //                     <a href="#" className={`block px-4 py-2 `}>
//     //                         {users.role || 'Loading...'}
//     //                     </a>
//     //                 </Menu.Item>
//     //                 <Menu.Item>
//     //                     <button  onClick={handleLogout} className="flex items-center text-amber-700 p-2 rounded-l cursor-pointer">
//     //                       <LogoutIcon className="w-5 h-5 mr-1" />
//     //                              Logout
//     //                     </button>
//     //                 </Menu.Item>
//     //               </div>
//     //             </Menu.Items>
//     //           </Transition>
//     //         </Menu>

//     //         {/* Logout
//     //         <button className="flex items-center bg-amber-700 p-2 rounded-lg hover:text-gray-300">
//     //           <LogoutIcon className="w-5 h-5 mr-1" />
//     //           Logout
//     //         </button> */}
//     //       </div>

//     //       {/* Mobile Hamburger */}
//     //       <div className="flex md:hidden">
//     //         <button
//     //           onClick={() => setIsOpen(!isOpen)}
//     //           className="inline-flex items-center justify-center p-2 rounded-md hover:text-gray-300 focus:outline-none"
//     //         >
//     //           {isOpen ? (
//     //             <XIcon className="block h-6 w-6" />
//     //           ) : (
//     //             <MenuIcon className="block h-6 w-6" />
//     //           )}
//     //         </button>
//     //       </div>
//     //     </div>
//     //   </div>

//     //   {/* Mobile Menu */}
//     //   {isOpen && (
//     //     <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
//     //       <a href="#" className="block px-3 py-2 rounded-md hover:bg-amber-700">
//     //         Home
//     //       </a>
//     //       <a href="#" className="block px-3 py-2 rounded-md hover:bg-amber-700">
//     //         Pricing
//     //       </a>
//     //       <div className="border-t border-gray-700"></div>
//     //       <p className="px-3 py-2">Resources</p>
//     //       <a href="#" className="block px-5 py-2 hover:bg-amber-700">
//     //         DSA
//     //       </a>
//     //       <a href="#" className="block px-5 py-2 hover:bg-amber-700">
//     //         System Design
//     //       </a>
//     //       <a href="#" className="block px-5 py-2 hover:bg-amber-700">
//     //         Core Subjects
//     //       </a>
//     //       <a href="#" className="block px-5 py-2 hover:bg-amber-700">
//     //         Interviews
//     //       </a>
//     //       <button onClick={handleLogout} className="flex items-center px-3 py-3 bg-amber-700 rounded-lg">
//     //         <LogoutIcon className="w-5 h-5 mr-1" />
//     //         Logout
//     //       </button>
//     //     </div>
//     //   )}
//     // </nav>