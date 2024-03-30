'use client'

import { Spinner } from '@/components/spinner'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { UserButton } from '@clerk/clerk-react'
import { useQuery } from 'convex/react'
import { redirect } from 'next/navigation'

type Params = {
	params: {
		teamId: string
	}
}

const DashboardTeamPage = ({ params }: Params) => {
	const team = useQuery(api.teams.get, {
		teamId: params.teamId as Id<'teams'>,
	})

	if (team === undefined) {
		return <Spinner fullPage />
	}

	if (team === null) {
		return redirect('/')
	}

	return (
		<div className='h-full'>
			<p>{team.name}</p>
			<UserButton afterSignOutUrl='/' />
		</div>
	)
}

export default DashboardTeamPage
