import SearchInput from "@/components/shared/inputs/search-input";
import Path from "@/components/shared/path";


const SingleFaqHeader = () => {
    return (
        <div className="mx-auto flex justify-between items-center py-4">
            <Path paths={['PULSEpx Support', 'Getting Started', 'FAQ']} />
            <SearchInput />
        </div>
    );
};

export default SingleFaqHeader;