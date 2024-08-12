'use client'

import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

import { Breadcrumb } from '@/components/breadcrumbs/types'
import { PageHeader } from '@/components/page-header/page-header'
import { ProjectCard } from '@/components/project/project-card/project-card'
import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { useProjects } from '@/services/projects/use-projects'

const breadcrumbs: Breadcrumb[] = [
	{ name: 'Dashboard', href: '/dashboard' },
	{ name: 'Projects' },
]

const ProjectsPage = () => {
	const { projects } = useProjects()

	return (
		<>
			<PageHeader pageTitle='Projects' breadcrumbs={breadcrumbs}>
				<Link href='projects/add'>
					<Button variant='accent' className='py-2'>
						<PlusIcon className='w-4 h-4 mr-2' />
						Add new project
					</Button>
				</Link>
			</PageHeader>

			{projects === undefined && <Spinner className='pt-5' />}

			{projects !== undefined && projects.length === 0 ? (
				<p>No projects</p>
			) : (
				<section className='grid grid-cols-1 md:grid-cols-2 gap-4 p-5'>
					{projects?.map((project) => (
						<ProjectCard key={project._id} project={project} />
					))}
				</section>
			)}
		</>
	)
}

export default ProjectsPage
