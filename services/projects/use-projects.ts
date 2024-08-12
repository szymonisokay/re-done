'use client'

import { api } from '@/convex/_generated/api'
import { useQueryWithStatus } from '@/hooks/use-query-wrapper'
import { useTeam } from '@/services/teams/use-team'

export const useProjects = () => {
	const { team } = useTeam()
	const { data, error, isPending } = useQueryWithStatus(
		api.projects.getAll,
		!!team ? { teamId: team._id } : 'skip'
	)

	return { projects: data, error, isLoading: isPending }
}
