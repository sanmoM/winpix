import Card from '@/components/home/newest/components/Card'
import Container from '@/components/shared/container'
import QuestSubmitCard from '@/components/shared/quest-card'
import SectionHeading from '@/components/shared/SectionHeading'
import useLocales from '@/hooks/useLocales'
import UserLayout from '@/layouts/user-layout'
import { Link } from '@inertiajs/react'
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


export default function QuestsSeries({ enteredQuests }: any) {
    const { t } = useLocales()
    return (
        <UserLayout>
            <Container className="space-y-14 md:space-y-20 lg:space-y-28 my-10 md:my-16 lg:my-12">
                <SectionHeading title={t('enteredQuests.title')} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {enteredQuests.map((joinedQuest) => (
                        <Link href={`/quests/single-quest/${joinedQuest?.quest?.id}`} className='block'>
                            <Card key={joinedQuest.id}
                                item={
                                    {
                                        title: joinedQuest?.quest?.title,
                                        category: joinedQuest?.quest?.category,
                                        image: joinedQuest?.quest?.image,
                                        user: joinedQuest?.quest?.user,
                                        entry_coin: joinedQuest?.quest?.entry_coin,
                                    }
                                }
                            />
                        </Link>

                    ))}
                </div>
            </Container>
        </UserLayout>
    )
}
