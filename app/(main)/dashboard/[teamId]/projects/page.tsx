import { Breadcrumb } from '@/components/breadcrumbs/types'
import { PageHeader } from '@/components/page-header/page-header'

const breadcrumbs: Breadcrumb[] = [
	{ name: 'Dashboard', href: '/dashboard' },
	{ name: 'Projects' },
]

const ProjectsPage = () => {
	return (
		<>
			<PageHeader pageTitle='Projects' breadcrumbs={breadcrumbs} />
		</>
	)
}

export default ProjectsPage
