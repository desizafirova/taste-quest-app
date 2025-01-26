import { Outlet } from 'react-router';
import Header from './Header';
import styles from './AppLayout.module.css';

function AppLayout() {
  return (
    <div className={styles.pageContent}>
      <Header />
      <Outlet />
    </div>
  );
}

export default AppLayout;
