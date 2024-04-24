'use client'

import { useQuery } from 'convex/react'

import { api } from '@/convex/_generated/api'
import { useTeam } from '@/hooks/use-team'

export const useProjects = () => {
	const { team } = useTeam()
	const projects = useQuery(
		api.projects.getAll,
		!!team ? { teamId: team._id } : 'skip'
	)

	return { projects }
}
