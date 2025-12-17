import { LuLayers } from "react-icons/lu";
import { TbTrophyFilled } from "react-icons/tb";
import CardActions from "./count-actions";


export default function Card({ item, isSeries = false }: any) {
    console.log(item)
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
                        <h2 className="text-2xl font-bold mb-2">{item?.title}</h2>
                        <div className="items-center border !border-white rounded-full flex justify-center gap-2 w-fit px-4 py-1">
                            <TbTrophyFilled />
                            <span className="text-sm font-medium ">
                                {
                                    isSeries ? item?.quests?.reduce((acc, current) => {
                                        acc += current?.entry_coin
                                        return acc
                                    }, 0) : item?.entry_coin
                                } USD</span>
                        </div>
                    </div>
                    <span className="text-white bg-white/10 px-4 py-1 rounded-full backdrop-blur-[3px] text-[11px] font-semibold tracking-wider">@{item?.user?.name}</span>
                </div>
            </div>

            {/* Card actions */}
            {
                !isSeries && ( <CardActions data={{
                    end_date: item?.end_date,
                    id: item?.id,
                    hasVote: true,
                    hasJoin: true,
                }} />)
            }

        </div>
    );
}




