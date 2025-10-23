interface User {
    rank: number;
    name: string;
    score: number;
    followers: number;
    profile: string;
    status: "new" | "up" | "down" | "stable";
}

// // Utility functions with theme awareness
const getRankStyle = (rank: number): string => {
    if (rank === 1) return "bg-yellow-100 dark:bg-yellow-900/50 border-l-4 border-yellow-500";
    if (rank === 2) return "bg-gray-200 dark:bg-gray-700/50 border-l-4 border-gray-400";
    if (rank === 3) return "bg-amber-100 dark:bg-amber-900/50 border-l-4 border-amber-700";
    return "bg-gray-100 dark:bg-black/80";
};

const getRankTextColor = (rank: number): string => {
    if (rank === 1)
        return "bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent font-black";
    if (rank === 2) return "text-gray-600 dark:text-gray-300 font-bold";
    if (rank === 3) return "text-orange-500 dark:text-orange-300 font-bold";
    return "text-gray-500 dark:text-gray-400";
};

interface StatusBadge {
    text: string;
    color: string;
}


import SectionHeading from '../shared/SectionHeading';

// --- Icon Components ---
// We define these as separate components to keep the main JSX clean.

const ScoreIcon = () => (
    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    </svg>
);

const GoldStarIcon = () => (
    <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
);

const BronzeShieldIcon = () => (
    <svg className="w-6 h-6 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
    </svg>
);

const podiumData = [
    {
        rank: 2,
        name: 'MariaK',
        followers: '820 Followers',
        score: '8750',
        avatar: 'https://placehold.co/100x100/E0E0E0/707070?text=Rank+2',
        order: 'order-2 md:order-1',
        shadow: 'shadow-[0_0_20px_0_rgba(192,192,192,0.4)]', // silver shadow
        borderColor: `!border-secondary-color/50`,
        medalBg: `bg-primary-color`,
        medalColor: `text-black dark:text-white`,
        medalBorder: `border-black dark:border-white`,
        medalPos: '-top-5 -left-5',
        avatarSize: 'w-24 h-24',
        medalSize: 'w-14 h-14',
        medalText: 'text-2xl',
        cardPadding: 'p-6',
        avatarMargin: '-mt-12',
        scoreIcon: <ScoreIcon />,
        scoreSize: 'text-3xl'
    },
    {
        rank: 1,
        name: 'AlexTheGreat',
        followers: '1.2k Followers',
        score: '9210',
        avatar: 'https://placehold.co/120x120/404040/FFFFFF?text=Rank+1',
        order: 'order-1 md:order-2',
        shadow: 'shadow-[0_0_25px_0_rgba(255,215,0,0.4)]', // gold shadow
        borderColor: `border-secondary-color`,
        medalBg: `bg-secondary-color`,
        medalColor: `text-black dark:text-white`,
        medalBorder: 'border-black dark:border-white',
        medalPos: '-top-7 -left-7',
        avatarSize: 'w-32 h-32',
        medalSize: 'w-16 h-16',
        medalText: 'text-3xl',
        cardPadding: 'p-8',
        avatarMargin: '-mt-16',
        scoreIcon: <GoldStarIcon />,
        scoreSize: 'text-4xl'
    },
    {
        rank: 3,
        name: 'CodeNinja',
        followers: '451 Followers',
        score: '8100',
        avatar: 'https://placehold.co/100x100/F0D9B5/8D6E63?text=Rank+3',
        order: 'order-3 md:order-3',
        shadow: 'shadow-[0_0_15px_0_rgba(205,127,50,0.4)]', // bronze shadow
        borderColor: '!border-black/50 dark:!border-white/50',
        medalBg: 'bg-bg-primary dark:bg-bg-secondary',
        medalColor: 'dark:text-white text-black',
        medalBorder: '!border-black/50 dark:!border-white/50',
        medalPos: '-top-5 -right-5',
        avatarSize: 'w-24 h-24',
        medalSize: 'w-14 h-14',
        medalText: 'text-2xl',
        cardPadding: 'p-6',
        avatarMargin: '-mt-12',
        scoreIcon: <BronzeShieldIcon />,
        scoreSize: 'text-3xl'
    }
];


const mockData: User[] = [
    { rank: 4, name: "Marcus Tech", score: 4210, followers: 52000, profile: "https://placehold.co/40x40/6B7280/FFF?text=MT", status: "stable" },
    { rank: 5, name: "Elara Code", score: 3950, followers: 45000, profile: "https://placehold.co/40x40/6B7280/FFF?text=EC", status: "up" },
    { rank: 6, name: "Jordan Smith", score: 3105, followers: 32000, profile: "https://placehold.co/40x40/6B7280/FFF?text=JS", status: "stable" },
    { rank: 7, name: "Zoe Designs", score: 2888, followers: 28000, profile: "https://placehold.co/40x40/6B7280/FFF?text=ZD", status: "down" },
    { rank: 8, name: "Finn Pixel", score: 2501, followers: 19000, profile: "https://placehold.co/40x40/6B7280/FFF?text=FP", status: "stable" },
    { rank: 9, name: "Lina Art", score: 2120, followers: 15000, profile: "https://placehold.co/40x40/6B7280/FFF?text=LA", status: "up" },
];
// --- Helper Component for Trend ---

