'use client'

import { BacklogTaskGrid } from '@/components/backlog/backlog-task-grid'
import { useModalState } from '@/hooks/use-modal-state'

const ProjectBacklogPage = () => {
	const { onOpen } = useModalState()

	return (
		<div className='p-5'>
			<BacklogTaskGrid
				title='Backlog'
				action={() => onOpen('createTask')}
			/>
		</div>
	)
}

export default ProjectBacklogPage
