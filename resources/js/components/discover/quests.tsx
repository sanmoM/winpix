import SectionHeading from '@/components/shared/SectionHeading'
import { Link } from '@inertiajs/react'
import Card from '../shared/card/card'

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

export default function Quests({ t, quests }) {
    return (
        <div>
            <div className="mb-12">
                <SectionHeading title={t('discover.activeQuests.title')} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quests.map((quest) => (
                    <Link href={`/quests/single-quest/${quest.id}`}>
                        <Card key={quest.id} item={
                            {
                                ...quest,
                                id: quest.id,
                                brief: quest.brief,
                                category: quest.category,
                                reward: quest.entry_coin,
                                participants: quest.user.name,
                                image: quest.image,
                                entry_coin: quest.entry_coin,
                                user: quest.user,
                            }
                        } />
                    </Link>
                ))}
            </div>
        </div>
    )
}
