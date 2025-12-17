import AllHelpCategoriesHeader from '@/components/help/all-help-categories/all-help-categories-header';
import SingleHelpCategoryNavigationItem from '@/components/help/all-help-categories/single-help-category-navigation-item';
import Container from '@/components/shared/container';
import useLocales from '@/hooks/useLocales';
import UserLayout from '@/layouts/user-layout';
import { title } from 'process';
import { useTranslation } from 'react-i18next';

export default function AllHelpCategories({ helpCategories }: { allHelpCategories: any }) {
    const { t, direction, } = useTranslation();
    const { currentLanguage } = useLocales()

    const grouped = Object.values(
        helpCategories
            .filter(item => item.lang === currentLanguage) // step 1: filter by lang
            .reduce((acc, item) => {

                // Use group_id as the grouping key
                acc[item.group_id] = {
                    title: item.section,
                    section: item.section,
                };

                return acc;
            }, {})
    );


    return (
        <UserLayout>
            <AllHelpCategoriesHeader direction={direction} />
            <Container className="space-y-14 md:space-y-20 lg:space-y-28 my-10 md:my-16 lg:my-12">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {grouped?.map((topic) => (
                        <SingleHelpCategoryNavigationItem key={topic.groupId} item={topic} />
                    ))}
                </div>
            </Container>
        </UserLayout>
    );
}
