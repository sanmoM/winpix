import ImageView from '@/components/shared/image-view/image-view'
import UserLayout from '@/layouts/user-layout';
import { useState } from 'react';

export default function page({ data }: any) {
    const imageViewData = {
        image: data?.image,
        user: data?.user,
        id: data?.id
    }

    console.log(imageViewData)
    return (
        <UserLayout>
            <ImageView isOpen={true} setIsOpen={() => { }} data={[imageViewData]} hasClose={false} containerClassName='static' />
        </UserLayout>
    )
}
