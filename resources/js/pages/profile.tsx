import UserLayout from '@/layouts/user-layout'
import type { PageProps as InertiaPageProps } from '@inertiajs/core'
import { usePage } from '@inertiajs/react'

interface PageProps extends InertiaPageProps {
  id: string
}

export default function Profile() {
  const { id } = usePage<PageProps>().props

  return (
    <UserLayout>
      <div>Profile {id}</div>
    </UserLayout>
  )
}
