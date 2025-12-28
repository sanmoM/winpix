import Button from '@/components/shared/buttons/button';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

export default function RedeemCard({
    src,
    imgClassName,
    name,
    number_of_coin,
    price,
}: {
    src: string;
    imgClassName?: string;
    name?: string;
    number_of_coin?: string;
    price: number;
}) {
    return (
        <div className="rounded-lg border bg-bg-primary p-4 dark:bg-[#0B1120]">
            <img
                src={'/storage/' + src}
                alt="redeem"
                className={cn(`mx-auto mb-3 w-[75%]`, imgClassName)}
            />
            {name && (
                <h1 className="mb-2 !text-center text-sm text-gray-600">
                    {name}
                </h1>
            )}
            {number_of_coin && (
                <h1 className="mb-2 !text-center text-sm text-gray-600">
                    X{number_of_coin}
                </h1>
            )}

            <Link href="/redeem">
                <Button
                    text={price.toString()}
                    hasIcon={true}
                    src="/images/golden-coin.png"
                    className="mx-auto px-6 py-2"
                />
            </Link>
        </div>
    );
}
