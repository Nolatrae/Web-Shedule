import { ADMIN_PAGES } from '@/config/pages/admin.config'
import { PUBLIC_PAGES } from '@/config/pages/public.config'
import { getServerAuth } from '@/utils/server/get-server-auth'
import { redirect } from 'next/navigation'
import type { PropsWithChildren } from 'react'

export default async function Layout({ children }: PropsWithChildren<unknown>) {
	const user = await getServerAuth()

	if (user?.isLoggedIn)
		return redirect(user.isAdmin ? ADMIN_PAGES.HOME : PUBLIC_PAGES.HOME)

	return children
}
