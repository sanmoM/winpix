import Gallery from '@/components/home/Gallery'
import Stats from '@/components/profile/stats'
import Banner from '@/components/shared/banner'
import Container from '@/components/shared/container'
import Creator from '@/components/shared/creator'
import useLocales from '@/hooks/useLocales'
import UserLayout from '@/layouts/user-layout'
import type { PageProps as InertiaPageProps } from '@inertiajs/core'
import { usePage } from '@inertiajs/react'

interface PageProps extends InertiaPageProps {
  id: string
}

export default function Profile() {
  const { id } = usePage<PageProps>().props
  const { t } = useLocales()

  return (
    <UserLayout>
      <Banner src='https://cdn.pulsepx.com/user-resources/110012355/profile-cover' containerClass='lg:h-[89vh]'>
        <div className='flex justify-center items-center h-full'>
          <Creator containerClassName='flex-col-reverse lg:flex-row lg:flex-row-reverse' infoContainerClassName='items-center lg:items-start' imageClassName='w-32 h-32 !border-primary-color lg:w-40 lg:h-40 border-6 p-0.5' followBtnClassName='text-sm px-6 py-1.5' nameClassName='text-3xl text-white' >
            <div className='mt-4 flex gap-3 items-center'>
              <div>
                <h6 className='text-sm text-gray-400'>Followers</h6>
                <p className='font-semibold text-white'>12,345</p>
              </div>
              <div>
                <h6 className='text-sm text-gray-400'>Following</h6>
                <p className='font-semibold text-white'>12,345</p>
              </div>
            </div>
          </Creator>
        </div>
      </Banner>
      <Stats />
      <Container className="space-y-14 md:space-y-20 lg:space-y-28 my-10 md:my-16 lg:my-12">
        <Gallery title={t("profile.gallery.title")} />
      </Container>
    </UserLayout>
  )
}
