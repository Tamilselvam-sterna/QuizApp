import { Outlet } from "react-router-dom";
import UserLayout from "../../components/UserLayout";
function Userhome() {
  return (
    <UserLayout>
      <Outlet />
    </UserLayout>
  );
}

export default Userhome;
