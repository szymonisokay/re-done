import { v } from 'convex/values'

import { mutation, query } from '@/convex/_generated/server'

export const get = query({
	handler: async (ctx) => {
		try {
			const auth = await ctx.auth.getUserIdentity()

			if (auth === null) {
				throw new Error('Unautenticated')
			}

			const user = await ctx.db
				.query('users')
				.filter((q) => q.eq(q.field('externalUserId'), auth.subject))
				.first()

			return user
		} catch (error) {
			console.log(error)
		}
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
		try {
			const user = await ctx.db
				.query('users')
				.filter((q) =>
					q.eq(q.field('externalUserId'), args.externalUserId)
				)
				.first()

			if (!!user) {
				return user._id
			}

			const userId = await ctx.db.insert('users', {
				...args,
				teams: [],
			})

			return userId
		} catch (error) {
			console.log(error)
		}
	},
})
