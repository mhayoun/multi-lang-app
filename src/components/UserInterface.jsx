import React, {useState, useEffect} from 'react';
import {FileText, ChevronRight, ChevronLeft} from 'lucide-react';
import GalleryBanderole from './GalleryBanderole';

const UserInterface = ({logic, uiText}) => {
    const {activeSubItem, setActiveSubItem, menuData, newsData, t, lang} = logic;
    const isHe = lang === 'he';

    // State for the slider inside the detail page
    const [currentLinkedSlide, setCurrentLinkedSlide] = useState(0);

    // NEW: State for the main News Slider
    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

    // NEW: Auto-slide effect for the news slider
    useEffect(() => {
        if (!newsData || newsData.length <= 1 || activeSubItem) return;

        const interval = setInterval(() => {
            setCurrentNewsIndex((prev) => (prev + 1) % newsData.length);
        }, 5000); // Switches every 5 seconds

        return () => clearInterval(interval);
    }, [newsData, activeSubItem]);

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

                <p className={`text-xl leading-relaxed text-slate-600 mb-12 ${isHe ? 'border-r-4 pr-6' : 'border-l-4 pl-6'} border-blue-500`}>
                    {t(activeSubItem.content)}
                </p>

                <GalleryBanderole images={activeSubItem.images} isHe={isHe}/>

                {activeSubItem.pdfs?.length > 0 && (
                    <div className="bg-slate-50 border border-slate-200 p-8 rounded-[2.5rem] mt-12">
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

                {/* RESTORED: LINKED ITEMS BANDEROLE (Horizontal Gallery) */}
                {linkedItems.length > 0 && (
                    <div className="mt-16 mb-20">
                        <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 px-2">
                            {isHe ? 'קישורים קשורים' : 'Related Links'}
                        </h3>
                        <div className="flex gap-4 overflow-x-auto pb-6 custom-scrollbar snap-x">
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
                                        <h4 className="font-black text-lg leading-tight drop-shadow-md text-right">
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

            {/* 1. DYNAMIC HOME SLIDER */}
            {newsData && newsData.length > 0 && (
                <div className="relative w-full h-[450px] rounded-[3rem] overflow-hidden shadow-2xl group">
                    {/* Current Slide */}
                    <div className="relative w-full h-full transition-all duration-700 ease-in-out">
                        <img
                            key={newsData[currentNewsIndex].id}
                            src={newsData[currentNewsIndex].image || (newsData[currentNewsIndex].images && newsData[currentNewsIndex].images[0]) || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'}
                            className="w-full h-full object-cover animate-in fade-in zoom-in-95 duration-1000"
                            alt="news"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"/>

                        <div className="absolute bottom-0 p-10 text-white w-full">
                            <span
                                className="bg-blue-600 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold mb-4 inline-block">
                                {isHe ? 'חדשות אחרונות' : 'Latest News'}
                            </span>
                            <h2 className="text-4xl font-black mb-4 drop-shadow-lg max-w-2xl">
                                {t(newsData[currentNewsIndex].title)}
                            </h2>
                            <button
                                onClick={() => setActiveSubItem(newsData[currentNewsIndex])}
                                className="bg-white text-blue-900 px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                            >
                                {isHe ? 'קרא עוד' : 'Read More'}
                                <ChevronRight size={18} className={isHe ? 'rotate-180' : ''}/>
                            </button>
                        </div>
                    </div>

                    {/* Navigation Controls (Visible on Hover) */}
                    {newsData.length > 1 && (
                        <>
                            <button
                                onClick={() => setCurrentNewsIndex((prev) => (prev - 1 + newsData.length) % newsData.length)}
                                className="absolute top-1/2 -translate-y-1/2 left-6 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <ChevronLeft size={24}/>
                            </button>
                            <button
                                onClick={() => setCurrentNewsIndex((prev) => (prev + 1) % newsData.length)}
                                className="absolute top-1/2 -translate-y-1/2 right-6 p-3 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <ChevronRight size={24}/>
                            </button>

                            {/* Pagination Dots */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                {newsData.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentNewsIndex(i)}
                                        className={`h-2 rounded-full transition-all duration-300 ${currentNewsIndex === i ? 'w-8 bg-blue-500' : 'w-2 bg-white/50 hover:bg-white'}`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
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