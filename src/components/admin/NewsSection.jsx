import React from 'react';
import { Plus, Trash2, Newspaper, ChevronDown, ChevronUp } from 'lucide-react';
import SubMenuEditor from './SubMenuEditor.jsx';
import SliderLinker from './SliderLinker.jsx'; // Import the new component

const NewsSection = ({
  newsData, menuData, isHe, t, openItems, toggleAccordion,
  updateNewsTitle, linkItemToNews, unlinkItemFromNews,
  removeNews, addNews, handleFileUpload, removeFile, setNewsData
}) => {
  return (
    <section className="animate-in fade-in slide-in-from-left-4 duration-300">
      {/* Section Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          {isHe ? 'ניהול חדשות' : 'News Management'}
        </h2>
        <button
          onClick={addNews}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-lg transition"
        >
          <Plus size={18} /> {isHe ? 'פוסט חדש' : 'New Post'}
        </button>
      </div>

      <div className="space-y-4">
        {newsData.map((news) => {
          const isOpen = openItems[news.id];
          return (
            <div key={news.id} className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:border-slate-300 transition-colors">

              {/* Accordion Header */}
              <div className="p-4 bg-slate-50 border-b flex items-center gap-3">
                <Newspaper className="text-blue-500" size={20} />
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <input
                    className="border-none bg-transparent font-bold focus:ring-0 text-sm md:text-base"
                    dir="rtl"
                    placeholder="כותרת בעברית"
                    value={news.title?.he || ''}
                    onChange={(e) => updateNewsTitle(news.id, 'he', e.target.value)}
                  />
                  <input
                    className="border-none bg-transparent font-bold focus:ring-0 text-sm md:text-base"
                    dir="ltr"
                    placeholder="English Title"
                    value={news.title?.en || ''}
                    onChange={(e) => updateNewsTitle(news.id, 'en', e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => removeNews(news.id)} className="text-red-400 hover:text-red-600 p-2 transition-colors">
                    <Trash2 size={18} />
                  </button>
                  <button onClick={() => toggleAccordion(news.id)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>

              {/* Accordion Content */}
              {isOpen && (
                <div className="p-6 space-y-8 animate-in slide-in-from-top-2 duration-200">

                  {/* Page Content / Editor */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">
                      {isHe ? 'תוכן העמוד' : 'Page Content'}
                    </h4>
                    <SubMenuEditor
                      sub={news}
                      menuId={news.id}
                      isHe={isHe}
                      handleFileUpload={(e, tid, sid, type) => handleFileUpload(e, tid, sid, type, true)}
                      removeFile={(tid, sid, type, idx) => removeFile(tid, sid, type, idx, true)}
                      setMenuData={setNewsData}
                      menuData={newsData}
                    />
                  </div>

                  {/* Shared Slider Linker Component */}
                  <SliderLinker
                    isHe={isHe}
                    menuData={menuData}
                    linkedItemIds={news.linkedItemIds}
                    onLink={(itemId) => linkItemToNews(news.id, itemId)}
                    onUnlink={(itemId) => unlinkItemFromNews(news.id, itemId)}
                    t={t}
                  />

                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default NewsSection;