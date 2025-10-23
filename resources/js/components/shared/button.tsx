import { cn } from '@/lib/utils'

export default function Button({ text, className }:{ text: string, className?: string }) {
    return (
        <button className={cn("px-4 py-2 text-sm font-semibold !text-white hover:scale-105 duration-300 rounded-full transition cursor-pointer ease-in-out bg-gradient-to-r bg-[linear-gradient(45deg,var(--color-primary-color),var(--color-secondary-color))]", className)}>{text}</button>
    )
}
