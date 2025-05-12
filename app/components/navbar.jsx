"use client";
import Link from 'next/link';
import { FiHome, FiCompass, FiSettings, FiMenu } from 'react-icons/fi';
import { useState } from 'react';

export default function VerticalNavbar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav 
      className="bg-black text-white h-screen fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out"
      style={{ width: isHovered ? '200px' : '60px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full py-4">
        {/* Hamburger Menu Icon */}
        <div className="px-4 py-2 flex items-center justify-center md:justify-start mb-6">
          <FiMenu className="text-2xl cursor-pointer" />
          {isHovered}
        </div>

        {/* Navigation Links */}
        <div className="flex-1 flex flex-col space-y-4 px-2">
          <Link 
            href="/" 
            className="flex items-center p-3 rounded-lg hover:bg-gray-800 transition"
          >
            <FiHome className="text-xl" />
            {isHovered && <span className="ml-3 hidden md:block">Home</span>}
          </Link>

          <Link 
            href="/browse" 
            className="flex items-center p-3 rounded-lg hover:bg-gray-800 transition"
          >
            <FiCompass className="text-xl" />
            {isHovered && <span className="ml-3 hidden md:block">Browse</span>}
          </Link>

          <Link 
            href="/settings" 
            className="flex items-center p-3 rounded-lg hover:bg-gray-800 transition mt-auto"
          >
            <FiSettings className="text-xl" />
            {isHovered && <span className="ml-3 hidden md:block">Settings</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}