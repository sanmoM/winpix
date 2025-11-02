import SearchInput from "@/components/shared/inputs/search-input";
import Path from "@/components/shared/path";


const SingleFaqHeader = ({ paths }: { paths: any }) => {
    return (
        <div className="mx-auto flex justify-between items-center py-4">
            <Path paths={paths} />
            <SearchInput />
        </div>
    );
};

export default SingleFaqHeader;