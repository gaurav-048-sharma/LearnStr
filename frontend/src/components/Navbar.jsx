import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, LogoutIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 w-[95%]
     bg-[#1D1C20] text-white rounded-xl shadow-md z-50">
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              className="h-8 w-auto"
              src="/logo.png" // 👈 Replace with your logo path
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

            {/* Logout */}
            <button className="flex items-center bg-amber-700 p-2 rounded-lg hover:text-gray-300">
              <LogoutIcon className="w-5 h-5 mr-1" />
              Logout
            </button>
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
          <button className="flex items-center px-3 py-3 bg-amber-700 rounded-lg">
            <LogoutIcon className="w-5 h-5 mr-1" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
