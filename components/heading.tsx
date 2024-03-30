import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { ComponentProps } from 'react'

type Props = ComponentProps<'div'> & {
	title: string
	subtitle?: string
	truncate?: boolean
	icon?: LucideIcon
	classNameIcon?: string
	classNameTitle?: string
}

export const Heading = ({
	title,
	subtitle,
	truncate,
	icon: Icon,
	className,
	classNameIcon,
	classNameTitle,
	...rest
}: Props) => {
	return (
		<div className={cn('space-y-3', className)} {...rest}>
			<div
				className={cn(
					'w-20 h-20 rounded-[6px] bg-primary shadow-xl flex justify-center items-center mb-8 mx-auto',
					classNameIcon
				)}
			>
				{Icon && <Icon className='w-8 h-8' />}
			</div>
			<h2
				className={cn(
					'text-3xl text-foreground font-bold tracking-tight leading-none',
					classNameTitle
				)}
			>
				{title}
			</h2>
			{subtitle && (
				<p
					className={cn(
						'text-[14px] text-secondary text-balance',
						truncate && 'truncate'
					)}
				>
					{subtitle}
				</p>
			)}
		</div>
	)
}
