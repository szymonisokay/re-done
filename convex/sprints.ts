import { CustomConvexError } from '@/utils/error'
import { v } from 'convex/values'
import { internalMutation, query } from './_generated/server'

export const createBacklog = internalMutation({
	args: { projectId: v.id('projects') },
	handler: async (ctx, { projectId }) => {
		await ctx.db.insert('sprints', {
			name: 'Backlog',
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
			throw new CustomConvexError('Unauthenticated')
		}

		// check if user exists
		const user = await ctx.db
			.query('users')
			.filter((q) => q.eq(q.field('externalUserId'), auth.subject))
			.first()

		if (!user) {
			throw new CustomConvexError('User not found')
		}

		// check if project exists
		const project = await ctx.db
			.query('projects')
			.filter((q) => q.eq(q.field('symbol'), projectSymbol))
			.first()

		if (!project) {
			throw new CustomConvexError('Project not found')
		}

		// check if user is part of the project
		if (!project.members.some((memberId) => memberId === user._id)) {
			throw new CustomConvexError('User is not part of the project')
		}

		const sprint = await ctx.db
			.query('sprints')
			.filter((q) => q.eq(q.field('projectId'), project._id))
			.filter((q) => q.eq(q.field('isActive'), true))
			.filter((q) => q.neq(q.field('name'), 'Backlog'))
			.first()

		return sprint
	},
})
