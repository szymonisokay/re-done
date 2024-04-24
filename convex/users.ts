import { v } from 'convex/values'

import { mutation, query } from '@/convex/_generated/server'
import { CustomConvexError } from '@/utils/error'
import { internal } from './_generated/api'

export const get = query({
	handler: async (ctx) => {
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

		return user
	},
})

export const create = mutation({
	args: {
		externalUserId: v.string(),
		name: v.union(v.string(), v.null()),
		fullName: v.union(v.string(), v.null()),
		email: v.string(),
		imageUrl: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query('users')
			.filter((q) => q.eq(q.field('externalUserId'), args.externalUserId))
			.first()

		if (!!user) {
			return user._id
		}

		const userId = await ctx.db.insert('users', {
			...args,
			teams: [],
			configurationId: null,
		})

		await ctx.scheduler.runAfter(0, internal.userConfiguration.create, {
			userId,
		})

		return userId
	},
})
