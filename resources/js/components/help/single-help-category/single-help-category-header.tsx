import SearchInput from '@/components/shared/inputs/search-input';
import Path from '@/components/shared/path';
import React from 'react'

/**
 * Header component containing the breadcrumb navigation and the search bar.
 */
const SingleHelpCategoryHeader = () => {
    return (
        <div className="mx-auto flex justify-between items-center">
            {/* Breadcrumb Navigation */}
            <Path paths={['PULSEpx Support', 'Getting Started']} />

            {/* Search Bar */}
            <SearchInput />
        </div>
    );
};

export default SingleHelpCategoryHeader;