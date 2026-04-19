import React from 'react';
import { LayoutGrid, Newspaper } from 'lucide-react';

const AdminTabs = ({ activeTab, setActiveTab, isHe }) => {
  const tabs = [
    { id: 'menu', label: isHe ? 'תפריטים' : 'Menus', icon: LayoutGrid },
    { id: 'news', label: isHe ? 'חדשות' : 'News', icon: Newspaper }
  ];

  return (
    <nav className="flex bg-slate-100 p-1.5 rounded-3xl w-fit mx-auto shadow-inner border border-slate-200">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`
            flex items-center gap-2 px-8 py-3 rounded-2xl font-black transition-all duration-200
            ${activeTab === id 
              ? 'bg-white shadow-md text-blue-600 scale-105' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}
          `}
        >
          <Icon size={18} />
          {label}
        </button>
      ))}
    </nav>
  );
};

export default AdminTabs;