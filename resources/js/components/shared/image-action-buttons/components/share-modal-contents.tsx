import { Info } from 'lucide-react';
import PillButton from '../../buttons/pill-button';
import Logo from '../../logo';
import toast from 'react-hot-toast';

export default function ShareModalContents({ data }) {
    const handleCopyLink = () => {
        navigator.clipboard.writeText(`${import.meta.env.VITE_CLIENT_URL}/image-view/${data?.id}`)
        toast.success('Link copied to clipboard!')
    }

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `${import.meta.env.VITE_CLIENT_URL}/storage/${data?.image}`;
        link.download = `${data?.user?.name}-image.jpg`;
        document.body.appendChild(link);  // IMPORTANT for mobile
        link.click();
        document.body.removeChild(link);
    }
    return (
        <div>
            {/* Preview Card */}
            <div className="w-full h-48 rounded-xl overflow-hidden shadow-md flex mb-8 relative">
                {/* Left Side: Brand & User Info */}
                <div className="w-full h-full z-10 absolute bg-black/30 p-4 flex flex-col justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-1.5 opacity-90">
                        <Logo className='lg:w-10' />
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-2 mt-auto">
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-white/30">
                            <img
                                src={data?.user?.image ? "/storage/" + data?.user?.image : "/images/user-avatar.png"}
                                alt="User avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-white text-xs font-bold tracking-tight">{data?.user?.name}</span>
                    </div>
                </div>

                {/* Right Side: Content Image */}
                <div className="relative w-full">
                    <img
                        src={"/storage/" + data?.image}
                        alt="Preview content"
                        className="w-full h-full object-cover"
                    />
                    {/* Subtle overlay gradient to match the warmth of the original image */}
                    <div className="absolute inset-0 bg-amber-900/10 mix-blend-overlay"></div>
                </div>
            </div>

            {/* Subtitle / Info */}
            <div className="flex items-center justify-center gap-1.5 text-gray-500 mb-5">
                <span className="text-sm font-medium">Share and earn Pixels</span>
                <Info size={16} className="text-gray-400" />
            </div>

            {/* Action Buttons Row */}
            <div className="grid grid-cols-2 gap-3 w-full mb-4">
                <PillButton
                    onClick={handleDownload}
                    label="Download"
                    className='bg-primary-color w-full !text-center hover:bg-background block mx-auto px-10 hover:border-primary-color border-1'
                />
                <PillButton
                    onClick={handleCopyLink}
                    label="Copy Link"
                    className='bg-primary-color w-full !text-center hover:bg-background block mx-auto px-10 hover:border-primary-color border-1'
                />
            </div>
        </div>
    )
}
