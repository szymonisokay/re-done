import { useSignIn, useSignUp } from '@clerk/clerk-react'
import { OAuthStrategy } from '@clerk/types'
import { useState } from 'react'
import { toast } from 'sonner'

import { FormValues } from '@/components/forms/sign-up-form/schema'
import { useRouter } from 'next/navigation'
import { SignUpForm } from './form'

export const SignUpFormWrapper = () => {
	const { signUp, isLoaded } = useSignUp()
	const { signIn } = useSignIn()
	const router = useRouter()

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const onSubmit = async ({
		firstName,
		emailAddress,
		password,
	}: FormValues) => {
		try {
			if (!isLoaded) {
				return
			}

			toast.promise(
				signUp.create({
					firstName,
					emailAddress,
					password,
				}),
				{
					loading: 'Creating account...',
					success: () => {
						toast.promise(
							signUp.prepareEmailAddressVerification({
								strategy: 'email_code',
							}),
							{
								success: () => {
									router.replace('/verify-email')
									return 'Verification code was sent to your email address'
								},
								error: 'Could not send verification code',
							}
						)
						return 'Account created successfully'
					},
					error: 'Could not create account. Try again later.',
				}
			)
		} catch (error: any) {
			toast.error(error.errors[0].code)
		}
	}

	const onProviderLogin = async (strategy: OAuthStrategy) => {
		try {
			await signIn?.authenticateWithRedirect({
				strategy,
				redirectUrl: '/dashboard',
				redirectUrlComplete: '/dashboard',
			})
		} catch (error: any) {
			toast.error(error.errors[0].code)
		}
	}

	return (
		<SignUpForm
			isLoading={isLoading}
			onSubmit={onSubmit}
			onProviderLogin={onProviderLogin}
		/>
	)
}
