'use client'

import { useConvexAuth } from 'convex/react'
import { redirect, usePathname, useSearchParams } from 'next/navigation'
import { Fragment, ReactNode } from 'react'

import Loading from '@/app/loading'
import { createUrl } from '@/utils/create-url'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { isLoading, isAuthenticated } = useConvexAuth()
	const pathname = usePathname()
	const params = useSearchParams()

	if (isLoading) {
		return <Loading />
	}

	if (!isAuthenticated) {
		const url = createUrl('/sign-in', {
			redirectUrl: createUrl(pathname, params.toString()),
		})

		return redirect(url)
	}

	return <Fragment>{children}</Fragment>
}
