import { cn } from "@/lib/utils";

export default function RedeemCard({ src, imgClassName }: { src: string, imgClassName?: string }) {
    return (
        <div className="border p-4 bg-bg-primary dark:bg-[#0B1120] rounded-lg">
            <img src={src} alt="redeem" className={cn(`w-[85%] mx-auto mb-3`, imgClassName)} />
            <h1 className="text-center text-sm text-gray-400 mb-2">X200</h1>

            <button className={"px-6 py-2 text-sm font-semibold !text-white rounded-full transition cursor-pointer duration-150 ease-in-out bg-gradient-to-r bg-[linear-gradient(45deg,var(--color-primary-color),var(--color-secondary-color))] flex items-center gap-2 mx-auto"}>
                <p>200</p><img src="/images/golden-coin.png" alt="" className="w-4 h-4" />
            </button>
        </div>
    )
}
