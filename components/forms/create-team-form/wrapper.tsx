'use client'

import { useMutation, useQuery } from 'convex/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { Spinner } from '@/components/spinner'
import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'

import { createUrl } from '@/utils/create-url'
import { CreateTeamForm } from './create-team-form'
import { InviteMemberForm } from './invite-member-form'
import { FormValues } from './schema'

type Props = {
	user: Doc<'users'>
}

export const CreateTeamFormWrapper = ({ user }: Props) => {
	const router = useRouter()
	const pathname = usePathname()
	const teamId = useSearchParams().get('teamId')
	const create = useMutation(api.teams.create)
	const team = useQuery(api.teams.get, {
		teamId: teamId as Id<'teams'> | null,
	})

	const onCreateTeam = async (values: FormValues) => {
		toast.promise(create(values), {
			loading: 'Creating team',
			success: (teamId) => {
				const url = createUrl(pathname, { teamId })

				router.push(url)
				return 'Team created'
			},
		})
	}

	const onCreateTeamFinish = async (teamId: string) => {
		window.location.replace(`/dashboard/${teamId}`)
	}

	if (team === undefined) {
		return <Spinner fullPage />
	}

	return (
		<>
			{team ? (
				<InviteMemberForm team={team} onSubmit={onCreateTeamFinish} />
			) : (
				<CreateTeamForm user={user} onSubmit={onCreateTeam} />
			)}
		</>
	)
}
