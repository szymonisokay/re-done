'use client'

import { api } from '@/convex/_generated/api'
import { useQueryWithStatus } from '@/hooks/use-query-wrapper'

export const useActiveSprint = (projectSymbol: string) => {
	const { data, error, isPending } = useQueryWithStatus(
		api.sprints.getActiveSprintByProjectSymbol,
		!!projectSymbol ? { projectSymbol } : 'skip'
	)

	return {
		activeSprint: data,
		error,
		isLoading: isPending,
	}
}
