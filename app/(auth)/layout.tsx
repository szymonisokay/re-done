'use client'

import { useCreateUser } from '@/hooks/use-create-user'
import { useUser } from '@clerk/clerk-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
	const { user } = useUser()
	const { createUser } = useCreateUser()
	const router = useRouter()
	const redirectUrl = useSearchParams().get('redirectUrl')

	useEffect(() => {
		const createUserIfNotExists = async () => {
			if (!user) return

			await createUser(user)
			router.push(redirectUrl ?? '/dashboard')
		}

		createUserIfNotExists()
	}, [user])

	return (
		<section className='h-full flex justify-center items-center'>
			{children}
		</section>
	)
}

export default AuthLayout
