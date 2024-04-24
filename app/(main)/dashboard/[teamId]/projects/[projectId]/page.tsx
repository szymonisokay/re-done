'use client'

import { useCreateUrl } from '@/hooks/use-create-url'
import { ProjectTabs } from '@/types/tabs'
import { redirect } from 'next/navigation'

const ProjectPage = () => {
	const { url } = useCreateUrl(
		`/dashboard/:teamId/projects/:projectId/${ProjectTabs.tasks}`
	)

	return redirect(url)
}

export default ProjectPage
