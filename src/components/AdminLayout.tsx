import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import { motion } from "framer-motion";
import Footer from "./Footer";

export default function Layout() {
  return (
    <motion.div className="background-pattern flex h-dvh flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="mx-3 my-4 flex-grow rounded-md bg-white shadow-md md:overflow-y-auto ">
        <Outlet />
        <Footer />
      </div>
    </motion.div>
  );
}
