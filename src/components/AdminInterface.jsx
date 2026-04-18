import React, { useState } from 'react';
import {
  Plus, Trash2, Image as ImageIcon, FileText,
  Upload, ExternalLink, ChevronDown, ChevronUp,
  ArrowUp, ArrowDown
} from 'lucide-react';

const AdminInterface = ({ logic, currentLang = 'he' }) => {
  const {
    menuData,
    setMenuData,
    handleFileUpload,
    removeFile,
    addMenu,
    addSubMenu,
    removeMenu,
    logo,
    setLogo,
    moveMenu
  } = logic;

  const [openMenus, setOpenMenus] = useState({});
  const isHe = currentLang === 'he';

  const toggleAccordion = (id) => {
    setOpenMenus(prev => ({ ...prev, [id]: !prev[id] }));
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

      {/* --- HEADER --- */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800">{isHe ? 'ניהול תפריטים' : 'Menu Management'}</h2>
        <button onClick={addMenu} className="bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-lg transition">
          <Plus size={18} /> {isHe ? 'תפריט חדש' : 'New Menu'}
        </button>
      </div>

      {/* --- MENU LIST (ACCORDION) --- */}
      <div className="space-y-4">
        {menuData.map((menu, index) => {
          const isOpen = openMenus[menu.id];
          return (
            <div key={menu.id} className="bg-white border rounded-2xl overflow-hidden shadow-sm transition-all">

              {/* ACCORDION HEADER */}
              <div className="p-4 bg-slate-50 border-b flex items-center gap-3">
                {/* Reorder Buttons */}
                <div className="flex flex-col gap-1">
                  <button
                    disabled={index === 0}
                    onClick={() => moveMenu(index, index - 1)}
                    className="p-1 hover:bg-white rounded border disabled:opacity-30 text-slate-500"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    disabled={index === menuData.length - 1}
                    onClick={() => moveMenu(index, index + 1)}
                    className="p-1 hover:bg-white rounded border disabled:opacity-30 text-slate-500"
                  >
                    <ArrowDown size={14} />
                  </button>
                </div>

                {/* Title Inputs */}
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
                  <button
                    onClick={() => toggleAccordion(menu.id)}
                    className="p-2 hover:bg-slate-200 rounded-full transition-colors"
                  >
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
              </div>

              {/* ACCORDION CONTENT */}
              {isOpen && (
                <div className="p-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
                  {/* Background Upload Section */}
                  <div className={`flex flex-col md:flex-row items-center gap-4 border p-4 rounded-xl bg-slate-50 ${!isHe && 'md:flex-row-reverse'}`}>
                    <div className="flex flex-1 items-center gap-2 w-full">
                      <ImageIcon size={18} className="text-slate-400" />
                      <input className="flex-1 bg-white border border-slate-200 p-2 rounded text-sm outline-none" placeholder="Background Image URL..." value={menu.bgImage || ''}
                        onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, bgImage: e.target.value } : m))} />
                    </div>
                    <div className="flex items-center gap-3">
                      {menu.bgImage && <img src={menu.bgImage} className="w-10 h-10 object-cover rounded border bg-white" alt="bg" />}
                      <label className="cursor-pointer bg-white border border-slate-300 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-slate-100 shadow-sm">
                        <Upload size={14} /> <span>{isHe ? 'העלאת רקע' : 'Upload BG'}</span>
                        <input type="file" accept="image/*" onChange={(e) => onBgImageChange(e, menu.id)} className="hidden" />
                      </label>
                    </div>
                  </div>

                  {/* Sub-items Section */}
                  <div className={`space-y-4 ${isHe ? 'border-r-4 pr-6' : 'border-l-4 pl-6'} border-blue-100`}>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                      {isHe ? 'תת-תפריטים' : 'Sub-Items'}
                    </h4>
                    {menu.subItems.map(sub => (
                      <div key={sub.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <input className={`border p-2 rounded text-right ${isHe ? 'order-1' : 'order-2'}`} dir="rtl" value={sub.title.he} placeholder="כותרת משנה"
                            onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, subItems: m.subItems.map(s => s.id === sub.id ? { ...s, title: { ...s.title, he: e.target.value } } : s) } : m))} />
                          <input className={`border p-2 rounded text-left ${isHe ? 'order-2' : 'order-1'}`} dir="ltr" value={sub.title.en} placeholder="Sub-title"
                            onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, subItems: m.subItems.map(s => s.id === sub.id ? { ...s, title: { ...s.title, en: e.target.value } } : s) } : m))} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <textarea className={`w-full border p-2 rounded h-20 text-right ${isHe ? 'order-1' : 'order-2'}`} dir="rtl" placeholder="תוכן..." value={sub.content.he}
                            onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, subItems: m.subItems.map(s => s.id === sub.id ? { ...s, content: { ...s.content, he: e.target.value } } : s) } : m))} />
                          <textarea className={`w-full border p-2 rounded h-20 text-left ${isHe ? 'order-2' : 'order-1'}`} dir="ltr" placeholder="Content..." value={sub.content.en}
                            onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, subItems: m.subItems.map(s => s.id === sub.id ? { ...s, content: { ...s.content, en: e.target.value } } : s) } : m))} />
                        </div>

                        {/* File Upload Previews */}
                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                          <div>
                            <input type="file" multiple accept="image/*" onChange={(e) => handleFileUpload(e, menu.id, sub.id, 'images')} className="text-xs w-full mb-2" />
                            <div className="flex gap-2 flex-wrap">
                              {sub.images?.map((img, i) => (
                                <div key={i} className="relative w-12 h-12 group">
                                  <img src={img} className="w-full h-full object-cover rounded border" alt="pre" />
                                  <button onClick={() => removeFile(menu.id, sub.id, 'images', i)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition"><Trash2 size={10}/></button>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <input type="file" multiple accept=".pdf" onChange={(e) => handleFileUpload(e, menu.id, sub.id, 'pdfs')} className="text-xs w-full mb-2" />
                            <div className="space-y-1">
                              {sub.pdfs?.map((pdf, i) => (
                                <div key={i} className="flex items-center justify-between bg-white border rounded p-1 text-[10px]">
                                  <span className="truncate w-20">{isHe ? 'מסמך' : 'PDF'} {i+1}</span>
                                  <button onClick={() => removeFile(menu.id, sub.id, 'pdfs', i)} className="text-red-500"><Trash2 size={12}/></button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => addSubMenu(menu.id)} className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
                      + {isHe ? 'הוסף תת-פריט' : 'Add Sub-item'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminInterface;