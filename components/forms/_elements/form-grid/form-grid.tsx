import { ComponentPropsWithRef, forwardRef } from 'react'

import { cn } from '@/lib/utils'

type Props = ComponentPropsWithRef<'div'>

export const FormGrid = forwardRef<HTMLDivElement, Props>(
	({ children, className, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn('grid grid-cols-1 gap-4', className)}
				{...props}
			>
				{children}
			</div>
		)
	}
)
