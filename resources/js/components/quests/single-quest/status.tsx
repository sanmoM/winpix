import Progressbar from '@/components/shared/progressbar'
import SecondarySectionHeading from '@/components/shared/secondary-section-heading'
import { cn } from '@/lib/utils';
import { AiOutlineGlobal } from "react-icons/ai";
import { GiVote } from "react-icons/gi";

export default function Status({ t, direction, quest, votes }: { t: any, direction?: string, quest: any, votes: any }) {
  const startDate = new Date("2026-04-05");
  const currentDate = new Date(); // today

  const diffTime = currentDate - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 0 && votes?.length === 0) return null;
  return (
    <div className='md:w-2/3'>
      <SecondarySectionHeading title={t('singleQuestDetails.status.title')} />
      <div className='w-2/3  mt-3'>
        <div className='flex gap-2 items-center mb-1 ml-2'>
          <AiOutlineGlobal className='text-primary-color text-2xl' />
          <p className='text-lg'>{t('singleQuestDetails.status.submit.title')}</p>
          <sub className='text-xs text-gray-500'>{diffDays} {t('singleQuestDetails.status.submit.daysLeft')}</sub>
        </div>
        <Progressbar progress={65} milestones={[25, 50, 75]} containerClassName={direction === 'left' ? 'rotate-0' : 'rotate-180'} />

      </div>
      <div className={cn('w-2/3  mt-3', direction === 'left' ? 'ml-auto' : 'mr-auto')}>
        <Progressbar progress={65} milestones={[25, 50, 75]} containerClassName={direction === 'left' ? 'rotate-0' : 'rotate-180'} />
        <div className='flex gap-2 items-center mt-1 ml-2'>
          <GiVote className='text-primary-color text-2xl' />
          <p className='text-lg'>{t('singleQuestDetails.status.vote.title')}</p>
          <sub className='text-xs text-gray-500'>{votes?.length || 0}</sub>
        </div>
      </div>
    </div>
  )
}
