import { Outlet } from "react-router-dom";
import AdminLayout from "../../components/AdminLayout";

function Home() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}

export default Home;

