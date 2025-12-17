import UserLayout from '@/layouts/user-layout';
import { router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

// ---------- Type Definitions ----------
interface Rank {
    title: string;
    min_level: number;
    max_level: number;
}

interface User {
    id: number;
    name: string;
    level: number;
    votes_cast: number;
    role: 'user' | 'jury';
}

interface PageProps {
    auth: {
        user: User;
    };
    allRanks: Rank[];
    userRank: Rank;
    [key: string]: unknown;
}

// ---------- Component ----------
export default function DemoRanking() {
    const { auth, allRanks, userRank } = usePage<PageProps>().props;
    const user = auth.user;

    // Calculate next rank and progress percentage
    const nextRank = allRanks.find(
        (r) => r.min_level === userRank.max_level + 1,
    );
    const progress =
        ((user.level - userRank.min_level) /
            (userRank.max_level - userRank.min_level)) *
        100;

    // Trigger backend action
    const handleAction = (routeName: string) => {
        router.post(
            route(routeName),
            {},
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <UserLayout>
            <div className="mx-auto max-w-4xl space-y-8 py-10">
                <h1 className="text-3xl font-bold">🏆 User Ranking System</h1>

                {/* USER CARD */}
                <div className="rounded bg-white p-6 shadow">
                    <h2 className="mb-4 text-xl font-semibold">
                        Your Progress
                    </h2>

                    <div className="space-y-2">
                        <p>
                            <strong>Name:</strong> {user.name}
                        </p>
                        <p>
                            <strong>Level:</strong> {user.level}
                        </p>
                        <p>
                            <strong>Votes Cast:</strong> {user.votes_cast}
                        </p>
                        <p>
                            <strong>Current Rank:</strong>{' '}
                            {userRank?.title || 'Unranked'}
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                        <p className="text-sm text-gray-600">
                            Progress to next rank:{' '}
                            {nextRank?.title || 'Max Rank'}
                        </p>
                        <div className="mt-1 h-3 w-full rounded bg-gray-300">
                            <div
                                className="h-3 rounded bg-blue-600 transition-all"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={() => handleAction('ranking.join')}
                        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                        Join Contest (+2)
                    </button>
                    <button
                        onClick={() => handleAction('ranking.win')}
                        className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                        Win Contest (+5)
                    </button>
                    <button
                        onClick={() => handleAction('ranking.vote')}
                        className="rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                    >
                        Cast 50 Votes
                    </button>
                </div>

                {/* ALL RANKS TABLE */}
                <div className="rounded bg-gray-100 p-6">
                    <h2 className="mb-4 text-lg font-semibold">All Ranks</h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="border p-2">Rank</th>
                                <th className="border p-2">Level Range</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allRanks.map((rank) => (
                                <tr
                                    key={rank.title}
                                    className={
                                        userRank?.title === rank.title
                                            ? 'bg-blue-100'
                                            : ''
                                    }
                                >
                                    <td className="border p-2">{rank.title}</td>
                                    <td className="border p-2">
                                        {rank.min_level} - {rank.max_level}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </UserLayout>
    );
}
