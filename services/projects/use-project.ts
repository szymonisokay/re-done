'use client'

import { api } from '@/convex/_generated/api'
import { useQueryWithStatus } from '@/hooks/use-query-wrapper'

export const useProject = (projectId: string) => {
	const fetcher = !!projectId ? { projectSymbol: projectId } : 'skip'

	const { data, error, isPending } = useQueryWithStatus(
		api.projects.get,
		fetcher
	)

	return {
		project: data,
		error,
		isLoading: isPending,
	}
}
