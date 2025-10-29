import { cn } from '@/lib/utils';
import ImagePanel from './components/image-panel';
import ImageViewSidebar from './components/image-view-sidebar/image-view-sidebar';

export default function ImageView({ isOpen, setIsOpen }: { setIsOpen: any, isOpen: any }) {
    console.log(isOpen)
    return (
        <div className={cn("grid grid-cols-1 lg:grid-cols-[1fr_400px] w-[100vw] overflow-y-auto  fixed inset-0 z-[30]", isOpen ? "" : "hidden")}>
            <div className='w-full h-[50vh] lg:h-full overflow-hidden sticky top-0 z-10'>
                <ImagePanel setIsOpen={setIsOpen} />

            </div>
            <div className='w-full'>

                <ImageViewSidebar />
            </div>
        </div>
    );
}
