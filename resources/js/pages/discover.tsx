import Leaderboard from '@/components/discover/leader-board'
import Container from '@/components/shared/container'
import UserLayout from '@/layouts/user-layout'

export default function discover() {
    return (
        <UserLayout>
            <Container>
                <Leaderboard />
            </Container>
        </UserLayout>
    )
}
