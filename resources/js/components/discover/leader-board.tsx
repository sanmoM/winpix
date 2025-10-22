import React from "react";
import Button from "../shared/button";
import SectionHeading from "../shared/SectionHeading";

interface User {
    rank: number;
    name: string;
    score: number;
    followers: number;
    profile: string;
    status: "new" | "up" | "down" | "stable";
}

const mockData: User[] = [
    { rank: 1, name: "Aurora Nova", score: 5890, followers: 125000, profile: "https://placehold.co/40x40/FFD700/000?text=AN", status: "new" },
    { rank: 2, name: "Kaito Genji", score: 5321, followers: 98000, profile: "https://placehold.co/40x40/C0C0C0/000?text=KG", status: "up" },
    { rank: 3, name: "Seraphina Sky", score: 4987, followers: 75000, profile: "https://placehold.co/40x40/CD7F32/000?text=SS", status: "down" },
    { rank: 4, name: "Marcus Tech", score: 4210, followers: 52000, profile: "https://placehold.co/40x40/6B7280/FFF?text=MT", status: "stable" },
    { rank: 5, name: "Elara Code", score: 3950, followers: 45000, profile: "https://placehold.co/40x40/6B7280/FFF?text=EC", status: "up" },
    { rank: 6, name: "Jordan Smith", score: 3105, followers: 32000, profile: "https://placehold.co/40x40/6B7280/FFF?text=JS", status: "stable" },
    { rank: 7, name: "Zoe Designs", score: 2888, followers: 28000, profile: "https://placehold.co/40x40/6B7280/FFF?text=ZD", status: "down" },
    { rank: 8, name: "Finn Pixel", score: 2501, followers: 19000, profile: "https://placehold.co/40x40/6B7280/FFF?text=FP", status: "stable" },
    { rank: 9, name: "Lina Art", score: 2120, followers: 15000, profile: "https://placehold.co/40x40/6B7280/FFF?text=LA", status: "up" },
];

// Utility functions with theme awareness
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

const Leaderboard: React.FC = () => {
    return (
        <div className="w-full  bg-white dark:bg-black rounded-xl shadow-2xl p-6 md:p-8 transition-colors duration-500">
            <SectionHeading title="Global Creators Ranking" />
            <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
                Top performers based on design score and community engagement.
            </p>

            {/* Leaderboard List */}
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4">
                {mockData.map((user) => {
                    const badge = getStatusBadge(user.status);

                    return (
                        <div
                            key={user.rank}
                            className={`rank-item grid grid-cols-[50%_40%] justify-between ${getRankStyle(
                                user.rank
                            )} flex items-center justify-between p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-700 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl`}
                        >
                            {/* Rank & User Info */}
                            <div className="grid grid-cols-[auto_auto_1fr] gap-4 min-w-0">
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
            </div>
        </div>
    );
};

export default Leaderboard;
