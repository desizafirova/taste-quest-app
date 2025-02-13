import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { useLogin } from '../contexts/LoginContext';

function PublicRoute() {
  const { loginStatus, loadingLogin } = useLogin();

  if (loadingLogin) return <Spinner />;

  return loginStatus ? <Navigate to="/" replace /> : <Outlet />;
}

export default PublicRoute;
