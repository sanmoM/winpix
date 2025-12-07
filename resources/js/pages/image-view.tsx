import ImageView from '@/components/shared/image-view/image-view'
import { useState } from 'react';

export default function page({ data }: any) {
    const [isImageViewOpen, setIsImageViewOpen] = useState(false);
    return (
        <div>
            <ImageView isOpen={isImageViewOpen} setIsOpen={setIsImageViewOpen} data={[]} hasClose={false} />
        </div>
    )
}
