import { LuLayers } from "react-icons/lu";
import { TbTrophyFilled } from "react-icons/tb";
import CardActions from "./count-actions";
import useLocales from "@/hooks/useLocales";


export default function Card({ item, isSeries = false }: any) {
    const { currentLanguage } = useLocales()
    return (
        <div className="relative block w-full rounded-2xl overflow-hidden group cursor-pointer">

            {/* Background Image */}
            <img
                src={"/storage/" + item?.image}
                alt="Dochula Pass in Bhutan with a dog"
                className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bg-black/30 inset-0 w-full h-cull"></div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Top Content */}
            <div className="absolute top-0 right-0 p-4">
                <div className="bg-white/10 text-white px-5 py-1 rounded-full backdrop-blur-[3px] text-sm font-semibold ">
                    {
                        isSeries ? (
                            <span className="flex items-center gap-2">
                                <LuLayers /> <span>Series</span>
                            </span>
                        ) : (<>
                            #{item?.category?.name}
                        </>)
                    }
                </div>

            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">{currentLanguage === 'en' ? item?.title_en : item?.title_ar}</h2>
                        <div className="items-center border !border-white rounded-full flex justify-center gap-2 w-fit px-4 py-1">
                            <TbTrophyFilled />
                            <span className="text-sm font-medium ">
                                {
                                    isSeries ? item?.quests?.reduce((acc, current) => {
                                        acc += current?.entry_coin
                                        return acc
                                    }, 0) : item?.prizes?.reduce((acc, current) => {
                                        // acc += current?.prize
                                        console.log(current, "current")
                                        if (current?.prize_pool?.name?.toLowerCase() === "cash") {
                                            acc += current?.coin
                                        }
                                        return acc
                                    }, 0)
                                } USD</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        {!isSeries && (<div className="flex items-center gap-1 border border-primary px-2 py-1 rounded-full mb-2 text-xs">
                            <img src={"/images/coin.png"} alt="Old Crane in Gdansk at Night" className="w-4 h-4 rounded-full" />
                            <p>X {item?.entry_coin}</p>
                        </div>)
                        }
                        <span className="text-white bg-white/10 px-4 py-1 rounded-full backdrop-blur-[3px] text-[11px] font-semibold tracking-wider">
                            {
                                isSeries ? <span>@{item?.user?.name}</span> : <span>
                                    # {item?.vote_rights}
                                </span>
                            }
                        </span>
                    </div>
                </div>
            </div>

            {/* Card actions */}
            {
                !isSeries && (<CardActions data={{
                    end_date: item?.end_date,
                    id: item?.id,
                    hasVote: true,
                    hasJoin: true,
                }} />)
            }

        </div>
    );
}




