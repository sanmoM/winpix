import { Award, Trash2 } from 'lucide-react'

export default function SinglePrize({ prize, prizePools, removePrize, hasRemove = true }: any) {
    return (
        <div key={prize.prizeId} className="prize-card bg-bg-primary p-4 rounded-xl border flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-purple-400">{prize.title}</span>
                <Award className="w-5 h-5 text-yellow-500" />
            </div>
            <div className="flex flex-col items-center justify-center space-x-2">
                <span className="text-3xl font-extrabold">{prize.coin}</span>
                <span className="text-xl text-gray-600 dark:text-gray-200 capitalize">{prizePools.find((pool: any) => pool.value === prize?.prize_pool)?.label}</span>
            </div>
            {
                hasRemove && (
                    <div className="mt-4 flex justify-between">
                        <button
                            type="button"
                            onClick={() => removePrize(prize.prizeId)}
                            className="px-4 py-2 text-xs mx-auto text-red-400 border border-red-500 rounded-lg flex items-center"
                        >
                            <Trash2 className="w-3 h-3 mr-1" /> Remove
                        </button>
                    </div>
                )
            }
        </div>
    )
}
