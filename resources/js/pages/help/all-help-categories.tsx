import Container from '@/components/shared/container'
import UserLayout from '@/layouts/user-layout'
import React from 'react'

export default function AllHelpCategories() {
    return (
        <UserLayout>
            <Container className="space-y-14 md:space-y-20 lg:space-y-28 my-10 md:my-16 lg:my-12">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">All Help Categories</h1>
                </div>
            </Container>
        </UserLayout>
    )
}
