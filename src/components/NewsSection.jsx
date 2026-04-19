import React from 'react';
import { Plus, Trash2, Newspaper, ChevronDown, ChevronUp, LayoutGrid, X } from 'lucide-react';
import SubMenuEditor from './SubMenuEditor';

const NewsSection = ({
  newsData, menuData, isHe, t, openItems, toggleAccordion,
  updateNewsTitle, linkItemToNews, unlinkItemFromNews,
  removeNews, addNews, handleFileUpload, removeFile, setNewsData
}) => {
  return (
    <section className="animate-in fade-in slide-in-from-left-4 duration-300">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold text-slate-800">{isHe ? 'ניהול חדשות' : 'News Management'}</h2>
        <button
          onClick={addNews}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-lg transition"
        >
          <Plus size={18} /> {isHe ? 'כתבה חדשה' : 'New Post'}
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
                  <div className="space-y-2">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">{isHe ? 'תוכן הדף' : 'Page Content'}</h4>
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

                  {/* Slider Item Linking */}
                  <div className="bg-blue-50 p-5 rounded-3xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-4 text-blue-800 font-bold">
                      <LayoutGrid size={18} />
                      <span>{isHe ? 'הוספת פריטים לסליידר בדף זה' : 'Add Items to Page Slider'}</span>
                    </div>

                    <select
                      className="w-full bg-white border border-blue-200 rounded-xl p-3 text-sm outline-none shadow-sm focus:ring-2 focus:ring-blue-400"
                      value=""
                      onChange={(e) => linkItemToNews(news.id, Number(e.target.value))}
                    >
                      <option value="">{isHe ? '-- בחר פריט תפריט להוספה --' : '-- Add menu item --'}</option>
                      {menuData.map(category => (
                        <optgroup key={category.id} label={t(category.title)}>
                          {category.subItems.map(sub => (
                            <option key={sub.id} value={sub.id}>{t(sub.title)}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {news.linkedItemIds?.map(linkedId => {
                        let title = "Unknown";
                        menuData.forEach(cat => cat.subItems.forEach(s => { if(s.id === linkedId) title = t(s.title) }));
                        return (
                          <div key={linkedId} className="flex items-center gap-2 bg-white border border-blue-200 text-blue-700 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm">
                            <span>{title}</span>
                            <button onClick={() => unlinkItemFromNews(news.id, linkedId)} className="text-red-400 hover:text-red-600 transition-colors">
                              <X size={14} />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
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