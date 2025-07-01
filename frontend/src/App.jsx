import { Route, Routes } from 'react-router-dom'
import Login from './components/Auth/Login.jsx'
import Signup from './components/Auth/Signup.jsx'
import Layout from './components/Layout.jsx'
import Hero from './components/Dashboard/Hero.jsx'

function App() {


  return (
    <>
    <Routes>
      {/* Routes WITH Navbar */}
      <Route element={<Layout />}>

             <Route path="/" element={<Hero />} />
      </Route>

      {/* Routes WITHOUT Navbar */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    </>
  )
}

export default App
