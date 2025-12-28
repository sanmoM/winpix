import ActiveQuestsBanner from '@/components/quests/active-quests/active-quests-banner/active-quests-banner'
import ActiveQuestsFilter from '@/components/quests/active-quests/active-quests-filter'
import QuestsSeries from '@/components/quests/active-quests/quests-series'
import Card from '@/components/shared/card/card'
import Container from '@/components/shared/container'
import NoData from '@/components/shared/no-data'
import SectionHeading from '@/components/shared/SectionHeading'
import useLocales from '@/hooks/useLocales'
import UserLayout from '@/layouts/user-layout'
import { Link, router } from '@inertiajs/react'
import { useEffect, useState } from 'react'

export default function active({ series, quests, categories, questTypes, allQuests }: any) {
    // const params = new URLSearchParams();
    const { t, direction, currentLanguage } = useLocales()
    const [filter, setFilter] = useState({
        rank: "All",
        category: null,
        questType: null,
        isFree: null,
        sort: null,
    })

    const addFilter = (Key, Value) => {
        setFilter(prev => ({ ...prev, [Key]: Value }));
    }


    const handleFilter = () => {
        const queryParams = new URLSearchParams(window.location.search);

        Object.entries(filter).forEach(([key, value]) => {
            if (value !== null && value !== '') {
                queryParams.set(key, value.toString());
            } else {
                queryParams.delete(key);
            }
        });

        const queryString = queryParams.toString();
        const url = `/quests/active-quests${queryString ? '?' + queryString : ''}`;
        router.get(url);
    };

    const resetFilter = () => {
        setFilter({
            rank: "All",
            category: null,
            questType: null,
            isFree: null,
            sort: null,
        });
        router.get('/quests/active-quests');
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        setFilter({
            rank: queryParams.get('rank') || null,
            category: parseInt(queryParams.get('category')) || null,
            questType: parseInt(queryParams.get('questType')) || null,
            isFree: queryParams.get('isFree') === "true" ? true : queryParams.get('isFree') === "false" ? false : null,
            sort: queryParams.get('sort') || null,
        });
    }, []);



    return (
        <UserLayout>
            <ActiveQuestsBanner direction={direction} t={t} quests={allQuests} currentLanguage={currentLanguage} />
            <Container className="space-y-14 md:space-y-20 lg:space-y-28 my-10 md:my-16 lg:my-12">
                <ActiveQuestsFilter t={t} handleFilter={handleFilter} filter={filter} setFilter={addFilter} categories={categories} questTypes={questTypes} resetFilter={resetFilter} />
                {
                    series?.length > 0 && (
                        <QuestsSeries title={t("activeQuests.questSeries.title")} series={series} />
                    )
                }
                {
                    quests?.length > 0 ? (
                        <div>
                            <SectionHeading title={t('activeQuests.quests.title')} />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {
                                    quests?.map((item: any) => (
                                        <Link href={`/quests/single-quest/${item.id}`} className='block'>
                                            <Card key={item.id} item={item} />
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    ) : (
                        <NoData text='No contest found' />
                    )
                }
            </Container>
        </UserLayout>
    )
}
