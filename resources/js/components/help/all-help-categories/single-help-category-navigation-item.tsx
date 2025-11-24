import { Link } from "@inertiajs/react";

interface SingleHelpCategoryProps {
    title: string;
}

const SingleHelpCategoryNavigationItem: React.FC<SingleHelpCategoryProps> = ({ item }) => {
    return (
        <Link
            href={`/single-category-helps/${item.section}`}
            className="w-full p-4 h-full
                 border rounded-sm 
                font-medium
                  hover:!scale-[1] cursor-pointer flex justify-center items-center bg-bg-primary"
        >
            {item.title}
        </Link>
    );
};

export default SingleHelpCategoryNavigationItem;
