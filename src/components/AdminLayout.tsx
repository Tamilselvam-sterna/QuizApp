import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import { Variants, motion } from "framer-motion";

const childrenVariant: Variants = {
  initial: {
    y: -300,
  },
  animate: {
    y: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.3,
    },
  },
};

export default function Layout() {
  return (
    <motion.div
      variants={childrenVariant}
      initial="intial"
      animate="animate"
      className="background-pattern flex h-dvh flex-col md:flex-row md:overflow-hidden"
    >
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <motion.div
        variants={childrenVariant}
        className="mx-3 my-4 flex-grow rounded-md bg-gray-50 px-3 pt-4 shadow-md md:overflow-y-auto md:p-4 md:px-2"
      >
        <Outlet />
      </motion.div>
    </motion.div>
  );
}
