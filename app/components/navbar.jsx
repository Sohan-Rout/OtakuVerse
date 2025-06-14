"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import SearchBar from '@/app/components/ui/Searchbar'; // Import your search bar component

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (query) => {
    // Handle search functionality
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="fixed w-full z-50 transition-all py-4 duration-300 bg-gradient-to-b from-zinc-900 to-black">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center text-white text-2xl font-bold">
          <span className="text-2xl font-bold text-amber-500">Otaku</span>Verse
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/trending" className={`nav-link ${pathname === '/trending' ? 'text-amber-500' : 'text-white hover:text-amber-600'}`}>
            Trending
          </Link>
          <Link href="/popular" className={`nav-link ${pathname === '/popular' ? 'text-amber-500' : 'text-white hover:text-amber-600'}`}>
            Popular
          </Link>
          <Link href="/genres" className={`nav-link ${pathname === '/genres' ? 'text-amber-500' : 'text-white hover:text-amber-600'}`}>
            Genres
          </Link>
          <Link href="/schedule" className={`nav-link ${pathname === '/schedule' ? 'text-amber-500' : 'text-white hover:text-amber-600'}`}>
            Schedule
          </Link>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:block w-auto max-w-5xl mx-4">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* User/Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-white hover:text-amber-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-900 px-4 py-3 border-t border-amber-400">
          <div className="mb-4">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="flex flex-col space-y-2">
            <Link 
              href="/trending" 
              className={`nav-link-mobile ${pathname === '/trending' ? 'text-amber-400' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Trending
            </Link>
            <Link 
              href="/popular" 
              className={`nav-link-mobile ${pathname === '/popular' ? 'text-amber-400' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Popular
            </Link>
            <Link 
              href="/genres" 
              className={`nav-link-mobile ${pathname === '/genres' ? 'text-amber-400' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Genres
            </Link>
            <Link 
              href="/schedule" 
              className={`nav-link-mobile ${pathname === '/schedule' ? 'text-amber-400' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Schedule
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;