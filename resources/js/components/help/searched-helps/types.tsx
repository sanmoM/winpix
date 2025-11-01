export interface SearchResult {
    id: number;
    title: string;
    tag: string;
    snippet: string;
    source: string;
    date: string;
    comments: number;
}

export interface Filters {
    type: FilterItemData[];
    category: FilterItemData[];
}

export interface FilterItemData {
    name: string;
    count: number;
    active: boolean;
}