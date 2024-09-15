"use client";
import { useState } from "react";
import DashboardSider from "./DashboardSider";
import DashNav from "./DashNav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [collaspse, setCollapse] = useState(false);

  const toggleSidebar = () => {
    setCollapse(prev => !prev);
  };
  return (
    <div className="drawer lg:drawer-open text-black mx-auto max-w-[1640px]">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content bg-[#FAFAFA] dark:bg-black/70 py-2 overflow-y-scroll items-center backdrop-blur-md transition-all duration-300 ">
        <DashNav toggle={toggleSidebar} />
        {children}
      </div>
      <DashboardSider collapse={collaspse} />
    </div>
  );
};

export default DashboardLayout;
