import Container from "@/components/shared/container";
import UserLayout from "@/layouts/user-layout";
import Banner from "../components/home/banner/Banner";
import PhotoCard from "../components/home/PhotoCard";
import SectionHeading from "../components/shared/SectionHeading";
import Gallery from "../components/home/Gallery";

export default function home() {
    return (
        <UserLayout>
            <Banner />
            <Container className="space-y-4 md:space-y-10 lg:space-y-20 my-4 md:my-10 lg:my-20">
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
                <Gallery />
            </Container>

        </UserLayout>
    )
}


