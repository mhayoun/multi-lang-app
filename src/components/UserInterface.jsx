import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';

const UserInterface = ({ logic, uiText }) => {
  const { activeSubItem, setActiveSubItem, menuData, t, lang } = logic;
  const isHe = lang === 'he';

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
        <p className={`text-lg text-slate-600 mb-12 ${isHe ? 'border-r-4 pr-6' : 'border-l-4 pl-6'} border-blue-500`}>
          {t(activeSubItem.content)}
        </p>

        {activeSubItem.images?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {activeSubItem.images.map((img, i) => (
              <img key={i} src={img} className="rounded-2xl h-60 w-full object-cover shadow-lg" alt="" />
            ))}
          </div>
        )}

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" dir={isHe ? 'rtl' : 'ltr'}>
      {menuData.map(menu => (
        <div key={menu.id} className="group relative h-[250px] rounded-[2rem] overflow-hidden shadow-xl transition-all duration-500 hover:-translate-y-2">
          <img
            src={menu.bgImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa'}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

          <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
            <h2 className="text-2xl font-black mb-3">{t(menu.title)}</h2>

            <div className={`space-y-1.5 overflow-y-auto max-h-[120px] custom-scrollbar ${isHe ? 'pl-1' : 'pr-1'}`}>
              {menu.subItems.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubItem(sub)}
                  className="w-full text-sm px-3 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white hover:text-blue-900 transition-all flex justify-between items-center group/btn"
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
  );
};

export default UserInterface;