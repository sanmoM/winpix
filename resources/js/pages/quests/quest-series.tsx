import Card from '@/components/home/newest/components/Card'
import Container from '@/components/shared/container'
import SectionHeading from '@/components/shared/SectionHeading'
import useLocales from '@/hooks/useLocales'
import UserLayout from '@/layouts/user-layout'

export default function QuestsSeries({ series }: any) {
    const { t } = useLocales()
    return (
        <UserLayout>
            <Container className="space-y-14 md:space-y-20 lg:space-y-28 my-10 md:my-16 lg:my-12">
                <div className="mb-12">
                    <SectionHeading title={t("questSeries.title")} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {series?.map((singleSeries: any) => (
                        <Card key={singleSeries.id} item={{
                            title: singleSeries.title,
                            category: singleSeries.category,
                            image: singleSeries.image,
                            user: singleSeries.user,
                        }} isSeries />
                    ))}
                </div>
            </Container>
        </UserLayout>
    )
}
