import { v } from 'convex/values'

import { mutation, query } from '@/convex/_generated/server'
import { generateOnboardingToken } from '@/utils/tokens'

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
		const user = await ctx.db
			.query('users')
			.filter((q) => q.eq(q.field('externalUserId'), args.externalUserId))
			.first()

		if (!!user) {
			return { userId: user._id, token: user.onboardingToken }
		}

		const token = generateOnboardingToken()

		const userId = await ctx.db.insert('users', {
			...args,
			onboardingToken: token,
			teams: [],
		})

		return { userId, token }
	},
})

export const validateOnboardingToken = query({
	args: { token: v.union(v.string(), v.null()) },
	handler: async (ctx, { token }) => {
		try {
			const auth = await ctx.auth.getUserIdentity()

			if (auth === null) {
				throw new Error('Unautenticated')
			}

			if (!token) {
				throw new Error('Token not provided')
			}

			const user = await ctx.db
				.query('users')
				.filter((q) => q.eq(q.field('externalUserId'), auth.subject))
				.first()

			return user?.onboardingToken === token
		} catch (error) {
			console.error(error)
		}
	},
})
