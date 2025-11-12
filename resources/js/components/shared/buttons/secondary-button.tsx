import { cn } from '@/lib/utils'

export default function SecondaryButton({ text, className }: any) {
    return (
        <button className={cn("bg-white !text-center text-black text-sm font-semibold rounded-full transition cursor-pointer w-32 py-2 md:py-3 btn duration-300 hover:scale-105 ease-in-out", className)}>
            {text}
        </button>
    )
}
