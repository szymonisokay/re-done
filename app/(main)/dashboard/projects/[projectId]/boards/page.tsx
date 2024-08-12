'use client'

import { redirect, useParams } from 'next/navigation'

import { Spinner } from '@/components/spinner'
import { useCreateUrl } from '@/hooks/use-create-url'
import { useActiveSprint } from '@/services/sprints/use-active-sprint'

const ProjectBoardsPage = () => {
	const { replaceUrl } = useCreateUrl()
	const projectSymbol = useParams().projectId
	const { activeSprint } = useActiveSprint(projectSymbol as string)

	if (activeSprint === undefined) {
		return <Spinner />
	}

	if (activeSprint === null) {
		const url = replaceUrl('/dashboard/projects/:projectId/backlog')
		return redirect(url)
	}

	return <div>board</div>
}

export default ProjectBoardsPage
