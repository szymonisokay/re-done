'use client'

import Loading from '@/app/loading'
import { useConvexAuth } from 'convex/react'
import { redirect } from 'next/navigation'
import { Fragment, ReactNode } from 'react'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const { isLoading, isAuthenticated } = useConvexAuth()

	if (isLoading) {
		return <Loading />
	}

	if (!isAuthenticated) {
		redirect('/')
	}

	return <Fragment>{children}</Fragment>
}
