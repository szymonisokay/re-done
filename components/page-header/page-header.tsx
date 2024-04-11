'use client'

import { ReactNode } from 'react'

import { Breadcrumbs } from '@/components/breadcrumbs/breadcrumbs'
import { Breadcrumb } from '@/components/breadcrumbs/types'
import { Heading } from '@/components/heading'
import { cn } from '@/lib/utils'

type Props = {
	pageTitle: string
	breadcrumbs: Breadcrumb[]
	children?: ReactNode
	containerClassName?: string
}

export const PageHeader = ({
	pageTitle,
	breadcrumbs,
	children,
	containerClassName,
}: Props) => {
	return (
		<>
			<Breadcrumbs breadcrumbs={breadcrumbs} />
			<div
				className={cn(
					'p-5 border-b flex justify-between items-center',
					containerClassName
				)}
			>
				<Heading
					title={pageTitle}
					classNameTitle='uppercase text-2xl'
				/>

				{children}
			</div>
		</>
	)
}
