import Container from '@/components/shared/container';
import UserLayout from '@/layouts/user-layout';

export default function SingleCategoryHelps() {
    return (
        <UserLayout>
            <Container>
                <Header />
                <Content />
            </Container>
        </UserLayout>
    )
}



/**
 * A simple Search Icon component.
 */
const SearchIcon = ({ className = "w-5 h-5" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className={className}
    >
        <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
        />
    </svg>
);

/**
 * Header component containing the breadcrumb navigation and the search bar.
 */
const Header = () => {
    return (
        <div className="mx-auto flex justify-between items-center">
            {/* Breadcrumb Navigation */}
            <nav className="text-sm font-medium text-gray-500">
                <a href="#" className="text-indigo-600 hover:text-indigo-800">PULSEpx Support</a>
                <span className="mx-2">&gt;</span>
                <a href="#" className="text-gray-900">Getting Started</a>
            </nav>

            {/* Search Bar */}
            <div className="relative w-48 sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    type="search"
                    name="search"
                    id="search-header"
                    placeholder="Search"
                    className="block w-full py-2 pl-10 pr-3 rounded-md border shadow-sm
                       focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                />
            </div>
        </div>
    );
};

/**
 * Main content area with the "Getting Started" title and a list of questions.
 */
const Content = () => {
    const questions = [
        'What is PULSEpx?',
        'What makes PULSEpx different from other photography contest apps?',
        'Is there a difference between the web version and the mobile app?',
        'When uploading and submitting photos on PULSEpx, do I maintain ownership?',
        'Can I use PULSEpx on multiple devices with the same account?',
        'Is PULSEpx free to use?',
    ];

    return (
        <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Getting Started</h1>

            <div className="space-y-6">
                {questions.map((question, index) => (
                    <p key={index} className="text-lg text-gray-700 hover:text-indigo-600 cursor-pointer transition-colors duration-150">
                        {question}
                    </p>
                ))}
            </div>
        </main>
    );
};