import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-20 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Logo & Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">LearnStream</h2>
          <p className="text-sm">
            Master DSA, System Design, Core Subjects & Interviews with us.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white">Home</Link>
            </li>
            <li>
              <Link to="/pricing" className="hover:text-white">Pricing</Link>
            </li>
            <li>
              <Link to="/resources" className="hover:text-white">Resources</Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-white">Courses</Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">DSA Notes</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">System Design Guides</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Interview Prep</a>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">LinkedIn</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">GitHub</a>
            </li>
            <li>
              <a href="#" className="hover:text-white">Twitter</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} LearnStream. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer