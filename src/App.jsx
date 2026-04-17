import React from 'react';
import { useMenuManager } from './useMenuManager';
import { LANGUAGES } from './data';
import Navbar from './components/Navbar';
import AdminInterface from './components/AdminInterface';
import UserInterface from './components/UserInterface';

const App = () => {
  const logic = useMenuManager();
  const uiText = LANGUAGES[logic.lang];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-all duration-300" dir={uiText.dir}>
      <Navbar logic={logic} uiText={uiText} />

      <main className="max-w-7xl mx-auto p-6">
        {logic.view === 'admin' ? (
          <AdminInterface logic={logic} />
        ) : (
          <UserInterface logic={logic} uiText={uiText} />
        )}
      </main>
    </div>
  );
};

export default App;