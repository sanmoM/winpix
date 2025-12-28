import Button from '@/components/shared/buttons/button';
import Modal from '@/components/shared/modal';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import NotEnoughCoinModal from './not-enough-coin-modal';
import RedeemModal from './redeem-modal';
import { usePage } from '@inertiajs/react';

export default function RedeemCard({
    src,
    imgClassName,
    name,
    number_of_coin,
    price,
    type,
}: {
    src: string;
    imgClassName?: string;
    name?: string;
    number_of_coin?: string;
    price: number;
    type: string;
}) {
    const [reddemModalOpen, setReddemModalOpen] = useState(false);
    const [notEnoughCoinModalOpen, setNotEnoughCoinModalOpen] = useState(false);
    const user = usePage().props.auth.user;
    return (
        <div className="rounded-lg border bg-bg-primary p-4 dark:bg-[#0B1120]">
            <img
                src={'/storage/' + src}
                alt="redeem"
                className={cn(`mx-auto mb-3 w-[75%]`, imgClassName)}
            />
            {name && (
                <h1 className="mb-2 !text-center text-sm ">
                    {name}
                </h1>
            )}
            {number_of_coin && (
                <h1 className="mb-2 !text-center text-sm ">
                    X{number_of_coin}
                </h1>
            )}

            {/* <Link href="/redeem"> */}
            <Button
                onClick={() => {
                    console.log(user)
                    if (user && user.coin < price) {
                        setNotEnoughCoinModalOpen(true);
                    } else {
                        setReddemModalOpen(true);
                    }
                }}
                text={price.toString()}
                hasIcon={true}
                src="/images/golden-coin.png"
                className="mx-auto px-6 py-2"
            />
            {/* </Link> */}
            <Modal
                isOpen={reddemModalOpen}
                onClose={() => setReddemModalOpen(false)}
            >
                <RedeemModal image={'/storage/' + src} quantity={number_of_coin} type={type} />
            </Modal>
            <Modal
                isOpen={notEnoughCoinModalOpen}
                onClose={() => setNotEnoughCoinModalOpen(false)}
                containerClassName='max-w-lg'
            >
                <NotEnoughCoinModal quantity={number_of_coin} onClose={() => setNotEnoughCoinModalOpen(false)} />
            </Modal>
        </div>
    );
}
