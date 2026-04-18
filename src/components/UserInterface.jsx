import React from 'react';
import { FileText, ChevronRight, ChevronLeft } from 'lucide-react';

const UserInterface = ({ logic, uiText }) => {
  const { activeSubItem, setActiveSubItem, menuData, newsData, t, lang } = logic;
  const isHe = lang === 'he';

  // --- DETAIL VIEW (Used for both Menu Items and News Slides) ---
  if (activeSubItem) {
    return (
      <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-8" dir={isHe ? 'rtl' : 'ltr'}>
        <button
          onClick={() => setActiveSubItem(null)}
          className="text-blue-600 mb-8 flex items-center gap-2 font-bold group"
        >
          <span className={`transition-transform ${isHe ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`}>
            {isHe ? '→' : '←'}
          </span>
          {uiText.back}
        </button>

        <h1 className="text-4xl font-black mb-6">{t(activeSubItem.title)}</h1>

        {/* News Detail specifically might have a main featured image */}
        {activeSubItem.image && (
          <img src={activeSubItem.image} className="w-full h-80 object-cover rounded-[2rem] mb-8 shadow-lg" alt="" />
        )}

        <p className={`text-lg text-slate-600 mb-12 ${isHe ? 'border-r-4 pr-6' : 'border-l-4 pl-6'} border-blue-500`}>
          {t(activeSubItem.content)}
        </p>

        {/* Gallery Images */}
        {activeSubItem.images?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {activeSubItem.images.map((img, i) => (
              <img key={i} src={img} className="rounded-2xl h-60 w-full object-cover shadow-lg" alt="" />
            ))}
          </div>
        )}

        {/* PDF Documents */}
        {activeSubItem.pdfs?.length > 0 && (
          <div className="bg-white border p-6 rounded-[2rem]">
            <h3 className="font-black text-lg mb-4 flex items-center gap-3">
              <FileText className="text-blue-600" size={20} />
              {uiText.docsTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeSubItem.pdfs.map((pdf, i) => (
                <a
                  key={i}
                  href={pdf.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-blue-600 hover:text-white transition-all group/doc text-sm"
                >
                  <span className="font-bold truncate">{pdf.name || `Document_${i + 1}.pdf`}</span>
                  <span className="text-[10px] bg-white text-blue-600 px-1.5 py-0.5 rounded group-hover/doc:bg-blue-500 group-hover/doc:text-white transition-colors">
                    PDF
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- MAIN HOME VIEW ---
  return (
    <div className="space-y-12" dir={isHe ? 'rtl' : 'ltr'}>

      {/* 1. NEWS SLIDER SECTION */}
      {newsData && newsData.length > 0 && (
        <div className="relative w-full h-[400px] rounded-[3rem] overflow-hidden shadow-2xl group">
          {/* Simple Slider Implementation (showing first/active) */}
          {/* In a production app, you'd add a state for 'currentSlide' and setInterval */}
          <div className="absolute inset-0 transition-opacity duration-1000">
            <img
              src={newsData[0].image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'}
              className="w-full h-full object-cover"
              alt="news"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-10 text-white w-full">
              <span className="bg-blue-600 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold mb-4 inline-block">
                {isHe ? 'חדשות ועדכונים' : 'Latest News'}
              </span>
              <h2 className="text-4xl font-black mb-4 max-w-2xl">{t(newsData[0].title)}</h2>
              <button
                onClick={() => setActiveSubItem(newsData[0])}
                className="bg-white text-blue-900 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-50 transition-all"
              >
                {isHe ? 'קרא עוד' : 'Read More'}
                <ChevronRight size={18} className={isHe ? 'rotate-180' : ''} />
              </button>
            </div>
          </div>

          {/* Slider Controls (Visual only for now) */}
          <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full px-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40"><ChevronLeft /></button>
            <button className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white hover:bg-white/40"><ChevronRight /></button>
          </div>
        </div>
      )}

      {/* 2. MENU GRID SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuData.map(menu => (
          <div key={menu.id} className="group relative h-[280px] rounded-[2.5rem] overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-2">
            <img
              src={menu.bgImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa'}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

            <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
              <h2 className="text-2xl font-black mb-3">{t(menu.title)}</h2>

              <div className={`space-y-1.5 overflow-y-auto max-h-[140px] custom-scrollbar ${isHe ? 'pl-1' : 'pr-1'}`}>
                {menu.subItems.map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSubItem(sub)}
                    className="w-full text-sm px-3 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white hover:text-blue-900 transition-all flex justify-between items-center group/btn"
                  >
                    <span className="font-medium truncate">{t(sub.title)}</span>
                    <ChevronRight size={14} className={isHe ? 'rotate-180' : ''} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserInterface;