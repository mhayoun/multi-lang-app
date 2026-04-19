import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, X, Maximize2 } from 'lucide-react';

const GalleryBanderole = ({ images, isHe }) => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(null);

  if (!images || images.length === 0) return null;

  const hasMultipleImages = images.length > 1;

  const nextImage = (e) => {
    e?.stopPropagation();
    setSelectedImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e?.stopPropagation();
    setSelectedImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const scroll = (direction) => {
    const container = document.getElementById('gallery-banderole-container');
    const scrollAmount = direction === 'left' ? -400 : 400;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div className="mb-12 relative group/gallery">
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 px-2">
        {isHe ? 'גלריית תמונות' : 'Photo Gallery'}
      </h3>

      <div className="relative">
        {/* Navigation Arrows for Banderole - Only if multiple images */}
        {hasMultipleImages && (
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
          {images.map((img, i) => (
            <div
              key={i}
              onClick={() => setSelectedImgIndex(i)}
              className="relative flex-shrink-0 w-80 h-52 rounded-[2rem] overflow-hidden shadow-lg cursor-pointer group snap-start border border-slate-100 bg-slate-200"
            >
              <img
                src={img}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt=""
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-3 rounded-full scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                  <Maximize2 className="text-white" size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- LIGHTBOX OVERLAY --- */}
      {selectedImgIndex !== null && (
        <div
          className="fixed inset-0 z-[999] bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center animate-in fade-in duration-300"
          onClick={() => setSelectedImgIndex(null)}
        >
          <button
            className="absolute top-8 right-8 text-white/50 hover:text-white hover:rotate-90 transition-all"
            onClick={() => setSelectedImgIndex(null)}
          >
            <X size={40} />
          </button>

          {/* Lightbox Prev - Only if multiple */}
          {hasMultipleImages && (
            <button
              className="absolute left-6 md:left-12 text-white p-4 hover:bg-white/10 rounded-full transition-all"
              onClick={prevImage}
            >
              <ChevronLeft size={48} />
            </button>
          )}

          <div className="max-w-[85vw] max-h-[85vh] flex flex-col items-center">
            <img
              src={images[selectedImgIndex]}
              className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300"
              alt="Preview"
              onClick={(e) => e.stopPropagation()}
            />
            {hasMultipleImages && (
              <div className="mt-6 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white/70 text-sm font-mono tracking-tighter">
                {selectedImgIndex + 1} / {images.length}
              </div>
            )}
          </div>

          {/* Lightbox Next - Only if multiple */}
          {hasMultipleImages && (
            <button
              className="absolute right-6 md:right-12 text-white p-4 hover:bg-white/10 rounded-full transition-all"
              onClick={nextImage}
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