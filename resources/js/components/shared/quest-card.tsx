import Button from '@/components/shared/buttons/button'
import { Link } from '@inertiajs/react'
import { Clock } from "lucide-react"

interface Quest {
    id: number
    title: string
    category: string
    timeLeft: string
    reward: number
    currency: string
    participants: number
    image: string
}

interface QuestCardProps {
    quest: Quest
    href?: string
}

function QuestCard({ quest, href }: QuestCardProps) {
    return (
        <Link
            href={href || `/single-quest/1`}
            className="group cursor-pointer relative overflow-hidden rounded-2xl bg-bg-primary dark:bg-bg-primary border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:border-accent"
        >
            <div className="relative h-56 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img
                    src={quest.image || "/placeholder.svg"}
                    alt={quest.title}
                    className="object-cover transition-transform duration-300 w-full group-hover:scale-110 h-full"
                />

                {/* Time Left Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/50 dark:bg-black/50 backdrop-blur-[2px] px-3 py-1.5 rounded-full">
                    <Clock className="w-4 h-4 text-black dark:text-white" />
                    <span className="text-xs font-semibold">{quest.timeLeft}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-white/50 dark:bg-black/50 backdrop-blur-[2px] text-accent-foreground text-xs font-medium">
                    #{quest.category}
                </div>
            </div>

            <div className="relative p-4 flex flex-col h-full">
                {/* Title */}
                <div className='flex justify-between items-start mb-4'>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2  transition-colors">
                        {quest.title}
                    </h3>
                    <div className="flex gap-2 items-center">
                        <img src="/images/coin.png" alt="star" className="w-4 " />
                        <span>200</span>
                    </div>
                </div>
                <Button className="w-fit mx-auto px-8 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold transition-all duration-300 group-hover:shadow-lg" text='Submit Quest' />
            </div>
        </Link>
    );
}

export default QuestCard;