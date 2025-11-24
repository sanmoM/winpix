import SingleHelpCategoryHeader from '@/components/help/single-help-category/single-help-category-header';
import Container from '@/components/shared/container';
import useLocales from '@/hooks/useLocales';
import UserLayout from '@/layouts/user-layout';
import { Link } from '@inertiajs/react';

export default function SingleCategoryHelps({ helps }: { helps: any }) {
    const { t, currentLanguage } = useLocales();

    const questions = helps?.filter((help: any) => help.lang === currentLanguage);
console.log(questions)
    return (
        <UserLayout>
            <Container className="space-y-6 md:space-y-8 lg:space-y-12 my-10 md:my-16 lg:my-12">
                <SingleHelpCategoryHeader t={t} />
                <main className="w-fit mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold mb-8">Getting Started</h1>

                    <div className="space-y-6">
                        {questions.map((question, index) => (
                            <Link href={`/single-faq/${question.group_id}/${question.section}`} key={index} className="text-lg hover:text-primary-color cursor-pointer transition-colors duration-150 block">
                                {question?.question}
                            </Link>
                        ))}
                    </div>
                </main>
            </Container>
        </UserLayout>
    )
}