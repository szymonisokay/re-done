'use client'

import { SignInForm } from '@/components/forms/sign-in-form'
import { Logo } from '@/components/logo/logo'

const SignInPage = () => {
	return (
		<main className='p-5 rounded-md bg-background border max-w-80 w-full'>
			<Logo />
			<SignInForm />
		</main>
	)
}

export default SignInPage
