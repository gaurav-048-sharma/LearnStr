// src/components/Dashboard/Dashboard.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from './Hero/Menu.jsx'
import Course from './Hero/Course.jsx'
import FAQ from './Hero/FAQ.jsx'
import Footer from './Hero/Footer.jsx'




export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.warn('🔒 No token found, redirecting to login.');
      navigate('/login');
    }
  }, []);

    // const [sidebarOpen, setSidebarOpen] = useState(false)


 
  return (
   <section className="relative bg-black text-white">
      <Menu/>
      <Course/>
      <FAQ/>
      <Footer/>
    </section>
  );
}
