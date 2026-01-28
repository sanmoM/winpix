import Card from '@/components/shared/card/card'
import Container from '@/components/shared/container'
import SectionHeading from '@/components/shared/SectionHeading'
import useLocales from '@/hooks/useLocales'
import AppLayout from '@/layouts/app-layout'
import { Quest } from '@/types/quest'
import { Head, Link } from '@inertiajs/react'
import { ToastContainer } from 'react-toastify'

export default function JoinedContest({ quests }) {
    const breadcrumbs = [
        {
            title: 'My Contests',
            href: '/user/my-contests',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ToastContainer />
            <Head title="My Contests" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 mx-4 mt-4">
                {
                    quests?.map((item: Quest, index: number) => (
                        <Link href={`/quests/single-quest/${item?.quest?.id}`} className='block'>
                            <Card key={item.id}
                                item={
                                    {
                                        ...item?.quest,
                                        category: item?.quest?.category,
                                        image: item?.quest?.image,
                                        user: item?.quest?.user,
                                        entry_coin: item?.quest?.entry_coin,
                                    }
                                }
                            />
                        </Link>
                    ))
                }
            </div>
        </AppLayout>
    )
}
