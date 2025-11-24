import { MessageSquare } from "lucide-react";
import { FC } from "react";
import { SearchResult } from "../../types";
import { Link } from "@inertiajs/react";

interface SearchResultItemProps {
    result: SearchResult;
}

// Component for a single search result item
const SearchResultItem: FC<SearchResultItemProps> = ({ result }) => {

    return (
        <Link href={`/single-faq/${result?.group_id}/${result?.section}`} className="py-4 bg-bg-primary transition-colors duration-150 rounded-md px-6 -mx-2 relative block">
            <div className="flex justify-between items-start">
                {/* Title and Snippet */}
                <div className="flex-grow">
                    <p className="text-lg font-bold hover:text-primary-color transition-colors duration-150">
                        {result?.question}
                    </p>
                    {/* Tag/Category Link */}
                    {/* <p className="text-sm text-primary-color mb-1 leading-none">{tag}</p>
                    <div className="lg:hidden mt-2">
                        <p className="whitespace-nowrap text-xs text-gray-400">{source}</p>
                        <p className="whitespace-nowrap text-xs text-gray-400">{date}</p>
                    </div> */}
                    <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm lg:text-base" dangerouslySetInnerHTML={{__html: result?.answer}}></p>
                </div>

                {/* Metadata */}
                <div className="flex-shrink-0 text-right text-xs text-gray-400 mt-1 pl-4 absolute right-6">
                    {/* {comments > 0 && (
                        <div className="flex items-center justify-end mb-2">
                            <span className="mr-1">{comments}</span>
                            <MessageSquare className="w-3 h-3 text-gray-400" />
                        </div>
                    )} */}
                    {/* <div className="hidden lg:block">
                        <p className="whitespace-nowrap !text-right">{source}</p>
                        <p className="whitespace-nowrap !text-right">{date}</p>
                    </div> */}
                </div>
            </div>
        </Link>
    );
};

export default SearchResultItem;