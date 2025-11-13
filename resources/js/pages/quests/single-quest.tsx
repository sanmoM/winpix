import JoinModal from '@/components/quests/single-quest/join-modal'
import LibraryModal from '@/components/quests/single-quest/library-modal'
import Status from '@/components/quests/single-quest/status'
import VoteModal from '@/components/quests/single-quest/vote-modal/vote-modal'
import Banner from '@/components/shared/banner'
import Brief from '@/components/shared/brief'
import Button from '@/components/shared/buttons/button'
import SecondaryButton from '@/components/shared/buttons/secondary-button'
import Container from '@/components/shared/container'
import Creator from '@/components/shared/creator'
import GalleryImageCart from '@/components/shared/gallary-image-cart'
import Guidelines from '@/components/shared/guidelines/guidelines'
import Modal from '@/components/shared/modal'
import Prizes from '@/components/shared/prizes/prizes'
import Tab from '@/components/shared/tab'
import useLocales from '@/hooks/useLocales'
import UserLayout from '@/layouts/user-layout'
import { cn } from '@/lib/utils'
import { router, useForm, usePage } from '@inertiajs/react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { route } from 'ziggy-js'

export default function SingleQuest() {
    const { quest, auth, joinedQuests, questImages, votes } = usePage<any>().props;
    const [joinModalOpen, setJoinModalOpen] = useState(false);
    const [libraryModalOpen, setLibraryModalOpen] = useState(false);
    const [voteModalOpen, setVoteModalOpen] = useState(false)

    const { post, setData, data } = useForm<any>({
        quest_id: quest.id,
        image: null
    })

    // images filter logic for library modal starts
    const currentJoinedQuest = joinedQuests?.filter((item: any) => item?.quest_id === quest.id)
    const currentJoinedQuestImage = currentJoinedQuest?.map((item: any) => item?.quest_images?.map(item => item?.image))?.flat()
    const isJoined = joinedQuests?.map((item: any) => item.quest_id).includes(quest.id)
    const othersJoinedQuests = joinedQuests?.filter((item: any) => {
        if (item?.quest_id !== quest.id) {
            return true
        } else {
            return false
        }
    })
    const othersJoinedQuestImage = othersJoinedQuests?.map((item: any) => item?.quest_images?.map(item => item?.image))?.flat()
    const images = othersJoinedQuestImage?.filter((item: any) => !currentJoinedQuestImage?.includes(item))
    // images filter logic for library modal ends

    // Voting items logic starts
    const allItems = questImages
    const votingItems = allItems?.slice(((votes?.length || 0) * 2), allItems?.length)?.filter((item: any) => {
        return !votes?.map((vote: any) => vote?.image_id)?.includes(item?.id)
    })
    // Voting items logic ends

    console.log(votes, allItems, questImages)

    const setImage = (image: any) => {
        setData('image', image)
    }

    const galleryImage = quest?.quest_join?.map((joinedQuest: any) => joinedQuest?.quest_images?.map(item => {
        return { image: item?.image, user: joinedQuest?.user }
    }))?.flat()


    const [activeTab, setActiveTab] = useState("brief");
    const { t, direction } = useLocales()

    const handleJoinQuest = async (e) => {
        e.preventDefault()
        if (quest?.entry_coin < auth?.user?.pixel) {
            post(route('join-quest', quest.id), {
                onSuccess: () => {
                    toast.success('Join Quest Successfully')
                    setJoinModalOpen(false)
                    setLibraryModalOpen(false)
                }
            })
        } else {
            toast.error('Not enough Pixels')
            router.visit('/store')
        }

    }
    return (
        <UserLayout>
            <Banner src={"/storage/" + quest?.image} containerClass='lg:h-[70vh]' hasOverlay={false}>
                <div className='w-full h-full flex flex-col justify-center items-center'>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white'>{quest?.title}</h1>
                    <p className='text-gray-400 mt-4 mb-4'>#{quest?.category?.name}</p>
                    <div className="flex items-center gap-2 mb-5 text-xl">
                        <img src="/images/coin.png" alt="" className="w-6 h-6" />
                        <p>{quest?.entry_coin}</p>
                    </div>
                    <div className='grid gap-4 grid-cols-2'
                    >
                        <SecondaryButton text={t('singleQuest.banner.voteText')} className="bg-primary-color text-white"
                            onClick={() => setVoteModalOpen(true)}
                        />
                        <Button text={t(isJoined ? 'singleQuest.banner.addEntryText' : 'singleQuest.banner.joinNowText')} className='px-8 py-2 lg:text-sm' type='button' onClick={() => setJoinModalOpen(true)} />
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
                    <Prizes t={t} prizes={quest?.prizes} />
                    <div className='flex flex-col xl:flex-row justify-between gap-14 md:gap-20 lg:gap-0'>
                        <Guidelines t={t} level_requirement={quest?.level_requirement} categories_requirement={quest?.categories_requirement} copyright_requirement={quest?.copyright_requirement} />
                        <div className='className="w-fit lg:w-full md:max-w-md mt-auto mx-auto lg:mx-0'>
                            <Creator user={quest?.user} />
                        </div>
                    </div>
                </div>
                <div className={cn('px-2 space-y-14 md:space-y-20 lg:space-y-10', activeTab !== "entries" && "hidden")}>
                    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                        {galleryImage?.map((item, index) => (
                            <div key={index} className="break-inside-avoid rounded overflow-hidden shadow-lg">
                                <GalleryImageCart item={item} />
                            </div>
                        ))}
                    </div>
                </div>
                <Modal
                    isOpen={joinModalOpen}
                    onClose={() => setJoinModalOpen(false)}
                    title='Join Quest'
                    containerClassName='w-full max-w-lg'
                >
                    <JoinModal handleJoinQuest={handleJoinQuest} image={data?.image} setImage={setImage} setLibraryModalOpen={setLibraryModalOpen} btnText={t(isJoined ? 'singleQuest.banner.addEntryText' : 'singleQuest.banner.joinNowText')} setJoinModalOpen={setJoinModalOpen} />
                </Modal>
                <Modal
                    isOpen={libraryModalOpen}
                    onClose={() => setLibraryModalOpen(false)}
                    title='Your Library'
                    containerClassName='w-full'
                >
                    <LibraryModal images={images} setImage={(value) => setData("image", value)} selectedImage={data?.image} handleJoinQuest={handleJoinQuest} btnText={t(isJoined ? 'singleQuest.banner.addEntryText' : 'singleQuest.banner.joinNowText')} />
                </Modal>

                <VoteModal questImages={votingItems} isOpen={voteModalOpen} onClose={() => setVoteModalOpen(false)} />
            </Container>
        </UserLayout>
    )
}
