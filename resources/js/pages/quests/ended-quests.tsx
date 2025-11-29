import Card from '@/components/shared/card';
import Container from '@/components/shared/container';
import Tab from '@/components/shared/tab';
import useLocales from '@/hooks/useLocales';
import UserLayout from '@/layouts/user-layout';
import { Link } from '@inertiajs/react';
import { useState } from 'react';
const questsData = [
    {
        id: 1,
        title: "Fine Art Tuesday",
        category: "Fine Art",
        timeLeft: "4",
        reward: 120,
        currency: "USD",
        participants: 1247,
        image: "/images/banner-1.jpg",
    },
    {
        id: 2,
        title: "Photography Challenge",
        category: "Photography",
        timeLeft: "2",
        reward: 150,
        currency: "USD",
        participants: 892,
        image: "/images/banner-2.jpg",
    },
    {
        id: 3,
        title: "Design Sprint",
        category: "Design",
        timeLeft: "6",
        reward: 200,
        currency: "USD",
        participants: 2156,
        image: "/images/banner-3.jpg",
    },
    {
        id: 2,
        title: "Photography Challenge",
        category: "Photography",
        timeLeft: "2",
        reward: 150,
        currency: "USD",
        participants: 892,
        image: "/images/banner-4.jpg",
    },
    {
        id: 3,
        title: "Design Sprint",
        category: "Design",
        timeLeft: "6",
        reward: 200,
        currency: "USD",
        participants: 2156,
        image: "/images/banner-1.jpg",
    },
]


export default function EndedQuests({ myQuests, recentlyEnded, inactiveSeries }: any) {
    const { t } = useLocales()
    const [activeTab, setActiveTab] = useState("my-quests");
    return (
        <UserLayout>
            <Container className="space-y-4 md:space-y-6 lg:space-y-10 my-10 md:my-16 lg:my-12">
                <Tab
                    options={[
                        { label: t('endedQuests.tab.myQuests'), value: "my-quests" },
                        { label: t('endedQuests.tab.ended'), value: "ended" },
                        { label: t('endedQuests.tab.inactive'), value: "inactive" },
                    ]}
                    value={activeTab}
                    onChange={(val) => setActiveTab(val)}

                />
                {
                    activeTab === "my-quests" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {myQuests.map((quest) => (

                                <Link href={`/quests/single-quest/${quest.id}`} className='block'>
                                    <Card key={quest.id} item={quest} />
                                </Link>
                            ))}
                        </div>
                    )
                }
                {
                    activeTab === "ended" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {recentlyEnded.map((quest) => (
                                <Link href={`/quests/single-quest/${quest.id}`} className='block'>
                                    <Card key={quest.id} item={quest} />
                                </Link>
                            ))}
                        </div>
                    )
                }
                {
                    activeTab === "inactive" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {inactiveSeries.map((quest) => (
                                <Link href={`/quests/single-quest-series/${quest.id}`} className='block'>
                                    <Card key={quest.id} item={quest} isSeries={true} />
                                </Link>
                            ))}
                        </div>
                    )
                }
            </Container>
        </UserLayout>
    )
}
