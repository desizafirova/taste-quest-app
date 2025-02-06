import { Navigate, Outlet } from 'react-router';
import Spinner from '../components/Spinner';
import { useLogin } from '../contexts/LoginContext';

function ProtectedRoute() {
  const { loginStatus, loadingLogin } = useLogin();

  if (loadingLogin) return <Spinner />;

  return loginStatus ? <Outlet /> : <Navigate to={'/login'} replace />;
}

export default ProtectedRoute;
