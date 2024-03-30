import { LoaderIcon } from 'lucide-react'
import { ComponentProps } from 'react'

import { Logo } from '@/components/logo/logo'
import { cn } from '@/lib/utils'

type Props = ComponentProps<'div'> & {
	showLogo?: boolean
	fullPage?: boolean
}

export const Spinner = ({ showLogo, fullPage, className, ...props }: Props) => {
	return (
		<div
			className={cn(
				'flex flex-col items-center',
				fullPage && 'w-full h-full justify-center',
				className
			)}
			{...props}
		>
			{showLogo && <Logo className='w-[100px] mb-10' />}

			<LoaderIcon className='w-6 h-6 animate-spin' />
		</div>
	)
}
