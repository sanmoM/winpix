import SectionHeading from "../../shared/SectionHeading";
import QuestCard from "./components/PhotoCard";
export default function Newest({t}: any) {
    const photos = [
        {
            imageUrl: "/images/banner-1.jpg",
            title: "Newest",
            subtitle: "Newest",
            buttonText: "View",
            buttonClass: "bg-blue-500 hover:bg-blue-600"
        },
        {
            imageUrl: "/images/banner-2.jpg",
            title: "Newest",
            subtitle: "Newest",
            buttonText: "View",
            buttonClass: "bg-blue-500 hover:bg-blue-600"
        },
        {
            imageUrl: "/images/banner-3.jpg",
            title: "Newest",
            subtitle: "Newest",
            buttonText: "View",
            buttonClass: "bg-blue-500 hover:bg-blue-600"
        },
        {
            imageUrl: "/images/banner-1.jpg",
            title: "Newest",
            subtitle: "Newest",
            buttonText: "View",
            buttonClass: "bg-blue-500 hover:bg-blue-600"
        },
        {
            imageUrl: "/images/banner-2.jpg",
            title: "Newest",
            subtitle: "Newest",
            buttonText: "View",
            buttonClass: "bg-blue-500 hover:bg-blue-600"
        },
        {
            imageUrl: "/images/banner-3.jpg",
            title: "Newest",
            subtitle: "Newest",
            buttonText: "View",
            buttonClass: "bg-blue-500 hover:bg-blue-600"
        },
        {
            imageUrl: "/images/banner-4.jpg",
            title: "Newest",
            subtitle: "Newest",
            buttonText: "View",
            buttonClass: "bg-blue-500 hover:bg-blue-600"
        },
        {
            imageUrl: "/images/banner-1.jpg",
            title: "Newest",
            subtitle: "Newest",
            buttonText: "View",
            buttonClass: "bg-blue-500 hover:bg-blue-600"
        }
    ]
    return (
        <div>
            <SectionHeading title={t("home.newest.title")} className=" !text-center" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {
                    photos?.map((item, index) => (
                        <QuestCard key={index} item={item} />
                    ))
                }
            </div>
        </div>
    )
}
