import Footer from '@/components/root/footer';
import Navbar from '@/components/root/navbar/navbar';
import { Toaster } from 'react-hot-toast';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Navbar />
            {children}
            <Toaster />
            <Footer />
        </div>
    );
}
