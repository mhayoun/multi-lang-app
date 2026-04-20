import React from 'react';
import { Trash2, FileText, Eye, Code, Maximize2, X, CheckCircle2, GripVertical, Copy, ExternalLink, Check } from 'lucide-react';
import { useSubMenuEditor } from './useSubMenuEditor';

const SubMenuEditor = ({ sub, menuId, isHe, handleFileUpload, removeFile, setMenuData, menuData }) => {
  const logic = useSubMenuEditor(sub, menuId, setMenuData, menuData);

  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4 text-slate-800 shadow-sm relative">

      {/* 1. HEADER */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
          {isHe ? 'עורך תוכן עשיר' : 'Rich Content Editor'}
        </span>
        <button
          onClick={() => logic.setViewMode(logic.viewMode === 'edit' ? 'preview' : 'edit')}
          className="text-[10px] bg-slate-200 px-2 py-1 rounded hover:bg-slate-300 transition flex items-center gap-1"
        >
          {logic.viewMode === 'edit' ? <Eye size={12}/> : <Code size={12}/>}
          {logic.viewMode === 'edit' ? (isHe ? 'תצוגה' : 'Preview') : (isHe ? 'עריכה' : 'Edit')}
        </button>
      </div>

      {/* 2. TITLE INPUTS */}
      <div className="grid grid-cols-2 gap-4">
        <input
          className={`border p-2 rounded text-right font-medium ${isHe ? 'order-1' : 'order-2'}`}
          dir="rtl" value={sub.title?.he || ''} placeholder="כותרת..."
          onChange={(e) => logic.handleUpdateField('title', 'he', e.target.value)}
        />
        <input
          className={`border p-2 rounded text-left font-medium ${isHe ? 'order-2' : 'order-1'}`}
          dir="ltr" value={sub.title?.en || ''} placeholder="Title..."
          onChange={(e) => logic.handleUpdateField('title', 'en', e.target.value)}
        />
      </div>

      {/* 3. QUICK CONTENT AREA */}
      <div className="grid grid-cols-2 gap-4">
        {['he', 'en'].map((lang) => (
          <div key={lang} className={`relative group ${isHe ? (lang === 'he' ? 'order-1' : 'order-2') : (lang === 'en' ? 'order-1' : 'order-2')}`}>
            <button
              onClick={() => { logic.setModalLang(lang); logic.setIsModalOpen(true); }}
              className="absolute top-2 right-2 p-1 bg-white/80 rounded border opacity-0 group-hover:opacity-100 transition z-10 hover:bg-blue-50"
            >
              <Maximize2 size={14} />
            </button>
            {logic.viewMode === 'edit' ? (
              <textarea
                className="w-full border p-2 rounded h-32 font-mono text-xs bg-slate-900 text-green-400"
                value={sub.content?.[lang] || ''}
                onChange={(e) => logic.handleUpdateField('content', lang, e.target.value)}
                dir="ltr"
              />
            ) : (
              <div
                className={`w-full border p-2 rounded h-32 overflow-y-auto bg-white text-xs ${lang === 'he' ? 'text-right' : 'text-left'}`}
                dangerouslySetInnerHTML={{ __html: sub.content?.[lang] || '' }}
                dir={lang === 'he' ? 'rtl' : 'ltr'}
              />
            )}
          </div>
        ))}
      </div>

      {/* 4. FILE UPLOADS */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 text-[10px]">
        <div>
          <label className="font-bold text-slate-400 block mb-1 uppercase">{isHe ? 'תמונות' : 'Images'}</label>
          <input type="file" multiple accept="image/*" onChange={(e) => handleFileUpload(e, menuId, sub.id, 'images')} className="w-full" />
        </div>
        <div>
          <label className="font-bold text-slate-400 block mb-1 uppercase tracking-widest">{isHe ? 'קבצי PDF' : 'PDFs'}</label>
          <input type="file" multiple accept=".pdf" onChange={(e) => handleFileUpload(e, menuId, sub.id, 'pdfs')} className="w-full" />
        </div>
      </div>

      {/* 5. MODAL */}
      {logic.isModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full h-full rounded-2xl shadow-2xl flex flex-col overflow-hidden">

            {/* Modal Header */}
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="flex bg-slate-200 p-1 rounded-lg mr-2">
                  <button onClick={() => logic.setModalLang('he')} className={`px-3 py-1 rounded-md text-xs font-bold transition ${logic.modalLang === 'he' ? 'bg-white text-blue-600 shadow' : 'text-slate-500'}`}>HE</button>
                  <button onClick={() => logic.setModalLang('en')} className={`px-3 py-1 rounded-md text-xs font-bold transition ${logic.modalLang === 'en' ? 'bg-white text-blue-600 shadow' : 'text-slate-500'}`}>EN</button>
                </div>

                <button
                  onClick={logic.handleCopy}
                  className={`flex items-center gap-2 text-[10px] px-3 py-1.5 rounded-md font-bold transition border ${logic.copied ? 'bg-green-50 border-green-200 text-green-600' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  {logic.copied ? <Check size={12} /> : <Copy size={12} />}
                  {isHe ? (logic.copied ? 'הועתק!' : 'העתק תוכן') : (logic.copied ? 'Copied!' : 'Copy Content')}
                </button>

                <a
                  href="https://bestonlinehtmleditor.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-slate-800 text-white text-[10px] px-3 py-1.5 rounded-md hover:bg-black transition font-bold"
                >
                  <ExternalLink size={12} />
                  {isHe ? 'פתח עורך חיצוני' : 'Open External Editor'}
                </a>
              </div>
              <button onClick={() => logic.setIsModalOpen(false)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition"><X size={24} /></button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 flex overflow-hidden relative">
              <div style={{ width: `${logic.leftWidth}%` }} className="flex flex-col bg-slate-900 border-r border-slate-700">
                <div className="bg-slate-800 text-slate-400 px-4 py-1 text-[10px] font-mono">SOURCE CODE</div>
                <textarea
                  className="flex-1 w-full p-6 font-mono text-base bg-slate-900 text-green-400 outline-none resize-none"
                  value={sub.content?.[logic.modalLang] || ''}
                  onChange={(e) => logic.handleUpdateField('content', logic.modalLang, e.target.value)}
                  dir="ltr" spellCheck="false"
                />
              </div>

              <div onMouseDown={logic.startResizing} className="w-1.5 h-full bg-slate-300 hover:bg-blue-500 cursor-col-resize flex items-center justify-center transition-colors group">
                <div className="bg-white border rounded-full p-1 shadow-sm"><GripVertical size={12} className="text-slate-400" /></div>
              </div>

              <div style={{ width: `${100 - logic.leftWidth}%` }} className="flex flex-col bg-slate-50">
                <div className="bg-slate-200 text-slate-500 px-4 py-1 text-[10px] font-bold">PREVIEW</div>
                <div
                  className={`flex-1 overflow-y-auto p-10 bg-white m-4 rounded-xl shadow-inner ${logic.modalLang === 'he' ? 'text-right' : 'text-left'}`}
                  dir={logic.modalLang === 'he' ? 'rtl' : 'ltr'}
                  dangerouslySetInnerHTML={{ __html: sub.content?.[logic.modalLang] || '' }}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t bg-slate-50 flex justify-end">
              <button onClick={() => logic.setIsModalOpen(false)} className="bg-blue-600 text-white px-8 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition">
                <CheckCircle2 size={18} /> {isHe ? 'שמור וסגור' : 'Save & Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubMenuEditor;