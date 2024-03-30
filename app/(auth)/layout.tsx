'use client'

import { ReactNode } from 'react'

import { useCreateUser } from '@/hooks/use-create-user'
import { redirect } from 'next/navigation'

const AuthLayout = ({ children }: { children: ReactNode }) => {
	const { isLoading, url } = useCreateUser()

	if (!isLoading && url) {
		redirect(url)
	}

	return (
		<section className='h-full flex justify-center items-center'>
			{isLoading ? <p>loading</p> : children}
		</section>
	)
}

export default AuthLayout
