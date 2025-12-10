import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '../utils/constants';
import ProtectedRoute from './ProtectedRoute';

const RoleBasedRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <ProtectedRoute>
      {user?.role === role ? children : <Navigate to="/" replace />}
    </ProtectedRoute>
  );
};

export default RoleBasedRoute;

