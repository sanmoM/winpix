import { FaTrophy } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { RiFolderUploadFill } from "react-icons/ri";
import Container from "../shared/container";
import { cn } from "@/lib/utils";


const statsData = [
    {
        Icon: <MdLeaderboard className="text-lg lg:text-4xl text-white" />,
        value: "49",
        title: "Level",

    },
    {
        Icon: <FaTrophy className="text-lg lg:text-4xl text-white" />,
        value: "349",
        title: "Awards",
    },
    {
        Icon: <RiFolderUploadFill className="text-lg lg:text-4xl text-white" />,
        value: "627",
        title: "Quests",
    },
]

export default function Stats({ containerClassName }: { containerClassName?: string }) {
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
