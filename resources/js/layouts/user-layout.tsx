import Footer from '@/components/root/footer';
import Navbar from '@/components/root/navbar/navbar';
import RedeemModalContents from '@/components/root/redeem-modal-contents';
import Modal from '@/components/shared/modal';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = usePage().props.auth.user;
    const [isOpen, setIsOpen] = useState(user && !user.isRedeemed);
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <RedeemModalContents setIsOpen={setIsOpen} />
            </Modal>
        </div>
    );
}
