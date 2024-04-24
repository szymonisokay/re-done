import { ComponentPropsWithRef, forwardRef } from 'react'

import { Heading } from '@/components/heading'
import { cn } from '@/lib/utils'

type Props = ComponentPropsWithRef<'section'> & {
	title: string
	titleClassName?: string
}

export const FormSection = forwardRef<HTMLDivElement, Props>(
	({ children, className, title, titleClassName, ...props }, ref) => {
		return (
			<section
				ref={ref}
				className={cn('space-y-4 mb-4', className)}
				{...props}
			>
				<Heading
					title={title}
					classNameTitle='text-sm uppercase tracking-wide'
					className='border-b pb-2'
				/>

				{children}
			</section>
		)
	}
)
