import React from 'react';
import DetailView from './user/DetailView.jsx';
import HomeNewsSlider from './user/HomeNewsSlider.jsx';
import CardGrid from './user/CardGrid.jsx'; // Updated name

const UserInterface = ({ logic, uiText }) => {
  const { activeSubItem, setActiveSubItem, menuData, newsData, t, lang } = logic;
  const isHe = lang === 'he';

  if (activeSubItem) {
    return (
      <DetailView
        activeSubItem={activeSubItem}
        setActiveSubItem={setActiveSubItem}
        menuData={menuData}
        t={t}
        isHe={isHe}
        uiText={uiText}
      />
    );
  }

  return (
    <div className="space-y-12" dir={isHe ? 'rtl' : 'ltr'}>
      <HomeNewsSlider
        newsData={newsData}
        setActiveSubItem={setActiveSubItem}
        t={t}
        isHe={isHe}
      />

      {/* Using the renamed CardGrid */}
      <CardGrid
        menuData={menuData}
        setActiveSubItem={setActiveSubItem}
        t={t}
        isHe={isHe}
      />
    </div>
  );
};

export default UserInterface;