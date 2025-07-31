import { Outlet } from 'react-router-dom';
import TeacherNavbar from './TeacherNavbar'; // You'll need to create this
import TeacherSidebar from './TeacherSidebar'; // You'll need to create this

const TeacherLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Teacher-specific navbar */}
      <TeacherNavbar />
      
      <div className="flex">
        {/* Teacher-specific sidebar */}
        <TeacherSidebar />
        
        {/* Main content area */}
               <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;