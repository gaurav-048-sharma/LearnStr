import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/');
    } else {
      navigate('/login');
    }
  }, []);

  return <div>Signing you in...</div>;
} 


// // src/components/Auth/AuthCallback.jsx
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function AuthCallback() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get('token');

//     if (token) {
//       localStorage.setItem('token', token);
//       console.log('✅ Google JWT stored in localStorage:', token);

//       // ✅ Redirect to dashboard WITHOUT the token in the URL
//       navigate('/dashboard', { replace: true });
//     } else {
//       console.error('❌ No token found in callback URL.');
//       navigate('/login');
//     }
//   }, []);

//   return <div>Authenticating with Google...</div>;
// }


