import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const HomeNewsSlider = ({ newsData, setActiveSubItem, t, isHe }) => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    if (!newsData || newsData.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % newsData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [newsData]);

  if (!newsData || newsData.length === 0) return null;

  const currentItem = newsData[currentNewsIndex];

  return (
    <div className="relative w-full h-[450px] rounded-[3rem] overflow-hidden shadow-2xl group">
      <div className="relative w-full h-full">
        <img
          key={currentItem.id}
          src={currentItem.image || (currentItem.images && currentItem.images[0]) || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'}
          className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-1000"
          alt="news"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
        <div className="absolute bottom-0 p-10 text-white w-full">
          <span className="bg-blue-600 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold mb-4 inline-block">
            {isHe ? 'חדשות אחרונות' : 'Latest News'}
          </span>
          <h2 className="text-4xl font-black mb-4 drop-shadow-lg max-w-2xl">{t(currentItem.title)}</h2>
          <button
            onClick={() => setActiveSubItem(currentItem)}
            className="bg-white text-blue-900 px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
          >
            {isHe ? 'קרא עוד' : 'Read More'}
            <ChevronRight size={18} className={isHe ? 'rotate-180' : ''} />
          </button>
        </div>
      </div>

      {newsData.length > 1 && (
        <>
          <button
            onClick={() => setCurrentNewsIndex((prev) => (prev - 1 + newsData.length) % newsData.length)}
            className="absolute top-1/2 -translate-y-1/2 left-6 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => setCurrentNewsIndex((prev) => (prev + 1) % newsData.length)}
            className="absolute top-1/2 -translate-y-1/2 right-6 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {newsData.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentNewsIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${currentNewsIndex === i ? 'w-8 bg-blue-500' : 'w-2 bg-white/50 hover:bg-white'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeNewsSlider;