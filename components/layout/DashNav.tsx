"use client";
import { useTheme } from "next-themes";
import React from "react";
import { BiCollapseHorizontal } from "react-icons/bi";
import { CgMenuRightAlt } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

const DashNav: React.FC<{ toggle: () => void }> = ({ toggle }) => {
  const { theme, setTheme } = useTheme(); 

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const userName = "John Doe";
  const initials = userName
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <>
      <nav className="flex justify-between items-center px-5 py-2 bg-white dark:bg-black shadow-md dark:shadow-gray-900 transition-colors duration-300">
        <label
          htmlFor="my-drawer-2"
          className="flex lg:hidden text-blue-800 dark:text-blue-400 px-3 cursor-pointer"
        >
          <CgMenuRightAlt size="25" />
        </label>

        <div
          className="hidden lg:flex items-center cursor-pointer"
          onClick={toggle}
        >
          <BiCollapseHorizontal size="25" className="text-gray-700 dark:text-gray-300" />
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 ms-4">
          <span className="absolute inset-y-0 start-0 grid w-10 place-content-center text-gray-500 dark:text-gray-400">
            <CiSearch />
          </span>
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-[520px] rounded-md border-gray-200 dark:border-gray-800 border py-2 pe-0 sm:text-sm pl-10 outline-none ring-0 bg-inherit dark:bg-gray-950 text-gray-800 dark:text-gray-200"
          />
        </div>

        <div className="flex items-center space-x-4">
          <FaBell size="20" className="text-gray-600 dark:text-gray-300 cursor-pointer" />

          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full font-bold dark:bg-blue-400">
              {initials}
            </div>
            <span className="hidden lg:block text-gray-800 dark:text-gray-200">{userName}</span>
          </div>

          <button
            onClick={handleThemeToggle}
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 cursor-pointer"
          >
            {theme === "dark" ? (
              <MdOutlineLightMode size="20" />
            ) : (
              <MdOutlineDarkMode size="20" />
            )}
          </button>
        </div>
      </nav>
      <div className="border border-gray-200 dark:border-gray-900" />
    </>
  );
};

export default DashNav;
