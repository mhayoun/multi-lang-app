import { useState, useEffect } from 'react';
import { createNewMenu, createNewSubMenu } from './data';

export const useMenuManager = () => {
  const [menuData, setMenuData] = useState(() => {
    const saved = localStorage.getItem('siteData');
    return saved ? JSON.parse(saved) : [];
  });

  const [view, setView] = useState('user');
  const [lang, setLang] = useState('he');
  const [activeSubItem, setActiveSubItem] = useState(null);

  useEffect(() => {
    localStorage.setItem('siteData', JSON.stringify(menuData));
  }, [menuData]);

  const t = (obj) => obj?.[lang] || obj?.['he'] || '';

  const addMenu = () => {
    setMenuData([...menuData, createNewMenu()]);
  };

  const addSubMenu = (menuId) => {
    setMenuData(menuData.map(m =>
      m.id === menuId ? { ...m, subItems: [...m.subItems, createNewSubMenu()] } : m
    ));
  };

  const removeMenu = (menuId) => {
    setMenuData(menuData.filter(m => m.id !== menuId));
  };

  const handleFileUpload = (e, menuId, subId, type) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setMenuData(prev => prev.map(m => {
          if (m.id === menuId) {
            // Updating main menu background
            if (!subId && type === 'bgImage') return { ...m, bgImage: base64String };
            // Updating sub-item files
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
    menuData, setMenuData, view, setView, lang, setLang,
    activeSubItem, setActiveSubItem, t, addMenu,
    addSubMenu, removeMenu, handleFileUpload, removeFile
  };
};