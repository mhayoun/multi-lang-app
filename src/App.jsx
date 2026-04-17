import React, { useState, useEffect } from 'react';
import { Settings, User, Globe, Plus, Trash2, FileText, Image as ImageIcon, ChevronRight, Wand2 } from 'lucide-react';

const App = () => {
  // --- LOCAL STORAGE LOGIC ---
  const [menuData, setMenuData] = useState(() => {
    const saved = localStorage.getItem('siteData');
    return saved ? JSON.parse(saved) : [];
  });

  const [view, setView] = useState('user');
  const [lang, setLang] = useState('he');
  const [activeSubItem, setActiveSubItem] = useState(null);

  useEffect(() => {
    localStorage.setItem('siteData', JSON.stringify(menuData));
  }, [menuData]);

  const languages = {
    en: { dir: 'ltr', label: 'English', switch: 'Admin Panel', user: 'User View', back: 'Back' },
    he: { dir: 'rtl', label: 'עברית', switch: 'פאנל ניהול', user: 'תצוגת משתמש', back: 'חזור' }
  };

  const t = (obj) => obj?.[lang] || obj?.['he'] || '';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-all duration-300" dir={languages[lang].dir}>
      {/* --- NAVBAR --- */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-6">
          <h1 className="font-bold text-xl tracking-tight text-blue-600">DynamicPort</h1>
          <div className="hidden md:flex gap-4 border-slate-200 h-6 items-center px-4 border-x">
            {menuData.map(menu => (
              <div key={menu.id} className="relative group cursor-pointer font-medium hover:text-blue-600">
                {t(menu.title)}
                <div className="absolute hidden group-hover:block bg-white shadow-xl border rounded-lg p-2 min-w-[180px] top-full mt-1 animate-in fade-in zoom-in duration-200">
                  {menu.subItems.map(sub => (
                    <button key={sub.id} onClick={() => {setActiveSubItem(sub); setView('user')}} className="block w-full text-left px-3 py-2 hover:bg-slate-50 rounded text-sm transition-colors">
                      {t(sub.title)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button onClick={() => setView('user')} className={`px-3 py-1 rounded-md text-sm flex items-center gap-2 transition ${view === 'user' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>
              <User size={16} /> {languages[lang].user}
            </button>
            <button onClick={() => setView('admin')} className={`px-3 py-1 rounded-md text-sm flex items-center gap-2 transition ${view === 'admin' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>
              <Settings size={16} /> {languages[lang].switch}
            </button>
          </div>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-transparent font-bold text-sm outline-none cursor-pointer">
            {Object.entries(languages).map(([code, info]) => (
              <option key={code} value={code}>{info.label}</option>
            ))}
          </select>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        {view === 'admin' ? (
          <AdminInterface menuData={menuData} setMenuData={setMenuData} t={t} />
        ) : (
          <UserInterface menuData={menuData} activeSubItem={activeSubItem} setActiveSubItem={setActiveSubItem} lang={lang} t={t} languages={languages} />
        )}
      </main>
    </div>
  );
};



const AdminInterface = ({ menuData, setMenuData }) => {

  const autoTranslate = (text) => `[EN] ${text}`; // Simulated translation logic

  const addMenu = () => {
    const newItem = {
      id: Date.now(),
      title: { he: '', en: '' },
      bgImage: '',
      subItems: []
    };
    setMenuData([...menuData, newItem]);
  };

  const addSubMenu = (menuId) => {
    const newSub = {
      id: Date.now(),
      title: { he: '', en: '' },
      content: { he: '', en: '' },
      images: [], // Multiple images
      pdfs: []   // Multiple PDFs
    };
    setMenuData(menuData.map(m => m.id === menuId ? { ...m, subItems: [...m.subItems, newSub] } : m));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold">ניהול תוכן (Hebrew/English)</h2>
        <button onClick={addMenu} className="bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-200 transition">
          <Plus size={18} /> הוסף תפריט ראשי
        </button>
      </div>

      <div className="grid gap-8">
        {menuData.map(menu => (
          <div key={menu.id} className="bg-white border rounded-2xl overflow-hidden shadow-sm border-slate-200">
            <div className="p-4 bg-slate-50 border-b flex items-center gap-4">
              <div className="flex-1 space-y-2">
                <input className="w-full border p-2 rounded text-right" dir="rtl" placeholder="כותרת תפריט בעברית" value={menu.title.he}
                  onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, title: { ...m.title, he: e.target.value } } : m))} />
                <input className="w-full border p-2 rounded bg-white" placeholder="English Title" value={menu.title.en}
                  onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, title: { ...m.title, en: e.target.value } } : m))} />
              </div>
              <button onClick={() => setMenuData(menuData.filter(m => m.id !== menu.id))} className="text-red-500 hover:bg-red-50 p-3 rounded-full"><Trash2 size={20} /></button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2 border p-2 rounded bg-slate-50">
                <ImageIcon size={18} className="text-slate-400" />
                <input className="flex-1 bg-transparent outline-none text-sm" placeholder="Main Background Image URL" value={menu.bgImage}
                  onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, bgImage: e.target.value } : m))} />
              </div>

              <div className="mr-6 space-y-4 border-r-4 border-blue-50 pr-6">
                {menu.subItems.map(sub => (
                  <div key={sub.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input className="border p-2 rounded text-right" dir="rtl" placeholder="כותרת משנה" value={sub.title.he}
                        onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, subItems: m.subItems.map(s => s.id === sub.id ? { ...s, title: { ...s.title, he: e.target.value } } : s) } : m))} />
                      <input className="border p-2 rounded" placeholder="Submenu Title (En)" value={sub.title.en}
                        onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, subItems: m.subItems.map(s => s.id === sub.id ? { ...s, title: { ...s.title, en: e.target.value } } : s) } : m))} />
                    </div>

                    <textarea className="w-full border p-2 rounded h-24 text-right" dir="rtl" placeholder="תוכן בעברית..." value={sub.content.he}
                      onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, subItems: m.subItems.map(s => s.id === sub.id ? { ...s, content: { ...s.content, he: e.target.value } } : s) } : m))} />

                    {/* Multiple Assets inputs (comma separated for demo) */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                         <label className="text-[10px] font-bold text-slate-400 uppercase">Image URLs (Comma separated)</label>
                         <input className="w-full border p-2 rounded text-xs" placeholder="img1.jpg, img2.jpg" value={sub.images.join(', ')}
                           onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, subItems: m.subItems.map(s => s.id === sub.id ? { ...s, images: e.target.value.split(',').map(str => str.trim()) } : s) } : m))} />
                      </div>
                      <div className="space-y-1">
                         <label className="text-[10px] font-bold text-slate-400 uppercase">PDF URLs (Comma separated)</label>
                         <input className="w-full border p-2 rounded text-xs" placeholder="file1.pdf, file2.pdf" value={sub.pdfs.join(', ')}
                           onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, subItems: m.subItems.map(s => s.id === sub.id ? { ...s, pdfs: e.target.value.split(',').map(str => str.trim()) } : s) } : m))} />
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => addSubMenu(menu.id)} className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:bg-blue-50 p-2 rounded-lg transition">
                  <Plus size={16} /> הוסף תת-פריט
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserInterface = ({ menuData, activeSubItem, setActiveSubItem, lang, t, languages }) => {
  if (activeSubItem) {
    return (
      <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-8 duration-500">
        <button onClick={() => setActiveSubItem(null)} className="text-blue-600 mb-8 flex items-center gap-2 font-bold group">
          <span className="group-hover:-translate-x-1 transition-transform">{lang === 'he' ? '→' : '←'}</span> {languages[lang].back}
        </button>
        <h1 className="text-6xl font-black mb-8 tracking-tighter text-slate-900">{t(activeSubItem.title)}</h1>
        <p className="text-2xl text-slate-600 leading-relaxed mb-12 border-l-4 border-blue-500 pl-6 py-2">{t(activeSubItem.content)}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {activeSubItem.images.map((img, i) => img && (
            <div key={i} className="group overflow-hidden rounded-3xl shadow-xl">
               <img src={img} className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105" alt="" />
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 p-8 rounded-[2.5rem] shadow-sm">
          <h3 className="font-black text-xl mb-6 flex items-center gap-3">
            <FileText className="text-blue-600" /> {lang === 'he' ? 'מסמכים וקבצים' : 'Documents & Files'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeSubItem.pdfs.map((pdf, i) => pdf && (
              <a key={i} href={pdf} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all group">
                <span className="font-bold truncate pr-4">Document_{i+1}.pdf</span>
                <span className="text-xs bg-white text-blue-600 px-2 py-1 rounded-md group-hover:bg-blue-500 group-hover:text-white transition">PDF</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {menuData.map(menu => (
        <div key={menu.id} className="group relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-blue-200/50">
          <img src={menu.bgImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa'} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
          <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
            <h2 className="text-4xl font-black mb-6 tracking-tight">{t(menu.title)}</h2>
            <div className="space-y-3">
              {menu.subItems.map(sub => (
                <button
                  key={sub.id}
                  onClick={() => setActiveSubItem(sub)}
                  className="w-full text-left px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white hover:text-blue-900 transition-all flex justify-between items-center group/btn"
                >
                  <span className="font-bold">{t(sub.title)}</span>
                  <ChevronRight size={18} className={`transition-transform ${lang === 'he' ? 'rotate-180 group-hover/btn:-translate-x-2' : 'group-hover/btn:translate-x-2'}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
