import useLocales from '@/hooks/useLocales'
import { cn } from '@/lib/utils'
import { router } from '@inertiajs/react'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { MdOutlineClose } from 'react-icons/md'

export default function SearchInput() {
    const { direction } = useLocales()
    const [searchTerm, setSearchTerm] = useState('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.get('/searched-helps', { searchTerm });
    };
    return (
        <form className="relative w-48 sm:w-64" onSubmit={handleSubmit}>
            <div className={cn("absolute inset-y-0 left-0 flex items-center pointer-events-none", direction === 'left' ? 'left-4' : 'right-4')}>
                <SearchIcon className="w-5 h-5" />
            </div>
            <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                name="search"
                id="search-header"
                placeholder="Search"
                className="block w-full py-3 px-14 rounded-full border text-sm focus:bg-bg-primary focus:outline-0 bg-bg-primary"
            />
            <MdOutlineClose className={cn("absolute top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer", direction === 'left' ? 'right-4 ' : 'left-4')} />
        </form>
    )
}
