'use client'

import { Header } from '@/app/(auth)/_components/header'
import { VerifyEmailForm } from '@/components/forms/verify-email-form/form'

const VerifyEmailPage = () => {
	return (
		<main className='p-5 rounded-md bg-primary border border-border-secondary max-w-[400px] w-full'>
			<Header
				title='Verify your account'
				subtitle='Enter the code we sent to your email'
			/>
			<VerifyEmailForm />
		</main>
	)
}

export default VerifyEmailPage
