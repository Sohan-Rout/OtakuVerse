import Link from 'next/link';
import { FiSearch, FiHome, FiCompass, FiBookmark, FiUser } from 'react-icons/fi';

export default function Navbar() {
  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              アニメオン
            </span>
          </Link>
        </div>

        {/* Search Bar - Center */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search Anime..."
              className="w-full bg-gray-800 rounded-full py-2 px-4 pl-10 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="hidden md:block hover:text-purple-400 transition">
            <FiHome className="text-xl" />
          </Link>
          <Link href="/discover" className="hidden md:block hover:text-purple-400 transition">
            <FiCompass className="text-xl" />
          </Link>
          <Link href="/bookmarks" className="hidden md:block hover:text-purple-400 transition">
            <FiBookmark className="text-xl" />
          </Link>
          <Link href="/profile" className="hidden md:block hover:text-purple-400 transition">
            <FiUser className="text-xl" />
          </Link>

          {/* Mobile Search Button */}
          <button className="md:hidden p-2 rounded-full hover:bg-gray-800">
            <FiSearch className="text-xl" />
          </button>

          {/* User Avatar */}
          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center cursor-pointer">
            <span className="text-sm font-medium">ユ</span>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Anime..."
            className="w-full bg-gray-800 rounded-full py-2 px-4 pl-10 text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>
    </nav>
  );
}