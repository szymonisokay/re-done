'use client'

import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'

export const useProject = (projectId: string) => {
	const project = useQuery(
		api.projects.get,
		!!projectId ? { projectSymbol: projectId } : 'skip'
	)

	return { project }
}
