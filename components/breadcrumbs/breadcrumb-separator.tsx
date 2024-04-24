import { ChevronRight } from 'lucide-react'
import { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

type Props = ComponentProps<'span'>

export const BreadcrumbSeparator = ({ className, ...props }: Props) => {
	return (
		<span {...props} className={cn('text-sm text-secondary', className)}>
			<ChevronRight className='w-4 h-4 mt-[2px]' />
		</span>
	)
}
