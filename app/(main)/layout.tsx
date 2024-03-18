import { ReactNode } from 'react'

import { Sidebar } from '@/components/sidebar/sidebar'
import { Topbar } from '@/components/topbar/topbar'

type Props = {
	children: ReactNode
}

const MainLayout = ({ children }: Props) => {
	return (
		<section className='h-full flex'>
			<Sidebar />
			<section className='flex-1'>
				<Topbar />
				<main className='h-full p-5'>{children}</main>
			</section>
		</section>
	)
}

export default MainLayout
