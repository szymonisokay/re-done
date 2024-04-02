'use client'

import { redirect } from 'next/navigation'
import { Fragment, ReactNode } from 'react'

import { Spinner } from '@/components/spinner'
import { useGetUser } from '@/hooks/use-get-user'

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const { user } = useGetUser()

	if (user === undefined) {
		return <Spinner fullPage />
	}

	if (user === null) {
		return redirect('/')
	}

	if (!user.teams.length) {
		return redirect('/create')
	}
	return <Fragment>{children}</Fragment>
}
