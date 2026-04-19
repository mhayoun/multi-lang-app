export const LANGUAGES = {
    en: {
        dir: 'ltr',
        label: 'English',
        switch: 'Admin Panel',
        user: 'User View',
        back: 'Back',
        docsTitle: 'Documents & Files'
    },
    he: {
        dir: 'rtl',
        label: 'עברית',
        switch: 'פאנל ניהול',
        user: 'תצוגת משתמש',
        back: 'חזור',
        docsTitle: 'מסמכים וקבצים'
    }
};

export const createNewMenu = () => ({
    id: Date.now(),
    title: {he: '', en: ''},
    bgImage: '',
    subItems: []
});

export const createNewSubMenu = () => ({
    id: Date.now(),
    title: {he: '', en: ''},
    content: {he: '', en: ''},
    images: [],
    pdfs: []
});

export const createNewNews = () => ({
    id: Date.now(),
    title: {he: '', en: ''},
    image: '',
    linkedItemId: null, // Stores the ID of a sub-menu item  content: { he: '', en: '' },
    images: [],
    pdfs: []
});

export const DEFAULT_MENU = [
    {
        id: 1,
        title: {he: 'בריכה ומועדון כושר', en: 'Pool & Gym'},
        bgImage: '',
        subItems: [
            {
                id: 101,
                title: {he: 'שעות פעילות הבריכה', en: 'Pool Opening Hours'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 102,
                title: {he: 'תוכנית הפעילות חדר הכושר', en: 'Gym Activity Schedule'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 103,
                title: {he: 'תוכנית מועדון ספורט גמלאים', en: 'Seniors Sports Club Program'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 104,
                title: {he: 'מידע כללי ומחירים', en: 'General Info & Prices'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {id: 105, title: {he: 'הרשמה', en: 'Registration'}, content: {he: '', en: ''}, images: [], pdfs: []}
        ]
    },
    {
        id: 2,
        title: {he: 'ספורט ופנאי לילדים ונוער', en: 'Sports & Leisure for Kids & Youth'},
        bgImage: '',
        subItems: [
            {
                id: 201,
                title: {he: 'אמנויות לחימה - ג׳ודו', en: 'Martial Arts - Judo'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 202,
                title: {he: 'אמנויות לחימה - טקוואנדו', en: 'Martial Arts - Taekwondo'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 203,
                title: {he: 'אמנויות לחימה - אייקידו', en: 'Martial Arts - Aikido'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 204,
                title: {he: 'אמנויות לחימה - מועדון מכבי סייף', en: 'Martial Arts - Maccabi Fencing Club'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 205,
                title: {he: 'כדורגל - הפועל קטמון ירושלים', en: 'Football - Hapoel Katamon Jerusalem'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 206,
                title: {he: 'כדורגל - רומא קלאב ירושלים', en: 'Football - Roma Club Jerusalem'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 207,
                title: {he: 'כדורסל - הפועל ירושלים', en: 'Basketball - Hapoel Jerusalem'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 208,
                title: {he: 'כדורסל - אליצור ירושלים', en: 'Basketball - Elitzur Jerusalem'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 209,
                title: {
                    he: 'שחייה - שחייה תחרותית הפועל ירושלים',
                    en: 'Swimming - Hapoel Jerusalem Competitive Swimming'
                },
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            }
        ]
    },
    {
        id: 3,
        title: {he: 'תנועה ומחול', en: 'Movement & Dance'},
        bgImage: '',
        subItems: [
            {
                id: 301,
                title: {he: 'ילדים ונוער - מחולה', en: 'Kids & Youth - Mehola'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 302,
                title: {he: 'ילדים ונוער - תיאטרון מחול ירושלים', en: 'Kids & Youth - Jerusalem Dance Theater'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 303,
                title: {he: 'בוגרים - ריקודי עם והרקדות', en: 'Adults - Folk Dancing'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 304,
                title: {he: 'בוגרים - להקת המחול ירושלים של זהב', en: 'Adults - Jerusalem of Gold Dance Troupe'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 305,
                title: {he: 'בוגרים - סלסה קפיטל לטינה', en: 'Adults - Salsa Capital Latina'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 306,
                title: {he: 'בוגרים - מחול מזרחי וצועני', en: 'Adults - Belly Dance & Gypsy'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 307,
                title: {he: 'בוגרים - ניה nia', en: 'Adults - Nia'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            }
        ]
    },
    {
        id: 4,
        title: {he: 'ספורט ופנאי לבוגרים', en: 'Sports & Leisure for Adults'},
        bgImage: '',
        subItems: [
            {id: 401, title: {he: 'אייקידו', en: 'Aikido'}, content: {he: '', en: ''}, images: [], pdfs: []},
            {
                id: 402,
                title: {he: 'כדורגל נשים', en: 'Womens Football'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {id: 403, title: {he: 'צ\'י קונג', en: 'Qi Gong'}, content: {he: '', en: ''}, images: [], pdfs: []},
            {
                id: 404,
                title: {he: 'מכון סאמיט', en: 'Summit Institute'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 405,
                title: {he: 'קבוצת הרזיה חלי ממן', en: 'Hali Maman Diet Group'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            }
        ]
    },
    {
        id: 5,
        title: {he: 'ספורט ופנאי לגמלאים', en: 'Sports & Leisure for Seniors'},
        bgImage: '',
        subItems: [
            {
                id: 501,
                title: {he: 'מועדון ספורט לגמלאים', en: 'Seniors Sports Club'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 502,
                title: {he: 'ריקודי עם והרקדות', en: 'Folk Dancing'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 503,
                title: {he: 'להקת המחול ירושלים של זהב', en: 'Jerusalem of Gold Dance Troupe'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {
                id: 504,
                title: {he: 'גמלאים מטיילים', en: 'Traveling Seniors'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            },
            {id: 505, title: {he: 'חוג ציור', en: 'Painting Class'}, content: {he: '', en: ''}, images: [], pdfs: []},
            {
                id: 506,
                title: {he: 'חיזוק ופיתוח הגוף', en: 'Body Strengthening'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            }
        ]
    },
    {
        id: 6,
        title: {he: 'קהילה ופרויקטים', en: 'Community & Projects'},
        bgImage: '',
        subItems: [
            {
                id: 601,
                title: {he: 'קהילה ופרויקטים', en: 'Community & Projects'},
                content: {he: '', en: ''},
                images: [],
                pdfs: []
            }
        ]
    }
];