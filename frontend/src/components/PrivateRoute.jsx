
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const PrivateRoute = ({ children, isAdminRoute = false }) => {
  const { user } = useAuthStore();
  
  console.log('PrivateRoute - User:', user);
  console.log('PrivateRoute - isAdminRoute:', isAdminRoute);
  console.log('PrivateRoute - User role:', user?.role);

  if (!user) return <Navigate to="/login" />;
  if (isAdminRoute && user.role !== 'admin') {
    console.error('Access denied! Current role:', user.role);
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;