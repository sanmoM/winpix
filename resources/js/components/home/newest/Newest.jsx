import SectionHeading from "../../shared/SectionHeading";
import PhotoCard from "./components/PhotoCard";
export default function Newest() {
    return (
        <div>
            <SectionHeading title="Newest" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {
                    Array.from(Array(8).keys()).map((_, index) => (
                        <PhotoCard key={index} />
                    ))
                }
            </div>
        </div>
    )
}
