import Button from '@/components/shared/buttons/button';
import { cn } from '@/lib/utils';

export default function RedeemCard({
    src,
    imgClassName,
    title,
    description,
}: {
    src: string;
    imgClassName?: string;
    title: string;
    description: string;
}) {
    return (
        <div className="rounded-lg border bg-bg-primary p-4 dark:bg-[#0B1120]">
            <img
                src={'/storage/' + src}
                alt="redeem"
                className={cn(`mx-auto mb-3 w-[75%]`, imgClassName)}
            />
            <h1 className="mb-2 !text-center text-sm text-gray-400">X200</h1>
            <Button
                text="200"
                hasIcon={true}
                src="/images/golden-coin.png"
                className="mx-auto px-6 py-2"
            />
        </div>
    );
}
