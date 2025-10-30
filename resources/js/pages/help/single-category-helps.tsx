import SingleHelpCategoryHeader from '@/components/help/single-help-category/single-help-category-header';
import Container from '@/components/shared/container';
import UserLayout from '@/layouts/user-layout';
import { Link } from '@inertiajs/react';

export default function SingleCategoryHelps() {
    const questions = [
        'What is PULSEpx?',
        'What makes PULSEpx different from other photography contest apps?',
        'Is there a difference between the web version and the mobile app?',
        'When uploading and submitting photos on PULSEpx, do I maintain ownership?',
        'Can I use PULSEpx on multiple devices with the same account?',
        'Is PULSEpx free to use?',
    ];

    return (
        <UserLayout>
            <Container className="space-y-6 md:space-y-8 lg:space-y-12 my-10 md:my-16 lg:my-12">
                <SingleHelpCategoryHeader />
                <main className="w-fit mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold mb-8">Getting Started</h1>

                    <div className="space-y-6">
                        {questions.map((question, index) => (
                            <Link href={"/single-faq"} key={index} className="text-lg hover:text-primary-color cursor-pointer transition-colors duration-150 block">
                                {question}
                            </Link>
                        ))}
                    </div>
                </main>
            </Container>
        </UserLayout>
    )
}