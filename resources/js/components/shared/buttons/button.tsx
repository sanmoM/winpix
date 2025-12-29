import { cn } from '@/lib/utils'
import { TbLoader2 } from 'react-icons/tb'

export default function Button({ text, className, hasIcon, src, onClick, type = "submit", loading = false, disabled = false }: any) {
    console.log(loading)
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={cn(" disabled:cursor-not-allowed px-4 py-2 text-sm font-semibold !text-white hover:scale-105 duration-300 rounded-full transition cursor-pointer ease-in-out bg-gradient-to-r bg-[linear-gradient(45deg,var(--color-primary-color),var(--color-secondary-color))]  flex items-center justify-center gap-2 mx-auto", className)}>
            {
                loading ? (
                    <TbLoader2 className="w-6 h-6 animate-spin" />
                ) : (
                    <>
                        {text}
                        {hasIcon && <img src={src} alt="" className="w-4 h-4" />}
                    </>
                )
            }

        </button>
    )
}
