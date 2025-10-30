/**
 * Sidebar component for "Articles in this section".
 */
const SingleFaqSidebar = () => {
    const articles = [
        'What is PULSEpx?',
        'What makes PULSEpx different from other photography contest apps?',
        'Is there a difference between the web version and the mobile app?',
        'When uploading and submitting photos on PULSEpx, do I maintain ownership?',
        'Can I use PULSEpx on multiple devices with the same account?',
        'Is PULSEpx free to use?',
    ];

    return (
        <aside className="w-full lg:w-64 pr-4 border-r border-gray-200 lg:min-h-full">
            <h3 className="text-base font-semibold mb-4">Articles in this section</h3>
            <nav className="space-y-2">
                {articles.map((article, index) => (
                    <a
                        key={index}
                        href="#"
                        className={`block text-sm py-1 ${article === 'Is there a difference between the web version and the mobile app?'
                            ? 'text-primary-color font-medium' // Active link style
                            : ' hover:text-primary-color'
                            }`}
                    >
                        {article}
                    </a>
                ))}
            </nav>
        </aside>
    );
};


export default SingleFaqSidebar;