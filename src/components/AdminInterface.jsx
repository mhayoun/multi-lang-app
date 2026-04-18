import React from 'react';
import { Plus, Trash2, Image as ImageIcon, FileText, Upload, ExternalLink } from 'lucide-react';

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
    setLogo
  } = logic;

  const isHe = currentLang === 'he';

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
      <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className={`space-y-1 text-center ${isHe ? 'md:text-right' : 'md:text-left'}`}>
          <h3 className="text-xl font-bold text-slate-800">{isHe ? 'העלאת לוגו' : 'Logo Upload'}</h3>
          <p className="text-slate-500 text-sm">{isHe ? 'הקובץ יופיע בראש העמוד' : 'Appears at the top'}</p>
        </div>
        <div className="flex items-center gap-6">
          {logo && (
            <div className="relative group">
              <img src={logo} alt="Logo" className="h-16 w-32 object-contain border rounded-lg p-2 bg-slate-50" />
              <button onClick={() => setLogo(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600">
                <Trash2 size={14} />
              </button>
            </div>
          )}
          <label className="cursor-pointer bg-blue-50 text-blue-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-100 transition border border-blue-200">
            <Upload size={18} />
            <span>{isHe ? 'בחר לוגו' : 'Select Logo'}</span>
            <input type="file" accept="image/*" onChange={onLogoChange} className="hidden" />
          </label>
        </div>
      </div>

      {/* --- HEADER --- */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800">{isHe ? 'ניהול תפריטים' : 'Menu Management'}</h2>
        <button onClick={addMenu} className="bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-lg">
          <Plus size={18} /> {isHe ? 'הוסף תפריט חדש' : 'Add New Menu'}
        </button>
      </div>

      <div className="grid gap-8">
        {menuData.map(menu => (
          <div key={menu.id} className="bg-white border rounded-2xl overflow-hidden shadow-sm">
            {/* Titles */}
            <div className="p-4 bg-slate-50 border-b flex items-center gap-4">
              <div className={`flex-1 grid grid-cols-1 md:grid-cols-2 gap-4`}>
                <input className="w-full border p-2 rounded text-right order-1" dir="rtl" placeholder="כותרת בעברית..." value={menu.title.he}
                  onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, title: { ...m.title, he: e.target.value } } : m))} />
                <input className={`w-full border p-2 rounded text-left ${isHe ? 'order-2' : 'order-first'}`} dir="ltr" placeholder="English Title..." value={menu.title.en}
                  onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, title: { ...m.title, en: e.target.value } } : m))} />
              </div>
              <button onClick={() => removeMenu(menu.id)} className="text-red-500 hover:bg-red-50 p-3 rounded-full">
                <Trash2 size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* BG Image Upload */}
              <div className={`flex flex-col md:flex-row items-center gap-4 border p-4 rounded-xl bg-slate-50 ${!isHe && 'md:flex-row-reverse'}`}>
                <div className="flex flex-1 items-center gap-2 w-full">
                  <ImageIcon size={18} className="text-slate-400" />
                  <input className="flex-1 bg-white border border-slate-200 p-2 rounded text-sm outline-none" placeholder="Image URL..." value={menu.bgImage || ''}
                    onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, bgImage: e.target.value } : m))} />
                </div>
                <div className="flex items-center gap-3">
                  {menu.bgImage && <img src={menu.bgImage} className="w-12 h-12 object-cover rounded border bg-white" alt="bg" />}
                  <label className="cursor-pointer bg-white border border-slate-300 text-slate-600 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-slate-100">
                    <Upload size={14} /> <span>{isHe ? 'העלאת תמונה' : 'Upload BG'}</span>
                    <input type="file" accept="image/*" onChange={(e) => onBgImageChange(e, menu.id)} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Sub-items */}
              <div className={`space-y-4 ${isHe ? 'border-r-4 pr-6 mr-2' : 'border-l-4 pl-6 ml-2'} border-blue-50`}>
                {menu.subItems.map(sub => (
                  <div key={sub.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input className="border p-2 rounded text-right order-1" dir="rtl" value={sub.title.he} placeholder="כותרת משנה"
                        onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, subItems: m.subItems.map(s => s.id === sub.id ? { ...s, title: { ...s.title, he: e.target.value } } : s) } : m))} />
                      <input className={`border p-2 rounded text-left ${isHe ? 'order-2' : 'order-first'}`} dir="ltr" value={sub.title.en} placeholder="Sub-title"
                        onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, subItems: m.subItems.map(s => s.id === sub.id ? { ...s, title: { ...s.title, en: e.target.value } } : s) } : m))} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <textarea className="w-full border p-2 rounded h-24 text-right order-1" dir="rtl" placeholder="תוכן בעברית..." value={sub.content.he}
                        onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, subItems: m.subItems.map(s => s.id === sub.id ? { ...s, content: { ...s.content, he: e.target.value } } : s) } : m))} />
                      <textarea className={`w-full border p-2 rounded h-24 text-left ${isHe ? 'order-2' : 'order-first'}`} dir="ltr" placeholder="English content..." value={sub.content.en}
                        onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, subItems: m.subItems.map(s => s.id === sub.id ? { ...s, content: { ...s.content, en: e.target.value } } : s) } : m))} />
                    </div>

                    {/* PREVIEW SECTIONS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Image Upload & Preview */}
                      <div className="space-y-3">
                        <label className="text-sm font-bold flex items-center gap-2"><ImageIcon size={14}/> {isHe ? 'תמונות' : 'Images'}</label>
                        <input type="file" multiple accept="image/*" onChange={(e) => handleFileUpload(e, menu.id, sub.id, 'images')} className="text-xs w-full block file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-lg file:px-4 file:py-1 file:mr-4" />

                        <div className="flex gap-2 flex-wrap">
                          {sub.images?.map((img, i) => (
                            <div key={i} className="relative w-16 h-16 group">
                              <img src={img} className="w-full h-full object-cover rounded-lg border shadow-sm" alt="preview" />
                              <button onClick={() => removeFile(menu.id, sub.id, 'images', i)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition shadow-lg">
                                <Trash2 size={10} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* PDF Upload & Preview */}
                      <div className="space-y-3">
                        <label className="text-sm font-bold flex items-center gap-2"><FileText size={14}/> {isHe ? 'מסמכים' : 'PDF'}</label>
                        <input type="file" multiple accept=".pdf" onChange={(e) => handleFileUpload(e, menu.id, sub.id, 'pdfs')} className="text-xs w-full block file:bg-red-50 file:text-red-700 file:border-0 file:rounded-lg file:px-4 file:py-1 file:mr-4" />

                        <div className="space-y-2">
                          {sub.pdfs?.map((pdf, i) => (
                            <div key={i} className="flex items-center justify-between bg-white border rounded-lg p-2 text-xs shadow-sm">
                              <div className="flex items-center gap-2 truncate">
                                <FileText size={14} className="text-red-500" />
                                <span className="truncate max-w-[120px]">{isHe ? `מסמך ${i+1}` : `Document ${i+1}`}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <a href={pdf} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700">
                                  <ExternalLink size={14} />
                                </a>
                                <button onClick={() => removeFile(menu.id, sub.id, 'pdfs', i)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => addSubMenu(menu.id)} className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:bg-blue-50 p-2 rounded-lg transition">
                  + {isHe ? 'הוסף תת-פריט' : 'Add Sub-item'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminInterface;