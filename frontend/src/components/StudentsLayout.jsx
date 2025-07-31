import { Outlet } from 'react-router-dom';
import StudentNavbar from './StudentNavbar'; // You'll need to create this
import StudentSidebar from './StudentSidebar'; // You'll need to create this

const StudentsLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Student-specific navbar */}
      <StudentNavbar />
      
      <div className="flex">
        {/* Student-specific sidebar */}
        <StudentSidebar />
        
        {/* Main content area */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentsLayout;