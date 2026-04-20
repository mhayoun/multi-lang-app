import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, X, Maximize2, PlayCircle } from 'lucide-react';

const GalleryBanderole = ({ media, isHe }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Safety check: handle old 'images' prop or new 'media' array
  const items = media || [];
  if (items.length === 0) return null;

  const hasMultipleItems = items.length > 1;

  const nextItem = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % items.length);
  };

  const prevItem = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const scroll = (direction) => {
    const container = document.getElementById('gallery-banderole-container');
    const scrollAmount = direction === 'left' ? -400 : 400;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="mb-12 relative group/gallery" dir="ltr"> {/* Container ltr for consistent scrolling logic */}
      <h3 className={`text-sm font-black uppercase tracking-widest text-slate-400 mb-4 px-2 ${isHe ? 'text-right' : 'text-left'}`}>
        {isHe ? 'גלריית מדיה' : 'Media Gallery'}
      </h3>

      <div className="relative">
        {/* Navigation Arrows for Banderole */}
        {hasMultipleItems && (
          <>
            <button
              onClick={() => scroll('left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-xl opacity-0 group-hover/gallery:opacity-100 transition-all hover:bg-blue-600 hover:text-white"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-xl opacity-0 group-hover/gallery:opacity-100 transition-all hover:bg-blue-600 hover:text-white"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        <div
          id="gallery-banderole-container"
          className="flex gap-4 overflow-x-auto pb-6 custom-scrollbar snap-x scroll-smooth"
        >
          {items.map((item, i) => (
            <div
              key={i}
              onClick={() => setSelectedIndex(i)}
              className="relative flex-shrink-0 w-80 h-52 rounded-[2rem] overflow-hidden shadow-lg cursor-pointer group snap-start border border-slate-100 bg-slate-900"
            >
              {item.type === 'video' ? (
                <div className="w-full h-full relative">
                  <video
                    src={item.url}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle size={48} className="text-white/80 group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              ) : (
                <img
                  src={item.url}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt=""
                />
              )}

              {/* Overlay for both types */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                  <Maximize2 className="text-white" size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- LIGHTBOX OVERLAY --- */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[999] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center animate-in fade-in duration-300"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute top-8 right-8 text-white/50 hover:text-white hover:rotate-90 transition-all z-[1000]"
            onClick={() => setSelectedIndex(null)}
          >
            <X size={40} />
          </button>

          {/* Lightbox Prev */}
          {hasMultipleItems && (
            <button
              className="absolute left-6 md:left-12 text-white p-4 hover:bg-white/10 rounded-full transition-all z-[1000]"
              onClick={prevItem}
            >
              <ChevronLeft size={48} />
            </button>
          )}

          <div className="max-w-[90vw] max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {items[selectedIndex].type === 'video' ? (
              <video
                src={items[selectedIndex].url}
                controls
                autoPlay
                className="max-w-full max-h-full rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300"
              />
            ) : (
              <img
                src={items[selectedIndex].url}
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300"
                alt="Preview"
              />
            )}

            {hasMultipleItems && (
              <div className="mt-6 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/70 text-sm font-mono tracking-tighter">
                {selectedIndex + 1} / {items.length}
              </div>
            )}
          </div>

          {/* Lightbox Next */}
          {hasMultipleItems && (
            <button
              className="absolute right-6 md:right-12 text-white p-4 hover:bg-white/10 rounded-full transition-all z-[1000]"
              onClick={nextItem}
            >
              <ChevronRight size={48} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default GalleryBanderole;