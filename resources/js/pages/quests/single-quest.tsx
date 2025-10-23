import Banner from '@/components/shared/banner'
import Button from '@/components/shared/button'
import Container from '@/components/shared/container'
import SecondarySectionHeading from '@/components/shared/secondary-section-heading'
import Tab from '@/components/shared/tab'
import UserLayout from '@/layouts/user-layout'
import { cn } from '@/lib/utils'

export default function SingleQuest() {
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
                />

                <div className='px-2'>
                    <SecondarySectionHeading title="Brief" />
                    <p className='text-gray-500'>Place your subject directly in the spotlight by challenging the rule of thirds. Frame your shot so the focus is perfectly centered, whether it's a lone figure on a path, a single object on a clean background, or a compelling symmetrical facade. Explore how negative space and bold symmetry can create a powerful, minimalist, and dramatic impact.</p>
                </div>
            </Container>
        </UserLayout>
    )
}
