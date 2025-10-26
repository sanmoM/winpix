import ActiveQuests from '@/components/quests/single-quest-series/active-quests';
import SingleQuestSeriesInfo from '@/components/quests/single-quest-series/single-quest-series-info';
import Container from '@/components/shared/container';
import UserLayout from '@/layouts/user-layout';

export default function SingleQuestSeries() {
    return (
        <UserLayout>
            <Container className="space-y-14 md:space-y-20 lg:space-y-28 mb-10 md:mb-16 lg:mb-20">
                <SingleQuestSeriesInfo />
                <ActiveQuests />
            </Container>
        </UserLayout >
    )
}


