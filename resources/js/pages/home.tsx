import Container from '@/components/shared/container';
import useLocales from '@/hooks/useLocales';
import UserLayout from '@/layouts/user-layout';
import { usePage } from '@inertiajs/react';
import Banner from '../components/home/banner/home-banner';
import Gallery from '../components/home/Gallery';
import GetApp from '../components/home/get-app';
import Newest from '../components/home/newest/Newest';

export default function Home() {
    const { sliders, new_quest } = usePage().props;
    const { t } = useLocales();
    return (
        <UserLayout>
            <Banner t={t} sliders={sliders} />
            <Container className="my-10 space-y-14 md:my-16 md:space-y-20 lg:my-12 lg:space-y-28">
                <Newest t={t} newQuest={new_quest} />
                <Gallery title={t('home.gallery.title')} />
            </Container>
            <GetApp t={t} />
            {/* <AIGeneratedImageDetector /> */}
        </UserLayout>
    );
}
