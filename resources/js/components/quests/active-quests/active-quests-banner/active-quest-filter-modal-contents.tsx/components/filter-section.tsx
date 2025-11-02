// --- Helper Components ---

import { ReactNode } from "react";

type FilterSectionProps = {
    title: string;
    children: ReactNode;
}

/**
 * A reusable component for filter section titles and wrappers.
 */
const FilterSection: React.FC<FilterSectionProps> = ({ title, children }) => (
    <div className="border-gray-200 pt-6 mt-6 first:mt-0 first:pt-0">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="flex flex-wrap gap-x-6 gap-y-4">
            {children}
        </div>
    </div>
);


export default FilterSection;