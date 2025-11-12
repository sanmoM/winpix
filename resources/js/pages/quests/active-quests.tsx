import ActiveQuestsBanner from '@/components/quests/active-quests/active-quests-banner/active-quests-banner'
import ActiveQuestsFilter from '@/components/quests/active-quests/active-quests-filter'
import QuestsSeries from '@/components/quests/active-quests/quests-series'
import Container from '@/components/shared/container'
import useLocales from '@/hooks/useLocales'
import UserLayout from '@/layouts/user-layout'
import React from 'react'

export default function active({ series, quests }: any) {

    const { t, direction } = useLocales()
    return (
        <UserLayout>
            <ActiveQuestsBanner direction={direction} t={t} quests={quests} />
            <Container className="space-y-14 md:space-y-20 lg:space-y-28 my-10 md:my-16 lg:my-12">
                <ActiveQuestsFilter t={t} />
                {
                    series?.map((item: any) => (
                        <QuestsSeries key={item.id} title={t("activeQuests.questSeries.title")} series={series} href={`/quests/single-quest-series/${item?.id}`} />
                    ))
                }
            </Container>
        </UserLayout>
    )
}
