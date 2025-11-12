import SecondarySectionHeading from "@/components/shared/secondary-section-heading";
import { IoShieldOutline } from "react-icons/io5";
import { PiCopyright } from "react-icons/pi";
import GuidelineItem from "./components/guideline-item";
const Guidelines = ({ t, level_requirement, categories_requirement, copyright_requirement }: { t: any, level_requirement: string, categories_requirement: string, copyright_requirement: string }) => {
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
                    // description={t('singleQuest.guidelines.guideLines.0.description')}
                    description={level_requirement}
                />

                {/* Guideline Card 2: Copyright */}
                <GuidelineItem
                    icon={<PiCopyright className="text-primary-color size-8" />}
                    title={t('singleQuest.guidelines.guideLines.1.title')}
                    // description={t('singleQuest.guidelines.guideLines.1.description')}
                    description={copyright_requirement}
                />
            </div>
        </div>
    );
};

export default Guidelines;
