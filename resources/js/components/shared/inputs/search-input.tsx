import useLocales from '@/hooks/useLocales'
import { cn } from '@/lib/utils'
import { SearchIcon } from 'lucide-react'
import { MdOutlineClose } from 'react-icons/md'

export default function SearchInput() {
    const { direction } = useLocales()
    return (
        <div className="relative w-48 sm:w-64">
            <div className={cn("absolute inset-y-0 left-0 flex items-center pointer-events-none", direction === 'left' ? 'left-4' : 'right-4')}>
                <SearchIcon className="w-5 h-5" />
            </div>
            <input
                name="search"
                id="search-header"
                placeholder="Search"
                className="block w-full py-3 px-14 rounded-full border text-sm focus:bg-bg-primary focus:outline-0 bg-bg-primary"
            />
            <MdOutlineClose className={cn("absolute top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer", direction === 'left' ? 'right-4 ' : 'left-4')} />
        </div>
    )
}
