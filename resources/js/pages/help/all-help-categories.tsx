import AllHelpCategoriesHeader from '@/components/help/all-help-categories/all-help-categories-header';
import SingleHelpCategoryNavigationItem from '@/components/help/all-help-categories/single-help-category-navigation-item';
import Container from '@/components/shared/container';
import UserLayout from '@/layouts/user-layout';
import { useTranslation } from 'react-i18next';

export default function AllHelpCategories({ helpCategories }: { allHelpCategories: any }) {
    const { t, direction } = useTranslation();

    // Get categories array from translation JSON
    const topics: string[] = t('help.categories', { returnObjects: true });

    console.log(helpCategories)

    return (
        <UserLayout>
            <AllHelpCategoriesHeader direction={direction} />
            <Container className="space-y-14 md:space-y-20 lg:space-y-28 my-10 md:my-16 lg:my-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {helpCategories?.map((topic) => (
                        <SingleHelpCategoryNavigationItem key={topic} title={topic} />
                    ))}
                </div>
            </Container>
        </UserLayout>
    );
}
