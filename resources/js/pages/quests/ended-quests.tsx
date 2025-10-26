import Container from '@/components/shared/container';
import QuestCard from '@/components/shared/quest-card';
import Tab from '@/components/shared/tab';
import UserLayout from '@/layouts/user-layout';
import { useState } from 'react';
const questsData = [
    {
        id: 1,
        title: "Fine Art Tuesday",
        category: "Fine Art",
        timeLeft: "4 days",
        reward: 120,
        currency: "USD",
        participants: 1247,
        image: "/images/banner-1.jpg",
    },
    {
        id: 2,
        title: "Photography Challenge",
        category: "Photography",
        timeLeft: "2 days",
        reward: 150,
        currency: "USD",
        participants: 892,
        image: "/images/banner-2.jpg",
    },
    {
        id: 3,
        title: "Design Sprint",
        category: "Design",
        timeLeft: "6 days",
        reward: 200,
        currency: "USD",
        participants: 2156,
        image: "/images/banner-3.jpg",
    },
    {
        id: 2,
        title: "Photography Challenge",
        category: "Photography",
        timeLeft: "2 days",
        reward: 150,
        currency: "USD",
        participants: 892,
        image: "/images/banner-4.jpg",
    },
    {
        id: 3,
        title: "Design Sprint",
        category: "Design",
        timeLeft: "6 days",
        reward: 200,
        currency: "USD",
        participants: 2156,
        image: "/images/banner-1.jpg",
    },
]


export default function EndedQuests() {
    const [activeTab, setActiveTab] = useState("brief");
    return (
        <UserLayout>
            <Container className="space-y-4 md:space-y-6 lg:space-y-10 my-10 md:my-16 lg:my-12">
                <Tab
                    options={[
                        { label: "My Quests", value: "my-quests" },
                        { label: "Ended", value: "ended" },
                        { label: "Inactive", value: "inactive" },
                    ]}
                    value={activeTab}
                    onChange={(val) => setActiveTab(val)}

                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {questsData.map((quest) => (
                        <QuestCard key={quest.id} quest={quest} href='/quests/single-quest-series' />
                    ))}
                </div>
            </Container>
        </UserLayout>
    )
}
