import QuestCard from '@/components/home/newest/components/PhotoCard'
import QuestSubmitCard from '@/components/shared/quest-card'
import SectionHeading from '@/components/shared/SectionHeading'
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


export default function QuestsSeries({ title, quests }: { title: string, quests: any[] }) {
    return (
        <div>
            <SectionHeading title={title} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {quests.map((quest) => (
                    // <QuestSubmitCard key={quest.id} quest={quest} href='/quests/single-quest-series' />
                    <QuestCard key={quest.id} item={quest}  />
                ))}
            </div>
        </div>
    )
}
