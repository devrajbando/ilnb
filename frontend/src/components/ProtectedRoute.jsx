import { Navigate,useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useAuthContext } from '../hooks/useAuthContext'

const ProtectedRoute = ({ children }) => {
  const { user,loading } = useAuthContext();
  const location = useLocation();
  if (loading) {
    return <div className='text-white m-50'>Loading...</div>; 
  }
  if (!user) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  
  return children;
};

export default ProtectedRoute;
