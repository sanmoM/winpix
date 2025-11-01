import { router } from '@inertiajs/react';
import { useState } from "react";
import { MdOutlineClose } from "react-icons/md";

interface SearchIconProps {
    className?: string;
}


const AllHelpCategoriesHeader = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.get('/searched-helps', { searchTerm });
    };
    return (
        <header className="w-full ease-in-out bg-gradient-to-r bg-[linear-gradient(45deg,var(--color-primary-color),var(--color-secondary-color))] py-42 px-4 sm:px-6 lg:px-8">
            <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
                <div className="relative">
                    {/* Search Icon */}
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <SearchIcon className="w-5 h-5 text-gray-400" />
                    </div>

                    {/* Search Input */}
                    <input
                        type="search"
                        name="search"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                        className="block w-full py-3 pl-12 pr-4 rounded-full border-0 shadow-sm
                       bg-white placeholder-gray-500 text-black
                       focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
                    />
                    <MdOutlineClose className='absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 cursor-pointer' />
                </div>
            </form>
        </header>
    );
};

export default AllHelpCategoriesHeader;




const SearchIcon: React.FC<SearchIconProps> = ({ className = "w-5 h-5" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={className}
    >
        <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
        />
    </svg>
);