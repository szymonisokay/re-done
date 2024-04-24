import { CustomConvexError } from '@/utils/error'
import { v } from 'convex/values'
import { internalMutation, query } from './_generated/server'

export const get = query({
	args: { configurationId: v.id('userConfiguration') },
	handler: async (ctx, { configurationId }) => {
		const auth = await ctx.auth.getUserIdentity()

		if (auth === null) {
			throw new CustomConvexError({
				code: 'unathenticated',
				message: 'Unauthenticated',
			})
		}

		const user = await ctx.db
			.query('users')
			.filter((q) => q.eq(q.field('externalUserId'), auth.subject))
			.first()

		if (!user) {
			throw new CustomConvexError({
				code: 'userNotFound',
				message: 'User not found',
			})
		}

		const configuration = await ctx.db.get(configurationId)

		if (!configuration) {
			throw new CustomConvexError({
				code: 'configurationNotFound',
				message: 'Configuration not found',
			})
		}

		if (configuration.userId !== user._id) {
			throw new CustomConvexError({
				code: 'unauthorizedAccess',
				message: 'Unauthorized access',
			})
		}

		return configuration
	},
})

export const create = internalMutation({
	args: { userId: v.id('users') },
	handler: async (ctx, { userId }) => {
		const configurationId = await ctx.db.insert('userConfiguration', {
			userId,
			currentTeamId: null,
			theme: 'system',
			language: null,
		})

		await ctx.db.patch(userId, {
			configurationId,
		})
	},
})
