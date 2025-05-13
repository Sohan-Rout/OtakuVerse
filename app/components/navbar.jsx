"use client";
import Link from "next/link";
import { FiHome, FiCompass, FiSettings, FiMenu } from "react-icons/fi";
import { useState } from "react";

export default function VerticalNavbar() {
  const [isHovered, setIsHovered] = useState(false);
  const sidebarWidth = isHovered ? 200 : 60;

  const links = [
  {
    label: "Home",
    href: "/",
    icon: FiHome
  },
  {
    label: "Browse",
    href: "/browse",
    icon: FiCompass
  }
];

  return (
    <div className="flex">
      {/* Sidebar */}
      <nav
        className="bg-black text-white h-screen fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out"
        style={{ width: sidebarWidth }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col h-full py-4">
          {/* Hamburger Menu Icon */}
          <div className="px-4 py-2 flex items-center justify-center mb-6">
            <FiMenu className="text-2xl cursor-pointer" />
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col space-y-4 px-2">
            {links.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center p-3 rounded-lg hover:bg-gray-800 transition"
                >
                  <Icon className="text-xl" />
                  {isHovered && <span className="ml-3">{item.label}</span>}
                </Link>
              );
            })}
          </div>

        {/* Settings at the bottom */}
           <div className="px-2 mb-2">
            <Link
              href="/settings"
              className="flex items-center p-3 rounded-lg hover:bg-gray-800 transition"
            >
              <FiSettings className="text-xl" />
              {isHovered && <span className="ml-3">Settings</span>}
            </Link>
            </div>
          </div>
          </nav>
    </div>
  );
}
