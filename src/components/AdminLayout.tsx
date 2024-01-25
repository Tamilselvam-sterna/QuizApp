import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import { Variants, motion } from "framer-motion";
import Footer from "./Footer";

const childVariant: Variants = {
  initial: {
    x: 100,
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.3,
    },
  },
};

export default function Layout() {
  return (
    <motion.div className="background-pattern flex h-dvh flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <motion.div
        variants={childVariant}
        initial="initial"
        animate="animate"
        className="mx-3 my-4 flex flex-grow flex-col justify-between rounded-md bg-white shadow-md md:overflow-y-auto "
      >
        <Outlet />
        <Footer />
      </motion.div>
    </motion.div>
  );
}
