import React from 'react';
import { Plus, Newspaper } from 'lucide-react';
import SubMenuEditor from './SubMenuEditor.jsx';
import SliderLinker from './SliderLinker.jsx';
import EditorAccordionItem from './EditorAccordionItem.jsx';

const NewsSection = ({
  newsData, menuData, isHe, t, openItems, toggleAccordion,
  updateNewsTitle, linkItemToNews, unlinkItemFromNews,
  removeNews, addNews, handleFileUpload, removeFile, setNewsData, moveNews
}) => {
  return (
    <section className="animate-in fade-in slide-in-from-left-4 duration-300">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold text-slate-800">{isHe ? 'ניהול חדשות' : 'News Management'}</h2>
        <button onClick={addNews} className="bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-lg transition">
          <Plus size={18} /> {isHe ? 'פוסט חדש' : 'New Post'}
        </button>
      </div>

      <div className="space-y-4">
        {newsData.map((news, index) => (
          <EditorAccordionItem
            key={news.id}
            id={news.id}
            index={index}
            totalItems={newsData.length}
            isOpen={openItems[news.id]}
            onToggle={toggleAccordion}
            onRemove={removeNews}
            onMove={moveNews}
            icon={Newspaper}
            titleInputs={
              <>
                <input className="border-none bg-transparent font-bold focus:ring-0 text-sm md:text-base" dir="rtl" placeholder="כותרת בעברית" value={news.title?.he || ''} onChange={(e) => updateNewsTitle(news.id, 'he', e.target.value)} />
                <input className="border-none bg-transparent font-bold focus:ring-0 text-sm md:text-base" dir="ltr" placeholder="English Title" value={news.title?.en || ''} onChange={(e) => updateNewsTitle(news.id, 'en', e.target.value)} />
              </>
            }
          >
            <div className="space-y-2">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">{isHe ? 'תוכן העמוד' : 'Page Content'}</h4>
              <SubMenuEditor sub={news} menuId={news.id} isHe={isHe} handleFileUpload={(e, tid, sid, type) => handleFileUpload(e, tid, sid, type, true)} removeFile={(tid, sid, type, idx) => removeFile(tid, sid, type, idx, true)} setMenuData={setNewsData} menuData={newsData} />
            </div>

            <SliderLinker isHe={isHe} menuData={menuData} linkedItemIds={news.linkedItemIds} onLink={(itemId) => linkItemToNews(news.id, itemId)} onUnlink={(itemId) => unlinkItemFromNews(news.id, itemId)} t={t} />
          </EditorAccordionItem>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;