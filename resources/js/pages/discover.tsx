import Leaderboard from '@/components/discover/leader-board'
import Quests from '@/components/discover/quests'
import Container from '@/components/shared/container'
import Gallery from '@/components/shared/Gallery'
import useLocales from '@/hooks/useLocales'
import UserLayout from '@/layouts/user-layout'


export default function discover({ quests, galleryImages, topPlayers }: any) {
    const { t } = useLocales()
    return (
        <UserLayout>
            <Container className="space-y-14 md:space-y-20 lg:space-y-28 my-10 md:my-16 lg:my-12">
                <Leaderboard t={t} data={topPlayers} />
                <Quests t={t} quests={quests} />
                <Gallery
                    galleryImages={galleryImages?.map(item => ({
                        id: item?.image_id,
                        image: item?.image?.image,
                        user: item?.image?.user
                    }))}
                    t={t}
                    title={t('home.gallery.title')}
                />
            </Container>
        </UserLayout>
    )
}
