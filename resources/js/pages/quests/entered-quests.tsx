import Card from '@/components/shared/card/card'
import Container from '@/components/shared/container'
import NoData from '@/components/shared/no-data'
import SectionHeading from '@/components/shared/SectionHeading'
import useLocales from '@/hooks/useLocales'
import UserLayout from '@/layouts/user-layout'
import { Link } from '@inertiajs/react'


export default function QuestsSeries({ enteredQuests }: any) {
    const { t } = useLocales()
    return (
        <UserLayout>
            <Container className="space-y-14 md:space-y-20 lg:space-y-28 my-10 md:my-16 lg:my-12">
                {
                    enteredQuests.length > 0 ? (
                        <>
                            <SectionHeading title={t('enteredQuests.title')} />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {enteredQuests.map((joinedQuest) => (
                                    <Link href={`/quests/single-quest/${joinedQuest?.quest?.id}`} className='block'>
                                        <Card key={joinedQuest.id}
                                            item={
                                                {
                                                    ...joinedQuest?.quest,
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
                        </>
                    ) : (
                        <NoData text='You have not joined any quests yet.' />
                    )
                }
            </Container>
        </UserLayout>
    )
}
