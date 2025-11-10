import { Quest } from "@/types/quest";
import SectionHeading from "../../shared/SectionHeading";
import QuestCard from "./components/PhotoCard";
export default function Newest({ t, newQuest }: { t: any, newQuest: any }) {
    return (
        <div>
            <SectionHeading title={t("home.newest.title")} className=" !text-center" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {
                    newQuest?.map((item: Quest, index: number) => (
                        <QuestCard key={index} item={item} />
                    ))
                }
            </div>
        </div>
    )
}
