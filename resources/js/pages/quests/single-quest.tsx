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
import ImageActionButtons from '@/components/shared/image-action-buttons/image-action-buttons'
import ImageView from '@/components/shared/image-view/image-view'
import Modal from '@/components/shared/modal'
import NoData from '@/components/shared/no-data'
import Prizes from '@/components/shared/prizes/prizes'
import Tab from '@/components/shared/tab'
import useLocales from '@/hooks/useLocales'
import UserLayout from '@/layouts/user-layout'
import { cn } from '@/lib/utils'
import { AIImageDetector } from '@/utils/detector'
import { router, useForm, usePage } from '@inertiajs/react'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { route } from 'ziggy-js'

export default function SingleQuest() {

    const { quest, auth, joinedQuests, questImages, votes, isFollowing, userUploadedImages } = usePage<any>().props;

    const [isImageViewOpen, setIsImageViewOpen] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    const [joinModalOpen, setJoinModalOpen] = useState(false);
    const [libraryModalOpen, setLibraryModalOpen] = useState(false);
    const [voteModalOpen, setVoteModalOpen] = useState(false)

    const isJoined = joinedQuests?.map((item: any) => item.quest_id).includes(quest.id)

    const isDisabled = useMemo(() => {
        const today = new Date(); // current date
        const startDate = new Date(quest.start_date);
        const endDate = new Date(quest.end_date);
        // disable if today is before start or after end
        return today < startDate || today > endDate || !isJoined;
    }, [quest.start_date, quest.end_date]);


    const { post, setData, data } = useForm<any>({
        quest_id: quest.id,
        image: null
    })

    // get quest images array
    const currentQuestImage = questImages?.map((item: any) => item?.image)

    // get all images for library modal
    const libraryImages = userUploadedImages?.filter((item: any) => item?.quest_id !== quest.id).filter((item: any) => !currentQuestImage?.includes(item?.image))?.map((item: any) => item?.image)


    // Voting items logic starts
    const allItems = questImages
    const votingItems = allItems?.slice(((votes?.length || 0) * 2), allItems?.length)?.filter((item: any) => {
        return !votes?.map((vote: any) => vote?.image_id)?.includes(item?.id)
    })

    const setImage = (image: any) => {
        setData('image', image)
    }


    const [activeTab, setActiveTab] = useState("brief");
    const { t, direction, currentLanguage } = useLocales()

    const handleJoinQuest = async (e) => {
        if (typeof data?.image !== "string") {
            const isGenerated = await AIImageDetector(data?.image, quest?.quest_type?.name);
            if (isGenerated) {
                toast.error('This image is AI-generated or not in the right category. Please upload a valid image.');
                return;
            }
        }
        if (quest?.entry_coin < auth?.user?.pixel) {
            post(route('join-quest', quest.id), {
                onSuccess: () => {
                    toast.success('Join Quest Successfully')
                    setJoinModalOpen(false)
                    setLibraryModalOpen(false)
                    router.visit(route('single-quest', quest.id));
                }
            })
        } else {
            toast.error('Not enough Pixels')
            router.visit('/store')
        }

    }


    const handleFollow = () => {
        router.post(route('follow-user'), {
            followed_id: quest?.user?.id
        });
    }

    return (
        <UserLayout>
            <Banner src={"/storage/" + quest?.image} containerClass='lg:h-[70vh]'>
                <div className='w-full h-full flex flex-col justify-center items-center'>
                    <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white'>{currentLanguage === 'en' ? quest?.title_en : quest?.title_ar}</h1>
                    <p className='text-gray-100 mt-4 mb-4'>#{quest?.quest_type?.name}</p>
                    <div className="flex items-center gap-2 mb-5 text-xl">
                        <img src="/images/coin.png" alt="" className="w-6 h-6" />
                        <p className='text-gray-100'>{quest?.entry_coin}</p>
                    </div>
                    {new Date(quest?.end_date) >= new Date() ? (
                        <div className='grid gap-4 grid-cols-2'>
                            <SecondaryButton
                                disabled={isDisabled || votingItems?.length === 0}
                                text={t('singleQuest.banner.voteText')}
                                className="bg-primary-color text-white disabled:bg-gray-500"
                                onClick={() => setVoteModalOpen(true)}
                            />
                            <Button
                                text={t(isJoined ? 'singleQuest.banner.addEntryText' : 'singleQuest.banner.joinNowText')}
                                className='px-8 py-2 lg:text-sm disabled:!bg-gray-600'
                                type='button'
                                onClick={() => setJoinModalOpen(true)}
                            />
                        </div>
                    ) : (
                        <p className='text-gray-100'>Quest is closed</p>
                    )}
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
                    <Brief title={t('singleQuestDetails.brief.title')} text={currentLanguage === 'en' ? quest?.brief_en : quest?.brief_ar} />
                    <Prizes t={t} prizes={quest?.prizes} />
                    <div className='flex flex-col xl:flex-row justify-between gap-14 md:gap-20 lg:gap-0'>
                        <Guidelines t={t}
                            level_requirement={currentLanguage === 'en' ? quest?.level_requirement_en : quest?.level_requirement_ar}
                            categories_requirement={currentLanguage === 'en' ? quest?.categories_requirement_en : quest?.categories_requirement_ar}
                            copyright_requirement={currentLanguage === 'en' ? quest?.copyright_requirement_en : quest?.copyright_requirement_ar}
                        />
                        <div className='className="w-fit lg:w-full md:max-w-md mt-auto mx-auto lg:mx-0'>
                            <Creator user={quest?.user} onClick={handleFollow} btnText={isFollowing ? t('shared.unfollow') : t('shared.follow')} />
                        </div>
                    </div>
                </div>
                <div className={cn('px-2 space-y-14 md:space-y-20 lg:space-y-10', activeTab !== "entries" && "hidden")}>
                    {
                        questImages?.length > 0 ? (<>
                            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
                                {questImages?.map((item, index) => (
                                    <div key={index} className="break-inside-avoid rounded overflow-hidden shadow-lg">
                                        <GalleryImageCart
                                            onClick={() => {
                                                setIsImageViewOpen(true)
                                                setImageIndex(index)
                                            }}
                                            item={{
                                                image: item?.image,
                                                user: item?.user
                                            }}
                                            actionButtons={
                                                <ImageActionButtons data={{
                                                    id: item?.id,
                                                    image: item?.image,
                                                    user: item?.user
                                                }}

                                                />
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </>) : (<NoData text='No images found for this quest' />)
                    }
                </div>
                <Modal
                    isOpen={joinModalOpen}
                    onClose={() => setJoinModalOpen(false)}
                    title={t("singleQuest.joinedQuestModal.title")}
                    containerClassName='w-full max-w-lg'
                >
                    <JoinModal handleJoinQuest={handleJoinQuest} image={data?.image} setImage={setImage} setLibraryModalOpen={setLibraryModalOpen} isJoined={isJoined} setJoinModalOpen={setJoinModalOpen} t={t} />
                </Modal>
                <Modal
                    isOpen={libraryModalOpen}
                    onClose={() => setLibraryModalOpen(false)}
                    title={t("singleQuest.libraryModal.title")}
                    containerClassName='w-full'
                >
                    <LibraryModal images={libraryImages} setImage={(value) => setData("image", value)} selectedImage={data?.image} handleJoinQuest={handleJoinQuest} isJoined={isJoined} t={t} />
                </Modal>

                <VoteModal questImages={votingItems} isOpen={voteModalOpen} onClose={() => setVoteModalOpen(false)} questId={quest?.id} />

                {
                    isImageViewOpen && <ImageView isOpen={isImageViewOpen} setIsOpen={setIsImageViewOpen} data={questImages?.map((item) => ({ image: item?.image, user: item?.user, id: item?.id }))} index={imageIndex} />
                }
            </Container>
        </UserLayout>
    )
}
