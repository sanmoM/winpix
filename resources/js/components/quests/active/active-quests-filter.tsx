import Container from '@/components/shared/container';
import React, { useState } from 'react';

// --- SVG Icons as React Components ---

const CompassIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
    </svg>
);

const BarChartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10"></line>
        <line x1="18" y1="20" x2="18" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="16"></line>
    </svg>
);

const DollarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
);

const CrownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zm0 0L5 16h14l3-12"></path>
    </svg>
);

const UsersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
);

const SlidersIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="21" x2="4" y2="14"></line>
        <line x1="4" y1="10" x2="4" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12" y2="3"></line>
        <line x1="20" y1="21" x2="20" y2="16"></line>
        <line x1="20" y1="12" x2="20" y2="3"></line>
        <line x1="1" y1="14" x2="7" y2="14"></line>
        <line x1="9" y1="8" x2="15" y2="8"></line>
        <line x1="17" y1="16" x2="23" y2="16"></line>
    </svg>
);

// --- Data for the filter buttons ---
const filters = [
    { id: 'discover', label: 'Discover', icon: <CompassIcon /> },
    { id: 'ranked', label: 'Ranked', icon: <BarChartIcon /> },
    { id: 'free', label: 'Free', icon: <DollarIcon /> },
    { id: 'premium', label: 'Premium', icon: <CrownIcon /> },
    { id: 'community', label: 'Community', icon: <UsersIcon /> }
];

// --- Main App Component ---
export default function ActiveQuestsFilter() {
    const [activeFilter, setActiveFilter] = useState('discover');

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            {/* Filter Tabs Group */}
            <div className="grid grid-cols-5 items-center p-1 space-x-1 overflow-x-auto gap-4">

                {/* We map over the filters array to create buttons */}
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        // We dynamically add the 'active' class
                        className={`filter-btn flex-shrink-0 flex gap-2 items-center justify-center p-3 px-6 bg-bg-primary  rounded-full cursor-pointer hover:shadow-sm ${activeFilter === filter.id ? 'bg-primary-color text-white' : ''}`}
                        onClick={() => {
                            setActiveFilter(filter.id);
                            console.log('Selected filter:', filter.id);
                        }}
                    >
                        {filter.icon}
                        <span>{filter.label}</span>
                    </button>
                ))}

            </div>

            {/* Sort and Filter Button */}
            <button className="flex-shrink-0 flex items-center justify-center gap-2 px-8 py-3 bg-bg-primary cursor-pointer rounded-full hover:bg-primary-color hover:text-white transition-colors duration-200">
                <SlidersIcon />
                <span className="font-medium">Sort & Filter</span>
            </button>

        </div>
    );
}
