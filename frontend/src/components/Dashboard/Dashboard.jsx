// src/components/Dashboard/Dashboard.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Course from './Hero/Course.jsx'
import Menu from './Hero/Menu.jsx'
import Resources from './Hero/Resources.jsx'
import Syllabus from './Hero/Syllabus.jsx'
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

  return (
   <section className="relative bg-black text-white">
      <Menu/>
      <Syllabus/>
      {/* <div className='max-w-7xl mx-auto px-4 text-center mt-10'>
               <h1 className=" flex justify-center text-center text-5xl font-bold mb-4">Welcome to LearnStream</h1>
              <p className="text-lg mb-8">Start exploring our top courses below.</p>
      </div> */}
      <Course/>
      <Resources/>
      <FAQ/>
      <Footer/>
    </section>
  );
}
