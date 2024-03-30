import { ButtonHTMLAttributes, forwardRef } from 'react'

import { GithubIcon } from '@/components/icons/github'
import { GoogleIcon } from '@/components/icons/google'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	provider: 'Google' | 'Github'
}

export const SocialButton = forwardRef<HTMLButtonElement, Props>(
	({ provider, className, ...props }, ref) => {
		return (
			<Button
				ref={ref}
				className={cn('w-full hover:bg-primary/60', className)}
				{...props}
			>
				{provider === 'Google' ? (
					<GoogleIcon className='w-4 h-4 mr-2' />
				) : (
					<GithubIcon className='w-4 h-4 mr-2' />
				)}
				{provider}
			</Button>
		)
	}
)
