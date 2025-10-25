import { cn } from '@/lib/utils'

export default function Button({ text, className, hasIcon, src }: { text: string, className?: string, hasIcon?: boolean, src?: string }) {
    return (
        <button className={cn("px-4 py-2 text-sm font-semibold !text-white hover:scale-105 duration-300 rounded-full transition cursor-pointer ease-in-out bg-gradient-to-r bg-[linear-gradient(45deg,var(--color-primary-color),var(--color-secondary-color))]  flex items-center gap-2 mx-auto", className)}>
            {text}
            {hasIcon && <img src={src} alt="" className="w-4 h-4" />}
        </button>
    )
}
