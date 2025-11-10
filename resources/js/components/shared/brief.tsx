import SecondarySectionHeading from '@/components/shared/secondary-section-heading'

export default function Brief({ title, text }: { title: string, text: string }) {
    return (
        <div >
            <SecondarySectionHeading title={title} />
            <p className='text-gray-500'>{text}</p>
        </div>
    )
}
