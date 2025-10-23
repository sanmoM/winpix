import ActiveQuestsBanner from '@/components/quests/active/active-quests-banner/active-quests-banner'
import ActiveQuestsFilter from '@/components/quests/active/active-quests-filter'
import QuestsSeries from '@/components/quests/active/quests-series'
import Container from '@/components/shared/container'
import UserLayout from '@/layouts/user-layout'
import React from 'react'

export default function active() {
    return (
        <UserLayout>
            <ActiveQuestsBanner />
            <Container className="space-y-14 md:space-y-20 lg:space-y-38 my-10 md:my-16 lg:my-28">
                <ActiveQuestsFilter />
                <QuestsSeries />
            </Container>
        </UserLayout>
    )
}
