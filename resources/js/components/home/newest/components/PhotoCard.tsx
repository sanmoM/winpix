import { TbTrophyFilled } from "react-icons/tb";


export default function PhotoCard() {
    return (
        <div className="relative w-full rounded-2xl overflow-hidden group cursor-pointer">

            {/* Background Image */}
            <img
                src="/images/banner-1.jpg"
                alt="Dochula Pass in Bhutan with a dog"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bg-black/30 inset-0 w-full h-cull"></div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

            {/* Top Content */}
            <div className="absolute top-0 right-0 p-4">
                <div className="bg-white/10 text-white px-5 py-1 rounded-full backdrop-blur-[3px] text-xs font-semibold">
                    #All
                </div>

            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="flex justify-between items-end">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Posing Dogs</h2>
                        <div className="items-center border border-white rounded-full flex justify-center gap-2 w-fit px-4 py-1">
                            <TbTrophyFilled />
                            <span className="text-sm font-medium ">50 USD</span>
                        </div>
                    </div>
                    <span className="text-white bg-white/10 px-4 py-1 rounded-full backdrop-blur-[3px] text-sm font-semibold tracking-wider">@polatina</span>
                </div>
            </div>

        </div>
    );
}
