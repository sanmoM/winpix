import Button from '@/components/shared/buttons/button';
import { useState } from 'react';
import AddDetails from './components/add-details';
import AddImage from './components/add-image';

const JoinModal = ({ handleJoinQuest, image, setImage, setLibraryModalOpen, isJoined, setJoinModalOpen, t }: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState("addImage");
    const [cameraData, setCameraData] = useState({
        model: "",
        lens: "",
        focus: "",
        iso: "",
    });

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
                currentStep === "addImage" && <AddImage setImage={setImage} t={t} setLibraryModalOpen={setLibraryModalOpen} setJoinModalOpen={setJoinModalOpen} handleAddImage={handleAddImage} />
            }

            {
                currentStep === "addDetails" && <AddDetails cameraData={cameraData} setCameraData={setCameraData} isJoined={isJoined} handleJoinQuest={handleJoinQuest} />
            }

        </div>
    );
};

export default JoinModal;
