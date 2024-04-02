import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type Props = ComponentProps<'div'> & {
	containerClassName?: string
}

export const Divider = ({
	children,
	className,
	containerClassName,
	...props
}: Props) => {
	return (
		<div className={cn('relative', containerClassName)}>
			<div
				{...props}
				className={cn(
					'w-full h-[0.5px] bg-border-secondary',
					className
				)}
			/>

			{children}
		</div>
	)
}

const DividerText = ({
	children,
	className,
	...props
}: ComponentProps<'div'>) => {
	return (
		<div
			className={cn(
				'absolute top-[50%] left-[0%] text-[12px] bg-background py-1 px-3',
				className
			)}
			{...props}
		>
			{children}
		</div>
	)
}

Divider.Text = DividerText
