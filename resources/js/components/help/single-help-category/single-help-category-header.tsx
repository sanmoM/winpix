import SearchInput from '@/components/shared/inputs/search-input';
import Path from '@/components/shared/path';

/**
 * Header component containing the breadcrumb navigation and the search bar.
 */
const SingleHelpCategoryHeader = ({ t }: { t: any }) => {
    const paths = t('help.singleCategoryHelps.paths', { returnObjects: true });
    return (
        <div className="mx-auto flex justify-between items-center">
            {/* Breadcrumb Navigation */}
            <Path paths={paths} />

            {/* Search Bar */}
            <SearchInput />
        </div>
    );
};

export default SingleHelpCategoryHeader;