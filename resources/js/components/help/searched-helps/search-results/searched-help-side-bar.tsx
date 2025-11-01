import { FC } from "react";
import { FilterItemData, Filters } from "../types";




interface FilterItemProps extends FilterItemData { }


interface SidebarProps {
    filters: Filters;
}
// Component for the filter sidebar
const SearchedHelpSidebar: FC<SidebarProps> = ({ filters }) => {
    // Utility component for filter items
    const FilterItem: FC<FilterItemProps> = ({ name, count, active }) => (
        <a
            href="#"
            className={`block px-4 py-2 my-1 text-sm rounded-lg transition-colors duration-150 ${active
                ? 'bg-bg-primary text-primary-color font-semibold'
                : 'hover:text-primary-color'
                }`}
        >
            {name} ({count})
        </a>
    );

    return (
        <div className="w-full lg:w-64 pt-6 lg:pt-0">
            {/* Type Filter */}
            <div className="mb-8">
                <h3 className="font-semibold mb-2 border-b pb-3">Type</h3>
                {filters.type.map((filter: FilterItemData) => (
                    <FilterItem key={filter.name} {...filter} />
                ))}
            </div>

            {/* Category Filter */}
            <div className="mb-8">
                <h3 className="font-semibold mb-2 border-b pb-3">By Category</h3>
                {filters.category.map((filter: FilterItemData) => (
                    <FilterItem key={filter.name} {...filter} />
                ))}
            </div>
        </div>
    );
};

export default SearchedHelpSidebar;