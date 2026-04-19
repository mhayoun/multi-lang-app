import React from 'react';
import { Trash2, FileText } from 'lucide-react';

const SubMenuEditor = ({ sub, menuId, isHe, handleFileUpload, removeFile, setMenuData, menuData }) => {

  const updateField = (field, subField, value) => {
    setMenuData(menuData.map(m => {
      // 1. Logic for News (Flat structure): The item itself is the one to update
      if (m.id === sub.id && !m.subItems) {
        return {
          ...m,
          [field]: { ...m[field], [subField]: value }
        };
      }

      // 2. Logic for Menu Categories (Nested structure): Update inside subItems
      if (m.id === menuId && m.subItems) {
        return {
          ...m,
          subItems: m.subItems.map(s => s.id === sub.id ? {
            ...s,
            [field]: { ...s[field], [subField]: value }
          } : s)
        };
      }

      return m;
    }));
  };

  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4 text-slate-800">
      {/* Title Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <input
          className={`border p-2 rounded text-right ${isHe ? 'order-1' : 'order-2'}`}
          dir="rtl"
          value={sub.title?.he || ''}
          placeholder="כותרת בעברית..."
          onChange={(e) => updateField('title', 'he', e.target.value)}
        />
        <input
          className={`border p-2 rounded text-left ${isHe ? 'order-2' : 'order-1'}`}
          dir="ltr"
          value={sub.title?.en || ''}
          placeholder="English title..."
          onChange={(e) => updateField('title', 'en', e.target.value)}
        />
      </div>

      {/* Content Textareas */}
      <div className="grid grid-cols-2 gap-4">
        <textarea
          className={`w-full border p-2 rounded h-20 text-right ${isHe ? 'order-1' : 'order-2'}`}
          dir="rtl"
          placeholder="תוכן בעברית..."
          value={sub.content?.he || ''}
          onChange={(e) => updateField('content', 'he', e.target.value)}
        />
        <textarea
          className={`w-full border p-2 rounded h-20 text-left ${isHe ? 'order-2' : 'order-1'}`}
          dir="ltr"
          placeholder="English content..."
          value={sub.content?.en || ''}
          onChange={(e) => updateField('content', 'en', e.target.value)}
        />
      </div>

      {/* File Uploads */}
      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
        <div>
          <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">
            {isHe ? 'גלריית תמונות' : 'Image Gallery'}
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileUpload(e, menuId, sub.id, 'images')}
            className="text-xs w-full mb-2"
          />
          <div className="flex gap-2 flex-wrap">
            {sub.images?.map((img, i) => (
              <div key={i} className="relative w-12 h-12 group">
                <img src={img} className="w-full h-full object-cover rounded border" alt="preview" />
                <button
                  onClick={() => removeFile(menuId, sub.id, 'images', i)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition shadow-sm"
                >
                  <Trash2 size={10}/>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-400 mb-1 uppercase">
            {isHe ? 'קבצי PDF' : 'PDF Documents'}
          </label>
          <input
            type="file"
            multiple
            accept=".pdf"
            onChange={(e) => handleFileUpload(e, menuId, sub.id, 'pdfs')}
            className="text-xs w-full mb-2"
          />
          <div className="space-y-1">
            {sub.pdfs?.map((pdf, i) => (
              <div key={i} className="flex items-center justify-between bg-white border rounded p-1 text-[10px]">
                <span className="truncate w-32 flex items-center gap-1">
                  <FileText size={10} className="text-red-500"/>
                  {pdf.name || (isHe ? 'מסמך' : 'Document')}
                </span>
                <button onClick={() => removeFile(menuId, sub.id, 'pdfs', i)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={12}/>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubMenuEditor;