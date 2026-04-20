import React from 'react';
import { FileText, ChevronRight, ChevronLeft } from 'lucide-react';
import GalleryBanderole from './GalleryBanderole.jsx';

const DetailView = ({ activeSubItem, setActiveSubItem, menuData, t, isHe, uiText }) => {

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

    const linkedItems = getLinkedItemsData(activeSubItem.linkedItemIds);

    // Combine images and videos into one array for the Gallery
    const allMedia = [
        ...(activeSubItem.videos || []).map(url => ({ url, type: 'video' })),
        ...(activeSubItem.images || []).map(url => ({ url, type: 'image' }))
    ];

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4" dir={isHe ? 'rtl' : 'ltr'}>
            {/* BACK BUTTON */}
            <button
                onClick={() => {
                    setActiveSubItem(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-blue-600 mb-8 flex items-center gap-2 font-bold group"
            >
                {isHe ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                {uiText.back}
            </button>

            {/* TITLE */}
            <h1 className="text-4xl font-black mb-6 text-slate-800">
                {t(activeSubItem.title)}
            </h1>

            {/* CONTENT */}
            <p
                className={`text-xl leading-relaxed text-slate-600 mb-12 ${isHe ? 'border-r-4 pr-6' : 'border-l-4 pl-6'} border-blue-500`}
                dangerouslySetInnerHTML={{ __html: t(activeSubItem.content) }}
            />

            {/* GALLERY (IMAGES & VIDEOS) */}
            {allMedia.length > 0 && (
                <GalleryBanderole media={allMedia} isHe={isHe} />
            )}

            {/* PDF DOCUMENTS */}
            {activeSubItem.pdfs?.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 p-8 rounded-[2.5rem] mt-12 shadow-sm">
                    <h3 className="font-black text-xl mb-6 flex items-center gap-3 text-slate-800">
                        <FileText className="text-blue-600" size={24} />
                        {uiText.docsTitle}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {activeSubItem.pdfs.map((pdf, i) => {
                            const pdfUrl = typeof pdf === 'string' ? pdf : pdf.url;
                            const pdfName = typeof pdf === 'string' ? `Document ${i + 1}` : (pdf.name || `Document ${i + 1}`);

                            return (
                                <a
                                    key={i}
                                    href={pdfUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-blue-500 hover:shadow-md transition-all group/doc"
                                >
                                    <span className="font-bold text-slate-700 truncate">{pdfName}</span>
                                    <div className="bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-1 rounded">PDF</div>
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* RELATED LINKS */}
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
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                }}
                                className="relative flex-shrink-0 w-72 h-44 rounded-[2rem] overflow-hidden shadow-lg group snap-start transition-transform hover:scale-[1.02]"
                            >
                                <img
                                    src={item.image || (item.images && item.images[0]) || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa'}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    alt=""
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className={`absolute inset-0 p-6 flex flex-col justify-end text-white ${isHe ? 'text-right' : 'text-left'}`}>
                                    <h4 className="font-black text-lg leading-tight drop-shadow-md">{t(item.title)}</h4>
                                    <div className="mt-2 flex items-center gap-1 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                        {isHe ? 'צפה עכשיו' : 'View Now'}
                                        {isHe ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailView;