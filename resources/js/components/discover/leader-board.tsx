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


import { Link } from '@inertiajs/react';
import SectionHeading from '../shared/SectionHeading';
import TopPositions from '../shared/top-positions';

// --- Icon Components ---
// We define these as separate components to keep the main JSX clean.




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

export default function App({ t, data }: any) {
    return (
        <div className="">

            <SectionHeading title={t('discover.leaderboard.title')} className='mb-16 lg:mb-20' />

            {/* --- Podium Section (Top 3) --- */}
            <TopPositions topPositions={data?.slice(0, 3)} />

            {/* --- Leaderboard List (Ranks 4+) --- */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {data?.slice(3, 9).map((user, index) => {
                    const badge = getStatusBadge(user.status);

                    return (
                        <Link
                            href={"/profile/1"}
                            key={mockData[index].rank}
                            className={`rank-item grid grid-cols-[70%_28%] justify-between ${getRankStyle(
                                mockData[index].rank
                            )} flex items-center justify-between p-4 rounded-lg border transition-all duration-300`}
                        >
                            <div className="grid grid-cols-[auto_auto_1fr] items-center gap-4 min-w-0">
                                <div
                                    className={`w-10 !text-center text-lg md:text-xl font-extrabold ${getRankTextColor(
                                        mockData[index].rank
                                    )}`}
                                >
                                    {mockData[index].rank}
                                </div>

                                <img
                                    src={user?.image ? "/storage/" + user?.image : mockData[index].profile}
                                    alt={`${user.name}'s avatar`}
                                    className={`w-10 h-10 rounded-full object-cover ring-2 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-800 ${user.rank === 1 ? "ring-yellow-500" : "ring-gray-400 dark:ring-gray-600"
                                        }`}
                                />

                                <div className="flex flex-col md:flex-row md:items-center md:space-x-3 truncate">
                                    <span className="text-gray-900 dark:text-white font-semibold truncate">
                                        {user.name}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400 text-sm truncate">
                                        {user.followers?.length.toLocaleString()} {t('shared.followers')}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between flex-shrink-0">
                                <span
                                    className={`hidden md:inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${badge.color}`}
                                >
                                    {badge.text}
                                </span>
                                <div className="text-right">
                                    <span className="text-xl font-extrabold text-green-600 dark:text-green-400">
                                        {user.level}
                                    </span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 hidden md:inline">
                                        {t('discover.leaderboard.points')}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div > */}

        </div >
    );
}
