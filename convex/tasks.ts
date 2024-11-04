import { TASK_STATUSES_CONVEX } from '@/types/task'
import { v } from 'convex/values'
import { mutation } from './_generated/server'

export const create = mutation({
	args: {
		name: v.string(),
		description: v.optional(v.string()),
		status: TASK_STATUSES_CONVEX,
		estimatedTime: v.string(),
		sprintId: v.id('sprints'),
		creatorId: v.id('users'),
		assigneeId: v.optional(v.id('users')),
	},
	handler: async (ctx, args) => {
		await ctx.db.insert('tasks', args)
	},
})
