import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

type Props = ComponentProps<'div'> & {
	value: number
}

export const TabsBadge = ({ className, value, ...props }: Props) => {
	return (
		<Badge
			{...props}
			className={cn(
				'ml-2 bg-accent/[8%] border-2 border-accent text-accent rounded-md px-1 min-w-6 justify-center',
				className
			)}
		>
			{value}
		</Badge>
	)
}
