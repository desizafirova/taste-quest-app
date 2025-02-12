import { Outlet } from 'react-router-dom';
import UserSideBar from '../components/UserSideBar';

function UserProfile() {
  return (
    <div>
      <UserSideBar />
      <Outlet />
    </div>
  );
}

export default UserProfile;
