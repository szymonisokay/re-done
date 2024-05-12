'use client'

import { useCreateUrl } from '@/hooks/use-create-url'
import { ProjectTabs } from '@/types/tabs'
import { redirect } from 'next/navigation'

const ProjectPage = () => {
	const { url } = useCreateUrl(
		`/dashboard/projects/:projectId/${ProjectTabs.boards}`
	)

	return redirect(url)
}

export default ProjectPage
