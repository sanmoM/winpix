import SectionHeading from '@/components/shared/SectionHeading'
import QuestCard from '../shared/quest-card'

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

export default function Quests() {
    return (
        <div>
            <div className="mb-12">
                <SectionHeading title="Active Quests" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {questsData.map((quest) => (
                    <QuestCard key={quest.id} quest={quest} />
                ))}
            </div>
        </div>
    )
}
