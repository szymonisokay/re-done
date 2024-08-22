import { defineTable } from 'convex/server'
import { v } from 'convex/values'

import { TASK_STATUSES_CONVEX } from '@/types/task'

const tasksTable = defineTable({
	name: v.string(),
	description: v.optional(v.string()),
	status: TASK_STATUSES_CONVEX,
	estimatedTime: v.string(),
	sprintId: v.string(),
	creatorId: v.string(),
	assigneeId: v.optional(v.string()),
})

export default tasksTable
