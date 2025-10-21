import Footer from "@/components/root/footer";
import Navbar from "@/components/root/navbar/navbar";

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
