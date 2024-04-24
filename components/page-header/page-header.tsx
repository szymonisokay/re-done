'use client'

import { ReactNode } from 'react'

import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs'
import { Breadcrumb } from '@/components/breadcrumbs/types'
import { Heading } from '@/components/heading'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

type Props = {
	pageTitle: string | ReactNode
	breadcrumbs: Breadcrumb[]
	children?: ReactNode
	containerClassName?: string
	isLoading?: boolean
}

export const PageHeader = ({
	pageTitle,
	breadcrumbs,
	children,
	containerClassName,
	isLoading,
}: Props) => {
	const title = isLoading ? <Skeleton className='w-[200px] h-8' /> : pageTitle

	return (
		<>
			<Breadcrumbs breadcrumbs={breadcrumbs} />
			<div
				className={cn(
					'p-5 border-b flex justify-between items-center',
					containerClassName
				)}
			>
				<Heading title={title} classNameTitle='uppercase text-2xl' />

				{children}
			</div>
		</>
	)
}
