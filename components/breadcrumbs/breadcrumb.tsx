import Link from 'next/link'
import { ComponentProps } from 'react'

import { BreadcrumbSeparator } from '@/components/breadcrumbs/breadcrumb-separator'
import { Breadcrumb as BreadcrumbType } from '@/components/breadcrumbs/types'
import { Skeleton } from '@/components/ui/skeleton'
import { useCreateUrl } from '@/hooks/use-create-url'
import { cn } from '@/lib/utils'

type Props = ComponentProps<'span'> & {
	breadcrumb: BreadcrumbType
}

export const Breadcrumb = ({ breadcrumb, className, ...props }: Props) => {
	const { url: href } = useCreateUrl(breadcrumb.href)

	return (
		<>
			{breadcrumb.href ? (
				<Link href={href}>
					<span
						{...props}
						className={cn(
							'text-sm text-secondary duration-200 hover:text-foreground',
							className
						)}
					>
						{breadcrumb.name}
					</span>
				</Link>
			) : (
				<span
					{...props}
					className={cn('text-sm text-foreground', className)}
				>
					{breadcrumb.name}
				</span>
			)}
		</>
	)
}

Breadcrumb.Separator = BreadcrumbSeparator

const BreadcrumbSkeleton = () => {
	return <Skeleton className='w-32 h-4 inline-block' />
}

Breadcrumb.Skeleton = BreadcrumbSkeleton
