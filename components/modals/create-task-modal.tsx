'use client'

import { ManageTaskForm } from '@/components/forms/manage-task-form/form'
import { ModalBase } from '@/components/modals/modal-base'
import { useModalState } from '@/hooks/use-modal-state'

export const CreateTaskModal = () => {
	const { open, type, onClose } = useModalState()
	const isOpen = open && type === 'createTask'

	return (
		<ModalBase
			title='Create Task'
			description='Create a new task'
			open={isOpen}
			onClose={onClose}
		>
			<ManageTaskForm />
		</ModalBase>
	)
}
