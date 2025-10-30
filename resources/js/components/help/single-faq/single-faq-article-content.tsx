const SingleFaqArticleContent = () => {
    return (
        <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold mb-2">
                Is there a difference between the web version and the mobile app?
            </h1>
            <p className="text-sm text-gray-400 mb-8">
                1 year ago · Updated
            </p>

            <div className="prose prose-indigo max-w-none text-gray-500">
                <p>
                    The core features and your account details are consistent across both the web version and the mobile app
                    of PULSEpx. You are welcome to use either or both as per your convenience. Many users find it useful to
                    upload their photos through the website using their computers, and then participate and engage with
                    Quests using the mobile app.
                </p>
                {/* Add more paragraphs or content as needed */}
            </div>

            <div className="mt-12 pt-6 border-t border-gray-200">
                <p className="">
                    Have more questions? <a href="#" className="text-primary-color font-medium">Submit a request</a>
                </p>
            </div>
        </div>
    );
};

export default SingleFaqArticleContent;