import Gallery from '@/components/home/Gallery'
import Stats from '@/components/profile/stats'
import Container from '@/components/shared/container'
import Creator from '@/components/shared/creator'
import Tab from '@/components/shared/tab'
import useLocales from '@/hooks/useLocales'
import UserLayout from '@/layouts/user-layout'
import { router, type PageProps as InertiaPageProps } from '@inertiajs/core'
import { useState } from 'react'
import { route } from 'ziggy-js'

interface PageProps extends InertiaPageProps {
  id: string
}

export default function Profile({ user, stats, isFollowing }: any) {
  // const user = usePage().props.auth.user;
  const { t } = useLocales();
  const [activeTab, setActiveTab] = useState("my-stats");
console.log(stats)
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
        <Container className="space-y-14 md:space-y-20 lg:space-y-16 my-10 md:my-16 lg:mt-12 lg:mb-32 lg:mx-10">
          <div className='w-fit mx-auto'>
            <Tab
              options={[
                { label: t("profile.tabs.stats"), value: "my-stats" },
                { label: t("profile.tabs.photos"), value: "my-photos" },
              ]}
              onChange={(val) => setActiveTab(val)}
            />
          </div>
          {
            activeTab === "my-stats" && <Stats containerClassName='translate-y-0 mb-0 md:mb-0 lg:mb-0' t={t} stats={stats} />
          }
          {
            activeTab === "my-photos" && <Gallery galleryImages={stats?.questImages?.map(item => ({
              image: {
                image: item?.image,
                user
              }
            }))} />
          }
        </Container>
      </div>
    </UserLayout>
  )
}
