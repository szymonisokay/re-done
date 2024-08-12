'use client'

import { redirect, useParams, usePathname } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import { toast } from 'sonner'

import { Breadcrumb } from '@/components/breadcrumbs/types'
import { PageHeader } from '@/components/page-header/page-header'
import { Tabs } from '@/components/tabs/tabs'
import { useCreateUrl } from '@/hooks/use-create-url'
import { useProject } from '@/services/projects/use-project'
import { ProjectTabs, TabsType, projectTabs } from '@/types/tabs'

type Props = {
	children: ReactNode
}

const ProjectLayout = ({ children }: Props) => {
	const pathname = usePathname()
	const { replaceUrl } = useCreateUrl()
	const projectId = useParams().projectId
	const { project, error } = useProject(projectId as string)

	useEffect(() => {
		if (!!error) {
			toast.error(error.data.code, {
				description:
					'Project not found or you do not have access to it',
			})

			redirect('/dashboard/projects')
		}
	}, [error])

	const breadcrumbs: Breadcrumb[] = [
		{ name: 'Dashboard', href: '/dashboard' },
		{ name: 'Projects', href: '/dashboard/projects' },
		{ name: project?.name, isLoading: project === undefined },
	]

	const tabs: TabsType[] = projectTabs.map((tab) => ({
		value: tab,
		label: tab,
		href: replaceUrl(`/dashboard/projects/:projectId/${tab}`),
	}))

	const currentPage = projectTabs.includes(
		pathname.split('/').at(-1) as ProjectTabs.boards
	)
		? pathname.split('/').at(-1)
		: ProjectTabs.boards

	return (
		<>
			<PageHeader
				pageTitle={project?.name}
				isLoading={project === undefined}
				breadcrumbs={breadcrumbs}
				containerClassName='pb-0 flex-col items-start gap-4'
			>
				<Tabs tabs={tabs} value={currentPage as ProjectTabs} />
			</PageHeader>

			{children}
		</>
	)
}

export default ProjectLayout