const getStatusBadge = (status: User["status"]): StatusBadge => {
    switch (status) {
        case "new":
            return { text: "NEW", color: "bg-blue-200 text-blue-800 dark:bg-blue-600/70 dark:text-blue-100" };
        case "up":
            return { text: "▲ +3", color: "bg-green-200 text-green-800 dark:bg-green-600/70 dark:text-green-100" };
        case "down":
            return { text: "▼ -2", color: "bg-red-200 text-red-800 dark:bg-red-600/70 dark:text-red-100" };
        default:
            return { text: "—", color: "bg-gray-200 text-gray-700 dark:bg-gray-600/70 dark:text-gray-400" };
    }
};

// --- Main App Component ---

export default function App() {
    return (
        <div className="">

            <SectionHeading title='Weekly Champions' className='mb-16 lg:mb-20' />

            {/* --- Podium Section (Top 3) --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-end mb-8 md:mb-16 max-w-4xl mx-auto px-8">
                {podiumData.map((user) => (
                    <div key={user.rank} className={`relative  ${user.order}`}>
                        <div className={`bg-bg-primary dark:bg-bg-primary rounded-xl ${user.cardPadding}  border-2 ${user.borderColor} text-center`}>

                            {/* Avatar */}
                            <img
                                src={user.avatar}
                                alt={`Rank ${user.rank} User`}
                                className={`${user.avatarSize} rounded-full mx-auto ${user.avatarMargin} border-4 border-white shadow-lg`}
                            />

                            {/* Medal */}
                            <div className={`absolute ${user.medalPos} ${user.medalSize} ${user.medalBg} rounded-full flex items-center justify-center ${user.medalText} font-bold ${user.medalColor} shadow-inner border-2 ${user.medalBorder}`}>
                                {user.rank}
                            </div>

                            {/* User Info */}
                            <h3 className={`text-xl font-semibold mt-4 ${user.rank === 1 ? 'text-2xl text-yellow-600' : ''}`}>
                                {user.name}
                            </h3>
                            <p className={`text-sm ${user.rank === 1 ? 'text-md' : ''} text-gray-400`}>
                                {user.followers}
                            </p>

                            {/* Score */}
                            <div className={`mt-4 ${user.rank === 1 ? 'mt-5' : ''} flex items-center justify-center space-x-2`}>
                                {user.scoreIcon}

                                <span className={`${user.scoreSize} font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-color to-secondary-color`}>
                                    {user.score}
                                </span>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* --- Leaderboard List (Ranks 4+) --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {mockData.map((user) => {
                    const badge = getStatusBadge(user.status);

                    return (
                        <div
                            key={user.rank}
                            className={`rank-item grid grid-cols-[70%_28%] justify-between ${getRankStyle(
                                user.rank
                            )} flex items-center justify-between p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl`}
                        >
                            {/* Rank & User Info */}
                            <div className="grid grid-cols-[auto_auto_1fr] items-center gap-4 min-w-0">
                                {/* Rank Number */}
                                <div
                                    className={`w-10 text-center text-lg md:text-xl font-extrabold ${getRankTextColor(
                                        user.rank
                                    )}`}
                                >
                                    {user.rank}
                                </div>

                                {/* Avatar */}
                                <img
                                    src={user.profile}
                                    alt={`${user.name}'s avatar`}
                                    className={`w-10 h-10 rounded-full object-cover ring-2 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-800 ${user.rank === 1 ? "ring-yellow-500" : "ring-gray-400 dark:ring-gray-600"
                                        }`}
                                />

                                {/* Name + Followers */}
                                <div className="flex flex-col md:flex-row md:items-center md:space-x-3 truncate">
                                    <span className="text-gray-900 dark:text-white font-semibold truncate">
                                        {user.name}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm truncate">
                                        {user.followers.toLocaleString()} Followers
                                    </span>
                                </div>
                            </div>

                            {/* Score + Status */}
                            <div className="flex items-center justify-between flex-shrink-0">
                                <span
                                    className={`hidden md:inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${badge.color}`}
                                >
                                    {badge.text}
                                </span>
                                <div className="text-right">
                                    <span className="text-xl font-extrabold text-green-600 dark:text-green-400">
                                        {user.score.toLocaleString() + " "}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 hidden md:inline">
                                        PTS
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div >

        </div >
    );
}
