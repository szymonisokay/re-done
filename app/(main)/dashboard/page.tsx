'use client'

import { useQuery } from 'convex/react'
import { redirect } from 'next/navigation'

import Loading from '@/app/loading'
import { api } from '@/convex/_generated/api'
import { useGetUser } from '@/hooks/use-get-user'

const DashboardPage = () => {
	const { isLoading } = useGetUser()
	const teamId = useQuery(api.teams.getLatestTeam)

	if (isLoading || teamId === undefined) {
		return <Loading />
	}

	if (teamId === null) {
		return redirect('/create')
	}

	return redirect(`/dashboard/${teamId}`)
}

export default DashboardPage
