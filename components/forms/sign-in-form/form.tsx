'use client'

import { useSignIn } from '@clerk/clerk-react'
import { OAuthStrategy } from '@clerk/types'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	ArrowRight,
	EyeIcon,
	EyeOffIcon,
	LockIcon,
	MailIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Divider } from '@/components/divider'
import { FormValues, formSchema } from '@/components/forms/sign-in-form/schema'
import { GithubIcon } from '@/components/icons/github'
import { GoogleIcon } from '@/components/icons/google'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export const SignInForm = () => {
	const { signIn, isLoaded } = useSignIn()
	const router = useRouter()

	const [showPassword, setShowPassword] = useState<boolean>(false)

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async ({ email, password }: FormValues) => {
		try {
			if (!isLoaded) {
				return
			}

			toast.promise(
				signIn.create({
					identifier: email,
					password,
				}),
				{
					loading: 'Signing in...',
					success: () => {
						router.push('/dashboard')
						return 'Signed in successfully'
					},
					error: 'Could not sign in',
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

	const renderShowPasswordIcon = () => {
		const className =
			'w-4 h-4 absolute top-[12px] right-[12px] text-secondary cursor-pointer'

		return (
			<>
				{showPassword ? (
					<EyeOffIcon
						className={className}
						onClick={() => setShowPassword(false)}
					/>
				) : (
					<EyeIcon
						className={className}
						onClick={() => setShowPassword(true)}
					/>
				)}
			</>
		)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col gap-2'
			>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem className='space-y-1'>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<div className='relative'>
									<MailIcon
										className='w-4 h-4 absolute top-[12px] left-[12px]'
										onClick={() => form.setFocus('email')}
									/>
									<Input {...field} className='pl-10' />
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex items-end gap-2 mb-4'>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem className='space-y-1 flex-1'>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<div className='relative'>
										<LockIcon
											className='w-4 h-4 absolute top-[12px] left-[12px]'
											onClick={() =>
												form.setFocus('password')
											}
										/>
										<Input
											{...field}
											type={
												showPassword
													? 'text'
													: 'password'
											}
											className='px-10'
										/>

										{renderShowPasswordIcon()}
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button variant='accent' className='w-[60px] h-10 group'>
						<ArrowRight className='w-5 h-5 group-hover:translate-x-[2px] transition' />
					</Button>
				</div>

				<Divider containerClassName='mb-4'>
					<Divider.Text className='bg-primary -top-[9px] pl-0 py-0'>
						Or login with
					</Divider.Text>
				</Divider>

				<div className='flex items-center justify-center gap-2 mb-2'>
					<Button
						type='button'
						className='bg-background border border-border-secondary fill-foreground'
						onClick={() => onProviderLogin('oauth_google')}
					>
						<GoogleIcon className='w-5 h-5' />
					</Button>
					<Button
						type='button'
						className='bg-background border border-border-secondary fill-foreground'
						onClick={() => onProviderLogin('oauth_github')}
					>
						<GithubIcon className='w-5 h-5 ' />
					</Button>
				</div>

				<p className='text-center text-sm'>
					Don't have an account?{' '}
					<Link
						href='/sign-up'
						className='text-secondary hover:underline'
					>
						Sign Up
					</Link>
				</p>
			</form>
		</Form>
	)
}
