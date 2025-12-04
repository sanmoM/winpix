
interface QuestItemProps {
    rank: string;
    title: string;
    date: string;
}

const QuestItem = ({ rank, title, date }: QuestItemProps) => (
    <li className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
            <span className="w-10 flex-shrink-0 text-left font-medium text-gray-400">
                {rank}
            </span>
            {/* <a
                href="#"
                className="flex items-center gap-1.5  transition-colors hover:text-primary-color"
            > */}
            {title}
            {/* <ArrowUpRightIcon className="h-4 w-4" /> */}
            {/* </a> */}
        </div>
        <span className="text-gray-500">{date}</span>
    </li>
);

export default QuestItem;


const ArrowUpRightIcon = ({ className }: { className?: string }) => (
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
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
    </svg>
);