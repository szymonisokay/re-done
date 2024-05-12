'use client'

import { api } from '@/convex/_generated/api'
import { useQueryWrapper } from '@/hooks/use-query-wrapper'

export const useProject = (projectId: string) => {
	const { data, error, isLoading } = useQueryWrapper(
		api.projects.get,
		!!projectId ? { projectSymbol: projectId } : 'skip'
	)

	return {
		project: data,
		error,
		isLoading,
	}
}
