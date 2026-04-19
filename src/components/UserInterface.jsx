import React, {useState} from 'react';
import {FileText, ChevronRight, ChevronLeft} from 'lucide-react';
import GalleryBanderole from './GalleryBanderole';

const UserInterface = ({logic, uiText}) => {
    const {activeSubItem, setActiveSubItem, menuData, newsData, t, lang} = logic;
    const isHe = lang === 'he';

    // State for the slider inside the specific page
    const [currentLinkedSlide, setCurrentLinkedSlide] = useState(0);

    // Helper to find the actual data for the items you linked in Admin
    const getLinkedItemsData = (ids) => {
        if (!ids || !Array.isArray(ids)) return [];
        const foundItems = [];
        ids.forEach(id => {
            menuData.forEach(category => {
                const item = category.subItems.find(s => s.id === id);
                if (item) foundItems.push(item);
            });
        });
        return foundItems;
    };

    // --- DETAIL VIEW ---
    if (activeSubItem) {
        const linkedItems = getLinkedItemsData(activeSubItem.linkedItemIds);

        return (
            <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4" dir={isHe ? 'rtl' : 'ltr'}>
                {/* Back Button */}
                <button
                    onClick={() => {
                        setActiveSubItem(null);
                        setCurrentLinkedSlide(0);
                    }}
                    className="text-blue-600 mb-8 flex items-center gap-2 font-bold group"
                >
                    {isHe ? <ChevronRight size={20}/> : <ChevronLeft size={20}/>}
                    {uiText.back}
                </button>

                <h1 className="text-4xl font-black mb-6 text-slate-800">{t(activeSubItem.title)}</h1>

                {/* 2. MAIN CONTENT TEXT */}
                <p className={`text-xl leading-relaxed text-slate-600 mb-12 ${isHe ? 'border-r-4 pr-6' : 'border-l-4 pl-6'} border-blue-500`}>
                    {t(activeSubItem.content)}
                </p>

                {/* 2. CALL THE COMPONENT HERE */}
                <GalleryBanderole images={activeSubItem.images} isHe={isHe}/>

                {/* 4. PDF DOCUMENTS */}
                {activeSubItem.pdfs?.length > 0 && (
                    <div className="bg-slate-50 border border-slate-200 p-8 rounded-[2.5rem]">
                        <h3 className="font-black text-xl mb-6 flex items-center gap-3 text-slate-800">
                            <FileText className="text-blue-600" size={24}/>
                            {uiText.docsTitle}
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {activeSubItem.pdfs.map((pdf, i) => (
                                <a
                                    key={i}
                                    href={pdf.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group/doc"
                                >
                                    <span
                                        className="font-bold text-slate-700 truncate">{pdf.name || `Document_${i + 1}`}</span>
                                    <div
                                        className="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-1 rounded">PDF
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* 1. LINKED ITEMS BANDEROLE (Horizontal Gallery) */}
                {linkedItems.length > 0 && (
                    <div className="mb-12">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 px-2">
                            {isHe ? 'קישורים קשורים' : 'Related Links'}
                        </h3>
                        <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
                            {linkedItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveSubItem(item);
                                        window.scrollTo({top: 0, behavior: 'smooth'});
                                    }}
                                    className="relative flex-shrink-0 w-72 h-44 rounded-[2rem] overflow-hidden shadow-lg group snap-start transition-transform hover:scale-[1.02]"
                                >
                                    <img
                                        src={item.image || (item.images && item.images[0]) || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa'}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        alt=""
                                    />
                                    <div
                                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/>

                                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                                        <h4 className="font-black text-lg leading-tight drop-shadow-md">
                                            {t(item.title)}
                                        </h4>
                                        <div
                                            className="mt-2 flex items-center gap-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                            {isHe ? 'צפה עכשיו' : 'View Now'}
                                            <ChevronRight size={14} className={isHe ? 'rotate-180' : ''}/>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        );
    }

    // --- HOME VIEW ---
    return (
        <div className="space-y-12" dir={isHe ? 'rtl' : 'ltr'}>
            {/* 1. STATIC HOME SLIDER */}
            {newsData && newsData.length > 0 && (
                <div className="relative w-full h-[400px] rounded-[3rem] overflow-hidden shadow-2xl">
                    <img
                        src={newsData[0].image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'}
                        className="w-full h-full object-cover"
                        alt="news"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"/>
                    <div className="absolute bottom-0 p-10 text-white w-full">
            <span
                className="bg-blue-600 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold mb-4 inline-block">
              {isHe ? 'חדשות אחרונות' : 'Latest News'}
            </span>
                        <h2 className="text-4xl font-black mb-4">{t(newsData[0].title)}</h2>
                        <button
                            onClick={() => setActiveSubItem(newsData[0])}
                            className="bg-white text-blue-900 px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                        >
                            {isHe ? 'קרא עוד' : 'Read More'}
                            <ChevronRight size={18} className={isHe ? 'rotate-180' : ''}/>
                        </button>
                    </div>
                </div>
            )}

            {/* 2. MENU GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {menuData.map(menu => (
                    <div key={menu.id}
                         className="bg-white rounded-[2.5rem] overflow-hidden shadow-lg border border-slate-100 transition-transform hover:-translate-y-1">
                        <div className="h-40 relative">
                            <img src={menu.bgImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa'}
                                 className="w-full h-full object-cover" alt=""/>
                            <div className="absolute inset-0 bg-black/20"/>
                            <h2 className="absolute bottom-4 right-6 left-6 text-white text-2xl font-black">{t(menu.title)}</h2>
                        </div>
                        <div className="p-4 space-y-2">
                            {menu.subItems.map(sub => (
                                <button
                                    key={sub.id}
                                    onClick={() => setActiveSubItem(sub)}
                                    className="w-full text-right px-5 py-3 rounded-2xl bg-slate-50 hover:bg-blue-600 hover:text-white transition-all flex justify-between items-center group font-bold text-slate-700"
                                >
                                    {t(sub.title)}
                                    <ChevronLeft size={16} className={isHe ? '' : 'rotate-180'}/>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserInterface;