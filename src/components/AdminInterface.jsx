import React, { useState } from 'react';
import {
  Plus, Trash2, Image as ImageIcon,
  Upload, ChevronDown, ChevronUp,
  ArrowUp, ArrowDown, LayoutGrid, Newspaper
} from 'lucide-react';
import SubMenuEditor from './SubMenuEditor';

const AdminInterface = ({ logic, currentLang = 'he' }) => {
  const {
    menuData, setMenuData,
    newsData, setNewsData,
    handleFileUpload, removeFile,
    addMenu, addSubMenu, removeMenu,
    addNews, removeNews,
    logo, setLogo,
    moveMenu = () => {}
  } = logic;

  const [activeTab, setActiveTab] = useState('menu'); // 'menu' or 'news'
  const [openItems, setOpenItems] = useState({});
  const isHe = currentLang === 'he';

  const toggleAccordion = (id) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const onLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onBgImageChange = (e, menuId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMenuData(menuData.map(m => m.id === menuId ? { ...m, bgImage: reader.result } : m));
      };
      reader.readAsDataURL(file);
    }
  };

  const onNewsImageChange = (e, newsId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewsData(newsData.map(n => n.id === newsId ? { ...n, image: reader.result } : n));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20" dir={isHe ? "rtl" : "ltr"}>

      {/* --- LOGO SECTION --- */}
      <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className={`space-y-1 text-center ${isHe ? 'md:text-right' : 'md:text-left'}`}>
          <h3 className="text-lg font-bold text-slate-800">{isHe ? 'העלאת לוגו' : 'Logo Upload'}</h3>
        </div>
        <div className="flex items-center gap-4">
          {logo && (
            <div className="relative group">
              <img src={logo} alt="Logo" className="h-12 w-24 object-contain border rounded-lg p-1 bg-slate-50" />
              <button onClick={() => setLogo(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition">
                <Trash2 size={12} />
              </button>
            </div>
          )}
          <label className="cursor-pointer bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-100 transition text-sm">
            <Upload size={16} />
            <span>{isHe ? 'בחר לוגו' : 'Select Logo'}</span>
            <input type="file" accept="image/*" onChange={onLogoChange} className="hidden" />
          </label>
        </div>
      </div>

      {/* --- TAB NAVIGATION --- */}
      <div className="flex bg-slate-100 p-1 rounded-2xl w-fit mx-auto shadow-inner">
        <button
          onClick={() => setActiveTab('menu')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'menu' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <LayoutGrid size={18} />
          {isHe ? 'ניהול תפריטים' : 'Menu Management'}
        </button>
        <button
          onClick={() => setActiveTab('news')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'news' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Newspaper size={18} />
          {isHe ? 'ניהול חדשות' : 'News Management'}
        </button>
      </div>

      {activeTab === 'menu' ? (
        <>
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-2xl font-bold text-slate-800">{isHe ? 'ניהול תפריטים' : 'Menu Management'}</h2>
            <button onClick={addMenu} className="bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-lg transition">
              <Plus size={18} /> {isHe ? 'תפריט חדש' : 'New Menu'}
            </button>
          </div>

          <div className="space-y-4">
            {menuData.map((menu, index) => {
              const isOpen = openItems[menu.id];
              return (
                <div key={menu.id} className="bg-white border rounded-2xl overflow-hidden shadow-sm transition-all">
                  <div className="p-4 bg-slate-50 border-b flex items-center gap-3">
                    <div className="flex flex-col gap-1">
                      <button disabled={index === 0} onClick={() => moveMenu(index, index - 1)} className="p-1 hover:bg-white rounded border disabled:opacity-30 text-slate-500">
                        <ArrowUp size={14} />
                      </button>
                      <button disabled={index === menuData.length - 1} onClick={() => moveMenu(index, index + 1)} className="p-1 hover:bg-white rounded border disabled:opacity-30 text-slate-500">
                        <ArrowDown size={14} />
                      </button>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <input
                        className={`border-none bg-transparent font-bold focus:ring-0 ${isHe ? 'text-right' : 'text-left order-2'}`}
                        dir="rtl" placeholder="כותרת בעברית" value={menu.title.he}
                        onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, title: { ...m.title, he: e.target.value } } : m))}
                      />
                      <input
                        className={`border-none bg-transparent font-bold focus:ring-0 ${isHe ? 'text-left order-2' : 'text-left order-1'}`}
                        dir="ltr" placeholder="English Title" value={menu.title.en}
                        onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, title: { ...m.title, en: e.target.value } } : m))}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => removeMenu(menu.id)} className="text-red-400 hover:text-red-600 p-2">
                        <Trash2 size={18} />
                      </button>
                      <button onClick={() => toggleAccordion(menu.id)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                  </div>
                  {isOpen && (
                    <div className="p-6 space-y-6">
                      <div className={`flex flex-col md:flex-row items-center gap-4 border p-4 rounded-xl bg-slate-50 ${!isHe && 'md:flex-row-reverse'}`}>
                        <div className="flex flex-1 items-center gap-2 w-full">
                          <ImageIcon size={18} className="text-slate-400" />
                          <input className="flex-1 bg-white border border-slate-200 p-2 rounded text-sm outline-none" placeholder="Background URL..." value={menu.bgImage || ''}
                            onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, bgImage: e.target.value } : m))} />
                        </div>
                        <div className="flex items-center gap-3">
                          {menu.bgImage && <img src={menu.bgImage} className="w-10 h-10 object-cover rounded border bg-white" alt="bg" />}
                          <label className="cursor-pointer bg-white border border-slate-300 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-slate-100">
                            <Upload size={14} /> <span>{isHe ? 'העלאת רקע' : 'Upload BG'}</span>
                            <input type="file" accept="image/*" onChange={(e) => onBgImageChange(e, menu.id)} className="hidden" />
                          </label>
                        </div>
                      </div>
                      <div className={`space-y-4 ${isHe ? 'border-r-4 pr-6' : 'border-l-4 pl-6'} border-blue-100`}>
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">{isHe ? 'תת-תפריטים' : 'Sub-Items'}</h4>
                        {menu.subItems.map(sub => (
                          <SubMenuEditor key={sub.id} sub={sub} menuId={menu.id} isHe={isHe} handleFileUpload={handleFileUpload} removeFile={removeFile} setMenuData={setMenuData} menuData={menuData} />
                        ))}
                        <button onClick={() => addSubMenu(menu.id)} className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
                          + {isHe ? 'הוסף תת-תפריט' : 'Add Sub-item'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-2xl font-bold text-slate-800">{isHe ? 'ניהול חדשות (סליידר)' : 'News Management (Slider)'}</h2>
            <button onClick={addNews} className="bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-lg transition">
              <Plus size={18} /> {isHe ? 'חדשה חדשה' : 'New Slide'}
            </button>
          </div>

          <div className="space-y-4">
            {newsData.map((news) => {
              const isOpen = openItems[news.id];
              return (
                <div key={news.id} className="bg-white border rounded-2xl overflow-hidden shadow-sm">
                  <div className="p-4 bg-slate-50 border-b flex items-center gap-3">
                    <ImageIcon className="text-slate-400" size={20} />
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <input
                        className={`border-none bg-transparent font-bold focus:ring-0 ${isHe ? 'text-right' : 'text-left order-2'}`}
                        dir="rtl" placeholder="כותרת חדשה" value={news.title.he}
                        onChange={(e) => setNewsData(newsData.map(n => n.id === news.id ? { ...n, title: { ...n.title, he: e.target.value } } : n))}
                      />
                      <input
                        className={`border-none bg-transparent font-bold focus:ring-0 ${isHe ? 'text-left order-2' : 'text-left order-1'}`}
                        dir="ltr" placeholder="News Title" value={news.title.en}
                        onChange={(e) => setNewsData(newsData.map(n => n.id === news.id ? { ...n, title: { ...n.title, en: e.target.value } } : n))}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => removeNews(news.id)} className="text-red-400 hover:text-red-600 p-2">
                        <Trash2 size={18} />
                      </button>
                      <button onClick={() => toggleAccordion(news.id)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                  </div>
                  {isOpen && (
                    <div className="p-6 space-y-8">
                      <div className={`flex flex-col md:flex-row items-center gap-4 border p-4 rounded-xl bg-blue-50/30 ${!isHe && 'md:flex-row-reverse'}`}>
                        <div className="flex flex-1 items-center gap-2 w-full">
                          <ImageIcon size={18} className="text-blue-400" />
                          <input className="flex-1 bg-white border border-blue-100 p-2 rounded text-sm outline-none" placeholder="Slider Image URL..." value={news.image || ''}
                            onChange={(e) => setNewsData(newsData.map(n => n.id === news.id ? { ...n, image: e.target.value } : n))} />
                        </div>
                        <div className="flex items-center gap-3">
                          {news.image && <img src={news.image} className="w-16 h-10 object-cover rounded border bg-white" alt="news" />}
                          <label className="cursor-pointer bg-white border border-blue-200 text-blue-600 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-blue-50">
                            <Upload size={14} /> <span>{isHe ? 'העלאת תמונה' : 'Upload Image'}</span>
                            <input type="file" accept="image/*" onChange={(e) => onNewsImageChange(e, news.id)} className="hidden" />
                          </label>
                        </div>
                      </div>

                      <div className={`p-4 rounded-xl border-2 border-dashed border-slate-200 ${isHe ? 'border-r-4 pr-6' : 'border-l-4 pl-6'}`}>
                         <h4 className="text-xs font-bold text-slate-400 uppercase mb-4 tracking-widest">{isHe ? 'תוכן הידיעה המורחב' : 'Expanded News Content'}</h4>
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
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminInterface;