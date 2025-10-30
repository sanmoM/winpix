import { SearchIcon } from 'lucide-react'
import { MdOutlineClose } from 'react-icons/md'

export default function SearchInput() {
    return (
        <div className="relative w-48 sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="w-5 h-5" />
            </div>
            <input
                name="search"
                id="search-header"
                placeholder="Search"
                className="block w-full py-3 px-10 rounded-full border text-sm focus:bg-bg-primary focus:outline-0 bg-bg-primary"
            />
            <MdOutlineClose className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 cursor-pointer" />
        </div>
    )
}
