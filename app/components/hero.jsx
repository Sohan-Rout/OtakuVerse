'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [trending, setTrending] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const res = await fetch('/api/trending');
        if (!res.ok) throw new Error('Failed to fetch trending data');
        const data = await res.json();
        if (!data.results) throw new Error('Invalid response format');
        setTrending(data.results.slice(0, 6));
      } catch (err) {
        console.error('Error loading trending anime:', err.message);
      }
    }

    fetchTrending();

    // Load continue watching
    const stored = JSON.parse(localStorage.getItem('continueWatching')) || [];
    setContinueWatching(stored);
  }, []);

  const bgImage = trending[0]?.image || '/fallback.jpg';

  return (
    <div
      className="relative w-full h-[80vh] bg-cover bg-center rounded-lg overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Text Content */}
      <div className="relative z-10 px-6 sm:px-12 max-w-6xl mx-auto flex flex-col justify-center h-full text-white">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Your Anime Journey Awaits</h1>
        <p className="mb-6 text-lg text-gray-300 max-w-xl">
          Pick up where you left off or discover the hottest anime right now!
        </p>

        {/* Buttons */}
        <div className="flex gap-4 flex-wrap">
          {continueWatching.length > 0 && (
            <Link
              href={`/watch/${continueWatching[0].id}`}
              className="bg-amber-500 text-black px-6 py-2 rounded-full font-medium hover:bg-amber-400 transition"
            >
              Continue Watching
            </Link>
          )}
          <a
            href="#trending"
            className="border border-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-black transition"
          >
            Trending Now
          </a>
        </div>
      </div>
    </div>
  );
}