'use client'

import { useMutation, useQuery } from 'convex/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { toast } from 'sonner'

import { Spinner } from '@/components/spinner'
import { api } from '@/convex/_generated/api'
import { Doc, Id } from '@/convex/_generated/dataModel'

import { FormValues } from './schema'
import { StepInvite } from './steps/invite'
import { StepTeamName } from './steps/team-name'

type Props = {
	user: Doc<'users'>
	token?: string
}

export const CreateTeamForm = ({ user, token }: Props) => {
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
				const url = qs.stringifyUrl(
					{
						url: pathname,
						query: { token, teamId },
					},
					{ skipEmptyString: true, skipNull: true, sort: false }
				)

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
				<StepInvite team={team} onSubmit={onCreateTeamFinish} />
			) : (
				<StepTeamName user={user} onSubmit={onCreateTeam} />
			)}
		</>
	)
}
