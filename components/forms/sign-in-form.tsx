'use client'

import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { SocialButton } from '@/app/(auth)/_components/social-button'
import { Divider } from '@/components/divider'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useSignIn } from '@clerk/clerk-react'
import { OAuthStrategy } from '@clerk/types'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
	email: z.string().email(),
	password: z.string(),
})

type FormValues = z.infer<typeof formSchema>

export const SignInForm = () => {
	const { signIn } = useSignIn()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async ({ email, password }: FormValues) => {
		try {
			const data = await signIn?.create({
				identifier: email,
				password,
				redirectUrl: '/sign-in',
			})

			console.log(data)
		} catch (error: any) {
			console.log(error.errors)
		}
	}

	const handleProviderLogin = async (strategy: OAuthStrategy) => {
		await signIn?.authenticateWithRedirect({
			strategy,
			redirectUrl: '/sign-in',
			redirectUrlComplete: '/sign-in',
		})
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-4'
			>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='space-y-1'>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input autoComplete='off' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem className='space-y-1'>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type='password'
									autoComplete='off'
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<Button variant='accent'>Submit</Button>

				<Divider dividerText='OR' />

				<div className='flex items-center gap-4'>
					<SocialButton
						type='button'
						provider='Google'
						onClick={() => handleProviderLogin('oauth_google')}
					/>
					<SocialButton
						type='button'
						provider='Github'
						onClick={() => handleProviderLogin('oauth_github')}
					/>
				</div>
			</form>
		</Form>
	)
}
