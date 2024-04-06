'use client'

import { useSignUp } from '@clerk/clerk-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRightIcon, RefreshCwIcon } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
	FormValues,
	formSchema,
} from '@/components/forms/verify-email-form/schema'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp'

export const VerifyEmailForm = () => {
	const { signUp, setActive, isLoaded } = useSignUp()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			code: '',
		},
	})

	const onSubmit = async ({ code }: FormValues) => {
		try {
			if (!isLoaded) {
				return
			}

			const verified = await signUp.attemptEmailAddressVerification({
				code,
			})

			if (verified.status !== 'complete') {
				toast.error('Could not verify email. Please try again.')
			}

			await setActive({ session: verified.createdSessionId })
			form.reset()
		} catch (error: any) {
			toast.error(error.errors[0].code)
		}
	}

	const onGenerateNewCode = async () => {
		try {
			if (!isLoaded) {
				return
			}

			toast.promise(
				signUp.prepareEmailAddressVerification({
					strategy: 'email_code',
				}),
				{
					loading: 'Generating new code...',
					success: 'Code generated successfully',
					error: 'Could not generate code. Please try again.',
				}
			)
		} catch (error: any) {
			console.log(error.errors[0].code)
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col'
			>
				<div className='flex items-start gap-2'>
					<FormField
						control={form.control}
						name='code'
						render={({ field }) => (
							<FormItem className='space-y-1'>
								<FormLabel>Verification code</FormLabel>
								<FormControl>
									<InputOTP maxLength={6} {...field}>
										<InputOTPGroup>
											<InputOTPSlot index={0} />
											<InputOTPSlot index={1} />
											<InputOTPSlot index={2} />
										</InputOTPGroup>
										<InputOTPSeparator />
										<InputOTPGroup>
											<InputOTPSlot index={3} />
											<InputOTPSlot index={4} />
											<InputOTPSlot index={5} />
										</InputOTPGroup>
									</InputOTP>
								</FormControl>
								<FormMessage className='pt-1' />
							</FormItem>
						)}
					/>
					<Button
						variant='accent'
						className='w-full h-10 group mt-[28px]'
					>
						<ArrowRightIcon className='w-5 h-5 group-hover:translate-x-[2px] transition' />
					</Button>
				</div>

				<Button
					type='button'
					variant='unstyled'
					onClick={onGenerateNewCode}
					className='flex items-center w-fit p-1 px-2 ml-auto mt-2 rounded-sm cursor-pointer transition duration-200 hover:bg-background'
				>
					<RefreshCwIcon className='w-[14px] h-[14px] mr-2' />
					<p className='text-[13px]'>Generate new code</p>
				</Button>

				<p className='text-center text-sm mt-2'>
					<Link
						href='/sign-in'
						className='text-secondary hover:underline'
					>
						Back to Sign In
					</Link>
				</p>
			</form>
		</Form>
	)
}
