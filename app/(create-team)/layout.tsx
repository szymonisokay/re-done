'use client'

import { AuthProvider } from '@/providers/auth-provider'
import { ReactNode } from 'react'

export const CreateTeamLayout = ({ children }: { children: ReactNode }) => {
	return (
		<AuthProvider>
			<section className='w-full h-full flex items-center justify-center'>
				{children}
			</section>
		</AuthProvider>
	)
}

export default CreateTeamLayout
