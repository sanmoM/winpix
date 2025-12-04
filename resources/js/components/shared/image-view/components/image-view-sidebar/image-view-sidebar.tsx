import Button from "@/components/shared/buttons/button";
import QuestItem from "./components/quest-item";
import { FaTrophy } from "react-icons/fa";

const ImageViewSidebar = ({ data }: any) => {

    return (
        <aside className="w-full lg:h-full bg-bg-primary p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={data?.user?.image ? "/storage/" + data?.user?.image : "/images/user-avatar.png"}
                        alt="User Avatar"
                        className="h-10 w-10 rounded-full"
                    />
                    <div>
                        <h1 className="font-semibold">{data?.user?.name}</h1>
                        <span className="text-sm text-gray-400">{data?.user?.level}</span>
                    </div>
                </div>
                {/* <Button text="Follow" className="px-6 py-1.5 mx-0" /> */}
            </div>

            {/* Award */}
            <div className="mb-8 rounded-lg border p-4 mt-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary-color rounded-full">
                        <FaTrophy className="text-white text-3xl" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold">NO. 1</h2>
                        <span className="text-sm text-gray-400">+1</span>
                    </div>
                </div>
            </div>

            {/* Quest History */}
            <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Quest History
                </h3>
                <ul className="space-y-3">
                    <QuestItem
                        rank="NO.1"
                        title="'Urban' Wednesday"
                        date="Oct 27"
                    />
                    <QuestItem
                        rank="NO.14"
                        title="Night City Vibe"
                        date="Oct 23"
                    />
                </ul>
            </div>
        </aside>
    )
};


export default ImageViewSidebar;

const HeartIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

const ShareIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
);

const MoreHorizontalIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <circle cx="12" cy="12" r="1" />
        <circle cx="19" cy="12" r="1" />
        <circle cx="5" cy="12" r="1" />
    </svg>
);

const TrophyIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V22h4v-7.34" />
        <path d="M12 17.5v-3.5" />
        <path d="M10 9h.01" />
        <path d="M14 9h.01" />
        <path d="M12 6a4 4 0 0 0-4 4v0a4 4 0 0 0 4 4v0a4 4 0 0 0 4-4v0a4 4 0 0 0-4-4z" />
    </svg>
);