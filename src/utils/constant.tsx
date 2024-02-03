import { MdOutlineAnalytics } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaRegRectangleList } from "react-icons/fa6";
import { TbReportAnalytics } from "react-icons/tb";
import { FiRefreshCcw } from "react-icons/fi";
import { Role } from "./enum";
import { IconChecklist } from "@tabler/icons-react";

export const navLinks = [
  {
    title: "Home",
    to: "dashboard",
    icon: <MdOutlineAnalytics className="w-6 h-6" />,
    allowedUsers: [Role.SuperAdmin, Role.Admin],
  },
  {
    title: "Users",
    to: "users",
    icon: <FaPeopleGroup className="w-6 h-6" />,
    allowedUsers: [Role.SuperAdmin, Role.Admin],
  },
  {
    title: "Subjects",
    to: "subjects",
    icon: <FaRegRectangleList className="w-6 h-6" />,
    allowedUsers: [Role.SuperAdmin, Role.Admin],
  },
  {
    title: "Results",
    to: "results",
    icon: <TbReportAnalytics className="w-6 h-6" />,
    allowedUsers: [Role.SuperAdmin, Role.Admin],
  },
  {
    title: "Positions",
    to: "positions",
    icon: <IconChecklist className="w-6 h-6" />,
    allowedUsers: [Role.SuperAdmin],
  },
  {
    title: "Reassign",
    to: "reassign",
    icon: <FiRefreshCcw className="w-6 h-6" />,
    allowedUsers: [Role.SuperAdmin],
  },
];

export const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-rose-100/10 before:to-transparent";

export const dateValue = [
  "All",
  "Today",
  "Yesterday",
  "MonthTillDate",
  "DateRange",
];
export const percentageValue = [
  {
    value: "All",
    label: "All",
  },
  {
    value: "0-50",
    label: "Less than 50%",
  },
  {
    value: "50-75",
    label: "50% - 75%",
  },
  {
    value: "75-100",
    label: "Above 75%",
  },
];
export const experienceLevelData=[{value:0,label:"All"},{value:1,label:"Fresher"},{value:3,label:"Experienced"}]
