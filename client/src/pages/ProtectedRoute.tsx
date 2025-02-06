import { Navigate, Outlet } from 'react-router';
import { useLogin } from '../contexts/LoginContext';

function ProtectedRoute() {
  const { loginStatus } = useLogin();

  return loginStatus ? <Outlet /> : <Navigate to={'/login'} replace />;
}

export default ProtectedRoute;
