import React, { useState } from "react";
import logodark from "../assets/logo-dark.svg"
import logolight from "../assets/logo-light.svg"
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { PiExamBold } from "react-icons/pi";
import { FiMessageSquare, FiFolder } from "react-icons/fi";
import { Link } from "react-router-dom";

const SideBar = () => {
    const menus = [
        { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
        { name: "User", link: "/", icon: AiOutlineUser },
        { name: "Analytics", link: "/", icon: TbReportAnalytics,},
        { name: "Paper Upload", link: "/", icon: FiMessageSquare, margin: true},
        { name: "Content Upload", link: "/", icon: FiFolder },
        { name: "Assessments", link: "/", icon: PiExamBold },
        { name: "Checking & Results", link: "/", icon: AiOutlineHeart, margin: true },
        { name: "Setting", link: "/", icon: RiSettings4Line },
    ];
    const [open, setOpen] = useState(false);
    const isDark = (localStorage.theme == 'dark') ? true : false; 
    return (

        <div
            className={` ${ isDark && "bg-black" } min-h-screen ${open ? "w-60" : "w-16"
                } duration-500 text-gray-100 px-4`}
        >
            <div className="py-3 flex justify-end">
                <HiMenuAlt3
                    size={26}
                    className="cursor-pointer"
                    onClick={() => setOpen(!open)}
                />
            </div>
            <div>
                <img src={isDark? logodark: logolight } alt="" />
                <hr className="h-0.5 bg-gray-100 border-0 rounded md:my-1 dark:bg-gray-3"></hr>
            </div>
            <div className="mt-4 flex flex-col gap-4 relative">
                {menus?.map((menu, i) => (
                    <Link
                        to={menu?.link}
                        key={i}
                        className={` ${menu?.margin && "mt-5"
                            } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-blue-800 rounded-md`}
                    >

                        <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                        <h2
                            style={{
                                transitionDelay: `${i + 2}00ms`,
                            }}
                            className={`whitespace-pre font-semibold duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"
                                }`}
                        >
                            {menu?.name}
                        </h2>
                        <h2
                            className={`${open && "hidden"
                                } absolute left-48 bg-black font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
                        >
                            {menu?.name}
                        </h2>
                    </Link>
                ))}

            </div>
        </div>
    );
};

export default SideBar;
