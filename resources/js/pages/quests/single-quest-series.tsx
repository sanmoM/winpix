import ActiveQuests from '@/components/quests/single-quest-series/active-quests';
import SingleQuestSeriesInfo from '@/components/quests/single-quest-series/single-quest-series-info';
import Container from '@/components/shared/container';
import useLocales from '@/hooks/useLocales';
import UserLayout from '@/layouts/user-layout';

export default function SingleQuestSeries({ series }: { series: any }) {
    const { t } = useLocales();
    return (
        <UserLayout>
            <Container className="space-y-14 md:space-y-20 lg:space-y-28 mb-10 md:mb-16 lg:mb-20">
                <SingleQuestSeriesInfo t={t} series={series} />
                <ActiveQuests title={t('singleQuestSeries.activeQuest.title')} quests={series?.quests} />
            </Container>
        </UserLayout >
    )
}


