import { NavLink, useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";
import { navLinks } from "../utils/constant";
import clsx from "clsx";
import { MdOutlineLockReset } from "react-icons/md";
import { Variants, motion } from "framer-motion";
import { Role } from "../utils/enum";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

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
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={layoutVariant}
      className="flex h-full flex-col px-3 pt-4 md:p-4 md:px-2"
    >
      <NavLink
        className="flex h-16 items-center justify-center rounded-t-md bg-gray-500 p-4 active:scale-95 md:mb-2 md:h-20 md:justify-start md:rounded-md md:shadow-md"
        to="/dashboard"
      >
        <div className="flex w-40 items-center justify-center gap-1 text-xl text-white md:w-40">
          <MdOutlineLockReset className="rotate-12 text-2xl" />
          <p className="font-extrabold">Sterna-Quiz</p>
        </div>
      </NavLink>
      <div className="flex grow justify-between rounded-b-md bg-gray-50 px-2 pb-2  shadow-md md:flex-col md:rounded-t-md md:px-0 ">
        <NavLinks />
        <Modal
          opened={opened}
          onClose={close}
          withCloseButton={false}
          centered
          radius="md"
          size="md"
          transitionProps={{
            transition: "fade",
            duration: 200,
            timingFunction: "linear",
          }}
        >
          <div className="flex w-full flex-col items-center justify-center gap-4 py-2">
            <div>Are you sure you wanna sign-out!</div>
            <div className="flex gap-4">
              <Button
                onClick={close}
                color="gray"
                variant="outline"
                radius="md"
              >
                cancel
              </Button>
              <Button
                onClick={() => navigate("/")}
                color="gray"
                variant="filled"
                radius="md"
              >
                signout
              </Button>
            </div>
          </div>
        </Modal>
        <button
          onClick={open}
          className="my-2 ml-2 flex h-[48px] grow cursor-pointer items-center justify-center gap-2 rounded-md border border-solid border-gray-300 bg-gray-50 p-3 text-sm font-medium hover:bg-gray-500 hover:text-gray-200 md:mx-2  md:my-0 md:flex-none md:justify-start md:p-2 md:px-3"
        >
          <FaPowerOff className="w-6" />
          <div className="hidden md:block">Sign Out</div>
        </button>
      </div>
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
                  "flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3  transition-all duration-75 hover:bg-gray-500 hover:text-gray-100 active:scale-95 md:flex-none md:justify-start md:p-2 md:px-3",
                  {
                    "border border-solid bg-gray-500 text-gray-100 shadow":
                      isActive,
                    "border border-solid border-gray-300 bg-white text-gray-500":
                      !isActive,
                  },
                )
              }
            >
              <div className="flex items-center">{link.icon}</div>
              <p className="hidden flex-1 font-semibold tracking-wider md:block">
                {link.title}
              </p>
            </NavLink>
          ),
      )}
    </ul>
  );
}
