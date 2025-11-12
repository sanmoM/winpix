import Button from '@/components/shared/buttons/button'
import { cn } from '@/lib/utils'
import React from 'react'

export default function LibraryModal({ images, setImage, selectedImage, handleJoinQuest }: any) {
    return (
        <div>
            <div className='grid grid-cols-5 gap-4'>
                {
                    images?.map((image, index) => (
                        <img
                            onClick={() => setImage(image)}
                            src={"/storage/" + image} alt="" className={cn("w-full cursor-pointer aspect-square p-4 object-cover hover:border rounded-lg", selectedImage === image && "border")} key={index} />
                    ))
                }
            </div>
            {
                selectedImage && (
                    <Button text='Join' onClick={handleJoinQuest} className='mt-4 px-6 lg:px-14 text-lg' />
                )
            }
        </div>
    )
}
