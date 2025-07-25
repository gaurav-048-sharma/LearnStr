import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role'); 
  // if (token) {
  //   return <Navigate to="/dashboard" replace />
  // }
    if (token && role === 'teacher') {
    return <Navigate to="/teacher-dashboard" replace />;
  } else if (token && role === 'student') {
    return <Navigate to="/student-dashboard" replace />;
  }

  return children
}

export default PublicRoute
