import Container from '@/components/shared/container'
import UserLayout from '@/layouts/user-layout'
import React from 'react'

export default function active() {
    return (
        <UserLayout>
            <Container>

                <h1>Active Quests</h1>
            </Container>
        </UserLayout>
    )
}
