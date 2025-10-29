import TimelineItem from "./components/timeline-item";

// --- Story Section (Timeline) ---
const OurStory = () => (
    <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-16 text-center text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Our Story
        </h2>
        {/* Timeline Container */}
        <div className="relative">
            {/* Center Line */}
            <div
                className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-slate-700"
                aria-hidden="true"
            />

            {/* Timeline Items */}
            <div className="relative flex flex-col gap-12">
                <TimelineItem
                    year="2018"
                    title="The Spark"
                    description="Our founders met at a hackathon and realized their shared passion for solving complex problems."
                    alignment="left"
                />
                <TimelineItem
                    year="2019"
                    title="Company Founded"
                    description="From a garage startup to a real office, our journey officially began."
                    alignment="right"
                />
                <TimelineItem
                    year="2021"
                    title="First Major Product"
                    description="Launched 'Synergy', our flagship product, to critical acclaim and 10,000 active users."
                    alignment="left"
                />
                <TimelineItem
                    year="2023"
                    title="Global Expansion"
                    description="Opened our first international office and welcomed our 100th team member."
                    alignment="right"
                />
            </div>
        </div>
    </div>
);

export default OurStory;