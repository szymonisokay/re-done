'use client'

import { OAuthStrategy } from '@clerk/types'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

import { Divider } from '@/components/divider'
import { FormValues, formSchema } from '@/components/forms/sign-up-form/schema'
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
import {
	ArrowRightIcon,
	EyeIcon,
	EyeOffIcon,
	LockIcon,
	MailIcon,
	UserIcon,
} from 'lucide-react'
import { useState } from 'react'

type Props = {
	isLoading: boolean
	onSubmit: (data: FormValues) => void
	onProviderLogin: (strategy: OAuthStrategy) => void
}

export const SignUpForm = ({ isLoading, onSubmit, onProviderLogin }: Props) => {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		mode: 'onChange',
		defaultValues: {
			firstName: '',
			emailAddress: '',
			password: '',
		},
	})

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
					name='firstName'
					render={({ field }) => (
						<FormItem className='space-y-1'>
							<FormLabel>First name</FormLabel>
							<FormControl>
								<div className='relative'>
									<UserIcon
										className='w-4 h-4 absolute top-[12px] left-[12px]'
										onClick={() =>
											form.setFocus('firstName')
										}
									/>
									<Input {...field} className='pl-10' />
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='emailAddress'
					render={({ field }) => (
						<FormItem className='space-y-1'>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<div className='relative'>
									<MailIcon
										className='w-4 h-4 absolute top-[12px] left-[12px]'
										onClick={() =>
											form.setFocus('emailAddress')
										}
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

					<Button
						variant='accent'
						disabled={isLoading}
						className='w-[60px] h-10 group'
					>
						<ArrowRightIcon className='w-5 h-5 group-hover:translate-x-[2px] transition' />
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
						disabled={isLoading}
						className='bg-background border border-border-secondary fill-foreground'
						onClick={() => onProviderLogin('oauth_google')}
					>
						<GoogleIcon className='w-5 h-5' />
					</Button>
					<Button
						type='button'
						disabled={isLoading}
						className='bg-background border border-border-secondary fill-foreground'
						onClick={() => onProviderLogin('oauth_github')}
					>
						<GithubIcon className='w-5 h-5 ' />
					</Button>
				</div>

				<p className='text-center text-sm'>
					Already have an account?{' '}
					<Link
						href='/sign-in'
						className='text-secondary hover:underline'
					>
						Sign In
					</Link>
				</p>
			</form>
		</Form>
	)
}
