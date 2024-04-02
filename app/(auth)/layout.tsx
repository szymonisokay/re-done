'use client'

import { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
	return (
		<section className='h-full flex justify-center items-center'>
			{children}
		</section>
	)
}

export default AuthLayout
