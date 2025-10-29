interface TimelineItemProps {
    year: string;
    title: string;
    description: string;
    alignment: 'left' | 'right';
}

const TimelineItem = ({
    year,
    title,
    description,
    alignment,
}: TimelineItemProps) => (
    <div
        className={`relative flex w-full items-center ${alignment === 'left' ? 'justify-start' : 'justify-end'
            }`}
    >
        <div
            className={`relative w-full px-6 py-4 sm:w-1/2 ${alignment === 'left' ? 'sm:pr-12' : 'sm:pl-12'
                }`}
        >
            {/* Arrow */}
            <div
                aria-hidden="true"
                className={`absolute top-6 hidden h-3 w-3 rotate-45 bg-slate-800 sm:block ${alignment === 'left'
                    ? 'right-[22px] -mr-0'
                    : 'left-[22px] -ml-0'
                    }`}
            />
            {/* Dot */}
            <div
                aria-hidden="true"
                className={`absolute left-1/2 top-6 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-slate-900 bg-cyan-500 ${alignment === 'left'
                    ? 'sm:left-auto sm:right-0 sm:translate-x-1/2'
                    : 'sm:left-0 sm:-translate-x-1/2'
                    }`}
            />
            {/* Content */}
            <div className="rounded-lg bg-slate-800 p-6 shadow-lg">
                <span className="text-sm font-semibold text-cyan-400">{year}</span>
                <h3 className="mt-1 mb-2 text-xl font-bold text-white">{title}</h3>
                <p className="text-slate-400">{description}</p>
            </div>
        </div>
    </div>
);

export default TimelineItem;