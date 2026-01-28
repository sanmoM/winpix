import Card from "@/components/shared/card/card";
import CustomSlider from "@/components/shared/custom-slider/CustomSlider";
import useLocales from "@/hooks/useLocales";
import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import QuestItem from "./components/quest-item";

const ImageViewSidebar = ({ data }: any) => {
    const [imageHistory, setImageHistory] = useState(null);
    const { currentLanguage, t } = useLocales()
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/image-history/${data?.id}`);
            const resData = await response.json();
            setImageHistory(resData)
        };
        fetchData();
    }, [data]);


    const positions = {}

    imageHistory?.ended_quest?.forEach((item: any) => {
        if (positions[item?.position]) {
            positions[item?.position] += 1
        } else {
            positions[item?.position] = 1
        }
    })


    return (
        <aside className="w-full lg:h-full bg-bg-primary p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <img
                        src={data?.user?.image ? "/storage/" + data?.user?.image : "/images/user-avatar.png"}
                        alt="User Avatar"
                        className="h-10 w-10 rounded-full"
                    />
                    <div>
                        <h1 className="font-semibold">{data?.user?.name}</h1>
                        <span className="text-sm text-gray-400">{data?.user?.level}</span>
                    </div>
                </div>
                {/* <Button text="Follow" className="px-6 py-1.5 mx-0" /> */}
            </div>

            <div className="space-y-4 my-8">
                {
                    imageHistory && (
                        <>
                            {
                                imageHistory?.ended_quest?.length > 0 && (
                                    <div className="mb-8 rounded-lg border p-4 mt-4 grid grid-cols-4">
                                        {
                                            Object.keys(positions).sort((a, b) => a - b)?.slice(0, 4).map((key: any) => (
                                                <div className="flex flex-col justify-center items-center gap-1">
                                                    <div className="p-3 bg-primary-color rounded-full">
                                                        <FaTrophy className="text-white text-3xl" />
                                                    </div>
                                                    <h2 className="text-lg font-bold !text-center">NO. {key}</h2>
                                                    <span className="text-sm text-gray-400 !text-center">+{positions[key]}</span>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                            {
                                imageHistory?.active_quest?.length > 0 && (
                                    <div>
                                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                                            {t('shared.imageView.activeQuest.title')}
                                        </h3>
                                        {
                                            imageHistory?.active_quest?.sort((a, b) => a?.position - b?.position)?.map((item: any) => (
                                                <CustomSlider mobileView={1} desktopView={1} tabletView={1}>
                                                    {
                                                        imageHistory?.active_quest?.map((item: any) => (
                                                            <Link href={`/quests/single-quest/${item?.id}`} key={item?.id} className="block ">
                                                                <Card item={item} />
                                                            </Link>
                                                        ))
                                                    }
                                                </CustomSlider>
                                            ))
                                        }
                                    </div>
                                )
                            }
                            {
                                imageHistory?.ended_quest?.length > 0 && (
                                    <div>
                                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                                            Quest History
                                        </h3>
                                        <ul className="space-y-3">
                                            {
                                                imageHistory?.ended_quest?.sort((a, b) => a?.position - b?.position)?.map((item: any) => (
                                                    <QuestItem
                                                        rank={`No. ${item?.position}`}
                                                        title={currentLanguage === 'en' ? item?.title_en : item?.title_ar}
                                                        date={item?.end_date}
                                                    />
                                                ))
                                            }
                                        </ul>
                                    </div>
                                )
                            }
                        </>
                    )
                }
            </div>
        </aside >
    )
};


export default ImageViewSidebar;