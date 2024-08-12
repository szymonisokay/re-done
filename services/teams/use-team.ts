'use client'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQueryWithStatus } from '@/hooks/use-query-wrapper'
import { useConfiguration } from '@/services/configuration/use-configuration'

export const useTeam = () => {
	const { configuration } = useConfiguration()
	const { data, error, isPending } = useQueryWithStatus(
		api.teams.get,
		!!configuration
			? {
					teamId: configuration.currentTeamId as Id<'teams'>,
				}
			: 'skip'
	)

	return {
		team: data,
		error,
		isLoading: isPending,
	}
}
