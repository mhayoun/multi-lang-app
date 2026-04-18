import { useState, useEffect } from 'react';
import { createNewMenu, createNewSubMenu, DEFAULT_MENU } from './data';

export const useMenuManager = () => {
  // --- STATE INITIALIZATION ---
  const [menuData, setMenuData] = useState(() => {
    const saved = localStorage.getItem('siteData');
    // If no data exists, initialize with the Youth Home DEFAULT_MENU
    return saved ? JSON.parse(saved) : DEFAULT_MENU;
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

  // New: Restore the default Youth Home menu structure
  const uploadDefaults = () => {
    if (window.confirm("Restore default Youth Home menu structure?")) {
      setMenuData(DEFAULT_MENU);
    }
  };

  const addMenu = () => {
    setMenuData(prev => [...prev, createNewMenu()]);
  };

  const addSubMenu = (menuId) => {
    setMenuData(prev => prev.map(m =>
      m.id === menuId ? { ...m, subItems: [...(m.subItems || []), createNewSubMenu()] } : m
    ));
  };

  const removeMenu = (menuId) => {
    setMenuData(prev => prev.filter(m => m.id !== menuId));
  };

  const moveMenu = (fromIndex, toIndex) => {
    if (toIndex < 0 || toIndex >= menuData.length) return;
    const updatedData = [...menuData];
    const [movedItem] = updatedData.splice(fromIndex, 1);
    updatedData.splice(toIndex, 0, movedItem);
    setMenuData(updatedData);
  };

  // --- FILE HANDLING ---
  const handleFileUpload = (e, menuId, subId, type) => {
    const files = Array.from(e.target.files);

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;

        setMenuData(prev => prev.map(m => {
          if (m.id !== menuId) return m;

          // Case 1: Update main menu background image
          if (!subId && type === 'bgImage') {
            return { ...m, bgImage: base64String };
          }

          // Case 2: Update specific sub-item files (Images or PDFs)
          return {
            ...m,
            subItems: (m.subItems || []).map(s => {
              if (s.id !== subId) return s;

              const fileEntry = type === 'pdfs'
                ? { url: base64String, name: file.name }
                : base64String;

              return {
                ...s,
                [type]: [...(s[type] || []), fileEntry]
              };
            })
          };
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (menuId, subId, type, index) => {
    setMenuData(prev => prev.map(m => {
      if (m.id !== menuId) return m;
      return {
        ...m,
        subItems: (m.subItems || []).map(s => {
          if (s.id !== subId) return s;
          const newList = [...(s[type] || [])];
          newList.splice(index, 1);
          return { ...s, [type]: newList };
        })
      };
    }));
  };

  return {
    // Data & Logic
    menuData,
    setMenuData,
    moveMenu,
    logo,
    setLogo,
    uploadDefaults,

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