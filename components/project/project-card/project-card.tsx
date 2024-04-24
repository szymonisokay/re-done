import { Heading } from '@/components/heading'
import { ProjectCardFooter } from '@/components/project/project-card/project-card-footer'
import { ProjectCardHeader } from '@/components/project/project-card/project-card-header'
import { Doc } from '@/convex/_generated/dataModel'
import { useCreateUrl } from '@/hooks/use-create-url'
import Link from 'next/link'

type Props = {
	project: Omit<Doc<'projects'>, 'members'> & {
		members: Doc<'users'>[]
	}
}

export const ProjectCard = ({ project }: Props) => {
	const { replaceUrl } = useCreateUrl()
	const { symbol, name, description, startDate, endDate, members } = project

	return (
		<div className='bg-muted p-4 rounded-md min-w-full shadow-lg md:min-w-[300px]'>
			<ProjectCardHeader startDate={startDate} endDate={endDate} />
			<Heading
				title={
					<Link href={replaceUrl(`/dashboard/projects/${symbol}`)}>
						{name}
					</Link>
				}
				subtitle={description}
				className='space-y-1'
				classNameTitle='text-xl'
				classNameSubtitle='line-clamp-3'
			/>
			<ProjectCardFooter members={members} />
		</div>
	)
}
