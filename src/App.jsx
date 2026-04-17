import React from 'react';
import { Settings, User, Plus, Trash2, FileText, Image as ImageIcon, ChevronRight } from 'lucide-react';
import { useMenuManager } from './useMenuManager';
import { LANGUAGES } from './data';

const App = () => {
  const logic = useMenuManager();
  const uiText = LANGUAGES[logic.lang];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-all duration-300" dir={uiText.dir}>
      {/* --- NAVBAR --- */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-6">
          <h1 className="font-bold text-xl tracking-tight text-blue-600">DynamicPort</h1>
          <div className="hidden md:flex gap-4 border-slate-200 h-6 items-center px-4 border-x">
            {logic.menuData.map(menu => (
              <div key={menu.id} className="relative group cursor-pointer font-medium hover:text-blue-600">
                {logic.t(menu.title)}
                {/* Dropdown Menu */}
                <div className="absolute hidden group-hover:block bg-white shadow-xl border rounded-lg p-2 min-w-[180px] top-full mt-1 animate-in fade-in zoom-in duration-200">
                  {menu.subItems.map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => { logic.setActiveSubItem(sub); logic.setView('user'); }}
                      className="block w-full text-left px-3 py-2 hover:bg-slate-50 rounded text-sm transition-colors"
                    >
                      {logic.t(sub.title)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button onClick={() => logic.setView('user')} className={`px-3 py-1 rounded-md text-sm flex items-center gap-2 transition ${logic.view === 'user' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>
              <User size={16} /> {uiText.user}
            </button>
            <button onClick={() => logic.setView('admin')} className={`px-3 py-1 rounded-md text-sm flex items-center gap-2 transition ${logic.view === 'admin' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500'}`}>
              <Settings size={16} /> {uiText.switch}
            </button>
          </div>
          <select value={logic.lang} onChange={(e) => logic.setLang(e.target.value)} className="bg-transparent font-bold text-sm outline-none cursor-pointer">
            {Object.entries(LANGUAGES).map(([code, info]) => (
              <option key={code} value={code}>{info.label}</option>
            ))}
          </select>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-6">
        {logic.view === 'admin' ? (
          <AdminInterface logic={logic} />
        ) : (
          <UserInterface logic={logic} uiText={uiText} />
        )}
      </main>
    </div>
  );
};

const AdminInterface = ({ logic }) => {
  const { menuData, setMenuData, handleFileUpload, removeFile, addMenu, addSubMenu, removeMenu } = logic;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800">ניהול תוכן</h2>
        <button onClick={addMenu} className="bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-lg transition">
          <Plus size={18} /> הוסף תפריט
        </button>
      </div>

      <div className="grid gap-8">
        {menuData.map(menu => (
          <div key={menu.id} className="bg-white border rounded-2xl overflow-hidden shadow-sm">
            <div className="p-4 bg-slate-50 border-b flex items-center gap-4">
              <div className="flex-1 space-y-2">
                <input className="w-full border p-2 rounded text-right" dir="rtl" placeholder="כותרת בעברית" value={menu.title.he}
                  onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, title: { ...m.title, he: e.target.value } } : m))} />
                <input className="w-full border p-2 rounded" placeholder="English Title" value={menu.title.en}
                  onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, title: { ...m.title, en: e.target.value } } : m))} />
              </div>
              <button onClick={() => removeMenu(menu.id)} className="text-red-500 hover:bg-red-50 p-3 rounded-full transition-colors"><Trash2 size={20} /></button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2 border p-2 rounded bg-slate-50">
                <ImageIcon size={18} className="text-slate-400" />
                <input className="flex-1 bg-transparent outline-none text-sm" placeholder="Background Image URL" value={menu.bgImage}
                  onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, bgImage: e.target.value } : m))} />
              </div>

              <div className="mr-6 space-y-4 border-r-4 border-blue-50 pr-6">
                {menu.subItems.map(sub => (
                  <div key={sub.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input className="border p-2 rounded text-right" dir="rtl" value={sub.title.he} placeholder="כותרת תת-תפריט"
                        onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, subItems: m.subItems.map(s => s.id === sub.id ? { ...s, title: { ...s.title, he: e.target.value } } : s) } : m))} />
                      <input className="border p-2 rounded" value={sub.title.en} placeholder="Sub-title (En)"
                        onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, subItems: m.subItems.map(s => s.id === sub.id ? { ...s, title: { ...s.title, en: e.target.value } } : s) } : m))} />
                    </div>
                    <textarea className="w-full border p-2 rounded h-24 text-right" dir="rtl" placeholder="תוכן..." value={sub.content.he}
                      onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, subItems: m.subItems.map(s => s.id === sub.id ? { ...s, content: { ...s.content, he: e.target.value } } : s) } : m))} />

                    {/* File Uploaders */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold flex items-center gap-2"><ImageIcon size={14}/> תמונות</label>
                        <input type="file" multiple accept="image/*" onChange={(e) => handleFileUpload(e, menu.id, sub.id, 'images')} className="text-xs w-full file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700" />
                        <div className="flex gap-2 flex-wrap mt-2">
                          {sub.images?.map((img, i) => (
                            <div key={i} className="relative w-12 h-12 group">
                              <img src={img} className="w-full h-full object-cover rounded border" />
                              <button onClick={() => removeFile(menu.id, sub.id, 'images', i)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100"><Trash2 size={10}/></button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold flex items-center gap-2"><FileText size={14}/> קבצי PDF</label>
                        <input type="file" multiple accept=".pdf" onChange={(e) => handleFileUpload(e, menu.id, sub.id, 'pdfs')} className="text-xs w-full file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:bg-red-50 file:text-red-700" />
                        <div className="space-y-1 mt-2">
                          {sub.pdfs?.map((pdf, i) => (
                            <div key={i} className="flex items-center justify-between bg-white p-1 rounded border text-[10px]">
                              <span className="truncate max-w-[100px]">Doc {i+1}</span>
                              <button onClick={() => removeFile(menu.id, sub.id, 'pdfs', i)} className="text-red-500"><Trash2 size={10}/></button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => addSubMenu(menu.id)} className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:bg-blue-50 p-2 rounded-lg transition">+ הוסף תת-תפריט</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const UserInterface = ({ logic, uiText }) => {
  const { activeSubItem, setActiveSubItem, menuData, t, lang } = logic;

  if (activeSubItem) {
    return (
      <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-8">
        <button onClick={() => setActiveSubItem(null)} className="text-blue-600 mb-8 flex items-center gap-2 font-bold group">
          <span className="group-hover:-translate-x-1 transition-transform">{lang === 'he' ? '→' : '←'}</span> {uiText.back}
        </button>
        <h1 className="text-6xl font-black mb-8">{t(activeSubItem.title)}</h1>
        <p className="text-2xl text-slate-600 mb-12 border-l-4 border-blue-500 pl-6">{t(activeSubItem.content)}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {activeSubItem.images?.map((img, i) => <img key={i} src={img} className="rounded-3xl h-80 w-full object-cover shadow-xl" alt="" />)}
        </div>

        <div className="bg-white border p-8 rounded-[2.5rem]">
          <h3 className="font-black text-xl mb-6 flex items-center gap-3"><FileText className="text-blue-600" /> {lang === 'he' ? 'מסמכים וקבצים' : 'Documents'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeSubItem.pdfs?.map((pdf, i) => (
              <a key={i} href={pdf} target="_blank" rel="noreferrer" className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all">
                <span className="font-bold">Document_{i+1}.pdf</span>
                <span className="text-xs bg-white text-blue-600 px-2 py-1 rounded">PDF</span>
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
        <div key={menu.id} className="group relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-3">
          <img src={menu.bgImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa'} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
          <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
            <h2 className="text-4xl font-black mb-6">{t(menu.title)}</h2>
            <div className="space-y-3">
              {menu.subItems.map(sub => (
                <button key={sub.id} onClick={() => setActiveSubItem(sub)} className="w-full text-left px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white hover:text-blue-900 transition-all flex justify-between items-center group/btn">
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

export default App;