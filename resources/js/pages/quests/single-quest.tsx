import Brief from '@/components/quests/single-quest/brief'
import Creator from '@/components/quests/single-quest/createor'
import Guidelines from '@/components/quests/single-quest/guidelines/guidelines'
import Prizes from '@/components/quests/single-quest/prizes/prizes'
import Banner from '@/components/shared/banner'
import Button from '@/components/shared/buttons/button'
import Container from '@/components/shared/container'
import SecondarySectionHeading from '@/components/shared/secondary-section-heading'
import Tab from '@/components/shared/tab'
import UserLayout from '@/layouts/user-layout'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export default function SingleQuest() {
    const [activeTab, setActiveTab] = useState("brief");
    console.log(activeTab);
    return (
        <UserLayout>
            <Banner src="https://cdn.pulsepx.com/photos/111974512/5652113db680a1dda4a6ea1dbd62f158405f9392ad52e5eca32d080d45d11bbe/2048.jpg" containerClass='lg:h-[70vh]' hasOverlay={false}>
                <div className='w-full h-full flex flex-col justify-center items-center'>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>Perfectly Centered</h1>
                    <p className='text-gray-400 mt-4 mb-6'>#Minimalism</p>
                    <div className='grid grid-cols-2 gap-4'>
                        <button className="bg-white text-black text-sm font-semibold rounded-full transition cursor-pointer w-32 py-2 md:py-3 btn duration-300 hover:scale-105 ease-in-out">
                            Vote
                        </button>
                        <Button text='Join Now' className='px-8 py-2 lg:text-sm' />
                    </div>
                </div>
            </Banner>
            <Container className="space-y-14 md:space-y-20 lg:space-y-10 my-10 md:my-16 lg:mb-28 lg:mt-8">
                <Tab
                    options={[
                        { label: "Brief", value: "brief" },
                        { label: "Entries", value: "entries" },
                    ]}
                    value={activeTab}
                    onChange={(val) => setActiveTab(val)}

                />
                <div className='px-2 space-y-14 md:space-y-20 lg:space-y-10'>
                    <Brief />
                    <Prizes />
                    <div className='flex justify-between'>
                        <Guidelines />
                        <Creator />
                    </div>
                </div>
            </Container>
        </UserLayout>
    )
}