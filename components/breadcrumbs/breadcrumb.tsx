import Link from 'next/link'
import { ComponentProps } from 'react'

import { BreadcrumbSeparator } from '@/components/breadcrumbs/breadcrumb-separator'
import { Breadcrumb as BreadcrumbType } from '@/components/breadcrumbs/types'
import { cn } from '@/lib/utils'
import { useParams } from 'next/navigation'

type Props = ComponentProps<'span'> & {
	breadcrumb: BreadcrumbType
}

export const Breadcrumb = ({ breadcrumb, className, ...props }: Props) => {
	const params = useParams()
	const teamId = params.teamId as string

	const href = breadcrumb.href?.replace(':teamId', teamId)

	return (
		<>
			{href ? (
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
