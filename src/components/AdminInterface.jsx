import React from 'react';
import { Plus, Trash2, Image as ImageIcon, FileText, Upload } from 'lucide-react';

const AdminInterface = ({ logic }) => {
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

  // Helper to handle Logo Upload
  const onLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result); // This should be the function we added to your logic hook
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20">

      {/* --- LOGO UPLOAD SECTION --- */}
      <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-start">
          <h3 className="text-xl font-bold text-slate-800">לוגו המערכת</h3>
          <p className="text-slate-500 text-sm">העלו תמונה שתופיע בראש הדף (מחליף את הטקסט)</p>
        </div>

        <div className="flex items-center gap-6">
          {logo && (
            <div className="relative group">
              <img src={logo} alt="Logo Preview" className="h-16 w-32 object-contain border rounded-lg p-2 bg-slate-50" />
              <button
                onClick={() => setLogo(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition"
              >
                <Trash2 size={14} />
              </button>
            </div>
          )}

          <label className="cursor-pointer bg-blue-50 text-blue-600 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-100 transition border border-blue-200">
            <Upload size={18} />
            <span>{logo ? 'החלף לוגו' : 'העלה לוגו'}</span>
            <input type="file" accept="image/*" onChange={onLogoChange} className="hidden" />
          </label>
        </div>
      </div>

      {/* --- MENU MANAGEMENT HEADER --- */}
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800">ניהול תפריטים</h2>
        <button onClick={addMenu} className="bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-lg transition">
          <Plus size={18} /> הוסף תפריט חדש
        </button>
      </div>

      {/* --- MENU LIST --- */}
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
              <button onClick={() => removeMenu(menu.id)} className="text-red-500 hover:bg-red-50 p-3 rounded-full transition-colors">
                <Trash2 size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-2 border p-2 rounded bg-slate-50">
                <ImageIcon size={18} className="text-slate-400" />
                <input className="flex-1 bg-transparent outline-none text-sm" placeholder="Background Image URL" value={menu.bgImage}
                  onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? { ...m, bgImage: e.target.value } : m))} />
              </div>

              {/* Sub-items list */}
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
                      </div>
                    </div>
                  </div>
                ))}
                <button onClick={() => addSubMenu(menu.id)} className="text-blue-600 text-sm font-bold flex items-center gap-1 hover:bg-blue-50 p-2 rounded-lg transition">
                  + הוסף תת-תפריט
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