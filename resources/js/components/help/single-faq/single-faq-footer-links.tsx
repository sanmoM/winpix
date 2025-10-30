
const SingleFaqFooterLinks = () => {
    const recentlyViewed = [
        'What makes PULSEpx different from other photography contest apps?',
        'What is PULSEpx?',
    ];

    const relatedArticles = [
        'When uploading and submitting photos on PULSEpx, do I maintain ownership?',
        'What makes PULSEpx different from other photography contest apps?',
        'What are Skill Ranks?',
        'Is PULSEpx free to use?',
        'Can I use PULSEpx on multiple devices with the same account?',
    ];

    return (
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            <div>
                <h3 className="text-lg font-semibold mb-4">Recently viewed articles</h3>
                <ul className="space-y-2">
                    {recentlyViewed.map((article, index) => (
                        <li key={index}>
                            <a href="#" className="text-primary-color hover:text-primary-color text-sm">
                                {article}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-4">Related articles</h3>
                <ul className="space-y-2">
                    {relatedArticles.map((article, index) => (
                        <li key={index}>
                            <a href="#" className="text-primary-color hover:text-primary-color text-sm">
                                {article}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SingleFaqFooterLinks;