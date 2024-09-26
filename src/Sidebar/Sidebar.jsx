import React, { useContext, useState } from "react";
import logodark from "../assets/logo-dark.svg";
import logolight from "../assets/logo-light.svg";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { PiExamBold } from "react-icons/pi";
import { FiFolder } from "react-icons/fi";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { BsClipboardCheck } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const menus = [
    { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
    { name: "User Profile", link: "/", icon: AiOutlineUser },
    { name: "Analytics", link: "/", icon: TbReportAnalytics },
    {
      name: "Schedule Paper",
      link: "/schedule",
      icon: FaRegCalendarCheck,
      margin: true,
    },
    { name: "Questions Upload", link: "/", icon: FiFolder },
    { name: "Assessment Report", link: "/", icon: PiExamBold },
    { name: "Checking & Results", link: "/", icon: BsClipboardCheck },
  ];
  const [open, setOpen] = useState(false);

  return (
    <div
      className={` dark:bg-black bg-zinc-200 min-h-screen ${
        open ? "w-60" : "w-16"
      } duration-500 text-gray-100 px-4`}
    >
      <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className=" items-center flex flex-col">
        <img
          src={theme === "dark" ? logodark : logolight}
          className={`${open && "w-20"} `}
          alt=""
        />
        <h3
          style={{
            transitionDelay: `200ms`,
          }}
          className={`whitespace-pre font-semibold duration-500 ${
            !open && "opacity-0 translate-x-5 overflow-hidden h-0"
          }`}
        >
          {"EduWiz"}
        </h3>
        <hr
          className={`h-0.5 bg-gray-100 border-0 rounded md:my-1 dark:bg-gray-3 bg-black ${
            open ? " w-30" : "w-10"
          } `}
        />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        {menus?.map((menu, i) => (
          <Link
            to={menu?.link}
            key={i}
            className={` ${
              menu?.margin && "mt-5"
            } group flex items-center text-sm gap-3.5 font-medium p-2 dark:hover:bg-blue-800 hover:bg-blue-500} rounded-md`}
          >
            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `${i + 2}00ms`,
              }}
              className={`whitespace-pre font-semibold duration-500 z-20 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              {menu?.name}
            </h2>
            <h2
              className={`${
                open && "hidden"
              } z-20 absolute left-48 dark:bg-black bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
