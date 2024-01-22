import { MdOutlineAnalytics } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaRegRectangleList } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { FiRefreshCcw } from "react-icons/fi";
import { Role } from "./enum";

export const navLinks = [
  {
    title: "Home",
    to: "dashboard",
    icon: <MdOutlineAnalytics className="h-6 w-6" />,
    allowedUsers: [Role.SuperAdmin, Role.Admin],
  },
  {
    title: "Users",
    to: "users",
    icon: <FaPeopleGroup className="h-6 w-6" />,
    allowedUsers: [Role.SuperAdmin, Role.Admin],
  },
  {
    title: "Courses",
    to: "courses",
    icon: <FaRegRectangleList className="h-6 w-6" />,
    allowedUsers: [Role.SuperAdmin, Role.Admin],
  },
  {
    title: "Result",
    to: "results",
    icon: <TbReportAnalytics className="h-6 w-6" />,
    allowedUsers: [Role.SuperAdmin, Role.Admin],
  },
  {
    title: "Reassign",
    to: "reassign",
    icon: <FiRefreshCcw className="h-5 w-5" />,
    allowedUsers: [Role.SuperAdmin],
  },
];

export const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent";
