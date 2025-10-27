import Button from "@/components/shared/buttons/button";
import { cn } from "@/lib/utils";

export default function RedeemCard({ src, imgClassName }: { src: string, imgClassName?: string }) {
    return (
        <div className="border p-4 bg-bg-primary dark:bg-[#0B1120] rounded-lg">
            <img src={src} alt="redeem" className={cn(`w-[75%] mx-auto mb-3`, imgClassName)} />
            <h1 className="!text-center text-sm text-gray-400 mb-2">X200</h1>
            <Button text="200" hasIcon={true} src="/images/golden-coin.png" className="mx-auto px-6 py-2" />
        </div>
    )
}
