import { timeAgo } from "../../../utils/date";

const SingleFaqArticleContent = ({ t, data }: { t: any }) => {
    return (
        <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold mb-2">
                {data?.question}
            </h1>
            <p className="text-sm text-gray-400 mb-8">
                {timeAgo(data?.updated_at)}
            </p>

            <div className="prose prose-indigo max-w-none text-gray-500">
                <p dangerouslySetInnerHTML={{ __html: data?.answer }} />
            </div>
        </div >
    );
};

export default SingleFaqArticleContent;