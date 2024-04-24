import { Breadcrumb } from '@/components/breadcrumbs/types'
import { CreateProjectForm } from '@/components/forms/create-project-form/form'
import { PageHeader } from '@/components/page-header/page-header'

const breadcrumbs: Breadcrumb[] = [
	{ name: 'Dashboard', href: '/dashboard/:teamId' },
	{ name: 'Projects', href: '/dashboard/:teamId/projects' },
	{ name: 'Add new project' },
]

const AddProjectPage = () => {
	return (
		<>
			<PageHeader pageTitle='Add new project' breadcrumbs={breadcrumbs} />
			<CreateProjectForm className='p-5' />
		</>
	)
}

export default AddProjectPage
