import Button from '@/components/shared/buttons/button';
import { useState } from 'react';
import AddDetails from './components/add-details';
import AddImage from './components/add-image';

const JoinModal = ({ handleJoinQuest, image, setImage, setLibraryModalOpen, isJoined, setJoinModalOpen, t }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState("addImage");

    const isShowButton = currentStep === "addDetails" && image;

    return (
        <div>
            {
                currentStep === "addImage" && <AddImage setImage={setImage} t={t} setLibraryModalOpen={setLibraryModalOpen} setJoinModalOpen={setJoinModalOpen} />
            }

            {
                currentStep === "addDetails" && <AddDetails />
            }
            {
                isShowButton && <div>
                    <Button text={t(isJoined ? 'singleQuest.banner.addEntryText' : 'singleQuest.banner.joinNowText')}
                        onClick={async () => {
                            setIsLoading(true)
                            await handleJoinQuest()
                            setIsLoading(false)
                        }}
                        className='mt-4 px-6 lg:px-14 text-lg'
                        loading={isLoading}
                        disabled={isLoading}
                    />
                </div>
            }
        </div>
    );
};

export default JoinModal;
