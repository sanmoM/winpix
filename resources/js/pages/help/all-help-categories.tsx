import AllHelpCategoriesHeader from '@/components/help/all-help-categories/all-help-categories-header';
import SingleHelpCategory from '@/components/help/all-help-categories/single-help-category';
import Container from '@/components/shared/container';
import UserLayout from '@/layouts/user-layout';

export default function AllHelpCategories() {
    const topics: string[] = [
        'Getting Started',
        'Quests',
        'In-App Economy',
        'Skill Ranks',
        'Account Management',
        'Purchases',
        'Troubleshooting',
        'Content and Community Guidelines',
        'Contact Support',
    ];
    return (
        <UserLayout>
            <AllHelpCategoriesHeader />
            <Container className="space-y-14 md:space-y-20 lg:space-y-28 my-10 md:my-16 lg:my-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {topics.map((topic) => (
                        <SingleHelpCategory key={topic} title={topic} />
                    ))}
                </div>
            </Container>
        </UserLayout>
    )
}




