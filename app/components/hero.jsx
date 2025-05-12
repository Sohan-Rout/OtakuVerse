'use client';

import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiLoader } from 'react-icons/fi';
import { GoDotFill } from "react-icons/go";

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [trendingAnime, setTrendingAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trending anime from Jikan API
  useEffect(() => {
    const fetchTrendingAnime = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing&limit=5');
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
          setTrendingAnime(data.data.map(anime => ({
            id: anime.mal_id,
            title: anime.title,
            image: anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url,
            description: anime.synopsis,
            genres: anime.genres?.map(g => g.name) || [],
            episodes: anime.episodes
          })));
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching trending anime:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingAnime();
  }, []);

  // Auto-rotate slides
  useEffect(() => {
    if (!isAutoPlaying || trendingAnime.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trendingAnime.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [trendingAnime.length, isAutoPlaying]);

  const goToNext = () => {
    if (trendingAnime.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % trendingAnime.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrev = () => {
    if (trendingAnime.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + trendingAnime.length) % trendingAnime.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <FiLoader className="animate-spin text-4xl text-amber-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white">
        <p>Error loading trending anime: {error}</p>
      </div>
    );
  }

  if (trendingAnime.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white">
        <p>No trending anime found</p>
      </div>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Trending Badge */}
      <div className="absolute top-10 left-20 z-20 bg-amber-500 text-black px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
        <div className='flex'>
        <div><GoDotFill className="text-2xl text-red-600 animate-pulse"/></div><span className='my-auto'>TRENDING NOW</span>
        </div>
      </div>
      
      {/* Slides Container */}
      <div className="flex h-full w-full transition-transform duration-1000 ease-in-out"
           style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {trendingAnime.map((anime, index) => (
  <div key={anime.id} className="min-w-full h-full flex flex-col lg:flex-row-reverse">
    {/* Left (Now): Image */}
    <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-full">
      <img
        src={anime.image}
        alt={anime.title}
        className="w-full h-full object-cover"
        loading={index === 0 ? 'eager' : 'lazy'}
        onError={(e) => {
          e.target.src = '/fallback-anime-image.jpg';
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900/80 to-transparent z-0" />
    </div>

    {/* Right (Now): Content */}
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-start ml-8 px-6 md:px-12 lg:px-16 text-white z-10 bg-black">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">{anime.title}</h1>
      <p className="text-base md:text-lg mb-4 line-clamp-3">{anime.description}</p>
      <div className="flex items-center gap-3 mb-4">
        <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
          EP: {anime.episodes || '?'}
        </span>
        {anime.genres?.slice(0, 3).map((genre) => (
          <span key={genre} className="px-3 py-1 bg-amber-500 text-black rounded-full text-sm">
            {genre}
          </span>
        ))}
      </div>
      <div className="flex gap-4">
        <button className="px-6 py-2 bg-amber-500 text-black hover:bg-white/20 hover:text-amber-500 rounded-lg">Watch Now</button>
        <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-amber-500 rounded-lg">+ Add to List</button>
      </div>
    </div>
  </div>
))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={goToPrev}
        className="absolute left-4 top-1/2 z-20 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-all"
        aria-label="Previous slide"
      >
        <FiChevronLeft className="text-2xl" />
      </button>
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 z-20 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-all"
        aria-label="Next slide"
      >
        <FiChevronRight className="text-2xl" />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {trendingAnime.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-pink-600 w-6' : 'bg-white/50'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}