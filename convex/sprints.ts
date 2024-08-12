import { normalizeError } from '@/utils/error'
import { v } from 'convex/values'
import { internalMutation, query } from './_generated/server'

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

export const getActiveSprintByProjectSymbol = query({
	args: { projectSymbol: v.string() },
	handler: async (ctx, { projectSymbol }) => {
		const auth = await ctx.auth.getUserIdentity()

		if (auth === null) {
			return normalizeError('Unauthenticated')
		}

		// check if user exists
		const user = await ctx.db
			.query('users')
			.filter((q) => q.eq(q.field('externalUserId'), auth.subject))
			.first()

		if (!user) {
			return normalizeError('User not found')
		}

		// check if project exists
		const project = await ctx.db
			.query('projects')
			.filter((q) => q.eq(q.field('symbol'), projectSymbol))
			.first()

		if (!project) {
			return normalizeError('Project not found')
		}

		// check if user is part of the project
		if (!project.members.some((memberId) => memberId === user._id)) {
			return normalizeError('User is not part of the project')
		}

		const sprint = await ctx.db
			.query('sprints')
			.filter((q) => q.eq(q.field('projectId'), project._id))
			.filter((q) => q.eq(q.field('isActive'), true))
			.filter((q) => q.gt(q.field('incrementalId'), 0))
			.first()

		return {
			data: sprint,
		}
	},
})
