import Container from '@/components/shared/container'
import Creator from '@/components/shared/creator'
import Gallery from '@/components/shared/Gallery'
import CoinCard from '@/components/shared/profile/coin-card'
import LevelProgress from '@/components/shared/profile/lavel-progress'
import StatsCard from '@/components/shared/profile/stats-card'
import SectionHeading from '@/components/shared/SectionHeading'
import useLocales from '@/hooks/useLocales'
import UserLayout from '@/layouts/user-layout'
import { router, type PageProps as InertiaPageProps } from '@inertiajs/core'
import { useState } from 'react'
import { FaTrophy } from 'react-icons/fa'
import { RiFolderUploadFill } from 'react-icons/ri'
import { route } from 'ziggy-js'

interface PageProps extends InertiaPageProps {
  id: string
}

export default function Profile({ user, stats, isFollowing }: any) {
  // const user = usePage().props.auth.user;
  const { t } = useLocales();
  const [activeTab, setActiveTab] = useState("my-stats");
  const handleFollow = () => {
    router.post(route('follow-user'), {
      followed_id: user?.id
    });
  }

  return (
    <UserLayout>
      <div className=''>
        <div className='flex justify-center items-center bg-bg-primary h-[70vh] lg:h-[40vh]'>
          <Creator containerClassName='flex-col-reverse lg:flex-row lg:flex-row-reverse' infoContainerClassName='items-center lg:items-start' imageClassName='w-32 h-32 !border-primary-color lg:w-40 lg:h-40 border-6 p-0.5' followBtnClassName='text-sm px-6 py-1.5' nameClassName='text-3xl'
            btnText={isFollowing ? 'Unfollow' : 'Follow'}
            onClick={handleFollow}
            userFromParent={user}
          >
            <div className='mt-4 flex gap-3 items-center'>
              <div>
                <h6 className='text-sm text-gray-400'>{t("shared.followers")}</h6>
                <p className='font-semibold dark:text-white'>{stats.followers}</p>
              </div>
              <div>
                <h6 className='text-sm text-gray-400'>{t("shared.following")}</h6>
                <p className='font-semibold dark:text-white'>{stats.following}</p>
              </div>
            </div>
          </Creator>
        </div>
        <Container className='w-full lg:min-w-lg lg:w-fit mx-auto mt-4'>
          <LevelProgress displayValue={stats.currentLevel} level={stats.currentLevel} max={100} current={stats.currentLevel} containerClassName='' />
          <div className='grid grid-cols-3 gap-4 flex-1 mt-4'>
            <CoinCard item={{ src: "/images/coin.png", count: user.pixel }} />
            <CoinCard item={{ src: "/images/golden-coin.png", count: user.coin }} />
            <CoinCard item={{ src: "/images/cash.png", count: user.cash }} />
          </div>
          <div className='flex gap-4 mt-4'>
            <StatsCard item={{ icon: <FaTrophy className='w-6 h-6 lg:w-8 lg:h-8 text-white' />, label: user.joined_quests?.length }} />
            <StatsCard item={{ icon: <RiFolderUploadFill className='w-6 h-6 lg:w-8 lg:h-8 text-white' />, label: user?.votes_cast }} />
          </div>
        </Container>
        <Container className="space-y-14 md:space-y-20 lg:space-y-16 my-10 md:my-16 lg:mt-12 lg:mb-32 lg:mx-10">
          {
            user?.quest_images?.length > 0 && (
              <>
                <SectionHeading title={t("profile.tabs.photos")} />
                <Gallery galleryImages={user?.quest_images?.map(item => ({
                  id: item?.image?.id,
                  image: item?.image,
                  user
                }))} />
              </>
            )
          }
        </Container>
      </div>
    </UserLayout>
  )
}
