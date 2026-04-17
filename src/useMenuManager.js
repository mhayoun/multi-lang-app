import { useState, useEffect } from 'react';
import { createNewMenu, createNewSubMenu } from './data';

export const useMenuManager = () => {
  // --- STATE ---
  const [menuData, setMenuData] = useState(() => {
    const saved = localStorage.getItem('siteData');
    return saved ? JSON.parse(saved) : [];
  });

  const [logo, setLogo] = useState(() => {
    return localStorage.getItem('siteLogo') || null;
  });

  const [view, setView] = useState('user');
  const [lang, setLang] = useState('he');
  const [activeSubItem, setActiveSubItem] = useState(null);

  // --- PERSISTENCE ---
  useEffect(() => {
    localStorage.setItem('siteData', JSON.stringify(menuData));
  }, [menuData]);

  useEffect(() => {
    if (logo) {
      localStorage.setItem('siteLogo', logo);
    } else {
      localStorage.removeItem('siteLogo');
    }
  }, [logo]);

  // --- TRANSLATION HELPER ---
  const t = (obj) => obj?.[lang] || obj?.['he'] || '';

  // --- MENU ACTIONS ---
  const addMenu = () => {
    setMenuData([...menuData, createNewMenu()]);
  };

  const addSubMenu = (menuId) => {
    setMenuData(prev => prev.map(m =>
      m.id === menuId ? { ...m, subItems: [...m.subItems, createNewSubMenu()] } : m
    ));
  };

  const removeMenu = (menuId) => {
    setMenuData(prev => prev.filter(m => m.id !== menuId));
  };

  // --- FILE HANDLING ---
  const handleFileUpload = (e, menuId, subId, type) => {
    const files = Array.from(e.target.files);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;

        setMenuData(prev => prev.map(m => {
          if (m.id === menuId) {
            // Update main menu background (if no subId provided)
            if (!subId && type === 'bgImage') return { ...m, bgImage: base64String };

            // Update specific sub-item files
            return {
              ...m,
              subItems: m.subItems.map(s =>
                s.id === subId ? { ...s, [type]: [...(s[type] || []), base64String] } : s
              )
            };
          }
          return m;
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (menuId, subId, type, index) => {
    setMenuData(prev => prev.map(m => {
      if (m.id === menuId) {
        return {
          ...m,
          subItems: m.subItems.map(s => {
            if (s.id === subId) {
              const newList = [...(s[type] || [])];
              newList.splice(index, 1);
              return { ...s, [type]: newList };
            }
            return s;
          })
        };
      }
      return m;
    }));
  };

  return {
    // Data & Logic
    menuData,
    setMenuData,
    logo,
    setLogo,

    // UI State
    view,
    setView,
    lang,
    setLang,
    activeSubItem,
    setActiveSubItem,

    // Functions
    t,
    addMenu,
    addSubMenu,
    removeMenu,
    handleFileUpload,
    removeFile
  };
};