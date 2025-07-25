import { useEffect, useState  } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, LogoutIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { useNavigate } from 'react-router-dom'
import axios from "axios";


// import jwtDecode from 'jwt-decode';

// const decoded = jwtDecode(token);
// const _id = decoded.id;

export default function Navbar() {
  const Navigate = useNavigate();
  // State to manage mobile menu open/close
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState({});
  // const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   // setIsAuthenticated(!!token);
  // }, [Navigate]);


    useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          Navigate('/login');
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setUsers(response.data);
      } catch (error) {
        console.error('Profile fetch error:', error);
        Navigate('/login');
      }
    };

    fetchUserProfile();
  }, [Navigate]);

 const handleLogout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // setIsAuthenticated(false);
      Navigate('/login');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Logout failed');
      localStorage.removeItem('token');
      // setIsAuthenticated(false);
      Navigate('/login');
    } catch (error) {
      console.error('Logout Error:', error);
      // Proceed with logout even if server fails (client-side cleanup)
      localStorage.removeItem('token');
      // setIsAuthenticated(false);
      Navigate('/login');
    }
  };


// // useEffect to call it when component mounts:
// useEffect(() => {
//   const handleUserProfile = async () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       Navigate('/login');
//       return;
//     }

//     const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`, 
//     //   {
//     //   headers: { Authorization: `Bearer ${token}` }
//     // }
//   );
//     localStorage.setItem("token", response.data.token)
//     console.log("response",response.data); // 👉 contains _id, username, email, etc.
//     // Do whatever with response.data
//     setUsers(response.data)
//   } catch (error) {
//     console.log(error);
//     Navigate('/dashboard');
//   }
// };

//   handleUserProfile();
// }, []);


  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[95%]
     bg-[#1D1C20] text-white rounded-xl shadow-md z-50">
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              className="h-30 w-35"
              src="/public/logo.png" // 👈 Replace with your logo path
              alt="LearnStream Logo"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#" className="hover:text-gray-300">
              Home
            </a>
            <a href="#" className="hover:text-gray-300">
              Pricing
            </a>

            {/* Resources Dropdown */}
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex items-center text-gray-300">
                Resources
                <ChevronDownIcon className="ml-1 w-5 h-5" />
              </Menu.Button>

              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="border-none origin-top-left absolute 
                left-0 mt-2 w-40 rounded-md shadow-lg bg-[#1D1C20] text-white  focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a href="#" className={`block px-4 py-2 ${active && "bg-black/80 hover:bg-amber-700"}`}>
                          DSA
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a href="#" className={`block px-4 py-2 ${active && "bg-black/80 hover:bg-amber-700"}`}>
                          System Design
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a href="#" className={`block px-4 py-2 ${active && "bg-black/80 hover:bg-amber-700"}`}>
                          Core Subjects
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a href="#" className={`block px-4 py-2 ${active && "bg-black/80 hover:bg-amber-700"}`}>
                          Interviews
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>


            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex items-center text-gray-300 bg-amber-700 p-2 rounded-lg cursor-pointer">
                 {users.email || 'Loading...'} 
                <ChevronDownIcon className="ml-1 w-5 h-5" />
              </Menu.Button>

              <Transition
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="border-none origin-top-left absolute 
                left-0 mt-2 w-40 rounded-md shadow-lg bg-[#1D1C20] text-white  focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                     
                        <a href="#" className={`block px-4 py-2 `}>
                            {users.username || 'Loading...'}
                        </a>
                          {/* <a href="#" className={`block px-4 py-2 `}>
                            {users.role}
                        </a> */}
                    
                    </Menu.Item>
                    <Menu.Item>
                        <a href="#" className={`block px-4 py-2 `}>
                            {users.role || 'Loading...'}
                        </a>
                    </Menu.Item>
                    <Menu.Item>
                        <button  onClick={handleLogout} className="flex items-center text-amber-700 p-2 rounded-l cursor-pointer">
                          <LogoutIcon className="w-5 h-5 mr-1" />
                                 Logout
                        </button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Logout
            <button className="flex items-center bg-amber-700 p-2 rounded-lg hover:text-gray-300">
              <LogoutIcon className="w-5 h-5 mr-1" />
              Logout
            </button> */}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-gray-300 focus:outline-none"
            >
              {isOpen ? (
                <XIcon className="block h-6 w-6" />
              ) : (
                <MenuIcon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          <a href="#" className="block px-3 py-2 rounded-md hover:bg-amber-700">
            Home
          </a>
          <a href="#" className="block px-3 py-2 rounded-md hover:bg-amber-700">
            Pricing
          </a>
          <div className="border-t border-gray-700"></div>
          <p className="px-3 py-2">Resources</p>
          <a href="#" className="block px-5 py-2 hover:bg-amber-700">
            DSA
          </a>
          <a href="#" className="block px-5 py-2 hover:bg-amber-700">
            System Design
          </a>
          <a href="#" className="block px-5 py-2 hover:bg-amber-700">
            Core Subjects
          </a>
          <a href="#" className="block px-5 py-2 hover:bg-amber-700">
            Interviews
          </a>
          <button onClick={handleLogout} className="flex items-center px-3 py-3 bg-amber-700 rounded-lg">
            <LogoutIcon className="w-5 h-5 mr-1" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
