"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarData } from "./DashData";

const DashboardSider: React.FC<{ collapse: boolean }> = ({ collapse }) => {
  const pathName = usePathname();

  return (
    <div className="drawer-side z-10">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <aside
        className={`flex flex-col space-y-4 ${
          collapse ? "w-0" : "w-[13rem]"
        } min-h-screen overflow-hidden shadow-xl bg-white dark:bg-black/70 border-r border-r-gray-300 py-2 overflow-y-scroll items-center backdrop-blur-md transition-all duration-300 dark:border-r-gray-900 dark:shadow-gray-900`}
      >
        <div className="space-y-5 flex flex-col mt-12 w-full px-3">
          {sidebarData.map((item) => (
            <Link
              href={item.key}
              key={item.key}
              className={`flex w-full p-3 items-center justify-center rounded-md ${
                pathName === item.key
                  ? "bg-gray-700 text-white" // Active path styles
                  : "text-gray-800 dark:text-white" // Default styles
              }`}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </Link>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default DashboardSider;
