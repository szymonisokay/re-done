'use client'

import { useQuery } from 'convex/react'
import { useParams, usePathname } from 'next/navigation'
import { ReactNode } from 'react'

import { Breadcrumb } from '@/components/breadcrumbs/types'
import { PageHeader } from '@/components/page-header/page-header'
import { Tabs } from '@/components/tabs/tabs'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useCreateUrl } from '@/hooks/use-create-url'
import { ProjectTabs, TabsType, projectTabs } from '@/types/tabs'

type Props = {
	children: ReactNode
}

const ProjectLayout = ({ children }: Props) => {
	const pathname = usePathname()
	const { replaceUrl } = useCreateUrl()
	const projectId = useParams().projectId
	const project = useQuery(api.projects.get, {
		projectId: projectId as Id<'projects'>,
	})

	const breadcrumbs: Breadcrumb[] = [
		{ name: 'Dashboard', href: '/dashboard/:teamId' },
		{ name: 'Projects', href: '/dashboard/:teamId/projects' },
		{ name: project?.name, isLoading: project === undefined },
	]

	const tabs: TabsType[] = projectTabs.map((tab) => ({
		value: tab,
		label: tab,
		href: replaceUrl(`/dashboard/:teamId/projects/:projectId/${tab}`),
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
