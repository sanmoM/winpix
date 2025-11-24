import { Link } from "@inertiajs/react";

/**
 * Sidebar component for "Articles in this section".
 */
const SingleFaqSidebar = ({ t, data }: { t: any }) => {

    return (
        <aside className="w-full lg:w-64 pr-4 border-r border-gray-200 lg:min-h-full">
            <h3 className="text-base font-semibold mb-4">{t('help.singleFaq.sidebarHeading')}</h3>
            <nav className="space-y-2">
                {data.map((article, index) => (
                    <Link
                        key={index}
                        href={`/single-faq/${article.group_id}/${article.section}`}
                        className={`block text-sm py-1 ${article === 'Is there a difference between the web version and the mobile app?'
                            ? 'text-primary-color font-medium' // Active link style
                            : ' hover:text-primary-color'
                            }`}
                    >
                        {article?.question}
                    </Link>
                ))}
            </nav>
        </aside>
    );
};


export default SingleFaqSidebar;