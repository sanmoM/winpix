import SearchInput from '@/components/shared/inputs/search-input';
import Path from '@/components/shared/path';

/**
 * Header component containing the breadcrumb navigation and the search bar.
 */
const SingleHelpCategoryHeader = () => {
    return (
        <div className="mx-auto flex justify-between items-center">
            {/* Breadcrumb Navigation */}
            <Path paths={[{ label: 'Help', href: '/help' }, { label: 'All Help Categories', href: '/all-help-categories' }]} />

            {/* Search Bar */}
            <SearchInput />
        </div>
    );
};

export default SingleHelpCategoryHeader;