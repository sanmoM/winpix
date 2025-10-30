interface SingleHelpCategoryProps {
    title: string;
}

const SingleHelpCategory: React.FC<SingleHelpCategoryProps> = ({ title }) => {
    return (
        <button
            type="button"
            className="w-full p-4 h-full
                 border rounded-sm 
                font-medium
                  hover:!scale-[1] cursor-pointer flex justify-center items-center"
        >
            {title}
        </button>
    );
};

export default SingleHelpCategory;
