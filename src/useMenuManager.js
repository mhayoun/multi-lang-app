import { useState, useEffect } from 'react';
import { createNewMenu, createNewSubMenu, DEFAULT_MENU, createNewNews } from './data';

export const useMenuManager = () => {
  // --- STATE INITIALIZATION ---

  // Menu Data (Categories like Pool, Sports, etc.)
  const [menuData, setMenuData] = useState(() => {
    const saved = localStorage.getItem('siteData');
    return saved ? JSON.parse(saved) : DEFAULT_MENU;
  });

  // News Data (Slides for the home page)
  const [newsData, setNewsData] = useState(() => {
    const saved = localStorage.getItem('siteNews');
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
    localStorage.setItem('siteNews', JSON.stringify(newsData));
  }, [newsData]);

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

  // --- NEWS ACTIONS ---
  const addNews = () => {
    setNewsData(prev => [...prev, createNewNews()]);
  };

  const removeNews = (id) => {
    setNewsData(prev => prev.filter(n => n.id !== id));
  };

  // --- FILE HANDLING (Generic for both Menu and News) ---
  const handleFileUpload = (e, targetId, subId, type, isNews = false) => {
    const files = Array.from(e.target.files);
    const setter = isNews ? setNewsData : setMenuData;

    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;

        setter(prev => prev.map(item => {
          if (item.id !== targetId) return item;

          // Case 1: Main background image or Main News Slide Image
          if (!subId && (type === 'bgImage' || type === 'image')) {
            return { ...item, [type]: base64String };
          }

          // Case 2: Update sub-item files or News detail files
          // For News, we treat the News object itself as the "sub-menu" for content
          const updateSubItems = (items) => items.map(s => {
            if (s.id !== subId) return s;
            const fileEntry = type === 'pdfs' ? { url: base64String, name: file.name } : base64String;
            return { ...s, [type]: [...(s[type] || []), fileEntry] };
          });

          if (isNews) {
             // For news, files are stored directly on the item or in its arrays
             const fileEntry = type === 'pdfs' ? { url: base64String, name: file.name } : base64String;
             return { ...item, [type]: [...(item[type] || []), fileEntry] };
          }

          return { ...item, subItems: updateSubItems(item.subItems || []) };
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeFile = (targetId, subId, type, index, isNews = false) => {
    const setter = isNews ? setNewsData : setMenuData;
    setter(prev => prev.map(item => {
      if (item.id !== targetId) return item;

      if (isNews) {
        const newList = [...(item[type] || [])];
        newList.splice(index, 1);
        return { ...item, [type]: newList };
      }

      return {
        ...item,
        subItems: (item.subItems || []).map(s => {
          if (s.id !== subId) return s;
          const newList = [...(s[type] || [])];
          newList.splice(index, 1);
          return { ...s, [type]: newList };
        })
      };
    }));
  };

  return {
    // Data
    menuData,
    setMenuData,
    newsData,
    setNewsData,
    logo,
    setLogo,

    // UI State
    view,
    setView,
    lang,
    setLang,
    activeSubItem,
    setActiveSubItem,

    // Actions
    t,
    uploadDefaults,
    addMenu,
    addSubMenu,
    removeMenu,
    moveMenu,
    addNews,
    removeNews,
    handleFileUpload,
    removeFile
  };
};