import SecondarySectionHeading from "@/components/shared/secondary-section-heading";
import React from "react";
import { IoShieldOutline } from "react-icons/io5";
import { PiCopyright } from "react-icons/pi";
import GuidelineItem from "./components/guideline-item";
const Guidelines: React.FC = () => {
    return (
        <div className="w-full">
            {/* Header */}
            {/* <h1 className="text-4xl font-bold mb-8 pb-2 border-b-2">
                Guidelines
            </h1> */}
            <SecondarySectionHeading title="Guidelines" className="mb-8 pb-2" />

            {/* Guidelines List */}
            <div className="space-y-6">
                {/* Guideline Card 1: Skill Rank */}
                <GuidelineItem
                    icon={<IoShieldOutline className="text-primary-color size-8" />}
                    title="Skill Rank"
                    description="Users of all Skill Ranks are welcome to submit to this Quest!"
                />

                {/* Guideline Card 2: Copyright */}
                <GuidelineItem
                    icon={<PiCopyright className="text-primary-color size-8" />}
                    title="Copyright"
                    description="Submissions must be your own, submissions must not be AI generated."
                />
            </div>
        </div>
    );
};

export default Guidelines;
