'use client'

import { UserButton } from '@clerk/clerk-react'

import { Breadcrumb } from '@/components/breadcrumbs/types'
import { PageHeader } from '@/components/page-header/page-header'
import { Spinner } from '@/components/spinner'
import { useTeam } from '@/services/teams/use-team'
import { redirect } from 'next/navigation'

const breadcrumbs: Breadcrumb[] = [{ name: 'Dashboard' }]

const DashboardPage = () => {
	const { team } = useTeam()

	if (team === null) {
		return redirect('/')
	}

	return (
		<>
			<PageHeader pageTitle='Dashboard' breadcrumbs={breadcrumbs} />
			<div className='p-5'>
				{team === undefined ? (
					<Spinner className='pt-5' />
				) : (
					<>
						<p>{team.name}</p>
						<UserButton afterSignOutUrl='/' />
					</>
				)}
			</div>
		</>
	)
}

export default DashboardPage
