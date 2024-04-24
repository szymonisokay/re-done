'use client'

import { useParams, usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import { Breadcrumb } from '@/components/breadcrumbs/types'
import { PageHeader } from '@/components/page-header/page-header'
import { Tabs } from '@/components/tabs/tabs'
import { useCreateUrl } from '@/hooks/use-create-url'
import { useProject } from '@/hooks/use-project'
import { ProjectTabs, TabsType, projectTabs } from '@/types/tabs'

type Props = {
	children: ReactNode
}

const ProjectLayout = ({ children }: Props) => {
	const pathname = usePathname()
	const { replaceUrl } = useCreateUrl()
	const projectId = useParams().projectId
	const { project } = useProject(projectId as string)

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
		pathname.split('/').at(-1) as ProjectTabs.tasks
	)
		? pathname.split('/').at(-1)
		: ProjectTabs.tasks

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
