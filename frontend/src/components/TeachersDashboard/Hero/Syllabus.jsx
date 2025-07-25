import { Link } from "react-router-dom";

import { HomeIcon, PlusCircleIcon, UserGroupIcon, ChartBarIcon, CogIcon } from '@heroicons/react/outline'
  const navigation = [
    { name: 'My Courses', href: '/teacher/courses', icon: HomeIcon },
    { name: 'Add Course', href: '/teacher/add-course', icon: PlusCircleIcon },
    { name: 'Students', href: '/teacher/students', icon: UserGroupIcon },
    { name: 'Analytics', href: '/teacher/analytics', icon: ChartBarIcon },
    { name: 'Profile', href: '/teacher/profile', icon: CogIcon },
  ]
const Syllabus = () => {
  return (
            <div className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 text-xl font-bold">Teacher Dashboard</div>
        <nav className="mt-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
  )
}

export default Syllabus
