import { FaTrophy } from "react-icons/fa";
import { MdLeaderboard } from "react-icons/md";
import { RiFolderUploadFill } from "react-icons/ri";
import Container from "../shared/container";


const statsData = [
    {
        Icon: <MdLeaderboard className="text-xl lg:text-4xl" />,
        value: "49",
        title: "Level",

    },
    {
        Icon: <FaTrophy className="text-xl lg:text-4xl" />,
        value: "349",
        title: "Awards",
    },
    {
        Icon: <RiFolderUploadFill className="text-xl lg:text-4xl" />,
        value: "627",
        title: "Quests",
    },
]

export default function Stats() {
    return (
        <Container>
            <div className="grid grid-cols-3 gap-2 lg:gap-4 -translate-y-1/2 z-[100] relative -mb-10 lg:w-fit mx-auto">
                {
                    statsData.map((stat) => (
                        <div className="flex flex-col items-center justify-between bg-bg-primary py-4 lg:py-8 lg:min-w-xs rounded-lg">
                            <div className="bg-primary-color p-2 lg:p-4 rounded-full">
                                {stat.Icon}
                            </div>
                            {/* <h1 className="!text-center text-2xl font-semibold mt-2 mb-4">{stat.title}</h1> */}
                            <p className=" font-semibold text-2xl lg:text-5xl mt-2 lg:mt-4 lobster-two-regular">{stat.value}</p>
                        </div>
                    ))
                }
            </div>
        </Container>

    )
}
