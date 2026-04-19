import React from 'react';
import { Settings, User } from 'lucide-react';
import { LANGUAGES } from '../data';

const Navbar = ({ logic, uiText }) => {

  const handleHomeClick = () => {
    logic.setActiveSubItem(null);
    logic.setView('user');
  };

  const handleSubItemClick = (sub) => {
    logic.setActiveSubItem(sub);
    logic.setView('user');
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 px-6 py-3 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-6">

        {/* --- LOGO / HOME BUTTON --- */}
        <button
          onClick={handleHomeClick}
          className="flex items-center transition-transform active:scale-95 outline-none"
          title={logic.lang === 'he' ? 'דף הבית' : 'Home'}
        >
          {logic.logo ? (
            <img src={logic.logo} alt="Logo" className="h-10 w-auto object-contain" />
          ) : (
            <h1 className="font-bold text-xl tracking-tight text-blue-600">DynamicPort</h1>
          )}
        </button>

        {/* --- NAVIGATION LINKS --- */}
        <div className="hidden md:flex gap-4 border-slate-200 h-6 items-center px-4 border-x">
          {logic.menuData.map((menu) => {
            const hasSubItems = menu.subItems && menu.subItems.length > 0;
            const isSingleItem = menu.subItems && menu.subItems.length === 1;

            return (
              <div key={menu.id} className="relative group h-full flex items-center">
                {/* Logic: If exactly 1 item, main button triggers that item.
                   Otherwise, it's just a label for the dropdown.
                */}
                <button
                  onClick={() => isSingleItem && handleSubItemClick(menu.subItems[0])}
                  className={`font-medium transition-colors py-2 ${
                    isSingleItem ? 'hover:text-blue-600 cursor-pointer' : 'cursor-default'
                  }`}
                >
                  {logic.t(menu.title)}
                </button>

                {/* Only show dropdown if there are 2 or more items */}
                {hasSubItems && !isSingleItem && (
                  <>
                    <div className="absolute top-full left-0 w-full h-2 bg-transparent" />
                    <div className="absolute ltr:left-0 rtl:right-0 top-full mt-1 hidden group-hover:flex flex-col bg-white shadow-xl border border-slate-100 rounded-xl p-1.5 min-w-[200px] animate-in fade-in zoom-in-95 duration-150 z-[60]">
                      {menu.subItems.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSubItemClick(sub);
                          }}
                          className="w-full text-start px-4 py-2.5 hover:bg-blue-50 hover:text-blue-700 rounded-lg text-sm font-medium transition-all"
                        >
                          {logic.t(sub.title)}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* --- RIGHT SIDE CONTROLS --- */}
      <div className="flex items-center gap-4">
        <div className="flex bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => logic.setView('user')}
            className={`px-3 py-1 rounded-md text-sm flex items-center gap-2 transition-all ${logic.view === 'user' ? 'bg-white shadow-sm text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <User size={16} /> {uiText.user}
          </button>
          <button
            onClick={() => logic.setView('admin')}
            className={`px-3 py-1 rounded-md text-sm flex items-center gap-2 transition-all ${logic.view === 'admin' ? 'bg-white shadow-sm text-blue-600 font-bold' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Settings size={16} /> {uiText.switch}
          </button>
        </div>

        <select
          value={logic.lang}
          onChange={(e) => logic.setLang(e.target.value)}
          className="bg-transparent font-bold text-sm outline-none cursor-pointer border-none focus:ring-0"
        >
          {Object.entries(LANGUAGES).map(([code, info]) => (
            <option key={code} value={code}>{info.label}</option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default Navbar;