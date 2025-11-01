import SearchResults from '@/components/help/searched-helps/search-results/search-results';
import SearchedHelpSidebar from '@/components/help/searched-helps/search-results/searched-help-side-bar';
import { Filters, SearchResult } from '@/components/help/searched-helps/types';
import Container from '@/components/shared/container';
import Path from '@/components/shared/path';
import UserLayout from '@/layouts/user-layout';
import { FC } from 'react';


const mockFilters: Filters = {
    type: [
        { name: 'All types', count: 11, active: false },
        { name: 'Articles', count: 11, active: true },
        { name: 'FAQ', count: 11, active: false },
    ],
    category: [
        { name: 'All Categories', count: 11, active: true },
    ]
};

const mockResults: SearchResult[] = [
    {
        id: 1,
        title: 'What are Quests?',
        tag: 'Quests',
        snippet: 'Quests are photography contests hosted on PULSEpx. Participants can enter by submitting a photo for a chance to win real-world prizes.',
        source: 'PULSEpx Support',
        date: 'May 23, 2024 at 2:02 PM',
        comments: 1,
    },
    {
        id: 2,
        title: 'What are Pulse Dollars?',
        tag: 'In-App Economy',
        snippet: 'Pulse Dollars are a way of rewarding your participation and success in Quests. These virtual currency units are awarded as recognition for high-ranking entries.',
        source: 'PULSEpx Support',
        date: 'May 23, 2024 at 2:05 PM',
        comments: 2,
    },
    {
        id: 3,
        title: 'What is Pulse?',
        tag: 'Quests',
        snippet: 'Pulse is a dynamic metric that appears next to each entry once the Voting period begins in a Quest. It represents the relative popularity and engagement of the photo.',
        source: 'PULSEpx Support',
        date: 'May 23, 2024 at 1:57 PM',
        comments: 0,
    },
    {
        id: 4,
        title: 'What are Pixels?',
        tag: 'In-App Economy',
        snippet: 'Pixels serve as a virtual currency within PULSEpx. They can be Earned by participating in Quests, completing daily tasks, and selling digital assets.',
        source: 'PULSEpx Support',
        date: 'May 23, 2024 at 2:06 PM',
        comments: 1,
    },
    {
        id: 5,
        title: 'What is PULSEpx?',
        tag: 'Getting Started',
        snippet: 'PULSEpx is a dynamic photography contest platform connecting photographers of all skill levels through various themed Quests and challenges.',
        source: 'PULSEpx Support',
        date: 'May 23, 2024 at 1:33 PM',
        comments: 0,
    },
    {
        id: 6,
        title: 'What are Skill Ranks?',
        tag: 'Skill Ranks',
        snippet: 'The Skill Rank system at PULSEpx is designed to ensure that photographers of similar abilities compete against each other in fair and balanced competitions.',
        source: 'PULSEpx Support',
        date: 'May 23, 2024 at 2:11 PM',
        comments: 2,
    },
];







// Main Application Component
const SearchedHelps: FC = () => {
    const query: string = "what";
    const totalCount: number = mockResults.length;

    return (
        <UserLayout>
            <Container className="space-y-14 md:space-y-6 lg:space-y-10 my-10 md:my-16 lg:my-12">
                <div>
                    <Path paths={[{ label: 'PULSEpx Support', href: '/' }, { label: 'Search results', href: '/all-help-categories' }]} />

                </div>

                {/* Two-Column Layout */}
                <div className="lg:flex lg:space-x-12">

                    {/* Left Sidebar for Filters (Hidden on small screens) */}
                    <div className="hidden lg:block lg:w-64 flex-shrink-0">
                        <SearchedHelpSidebar filters={mockFilters} />
                    </div>

                    {/* Right Content Area for Results */}
                    <div className="flex-grow min-w-0">
                        <SearchResults results={mockResults} query={query} totalCount={totalCount} />
                    </div>

                </div>
            </Container>
        </UserLayout>
    );
};

export default SearchedHelps;
