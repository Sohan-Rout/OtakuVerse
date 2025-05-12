'use client';
import { useState } from 'react';
import { FiSearch, FiX, FiFilter } from 'react-icons/fi';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search functionality will be added later
    console.log('Searching for:', searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for anime..."
            className="w-full py-3 px-4 pr-12 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 border border-gray-700"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-14 text-gray-400 hover:text-white"
            >
              <FiX className="text-xl" />
            </button>
          )}
          <button
            type="submit"
            className="absolute right-4 bg-amber-500 text-black p-2 rounded-lg hover:bg-amber-400 transition-colors"
          >
            <FiSearch className="text-xl" />
          </button>
        </div>
      </form>

      {/* Filter Button - Will be functional later */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="mt-3 flex items-center gap-2 text-gray-300 hover:text-amber-500 transition-colors"
      >
        <FiFilter />
        <span>Filters</span>
      </button>

      {/* Filter Dropdown - Will be populated later */}
      {showFilters && (
        <div className="absolute z-10 mt-2 w-full p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <h4 className="text-amber-500 mb-2 font-medium">Categories</h4>
              <ul className="space-y-1 text-gray-300">
                <li className="hover:text-amber-400 cursor-pointer">Action</li>
                <li className="hover:text-amber-400 cursor-pointer">Adventure</li>
                <li className="hover:text-amber-400 cursor-pointer">Comedy</li>
                <li className="hover:text-amber-400 cursor-pointer">Drama</li>
              </ul>
            </div>
            <div>
              <h4 className="text-amber-500 mb-2 font-medium">Year</h4>
              <ul className="space-y-1 text-gray-300">
                <li className="hover:text-amber-400 cursor-pointer">2023</li>
                <li className="hover:text-amber-400 cursor-pointer">2022</li>
                <li className="hover:text-amber-400 cursor-pointer">2021</li>
                <li className="hover:text-amber-400 cursor-pointer">2020</li>
              </ul>
            </div>
            <div>
              <h4 className="text-amber-500 mb-2 font-medium">Status</h4>
              <ul className="space-y-1 text-gray-300">
                <li className="hover:text-amber-400 cursor-pointer">Airing</li>
                <li className="hover:text-amber-400 cursor-pointer">Completed</li>
                <li className="hover:text-amber-400 cursor-pointer">Upcoming</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button 
              onClick={() => setShowFilters(false)}
              className="px-4 py-2 text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 bg-amber-500 text-black rounded hover:bg-amber-400"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}