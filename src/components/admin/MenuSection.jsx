import React from 'react';
import { Plus, Upload } from 'lucide-react';
import SubMenuEditor from './SubMenuEditor.jsx';
import SliderLinker from './SliderLinker.jsx';
import EditorAccordionItem from './EditorAccordionItem.jsx';

const MenuSection = ({
  menuData, isHe, openItems, toggleAccordion, moveMenu,
  updateMenuTitle, updateMenuBg, addMenu, removeMenu,
  addSubMenu, handleFileUpload, removeFile, setMenuData,
  linkItemToSub, unlinkItemFromSub
}) => {
  const t = (obj) => isHe ? obj?.he || '' : obj?.en || '';

  return (
    <section className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h2 className="text-2xl font-bold text-slate-800">{isHe ? 'ניהול תפריטים' : 'Menu Management'}</h2>
        <button onClick={addMenu} className="bg-blue-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-700 shadow-lg transition">
          <Plus size={18} /> {isHe ? 'תפריט חדש' : 'New Menu'}
        </button>
      </div>

      {menuData.map((menu, index) => (
        <EditorAccordionItem
          key={menu.id}
          id={menu.id}
          index={index}
          totalItems={menuData.length}
          isOpen={openItems[menu.id]}
          onToggle={toggleAccordion}
          onRemove={removeMenu}
          onMove={moveMenu}
          titleInputs={
            <>
              <input className="border-none bg-transparent font-bold focus:ring-0" dir="rtl" value={menu.title?.he || ''} onChange={(e) => updateMenuTitle(menu.id, 'he', e.target.value)} placeholder="כותרת בעברית" />
              <input className="border-none bg-transparent font-bold focus:ring-0" dir="ltr" value={menu.title?.en || ''} onChange={(e) => updateMenuTitle(menu.id, 'en', e.target.value)} placeholder="English Title" />
            </>
          }
        >
          {/* Menu Specific UI: Background */}
          <div className="flex flex-col md:flex-row items-center gap-4 border p-4 rounded-xl bg-slate-50">
            <input className="flex-1 bg-white border p-2 rounded text-sm outline-none" value={menu.bgImage || ''} onChange={(e) => setMenuData(menuData.map(m => m.id === menu.id ? {...m, bgImage: e.target.value} : m))} placeholder="Background URL..." />
            <label className="cursor-pointer bg-white border px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-slate-100 transition">
              <Upload size={14}/> <span>{isHe ? 'העלאה' : 'Upload'}</span>
              <input type="file" accept="image/*" onChange={(e) => updateMenuBg(e, menu.id)} className="hidden"/>
            </label>
          </div>

          {/* Menu Specific UI: Sub-items */}
          <div className={`space-y-4 border-blue-100 ${isHe ? 'border-r-4 pr-6' : 'border-l-4 pl-6'}`}>
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">{isHe ? 'תתי-תפריט' : 'Sub-items'}</h4>
            {menu.subItems.map(sub => (
              <div key={sub.id} className="space-y-3">
                <SubMenuEditor sub={sub} menuId={menu.id} isHe={isHe} handleFileUpload={handleFileUpload} removeFile={removeFile} setMenuData={setMenuData} menuData={menuData} />
                <SliderLinker isHe={isHe} menuData={menuData} linkedItemIds={sub.linkedItemIds} onLink={(itemId) => linkItemToSub(menu.id, sub.id, itemId)} onUnlink={(itemId) => unlinkItemFromSub(menu.id, sub.id, itemId)} t={t} />
              </div>
            ))}
            <button onClick={() => addSubMenu(menu.id)} className="text-blue-600 text-xs font-bold hover:underline">+ {isHe ? 'הוסף תת-תפריט' : 'Add Sub-item'}</button>
          </div>
        </EditorAccordionItem>
      ))}
    </section>
  );
};

export default MenuSection;