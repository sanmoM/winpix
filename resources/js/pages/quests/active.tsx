import ActiveQuestsBanner from '@/components/quests/active/active-quests-banner/active-quests-banner'
import ActiveQuestsFilter from '@/components/quests/active/active-quests-filter'
import Container from '@/components/shared/container'
import UserLayout from '@/layouts/user-layout'
import React from 'react'

export default function active() {
    return (
        <UserLayout>
            <ActiveQuestsBanner />
            <Container className="space-y-4 md:space-y-10 lg:space-y-20 my-4 md:my-10 lg:my-20">
                <ActiveQuestsFilter />
            </Container>
        </UserLayout>
    )
}
