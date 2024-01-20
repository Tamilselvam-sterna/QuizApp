import { NavLink, useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";
import { navLinks } from "../utils/constant";
import clsx from "clsx";
import { MdOutlineLockReset } from "react-icons/md";
import { Variants, motion } from "framer-motion";
import { Role } from "../utils/enum";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const layoutVariant: Variants = {
  initial: {
    x: -100,
  },
  animate: {
    x: 0,
    transition: {
      duration: 1,
      staggerChildren: 0.3,
    },
  },
};

export default function SideNav() {
  const navigate = useNavigate();
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={layoutVariant}
      className="flex h-full flex-col px-3 pt-4 md:p-4 md:px-2"
    >
      <NavLink
        className="flex h-16 items-center justify-center rounded-t-md bg-gray-500 p-4 md:mb-2 md:h-20 md:justify-start md:rounded-md md:shadow-md"
        to="/"
      >
        <motion.div
          variants={layoutVariant}
          className="flex w-40 items-center justify-center gap-1 text-xl text-gray-100 md:w-40"
        >
          <MdOutlineLockReset className="rotate-12 text-2xl" />
          <motion.p variants={layoutVariant} className="font-extrabold">
            Sterna-Quiz
          </motion.p>
        </motion.div>
      </NavLink>
      <motion.div
        variants={layoutVariant}
        className="flex grow justify-between rounded-b-md bg-gray-50 px-2 pb-2  shadow-md md:flex-col md:rounded-t-md md:px-0 "
      >
        <NavLinks />
        <motion.button
          variants={layoutVariant}
          onClick={() => navigate("/")}
          className="my-2 ml-2 flex h-[48px] grow cursor-pointer items-center justify-center gap-2 rounded-md border border-solid border-gray-300 bg-gray-50 p-3 text-sm font-medium hover:bg-gray-500 hover:text-gray-200 md:mx-2  md:my-0 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <FaPowerOff className="w-6" />
          <motion.div variants={layoutVariant} className="hidden md:block">
            Sign Out
          </motion.div>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function NavLinks() {
  const userRole = localStorage.getItem("roleId");

  return (
    <ul className="my-2 inline-flex space-x-1 md:mx-2 md:block md:space-x-0 md:space-y-2">
      {navLinks.map(
        (link) =>
          link.allowedUsers.includes(userRole?.toString() as Role) && (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                clsx(
                  "flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium  hover:bg-gray-500 hover:text-gray-100 md:flex-none md:justify-start md:p-2 md:px-3",
                  {
                    "border border-solid bg-gray-500 text-gray-100 shadow":
                      isActive,
                    "border border-solid border-gray-300 bg-gray-50 text-gray-500 ":
                      !isActive,
                  },
                )
              }
            >
              {link.icon}
              <p className="hidden md:block">{link.title}</p>
            </NavLink>
          ),
      )}
    </ul>
  );
}
