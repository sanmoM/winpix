import Status from '@/components/quests/single-quest/status'
import Banner from '@/components/shared/banner'
import Brief from '@/components/shared/brief'
import Button from '@/components/shared/buttons/button'
import SecondaryButton from '@/components/shared/buttons/secondary-button'
import Container from '@/components/shared/container'
import Creator from '@/components/shared/creator'
import GalleryImageCart from '@/components/shared/gallary-image-cart'
import Guidelines from '@/components/shared/guidelines/guidelines'
import Prizes from '@/components/shared/prizes/prizes'
import Tab from '@/components/shared/tab'
import useLocales from '@/hooks/useLocales'
import UserLayout from '@/layouts/user-layout'
import { cn } from '@/lib/utils'
import { Quest } from '@/types/quest'
import { usePage } from '@inertiajs/react'
import { useState } from 'react'

const images = [
    "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
    "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
    "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
    "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
    "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
    "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
    "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4"
]

export default function SingleQuest() {
    const { quest } = usePage<any>().props;

    console.log(quest)
    const [activeTab, setActiveTab] = useState("brief");
    const { t, direction } = useLocales()
    return (
        <UserLayout>
            <Banner src={"/storage/" + quest?.image} containerClass='lg:h-[70vh]' hasOverlay={false}>
                <div className='w-full h-full flex flex-col justify-center items-center'>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white'>{quest?.title}</h1>
                    <p className='text-gray-400 mt-4 mb-6'>#{quest?.category?.name}</p>
                    <div className='grid grid-cols-2 gap-4'>
                        <SecondaryButton text={t('singleQuest.banner.voteText')} />
                        <Button text={t('singleQuest.banner.joinNowText')} className='px-8 py-2 lg:text-sm' />
                    </div>
                </div>
            </Banner>
            <Container className="space-y-14 md:space-y-20 lg:space-y-10 my-10 md:my-16 lg:mb-28 lg:mt-8">
                <Tab
                    options={[
                        { label: t('singleQuest.tabs.brief'), value: "brief" },
                        { label: t('singleQuest.tabs.entries'), value: "entries" },
                    ]}
                    value={activeTab}
                    onChange={(val) => setActiveTab(val)}

                />
                <div className={cn('px-2 space-y-14 md:space-y-20 lg:space-y-10', activeTab !== "brief" && "hidden")}>
                    <Status t={t} direction={direction} />
                    <Brief title={t('singleQuestDetails.brief.title')} text={quest?.brief} />
                    <Prizes t={t} />
                    <div className='flex flex-col xl:flex-row justify-between gap-14 md:gap-20 lg:gap-0'>
                        <Guidelines t={t} />
                        <div className='className="w-fit lg:w-full md:max-w-md mt-auto mx-auto lg:mx-0'>
                            <Creator user={quest?.user} />
                        </div>
                    </div>
                </div>
                <div className={cn('px-2 space-y-14 md:space-y-20 lg:space-y-10', activeTab !== "entries" && "hidden")}>
                    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {images.map((item, index) => (
                            <div key={index} className="break-inside-avoid rounded overflow-hidden shadow-lg">
                                <GalleryImageCart src={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </UserLayout>
    )
}
