import SearchResults from '@/components/help/searched-helps/search-results/search-results';
import Container from '@/components/shared/container';
import Path from '@/components/shared/path';
import UserLayout from '@/layouts/user-layout';
import { FC } from 'react';







// Main Application Component
const SearchedHelps: FC = ({ helps }: { helps: any }) => {
    const query: string = "what";
    const totalCount: number = helps.length;

    return (
        <UserLayout>
            <Container className="space-y-14 md:space-y-6 lg:space-y-10 my-10 md:my-16 lg:my-12">
                <div>
                    <Path paths={[{ label: 'Winpix Support', href: '/all-help-categories' }, { label: 'Search results', }]} />

                </div>

                {/* Two-Column Layout */}
                <div className="lg:flex lg:space-x-12">

                    {/* Left Sidebar for Filters (Hidden on small screens) */}
                    {/* <div className="hidden lg:block lg:w-64 flex-shrink-0">
                        <SearchedHelpSidebar filters={mockFilters} />
                    </div> */}

                    {/* Right Content Area for Results */}
                    <div className="flex-grow min-w-0">
                        <SearchResults results={helps} query={query} totalCount={totalCount} />
                    </div>

                </div>
            </Container>
        </UserLayout>
    );
};

export default SearchedHelps;
