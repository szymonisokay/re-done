import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

type Props = ComponentProps<'span'>

export const BreadcrumbSeparator = ({ className, ...props }: Props) => {
	return (
		<span {...props} className={cn('text-sm text-secondary', className)}>
			/
		</span>
	)
}
