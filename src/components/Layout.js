import Header from './Header';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <div className="container-fluid py-4 flex-grow-1 max-w-xl">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
