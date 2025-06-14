'use client';
import { useState, useEffect } from 'react';
import { FiSearch, FiX, FiFilter } from 'react-icons/fi';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality will be added later
    console.log('Searching for:', searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  if (!isMounted) return null;

  return (
    <>
      <div className="relative w-full max-w-4xl mx-auto px-4">
        {/* Search and Filter Container */}
        <div className="flex flex-wrap gap-8 items-center justify-between">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative flex-1 min-w-[250px]">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search anime titles..."
                className="w-full py-3 px-5 pr-14 rounded-full bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-200"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-14 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <FiX className="text-lg" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-[24px] top-1/2 transform -translate-y-1/2 bg-amber-500 p-2 rounded-full hover:bg-amber-400 transition-colors"
              >
                <FiSearch className="text-white text-xl" />
              </button>
            </div>
          </form>

          {/* Filter Button */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-gray-800 text-white hover:bg-gray-700 transition-all"
          >
            <FiFilter />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* Filter Dropdown */}
        {showFilters && (
          <div className="absolute z-10 mt-3 w-full p-10 bg-gray-900 rounded-lg shadow-xl border border-gray-700 animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-amber-400 font-semibold mb-2">Categories</h4>
                <ul className="space-y-1 text-gray-300">
                  <li className="hover:text-amber-400 cursor-pointer">Action</li>
                  <li className="hover:text-amber-400 cursor-pointer">Adventure</li>
                  <li className="hover:text-amber-400 cursor-pointer">Comedy</li>
                  <li className="hover:text-amber-400 cursor-pointer">Drama</li>
                </ul>
              </div>
              <div>
                <h4 className="text-amber-400 font-semibold mb-2">Year</h4>
                <ul className="space-y-1 text-gray-300">
                  <li className="hover:text-amber-400 cursor-pointer">2023</li>
                  <li className="hover:text-amber-400 cursor-pointer">2022</li>
                  <li className="hover:text-amber-400 cursor-pointer">2021</li>
                  <li className="hover:text-amber-400 cursor-pointer">2020</li>
                </ul>
              </div>
              <div>
                <h4 className="text-amber-400 font-semibold mb-2">Status</h4>
                <ul className="space-y-1 text-gray-300">
                  <li className="hover:text-amber-400 cursor-pointer">Airing</li>
                  <li className="hover:text-amber-400 cursor-pointer">Completed</li>
                  <li className="hover:text-amber-400 cursor-pointer">Upcoming</li>
                </ul>
              </div>
            </div>
            <div className="mt-5 flex justify-end space-x-2">
              <button
                onClick={() => setShowFilters(false)}
                className="px-4 py-2 text-gray-300 hover:text-white"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-amber-500 text-black rounded hover:bg-amber-400">
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}