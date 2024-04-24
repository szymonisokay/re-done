'use client'

import { Fragment } from 'react'

import { Breadcrumb } from '@/components/breadcrumbs/breadcrumb'
import { Breadcrumb as BreadcrumbType } from '@/components/breadcrumbs/types'
import { cn } from '@/lib/utils'

type Props = {
	breadcrumbs: BreadcrumbType[]
}

export const Breadcrumbs = ({ breadcrumbs }: Props) => {
	return (
		<div className='p-5 flex items-center min-h-[64px]'>
			{breadcrumbs.map((breadcrumb, index) => {
				return (
					<Fragment key={index}>
						{breadcrumb.isLoading ? (
							<Breadcrumb.Skeleton />
						) : (
							<Breadcrumb breadcrumb={breadcrumb} />
						)}

						{index < breadcrumbs.length - 1 && (
							<Breadcrumb.Separator className={cn('mx-2')} />
						)}
					</Fragment>
				)
			})}
		</div>
	)
}
