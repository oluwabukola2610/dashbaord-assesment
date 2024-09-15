import Link from "next/link";

import React from "react";
import { FaUsers, FaNewspaper, FaTasks, FaImages, FaCog } from "react-icons/fa"; // Import icons

export const sidebarData = [
  {
    label: "Users",
    icon: <FaUsers className="mr-2" />,
    key: "/",
  },
  {
    label: "Posts",
    icon: <FaNewspaper className="mr-2" />,
    key: "posts",
  },
  {
    label: "Todos",
    icon: <FaTasks className="mr-2" />,
    key: "todos",
  },
  {
    label: "Albums",
    icon: <FaImages className="mr-2" />,
    key: "albums",
  },
  {
    label: "Settings",
    icon: <FaCog className="mr-2" />,
    key: "settings",
  },
];

