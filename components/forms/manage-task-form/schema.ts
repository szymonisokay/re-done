import { TASK_STATUSES, TASK_STATUSES_ENUM } from '@/types/task'
import { z } from 'zod'

export const formSchema = z.object({
	name: z.string().min(3),
	description: z.string().max(500).optional(),
	status: z.enum(TASK_STATUSES),
	estimatedTime: z.string(),
	sprintId: z.string(),
	creatorId: z.string(),
	assigneeId: z.string().nullable(),
})

export type FormValues = z.infer<typeof formSchema>

export const defaultValues: FormValues = {
	name: '',
	description: '',
	status: TASK_STATUSES_ENUM.UNASSIGNED,
	estimatedTime: '',
	sprintId: '',
	creatorId: '',
	assigneeId: '',
}
