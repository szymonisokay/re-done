'use client'

import { UserButton } from '@clerk/clerk-react'
import { useQuery } from 'convex/react'
import { redirect } from 'next/navigation'

import { Breadcrumb } from '@/components/breadcrumbs/types'
import { PageHeader } from '@/components/page-header/page-header'
import { Spinner } from '@/components/spinner'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'

type Params = {
	params: {
		teamId: string
	}
}

const breadcrumbs: Breadcrumb[] = [{ name: 'Dashboard', href: '/dashboard' }]

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
		<>
			<PageHeader pageTitle='Dashboard' breadcrumbs={breadcrumbs} />
			<div>
				<p>{team.name}</p>
				<UserButton afterSignOutUrl='/' />
			</div>
		</>
	)
}

export default DashboardTeamPage
