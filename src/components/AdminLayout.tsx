import { Outlet } from 'react-router-dom';
import SideNav from './SideNav';

export default function Layout() {
  return (
    <div className="login-pattern flex h-dvh flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="mx-3 my-4 flex-grow rounded-md bg-gray-50 px-3 pt-4 shadow-md md:overflow-y-auto md:p-4 md:px-2">
        <Outlet />
      </div>
    </div>
  );
}
