import React from 'react';
import NewsSection from './NewsSection';
import MenuSection from './MenuSection';
import LogoSection from './LogoSection';
import AdminTabs from './AdminTabs'; // <--- NEW IMPORT
import { useAdminLogic } from './useAdminLogic';

const AdminInterface = ({ logic, currentLang = 'he' }) => {
  const isHe = currentLang === 'he';

  // State and specific handlers from custom hook
  const {
    activeTab, setActiveTab, openItems, toggleAccordion, updateLogo,
    updateMenuBg, updateMenuTitle, updateNewsTitle, linkItemToNews, unlinkItemFromNews
  } = useAdminLogic(logic);

  // Destructure data and generic actions from logic prop
  const {
    menuData, newsData, handleFileUpload, removeFile, addMenu,
    addSubMenu, removeMenu, addNews, removeNews, logo, setLogo,
    moveMenu, setMenuData, setNewsData, t
  } = logic;

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-20 px-4" dir={isHe ? "rtl" : "ltr"}>

      {/* 1. Logo Management */}
      <LogoSection
        logo={logo}
        setLogo={setLogo}
        updateLogo={updateLogo}
        isHe={isHe}
      />

      {/* 2. Navigation Control */}
      <AdminTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isHe={isHe}
      />

      {/* 3. Main Content Area */}
      <main className="min-h-[400px]">
        {activeTab === 'menu' ? (
          <MenuSection
            menuData={menuData}
            isHe={isHe}
            openItems={openItems}
            toggleAccordion={toggleAccordion}
            moveMenu={moveMenu}
            updateMenuTitle={updateMenuTitle}
            updateMenuBg={updateMenuBg}
            addMenu={addMenu}
            removeMenu={removeMenu}
            addSubMenu={addSubMenu}
            handleFileUpload={handleFileUpload}
            removeFile={removeFile}
            setMenuData={setMenuData}
          />
        ) : (
          <NewsSection
            newsData={newsData}
            menuData={menuData}
            isHe={isHe}
            t={t}
            openItems={openItems}
            toggleAccordion={toggleAccordion}
            updateNewsTitle={updateNewsTitle}
            linkItemToNews={linkItemToNews}
            unlinkItemFromNews={unlinkItemFromNews}
            removeNews={removeNews}
            addNews={addNews}
            handleFileUpload={handleFileUpload}
            removeFile={removeFile}
            setNewsData={setNewsData}
          />
        )}
      </main>
    </div>
  );
};

export default AdminInterface;