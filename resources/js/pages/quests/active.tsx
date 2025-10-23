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
            <Container className="space-y-4 md:space-y-10 lg:space-y-38 my-4 md:my-10 lg:my-28">
                <ActiveQuestsFilter />
                <QuestsSeries />
            </Container>
        </UserLayout>
    )
}
