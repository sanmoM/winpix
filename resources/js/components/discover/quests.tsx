import SectionHeading from '@/components/shared/SectionHeading'
import { Link } from '@inertiajs/react'
import Card from '../shared/card/card'

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
