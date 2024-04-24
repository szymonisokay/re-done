'use client'

import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

import { Breadcrumb } from '@/components/breadcrumbs/types'
import { PageHeader } from '@/components/page-header/page-header'
import { ProjectCard } from '@/components/project/project-card/project-card'
import { Spinner } from '@/components/spinner'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { useParams } from 'next/navigation'

const breadcrumbs: Breadcrumb[] = [
	{ name: 'Dashboard', href: '/dashboard/:teamId' },
	{ name: 'Projects' },
]

const ProjectsPage = () => {
	const teamId = useParams().teamId
	const projects = useQuery(api.projects.getAll, {
		teamId: teamId as Id<'teams'>,
	})

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

			{projects === undefined ? (
				<Spinner className='pt-5' />
			) : (
				<section className='grid grid-cols-1 md:grid-cols-2 gap-4 p-5'>
					{projects.map((project) => (
						<ProjectCard key={project._id} project={project} />
					))}
				</section>
			)}
		</>
	)
}

export default ProjectsPage
