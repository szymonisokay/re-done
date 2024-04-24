'use client'

import { useQuery } from 'convex/react'
import { redirect } from 'next/navigation'

import Loading from '@/app/loading'
import { api } from '@/convex/_generated/api'

const DashboardPage = () => {
	const teamId = useQuery(api.teams.getLatestTeam)

	if (teamId === undefined) {
		return <Loading />
	}

	if (teamId === null) {
		return redirect('/create')
	}

	return redirect(`/dashboard/${teamId}`)
}

export default DashboardPage
