import { Route, Routes } from 'react-router-dom'
import Login from './components/Auth/Login.jsx'
import Signup from './components/Auth/Signup.jsx'
import Layout from './components/Layout.jsx'
// import Hero from './components/Dashboard/Hero.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx';
import AuthCallback from './components/Auth/AuthCallback.jsx';

function App() {


  return (
    <>
    <Routes>
      {/* Routes WITH Navbar */}
      <Route element={<Layout />}>

             {/* <Route path="/" element={<Hero />} /> */}
             
             <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Routes WITHOUT Navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Google Auth Callback */}
        <Route path="/auth/callback" element={<AuthCallback />} />
    </Routes>
    </>
  )
}

export default App
