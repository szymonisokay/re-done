import { v } from 'convex/values'
import { internalMutation } from './_generated/server'

export const createBacklog = internalMutation({
	args: { projectId: v.id('projects') },
	handler: async (ctx, { projectId }) => {
		await ctx.db.insert('sprints', {
			incrementalId: 0,
			projectId,
			tasks: [],
		})
	},
})
