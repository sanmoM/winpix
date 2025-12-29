import LibraryModal from '@/components/quests/single-quest/library-modal';
import JoinModal from '@/components/quests/single-quest/modals/join-modal/join-modal';
import NoPixelModalContents from '@/components/quests/single-quest/modals/no-pixel-modal-contents';
import VoteModal from '@/components/quests/single-quest/modals/vote-modal/vote-modal';
import Status from '@/components/quests/single-quest/status';
import Banner from '@/components/shared/banner';
import Brief from '@/components/shared/brief';
import Button from '@/components/shared/buttons/button';
import SecondaryButton from '@/components/shared/buttons/secondary-button';
import Container from '@/components/shared/container';
import Creator from '@/components/shared/creator';
import GalleryImageCart from '@/components/shared/gallary-image-cart';
import Guidelines from '@/components/shared/guidelines/guidelines';
import ImageActionButtons from '@/components/shared/image-action-buttons/image-action-buttons';
import ImageView from '@/components/shared/image-view/image-view';
import Modal from '@/components/shared/modal';
import NoData from '@/components/shared/no-data';
import Prizes from '@/components/shared/prizes/prizes';
import Tab from '@/components/shared/tab';
import useLocales from '@/hooks/useLocales';
import UserLayout from '@/layouts/user-layout';
import { cn } from '@/lib/utils';
import { AIImageDetector, extractImageMetadata } from '@/utils/detector';
import { router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { route } from 'ziggy-js';

export default function SingleQuest() {
    const {
        quest,
        auth,
        joinedQuests,
        questImages,
        votes,
        isFollowing,
        userUploadedImages,
    } = usePage<any>().props;
    const user = auth?.user;

    const [noPixelModalOpen, setNoPixelModalOpen] = useState(false);

    const [isImageViewOpen, setIsImageViewOpen] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    const [joinModalOpen, setJoinModalOpen] = useState(false);
    const [libraryModalOpen, setLibraryModalOpen] = useState(false);
    const [voteModalOpen, setVoteModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const isJoined = joinedQuests
        ?.map((item: any) => item.quest_id)
        .includes(quest.id);

    const isDisabled = (() => {
        if (user?.role === 'admin') return true;
        const today = new Date(); // current date
        const startDate = new Date(quest.start_date);
        const endDate = new Date(quest.end_date);
        // disable if today is before start or after end
        // return today < startDate || today > endDate || !isJoined;
        const votingRights = quest?.vote_rights;
        let hasVotingRight = false;
        if (votingRights === 'Public') {
            hasVotingRight = user?.role === 'user';
        } else if (votingRights === 'Judges') {
            hasVotingRight = user?.role === 'jury';
        } else if (votingRights === 'Hybrid') {
            hasVotingRight = true;
        }
        // if admin forsed open contest
        if (quest?.manual_override === 'Force_Open') {
            return !hasVotingRight;
        }
        return !(
            (today > startDate || today < endDate) &&
            quest?.manual_override === 'None' &&
            hasVotingRight
        );
    })();

    const { post, setData, data, processing } = useForm<any>({
        quest_id: quest.id,
        image: null,
        camera_brand: '',
        camera_model: '',
        lens: '',
        focal_length: '',
        aperture: '',
        shutter_speed: '',
        iso: '',
        date_captured: '',
    });

    // get quest images array
    const currentQuestImage = questImages?.map((item: any) => item?.image);

    // get all images for library modal
    const libraryImages = userUploadedImages
        ?.filter((item: any) => item?.quest_id !== quest.id)
        .filter((item: any) => !currentQuestImage?.includes(item?.image))
        ?.map((item: any) => item?.image);

    // Voting items logic starts
    const allItems = questImages;
    // const votingItems = allItems?.slice(((votes?.length || 0) * 2), allItems?.length)?.filter((item: any) => {
    //     return !votes?.map((vote: any) => vote?.image_id)?.includes(item?.id)
    // })
    const votingItems = allItems?.filter(votingItem => votingItem.user.id !== auth?.user?.id)?.slice(
        (votes?.length || 0) * 2,
        allItems?.length,
    );

    const [activeTab, setActiveTab] = useState('brief');
    const { t, direction, currentLanguage } = useLocales();

    const handleJoinQuest = async (e) => {
        setLoading(true)

        if (quest?.entry_coin <= auth?.user?.pixel) {
            if (typeof data?.image !== 'string') {
                const isGenerated = await AIImageDetector(
                    data?.image,
                    quest?.quest_type?.name,
                );
                if (isGenerated) {
                    toast.error(
                        'This image is AI-generated or not in the right category. Please upload a valid image.',
                    );
                    return;
                }
            }
            post(route('join-quest', quest.id), {
                onSuccess: () => {
                    toast.success('Join Quest Successfully');
                    setJoinModalOpen(false);
                    setLibraryModalOpen(false);
                    router.visit(route('single-quest', quest.id));
                },
            });
        } else {
            toast.error('Not enough Pixels');
            router.visit('/store');
        }
        setLoading(false)
    };

    const handleFollow = () => {
        router.post(route('follow-user'), {
            followed_id: quest?.user?.id,
        });
    };

    useEffect(() => {
        const getMetaData = async () => {
            if (typeof data?.image !== 'string') {
                const metadata = await extractImageMetadata(data?.image);
                setData('camera_brand', metadata?.camera_brand || '');
                setData('camera_model', metadata?.camera_model || '');
                setData('lens', metadata?.lens || '');
                setData('focal_length', metadata?.focal_length || '');
                setData('aperture', metadata?.aperture || '');
                setData('shutter_speed', metadata?.shutter_speed || '');
                setData('iso', metadata?.iso || '');
                setData('date_captured', metadata?.date_captured || '');
            }
        };
        getMetaData();
    }, [data?.image]);

    return (
        <UserLayout>
            <Banner
                src={'/storage/' + quest?.image}
                containerClass="lg:h-[70vh]"
            >
                <div className="flex h-full w-full flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
                        {currentLanguage === 'en'
                            ? quest?.title_en
                            : quest?.title_ar}
                    </h1>
                    <p className="mt-4 mb-4 text-gray-100">
                        #{quest?.quest_type?.name}
                    </p>
                    <div className="mb-5 flex items-center gap-2 text-xl">
                        <img
                            src="/images/coin.png"
                            alt=""
                            className="h-6 w-6"
                        />
                        <p className="text-gray-100">{quest?.entry_coin}</p>
                    </div>
                    {new Date(
                        new Date(quest?.end_date).setHours(23, 59, 59, 999),
                    ) > new Date() ? (
                        <div className="grid grid-cols-2 gap-4">
                            <SecondaryButton
                                disabled={
                                    isDisabled || votingItems?.length === 0
                                }
                                text={t('singleQuest.banner.voteText')}
                                className="bg-primary-color text-white disabled:bg-gray-500"
                                onClick={() => setVoteModalOpen(true)}
                            />
                            <Button
                                disabled={isDisabled}
                                text={t(
                                    isJoined
                                        ? 'singleQuest.banner.addEntryText'
                                        : 'singleQuest.banner.joinNowText',
                                )}
                                className="px-8 py-2 disabled:!bg-gray-600 lg:text-sm"
                                type="button"
                                onClick={() => {
                                    if (quest?.entry_coin > user?.pixel) {
                                        setNoPixelModalOpen(true);
                                    } else {
                                        setJoinModalOpen(true);
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <p className="text-gray-100">Quest is closed</p>
                    )}
                </div>
            </Banner>
            <Container className="my-10 space-y-14 md:my-16 md:space-y-20 lg:mt-8 lg:mb-28 lg:space-y-10">
                <Tab
                    options={[
                        { label: t('singleQuest.tabs.brief'), value: 'brief' },
                        {
                            label: t('singleQuest.tabs.entries'),
                            value: 'entries',
                        },
                    ]}
                    value={activeTab}
                    onChange={(val) => setActiveTab(val)}
                />
                <div
                    className={cn(
                        'space-y-14 px-2 md:space-y-20 lg:space-y-10',
                        activeTab !== 'brief' && 'hidden',
                    )}
                >
                    <Status t={t} direction={direction} />
                    <Brief
                        title={t('singleQuestDetails.brief.title')}
                        text={
                            currentLanguage === 'en'
                                ? quest?.brief_en
                                : quest?.brief_ar
                        }
                    />
                    <Prizes t={t} prizes={quest?.prizes} />
                    <div className="flex flex-col justify-between gap-14 md:gap-20 lg:gap-0 xl:flex-row">
                        <Guidelines
                            t={t}
                            level_requirement={
                                currentLanguage === 'en'
                                    ? quest?.level_requirement_en
                                    : quest?.level_requirement_ar
                            }
                            categories_requirement={
                                currentLanguage === 'en'
                                    ? quest?.categories_requirement_en
                                    : quest?.categories_requirement_ar
                            }
                            copyright_requirement={
                                currentLanguage === 'en'
                                    ? quest?.copyright_requirement_en
                                    : quest?.copyright_requirement_ar
                            }
                        />
                        <div className='className="w-fit mx-auto mt-auto md:max-w-md lg:mx-0 lg:w-full'>
                            <Creator
                                userFromParent={quest?.user}
                                onClick={handleFollow}
                                btnText={
                                    isFollowing
                                        ? t('shared.unfollow')
                                        : t('shared.follow')
                                }
                            />
                        </div>
                    </div>
                </div>
                <div
                    className={cn(
                        'space-y-14 px-2 md:space-y-20 lg:space-y-10',
                        activeTab !== 'entries' && 'hidden',
                    )}
                >
                    {questImages?.length > 0 ? (
                        <>
                            <div className="columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3 lg:columns-4">
                                {questImages?.map((item, index) => (
                                    <div
                                        key={index}
                                        className="break-inside-avoid overflow-hidden rounded shadow-lg"
                                    >
                                        <GalleryImageCart
                                            onClick={() => {
                                                setIsImageViewOpen(true);
                                                setImageIndex(index);
                                            }}
                                            item={{
                                                image: item?.image,
                                                user: item?.user,
                                            }}
                                            actionButtons={
                                                <ImageActionButtons
                                                    data={{
                                                        id: item?.id,
                                                        image: item?.image,
                                                        user: item?.user,
                                                    }}
                                                />
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <NoData text="No images found for this quest" />
                    )}
                </div>
                <Modal
                    isOpen={joinModalOpen}
                    onClose={() => setJoinModalOpen(false)}
                    title={t('singleQuest.joinedQuestModal.title')}
                    containerClassName="w-full max-w-lg"
                >
                    <JoinModal
                        handleJoinQuest={handleJoinQuest}
                        data={data}
                        setData={setData}
                        setLibraryModalOpen={setLibraryModalOpen}
                        isJoined={isJoined}
                        setJoinModalOpen={setJoinModalOpen}
                        t={t}
                        loading={processing || loading}
                    />
                </Modal>
                <Modal
                    isOpen={libraryModalOpen}
                    onClose={() => setLibraryModalOpen(false)}
                    title={t('singleQuest.libraryModal.title')}
                    containerClassName="w-full"
                >
                    <LibraryModal
                        images={libraryImages}
                        setImage={(value) => setData('image', value)}
                        selectedImage={data?.image}
                        handleJoinQuest={handleJoinQuest}
                        isJoined={isJoined}
                        t={t}
                    />
                </Modal>

                <VoteModal
                    questImages={votingItems}
                    isOpen={voteModalOpen}
                    onClose={() => setVoteModalOpen(false)}
                    questId={quest?.id}
                />

                {isImageViewOpen && (
                    <ImageView
                        isOpen={isImageViewOpen}
                        setIsOpen={setIsImageViewOpen}
                        data={questImages?.map((item) => ({
                            image: item?.image,
                            user: item?.user,
                            id: item?.id,
                        }))}
                        index={imageIndex}
                    />
                )}
            </Container>

            <Modal
                isOpen={noPixelModalOpen}
                onClose={() => setNoPixelModalOpen(false)}
                title={t('singleQuest.noPixelModal.title')}
                containerClassName="w-full max-w-lg"
            >
                <NoPixelModalContents
                    setIsOpen={setNoPixelModalOpen}
                    pixel={quest?.entry_coin}
                />
            </Modal>
        </UserLayout>
    );
}
