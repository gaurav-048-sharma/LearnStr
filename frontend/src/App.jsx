import { Route, Routes } from 'react-router-dom'
import Login from './components/Auth/Login.jsx'
import Signup from './components/Auth/Signup.jsx'
import Layout from './components/Layout.jsx'
// import Hero from './components/Dashboard/Hero.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx';
import AuthCallback from './components/Auth/AuthCallback.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';
import SyllabusPage from './components/Dashboard/Pages/SyllabusPage.jsx'

function App() {


  return (
    <>
<Routes>
  {/* Shell layout */}
  <Route element={<Layout />}>
  <Route path='/' element={<Dashboard />} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
    <Route path='/syllabuspage' element={<ProtectedRoute><SyllabusPage/></ProtectedRoute> }/>
  </Route>

  {/* Public routes */}
  <Route
    path="/login"
    element={
      <PublicRoute>
        <Login />
      </PublicRoute>
    }
  />
  <Route
    path="/signup"
    element={
      <PublicRoute>
        <Signup />
      </PublicRoute>
    }
  />

  <Route path="/auth/callback" element={<AuthCallback />} />
</Routes>

   

    </>
  )
}

export default App
