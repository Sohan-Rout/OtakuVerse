'use client';

import { FiChevronDown } from 'react-icons/fi';

export default function ScrollDownArrow() {
  const handleScroll = () => {
    const nextSection = document.getElementById('next-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
      <button
        onClick={handleScroll}
        aria-label="Scroll to next section"
        className="animate-bounce p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
      >
        <FiChevronDown className="text-3xl" />
      </button>
    </div>
  );
}