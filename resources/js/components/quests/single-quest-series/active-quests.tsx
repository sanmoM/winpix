import QuestCard from '@/components/shared/QuestCard'
import SectionHeading from '@/components/shared/SectionHeading'
import { Link } from '@inertiajs/react'


export default function ActiveQuests({ title, quests }: { title: string, quests: any[] }) {
    return (
        <div>
            <SectionHeading title={title} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quests.map((quest) => (
                    <Link className='block' href={`/quests/single-quest/${quest.id}`}>
                        <QuestCard key={quest.id} item={quest} />
                    </Link>
                ))}
            </div>
        </div>
    )
}
