'use client';
import { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaStar, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import { GoDotFill } from "react-icons/go";
import { useWindowSize } from '@react-hook/window-size';

export default function AnimeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [allTimeAnime, setAllTimeAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookmarked, setBookmarked] = useState({});
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [windowWidth] = useWindowSize();

  // Determine cards per slide based on screen size
  const getCardsPerSlide = () => {
    if (windowWidth >= 1024) return 4; // lg screens
    if (windowWidth >= 768) return 3;   // md screens
    return 1;                          // mobile
  };

  const [cardsPerSlide, setCardsPerSlide] = useState(getCardsPerSlide());

  // Update cards per slide when window resizes
  useEffect(() => {
    setCardsPerSlide(getCardsPerSlide());
    // Reset to first slide when layout changes
    setCurrentIndex(0);
  }, [windowWidth]);

  // Fetch all-time favorite anime from Jikan API
  useEffect(() => {
    const fetchAllTimeAnime = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=10');
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
          setAllTimeAnime(data.data.map(anime => ({
            id: anime.mal_id,
            title: anime.title,
            image: anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url,
            description: anime.synopsis,
            genres: anime.genres?.map(g => g.name) || [],
            episodes: anime.episodes,
            score: anime.score,
            year: anime.year || 'N/A'
          })));
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching all-time anime:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllTimeAnime();
  }, []);

  const toggleBookmark = (id) => {
    setBookmarked(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const totalSlides = Math.ceil(allTimeAnime.length / cardsPerSlide);

  const goToNext = useCallback(() => {
    if (allTimeAnime.length === 0) return;
    setCurrentIndex(prev => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [allTimeAnime.length, totalSlides, cardsPerSlide]);

  const goToPrev = useCallback(() => {
    if (allTimeAnime.length === 0) return;
    setCurrentIndex(prev => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  }, [allTimeAnime.length, totalSlides, cardsPerSlide]);

  // Auto-rotate slides
  useEffect(() => {
    if (!isAutoPlaying || allTimeAnime.length === 0) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [allTimeAnime.length, isAutoPlaying, goToNext, cardsPerSlide]);

  if (isLoading) {
    return (
      <div className="w-full py-16 flex items-center justify-center bg-black"></div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-16 flex items-center justify-center bg-black text-red-600">
        <p>Error loading anime: {error}</p>
      </div>
    );
  }

  if (allTimeAnime.length === 0) {
    return (
      <div className="w-full py-16 flex items-center justify-center bg-black text-amber-600">
        <p>No anime found</p>
      </div>
    );
  }

  // Calculate visible anime indices based on currentIndex and cardsPerSlide
  const startIndex = currentIndex * cardsPerSlide;
  const endIndex = startIndex + cardsPerSlide;
  const visibleAnime = allTimeAnime.slice(startIndex, endIndex);

  // Determine grid columns based on screen size
  const gridColumns = windowWidth >= 1024 ? 'lg:grid-cols-4' : 
                     windowWidth >= 768 ? 'md:grid-cols-3' : 
                     'grid-cols-1';

  return (
    <section className="relative w-full py-12 bg-black px-0 z-40 mx-auto max-w-7xl">
      {/* Section Header */}
      <div className="flex justify-between items-center mb-8 px-4">
        <div className="flex items-center gap-2">
          <GoDotFill className="text-2xl text-red-600 animate-pulse"/>
          <h2 className="text-2xl md:text-3xl font-bold text-white">All-Time Favorites</h2>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={goToPrev}
            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-all"
            aria-label="Previous slide"
          >
            <FiChevronLeft className="text-xl text-amber-500" />
          </button>
          <button 
            onClick={goToNext}
            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-all"
            aria-label="Next slide"
          >
            <FiChevronRight className="text-xl text-amber-500" />
          </button>
        </div>
      </div>

      {/* Anime Cards Carousel */}
      <div className="relative overflow-hidden px-4">
        <div className={`grid ${gridColumns} gap-6 transition-opacity duration-500`}>
          {visibleAnime.map((anime) => (
            <div key={anime.id} className="relative group bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              {/* Bookmark Button */}
              <button 
                onClick={() => toggleBookmark(anime.id)}
                className="absolute top-2 right-2 z-10 p-2 bg-black/50 rounded-full hover:bg-amber-500 transition-all"
                aria-label={bookmarked[anime.id] ? "Remove from list" : "Add to list"}
              >
                {bookmarked[anime.id] ? (
                  <FaBookmark className="text-amber-500" />
                ) : (
                  <FaRegBookmark className="text-white" />
                )}
              </button>
              
              {/* Anime Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={anime.image}
                  alt={anime.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = '/fallback-anime-image.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>
              
              {/* Anime Info */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{anime.title}</h3>
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center text-amber-500">
                    <FaStar className="mr-1" />
                    <span className="text-sm font-semibold">{anime.score || 'N/A'}</span>
                  </div>
                  <span className="text-xs text-gray-400">{anime.year}</span>
                </div>
                
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">{anime.description || 'No description available.'}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {anime.genres?.slice(0, 2).map((genre, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded-full">
                      {genre}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <button className="flex-1 py-2 bg-amber-500 text-black text-sm font-medium rounded hover:bg-amber-400 transition-colors">
                    Watch Now
                  </button>
                  <button className="px-3 py-2 bg-gray-800 text-gray-300 text-sm rounded hover:bg-gray-700 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-amber-600 w-6' : 'bg-white/25'}`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}