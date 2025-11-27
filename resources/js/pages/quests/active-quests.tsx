import ActiveQuestsBanner from '@/components/quests/active-quests/active-quests-banner/active-quests-banner'
import ActiveQuestsFilter from '@/components/quests/active-quests/active-quests-filter'
import QuestsSeries from '@/components/quests/active-quests/quests-series'
import Card from '@/components/shared/card'
import Container from '@/components/shared/container'
import SectionHeading from '@/components/shared/SectionHeading'
import useLocales from '@/hooks/useLocales'
import UserLayout from '@/layouts/user-layout'
import React from 'react'

export default function active({ series, quests, categories }: any) {
    // const params = new URLSearchParams();
    const { t, direction } = useLocales()
    const [filter, setFilter] = React.useState({
        rank: null,
        category : null,
    })

    const handleFilter = () => {
        const queryParams = new URLSearchParams(window.location.search);

        // Loop through all keys in filter state
        Object.entries(filter).forEach(([key, value]) => {
            if (value !== null && value !== '') {
                queryParams.set(key, value.toString());
            }
        });

        // const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
        // window.history.replaceState(null, '', newUrl);
    }


    return (
        <UserLayout>
            <ActiveQuestsBanner direction={direction} t={t} quests={quests} />
            <Container className="space-y-14 md:space-y-20 lg:space-y-28 my-10 md:my-16 lg:my-12">
                <ActiveQuestsFilter t={t} handleFilter={handleFilter} filter={filter} setFilter={setFilter} categories={categories} />
                {
                    series?.length > 0 && (
                        <QuestsSeries title={t("activeQuests.questSeries.title")} series={series} />
                    )
                }
                {
                    quests?.length > 0 && (
                        <div>
                            <SectionHeading title={t('activeQuests.quests.title')} />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {
                                    quests?.map((item: any) => (
                                        <Card key={item.id} item={item} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </Container>
        </UserLayout>
    )
}
