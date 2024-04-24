'use client'

import { useQuery } from 'convex/react'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useConfiguration } from '@/hooks/use-configuration'

export const useTeam = () => {
	const { configuration } = useConfiguration()
	const team = useQuery(
		api.teams.get,
		!!configuration
			? {
					teamId: configuration.currentTeamId as Id<'teams'>,
			  }
			: 'skip'
	)

	return {
		team,
	}
}
