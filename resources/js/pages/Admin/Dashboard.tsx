import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
);

const breadcrumbs = [
    {
        title: 'Admin Dashboard',
        href: 'admin/dashboard',
    },
];

export default function Dashboard() {
    const { stats, visitorChart } = usePage().props;

    const barData = {
        labels: ['Users', 'Quests'],
        datasets: [
            {
                label: 'Counts',
                data: [stats.users, stats.quests],
                backgroundColor: ['rgba(54, 162, 235, 0.6)'],
            },
        ],
    };

    const visitorData = {
        labels: visitorChart.labels,
        datasets: [
            {
                label: 'Monthly Visitors',
                data: visitorChart.data,
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Top 4 cards */}
                <div className="grid gap-3 md:grid-cols-4">
                    <div className="relative aspect-video rounded-xl border p-4">
                        <h2 className="text-lg font-semibold">Total Users</h2>
                        <p className="mt-3 text-3xl font-bold">{stats.users}</p>
                    </div>

                    <div className="relative aspect-video rounded-xl border p-4">
                        <h2 className="text-lg font-semibold">Total Quests</h2>
                        <p className="mt-3 text-3xl font-bold">
                            {stats.quests}
                        </p>
                    </div>

                    <div className="relative aspect-video rounded-xl border p-4">
                        <Bar data={barData} />
                    </div>

                    <div className="relative aspect-video rounded-xl border p-4">
                        <Line data={visitorData} />
                    </div>
                </div>

                {/* Main big chart area */}
                <div className="relative min-h-[400px] rounded-xl border p-6">
                    <h2 className="mb-4 text-xl font-semibold">
                        Visitors Overview
                    </h2>
                    <Line data={visitorData} height={100} />
                </div>
            </div>
        </AppLayout>
    );
}
