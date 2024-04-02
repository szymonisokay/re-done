'use client'

import { redirect } from 'next/navigation'
import qs from 'query-string'
import { ReactNode } from 'react'

import { Sidebar } from '@/components/sidebar/sidebar'
import { Spinner } from '@/components/spinner'
import { Topbar } from '@/components/topbar/topbar'
import { useCreateUser } from '@/hooks/use-create-user'
import { AuthProvider } from '@/providers/auth-provider'

type Props = {
	children: ReactNode
}

const MainLayout = ({ children }: Props) => {
	const { isLoading, token, user } = useCreateUser()

	if (isLoading || user === undefined) {
		return <Spinner fullPage />
	}

	if (!isLoading && token) {
		const url = qs.stringifyUrl({ url: '/onboarding', query: { token } })

		return redirect(url)
	}

	return (
		<AuthProvider>
			<section className='h-full flex'>
				<Sidebar />
				<section className='flex flex-col flex-1'>
					<Topbar />
					<main className='flex-1 p-5'>{children}</main>
				</section>
			</section>
		</AuthProvider>
	)
}

export default MainLayout
