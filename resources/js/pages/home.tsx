import Container from '@/components/shared/container';
import ImageView from '@/components/shared/image-view/image-view';
import useLocales from '@/hooks/useLocales';
import UserLayout from '@/layouts/user-layout';
import { usePage } from '@inertiajs/react';
import Banner from '../components/home/banner/home-banner';
import Gallery from '../components/shared/Gallery';
import GetApp from '../components/home/get-app';
import Newest from '../components/home/newest/Newest';
import { useState } from 'react';

export default function Home() {
    const { sliders, new_quest, galleryImages } = usePage().props;
    const { t } = useLocales();
    return (
        <UserLayout>
            <Banner t={t} sliders={sliders} />
            <Container className="my-10 space-y-14 md:my-16 md:space-y-20 lg:my-12 lg:space-y-28">
                <Newest t={t} newQuest={new_quest} />
                <Gallery
                    title={t('home.gallery.title')}
                    galleryImages={galleryImages?.map(item => ({
                        id: item?.image_id,
                        image: item?.image?.image,
                        user: item?.image?.user
                    }))}
                />
            </Container>
            <GetApp t={t} />


        </UserLayout>
    );
}
