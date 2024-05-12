import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'

const ProjectBacklogPage = () => {
	return (
		<div className='p-5'>
			<div className='flex justify-between items-center'>
				<Heading
					title='Sprint 1'
					classNameTitle='text-xl tracking-normal'
				/>

				<Button variant='unstyled' className='py-1 hover:bg-muted'>
					Add new task
				</Button>
			</div>
		</div>
	)
}

export default ProjectBacklogPage
