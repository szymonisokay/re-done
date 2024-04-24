'use client'

import { ReactNode } from 'react'

import { Sidebar } from '@/components/sidebar/sidebar'
import { Topbar } from '@/components/topbar/topbar'
import { AuthProvider } from '@/providers/auth-provider'
import { UserProvider } from '@/providers/user-provider'

type Props = {
	children: ReactNode
}

const MainLayout = ({ children }: Props) => {
	return (
		<AuthProvider>
			<UserProvider>
				<section className='h-full flex'>
					<Sidebar />
					<section className='flex flex-col flex-1'>
						<Topbar />
						<main className='flex flex-col flex-1 overflow-y-auto'>
							{children}
						</main>
					</section>
				</section>
			</UserProvider>
		</AuthProvider>
	)
}

export default MainLayout
