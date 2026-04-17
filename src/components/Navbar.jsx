import React from 'react';
import { Settings, User } from 'lucide-react';
import { LANGUAGES } from '../data';

const Navbar = ({ logic, uiText }) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-3 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-6">
        <h1 className="font-bold text-xl tracking-tight text-blue-600">DynamicPort</h1>
        <div className="hidden md:flex gap-4 border-slate-200 h-6 items-center px-4 border-x">
          {logic.menuData.map(menu => (
            <div key={menu.id} className="relative group cursor-pointer font-medium hover:text-blue-600">
              {logic.t(menu.title)}
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
  );
};

export default Navbar;