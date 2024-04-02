'use client'

import { SignInForm } from '@/components/forms/sign-in-form/form'

import { Header } from '../_components/header'

const SignInPage = () => {
	return (
		<main className='p-5 rounded-md bg-primary border border-border-secondary max-w-[400px] w-full'>
			<Header title='Welcome back' subtitle='Login into your account' />

			<SignInForm />
		</main>
	)
}

export default SignInPage
