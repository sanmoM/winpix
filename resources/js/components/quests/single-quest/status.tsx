import Progressbar from '@/components/shared/progressbar'
import SecondarySectionHeading from '@/components/shared/secondary-section-heading'
import { AiOutlineGlobal } from "react-icons/ai";
import { GiVote } from "react-icons/gi";

export default function Status() {
  return (
    <div>
      <SecondarySectionHeading title="Quest Status" />
      <div className='w-2/3  mt-3'>
        <div className='flex gap-2 items-center mb-1 ml-2'>
          <AiOutlineGlobal className='text-primary-color text-2xl' />
          <p className='text-lg'>Submit</p>
          <sub className='text-xs text-gray-500'>(10 days left)</sub>
        </div>
        <Progressbar progress={65} milestones={[25, 50, 75]} />

      </div>
      <div className='w-2/3  mt-3 ml-auto'>
        <Progressbar progress={65} milestones={[25, 50, 75]} />
        <div className='flex gap-2 items-center mt-1 ml-2'>
          <GiVote className='text-primary-color text-2xl' />
          <p className='text-lg'>Vote</p>
        </div>
      </div>
    </div>
  )
}
