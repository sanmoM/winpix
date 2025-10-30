import SecondarySectionHeading from "@/components/shared/secondary-section-heading";
import { IoShieldOutline } from "react-icons/io5";
import { PiCopyright } from "react-icons/pi";
import GuidelineItem from "./components/guideline-item";
const Guidelines = ({ t }: { t: (key: string) => string }) => {
    return (
        <div className="w-full">
            {/* Header */}
            {/* <h1 className="text-4xl font-bold mb-8 pb-2 border-b-2">
                Guidelines
            </h1> */}
            <SecondarySectionHeading className="mb-8 pb-2" title={t('singleQuest.guidelines.title')} />

            {/* Guidelines List */}
            <div className="space-y-6">
                {/* Guideline Card 1: Skill Rank */}
                <GuidelineItem
                    icon={<IoShieldOutline className="text-primary-color size-8" />}
                    title={t('singleQuest.guidelines.guideLines.0.title')}
                    description={t('singleQuest.guidelines.guideLines.0.description')}
                />

                {/* Guideline Card 2: Copyright */}
                <GuidelineItem
                    icon={<PiCopyright className="text-primary-color size-8" />}
                    title={t('singleQuest.guidelines.guideLines.1.title')}
                    description={t('singleQuest.guidelines.guideLines.1.description')}
                />
            </div>
        </div>
    );
};

export default Guidelines;
