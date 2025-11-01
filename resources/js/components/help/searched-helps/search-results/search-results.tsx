import { FC } from "react";
import { SearchResult } from "../types";
import SearchResultItem from "./components/search-item";

// Component for the main search results list
interface SearchResultsProps {
    results: SearchResult[];
    query: string;
    totalCount: number;
}

const SearchResults: FC<SearchResultsProps> = ({ results, query, totalCount }) => {
    return (
        <div className="w-full">
            <h2 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">
                {totalCount} results for "{query}" in All Categories
            </h2>
            <div className="space-y-2">
                {results.map((result: SearchResult) => (
                    <SearchResultItem key={result.id} result={result} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;