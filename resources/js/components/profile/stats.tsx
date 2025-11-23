import { FaTrophy } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { RiFolderUploadFill } from "react-icons/ri";
import Container from "../shared/container";
import { cn } from "@/lib/utils";



export default function Stats({ containerClassName, t, stats }: { containerClassName?: string, t: any, stats: any }) {
    console.log(stats)
    const statsData = [
        {
            Icon: <MdLeaderboard className="text-lg lg:text-4xl text-white" />,
            value: stats.currentLevel,
            title: t("stats.level"),

        },
        {
            Icon: <FaTrophy className="text-lg lg:text-4xl text-white" />,
            value: stats.totalQuests,
            title: t("stats.contests"),
        },
        {
            Icon: <RiFolderUploadFill className="text-lg lg:text-4xl text-white" />,
            value: stats.totalVotes,
            title: t("stats.votes"),
        },
    ]
    return (
        <div className={cn("grid grid-cols-3 gap-2 lg:gap-4 -translate-y-1/2 z-[15] relative -mb-12 lg:-mb-10 lg:w-fit mx-auto", containerClassName)}>
            {
                statsData.map((stat) => (
                    <div className="flex flex-col items-center justify-between bg-bg-primary py-2 md:py-4 lg:py-8 lg:min-w-xs rounded-lg">
                        <div className="bg-primary-color p-2 lg:p-4 rounded-full">
                            {stat.Icon}
                        </div>
                        <h1 className="!text-center  lg:text-2xl font-semibold my-1 lg:my-2">{stat.title}</h1>
                        <p className=" font-semibold text-xl lg:text-5xl  lobster-two-regular">{stat.value}</p>
                    </div>
                ))
            }
        </div>

    )
}
