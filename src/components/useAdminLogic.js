import { useState } from 'react';

export const useAdminLogic = (logic) => {
  const { menuData, setMenuData, newsData, setNewsData, setLogo } = logic;
  const [activeTab, setActiveTab] = useState('menu');
  const [openItems, setOpenItems] = useState({});

  const toggleAccordion = (id) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleImageUpload = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => callback(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const updateLogo = (e) => handleImageUpload(e, setLogo);

  const updateMenuBg = (e, menuId) => {
    handleImageUpload(e, (result) => {
      setMenuData(menuData.map(m => m.id === menuId ? { ...m, bgImage: result } : m));
    });
  };

  const updateMenuTitle = (menuId, lang, value) => {
    setMenuData(menuData.map(m =>
      m.id === menuId ? { ...m, title: { ...m.title, [lang]: value } } : m
    ));
  };

  const updateNewsTitle = (newsId, lang, value) => {
    setNewsData(newsData.map(n =>
      n.id === newsId ? { ...n, title: { ...n.title, [lang]: value } } : n
    ));
  };

  const linkItemToNews = (newsId, selectedId) => {
    if (!selectedId) return;
    setNewsData(newsData.map(n => {
      if (n.id === newsId) {
        const current = n.linkedItemIds || [];
        if (!current.includes(selectedId)) {
          return { ...n, linkedItemIds: [...current, selectedId] };
        }
      }
      return n;
    }));
  };

  const unlinkItemFromNews = (newsId, linkedId) => {
    setNewsData(newsData.map(n => n.id === newsId ?
      { ...n, linkedItemIds: n.linkedItemIds.filter(id => id !== linkedId) } : n
    ));
  };

  return {
    activeTab, setActiveTab,
    openItems, toggleAccordion,
    updateLogo, updateMenuBg,
    updateMenuTitle, updateNewsTitle,
    linkItemToNews, unlinkItemFromNews
  };
};