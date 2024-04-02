'use client'

import { Header } from '@/app/(auth)/_components/header'
import { SignUpFormWrapper } from '@/components/forms/sign-up-form/wrapper'

const SignInPage = () => {
	return (
		<main className='p-5 rounded-md bg-primary border border-border-secondary max-w-[400px] w-full'>
			<Header
				title='Welcome to ReDone'
				subtitle='Create your account to continue'
			/>
			<SignUpFormWrapper />
		</main>
	)
}

export default SignInPage
