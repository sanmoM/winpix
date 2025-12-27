import { useState } from 'react';
import AddDetails from './components/add-details';
import AddImage from './components/add-image';

const JoinModal = ({ handleJoinQuest, data, setData, setLibraryModalOpen, isJoined, setJoinModalOpen, t }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState("addImage");


    const handleJoin = async () => {
        setIsLoading(true)
        await handleJoinQuest()
        setIsLoading(false)
    }

    const handleAddImage = () => {
        setCurrentStep("addDetails")
    }

    return (
        <div>
            {
                currentStep === "addImage" && <AddImage setImage={(value) => setData("image", value)}  t={t} setLibraryModalOpen={setLibraryModalOpen} setJoinModalOpen={setJoinModalOpen} handleAddImage={handleAddImage} />
            }

            {
                currentStep === "addDetails" && <AddDetails cameraData={data} setCameraData={setData} isJoined={isJoined} handleJoinQuest={handleJoinQuest} />
            }

        </div>
    );
};

export default JoinModal;
