import React from 'react';
import {
  Plus, Trash2, Upload, ChevronDown, ChevronUp,
  ArrowUp, ArrowDown
} from 'lucide-react';
import SubMenuEditor from '../SubMenuEditor.jsx';

const MenuSection = ({
  menuData, isHe, openItems, toggleAccordion, moveMenu,
  updateMenuTitle, updateMenuBg, addMenu, removeMenu,
  addSubMenu, handleFileUpload, removeFile, setMenuData
}) => {
  return (
    <section className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          {isHe ? 'ניהול תפריט' : 'Menu Management'}
        </h2>
        <button
          onClick={addMenu}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-lg transition"
        >
          <Plus size={18} /> {isHe ? 'תפריט חדש' : 'New Menu'}
        </button>
      </div>

      {menuData.map((menu, index) => (
        <div key={menu.id} className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:border-slate-300 transition-colors">
          {/* Header Row */}
          <div className="p-4 bg-slate-50 border-b flex items-center gap-3">
            <div className="flex flex-col gap-1">
              <button
                disabled={index === 0}
                onClick={() => moveMenu(index, index - 1)}
                className="p-1 hover:bg-white rounded border disabled:opacity-30 text-slate-500"
              >
                <ArrowUp size={14}/>
              </button>
              <button
                disabled={index === menuData.length - 1}
                onClick={() => moveMenu(index, index + 1)}
                className="p-1 hover:bg-white rounded border disabled:opacity-30 text-slate-500"
              >
                <ArrowDown size={14}/>
              </button>
            </div>

            <div className="flex-1 grid grid-cols-2 gap-2">
              <input
                className="border-none bg-transparent font-bold focus:ring-0"
                dir="rtl"
                value={menu.title?.he || ''}
                onChange={(e) => updateMenuTitle(menu.id, 'he', e.target.value)}
                placeholder="כותרת עברית"
              />
              <input
                className="border-none bg-transparent font-bold focus:ring-0"
                dir="ltr"
                value={menu.title?.en || ''}
                onChange={(e) => updateMenuTitle(menu.id, 'en', e.target.value)}
                placeholder="English Title"
              />
            </div>

            <div className="flex items-center gap-2">
              <button onClick={() => removeMenu(menu.id)} className="text-red-400 hover:text-red-600 p-2">
                <Trash2 size={18} />
              </button>
              <button onClick={() => toggleAccordion(menu.id)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                {openItems[menu.id] ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
              </button>
            </div>
          </div>

          {/* Expanded Content */}
          {openItems[menu.id] && (
            <div className="p-6 space-y-6 animate-in slide-in-from-top-2 duration-200">
              {/* Background Image Setup */}
              <div className="flex flex-col md:flex-row items-center gap-4 border p-4 rounded-xl bg-slate-50">
                <input
                  className="flex-1 bg-white border border-slate-200 p-2 rounded text-sm outline-none"
                  value={menu.bgImage || ''}
                  onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? {...m, bgImage: e.target.value} : m))}
                  placeholder="Background URL..."
                />
                <label className="cursor-pointer bg-white border border-slate-300 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-slate-100 transition">
                  <Upload size={14}/> <span>{isHe ? 'העלאה' : 'Upload'}</span>
                  <input type="file" accept="image/*" onChange={(e) => updateMenuBg(e, menu.id)} className="hidden"/>
                </label>
              </div>

              {/* Sub-items List */}
              <div className={`space-y-4 border-blue-100 ${isHe ? 'border-r-4 pr-6' : 'border-l-4 pl-6'}`}>
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  {isHe ? 'תתי-קטגוריות' : 'Sub-items'}
                </h4>
                {menu.subItems.map(sub => (
                  <SubMenuEditor
                    key={sub.id}
                    sub={sub}
                    menuId={menu.id}
                    isHe={isHe}
                    handleFileUpload={handleFileUpload}
                    removeFile={removeFile}
                    setMenuData={setMenuData}
                    menuData={menuData}
                  />
                ))}
                <button
                  onClick={() => addSubMenu(menu.id)}
                  className="text-blue-600 text-xs font-bold hover:underline flex items-center gap-1"
                >
                  + {isHe ? 'הוסף תת-פריט' : 'Add Sub-item'}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default MenuSection;