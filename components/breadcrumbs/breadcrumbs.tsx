'use client'

import { Fragment } from 'react'

import { Breadcrumb } from '@/components/breadcrumbs/breadcrumb'
import { Breadcrumb as BreadcrumbType } from '@/components/breadcrumbs/types'
import { cn } from '@/lib/utils'

type Props = {
	breadcrumbs: BreadcrumbType[]
}

export const Breadcrumbs = ({ breadcrumbs }: Props) => {
	console.log(breadcrumbs)
	return (
		<div className='p-5'>
			<Breadcrumb.Separator className='mr-2' />
			{breadcrumbs.map((breadcrumb, index) => {
				console.log(index !== breadcrumbs.length - 1)
				return (
					<Fragment key={index}>
						<Breadcrumb breadcrumb={breadcrumb} />

						<Breadcrumb.Separator
							className={cn(
								'mx-2',
								!breadcrumb.href && 'text-foreground'
							)}
						/>
					</Fragment>
				)
			})}
		</div>
	)
}
