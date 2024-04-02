'use client'

import { useQuery } from 'convex/react'
import { redirect } from 'next/navigation'
import qs from 'query-string'

import { Spinner } from '@/components/spinner'
import { api } from '@/convex/_generated/api'
import { useConvexUser } from '@/hooks/use-convex-user'

const DashboardPage = () => {
	const teamId = useQuery(api.teams.getLatestTeam)
	const { isLoading, user } = useConvexUser()

	if (isLoading || teamId === undefined) {
		return <Spinner fullPage />
	}

	if (teamId === null) {
		const url = qs.stringifyUrl(
			{
				url: '/onboarding',
				query: { token: user?.onboardingToken },
			},
			{ skipNull: true }
		)
		return redirect(url)
	}

	return redirect(`/dashboard/${teamId}`)
}

export default DashboardPage
