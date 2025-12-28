import useLocales from '@/hooks/useLocales';
import { LuLayers } from 'react-icons/lu';
import { TbTrophyFilled } from 'react-icons/tb';
import CardActions from './count-actions';

export default function Card({ item, isSeries = false }: any) {
    const { currentLanguage } = useLocales();
    return (
        <div className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl">
            {/* Background Image */}
            <img
                src={'/storage/' + item?.image}
                alt="Dochula Pass in Bhutan with a dog"
                className="aspect-[3/2] w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="h-cull absolute inset-0 w-full bg-black/30"></div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Top Content */}
            <div className="absolute top-0 right-0 p-4">
                <div className="rounded-full bg-white/10 px-5 py-1 text-sm font-semibold text-white backdrop-blur-[3px]">
                    {isSeries ? (
                        <span className="flex items-center gap-2">
                            <LuLayers /> <span>Series</span>
                        </span>
                    ) : (
                        <>#{item?.category?.name}</>
                    )}
                </div>
            </div>

            {/* Bottom Content */}
            <div className="absolute right-0 bottom-0 left-0 p-5 text-white">
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="mb-2 text-2xl font-bold">
                            {currentLanguage === 'en'
                                ? item?.title_en
                                : item?.title_ar}
                        </h2>
                        <div className="flex w-fit items-center justify-center gap-2 rounded-full border !border-white px-4 py-1">
                            <TbTrophyFilled />
                            <span className="text-sm font-medium">
                                {isSeries
                                    ? item?.quests?.reduce((acc, current) => {
                                          acc += current?.entry_coin;
                                          return acc;
                                      }, 0)
                                    : item?.prizes?.reduce((acc, current) => {
                                          // acc += current?.prize
                                          if (
                                              current?.prize_pool?.name?.toLowerCase() ===
                                              'cash'
                                          ) {
                                              acc += current?.coin;
                                          }
                                          return acc;
                                      }, 0)}{' '}
                                USD
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        {!isSeries && (
                            <div className="mb-2 flex items-center gap-1 rounded-full border border-primary px-2 py-1 text-xs">
                                <img
                                    src={'/images/coin.png'}
                                    alt="Old Crane in Gdansk at Night"
                                    className="h-4 w-4 rounded-full"
                                />
                                <p>X {item?.entry_coin}</p>
                            </div>
                        )}
                        <span className="rounded-full bg-white/10 px-4 py-1 text-[11px] font-semibold tracking-wider text-white backdrop-blur-[3px]">
                            {isSeries ? (
                                <span>@{item?.user?.name}</span>
                            ) : (
                                <span># {item?.vote_rights}</span>
                            )}
                        </span>
                    </div>
                </div>
            </div>

            {/* Card actions */}
            {!isSeries && (
                <CardActions
                    data={{
                        end_date: item?.end_date,
                        id: item?.id,
                        hasVote: true,
                        hasJoin: true,
                    }}
                />
            )}
        </div>
    );
}
