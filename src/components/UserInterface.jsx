import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';

const UserInterface = ({ logic, uiText }) => {
  const { activeSubItem, setActiveSubItem, menuData, t, lang } = logic;

  if (activeSubItem) {
    return (
      <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-8">
        <button
          onClick={() => setActiveSubItem(null)}
          className="text-blue-600 mb-8 flex items-center gap-2 font-bold group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            {lang === 'he' ? '→' : '←'}
          </span>
          {uiText.back}
        </button>

        <h1 className="text-6xl font-black mb-8">{t(activeSubItem.title)}</h1>
        <p className="text-2xl text-slate-600 mb-12 border-l-4 border-blue-500 pl-6">
          {t(activeSubItem.content)}
        </p>

        {/* Images Grid */}
        {activeSubItem.images?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {activeSubItem.images.map((img, i) => (
              <img key={i} src={img} className="rounded-3xl h-80 w-full object-cover shadow-xl" alt="" />
            ))}
          </div>
        )}

        {/* Documents Section - Only shows if there are PDFs */}
        {activeSubItem.pdfs?.length > 0 && (
          <div className="bg-white border p-8 rounded-[2.5rem]">
            <h3 className="font-black text-xl mb-6 flex items-center gap-3">
              <FileText className="text-blue-600" />
              {lang === 'he' ? 'מסמכים וקבצים' : 'Documents'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeSubItem.pdfs.map((pdf, i) => (
                <a
                  key={i}
                  href={pdf.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all group/doc"
                >
                  <span className="font-bold truncate pr-4">
                    {/* Display the actual filename */}
                    {pdf.name || `Document_${i + 1}.pdf`}
                  </span>
                  <span className="text-xs bg-white text-blue-600 px-2 py-1 rounded group-hover/doc:bg-blue-500 group-hover/doc:text-white transition-colors">
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {menuData.map(menu => (
        <div key={menu.id} className="group relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-3">
          <img
            src={menu.bgImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa'}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
          <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
            <h2 className="text-4xl font-black mb-6">{t(menu.title)}</h2>
            <div className="space-y-3">
              {menu.subItems.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubItem(sub)}
                  className="w-full text-left px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white hover:text-blue-900 transition-all flex justify-between items-center group/btn"
                >
                  <span className="font-bold">{t(sub.title)}</span>
                  <ChevronRight size={18} className={lang === 'he' ? 'rotate-180' : ''} />
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserInterface;