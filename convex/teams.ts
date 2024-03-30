import { v } from 'convex/values'

import { mutation, query } from '@/convex/_generated/server'

export const get = query({
	args: { teamId: v.union(v.id('teams'), v.null()) },
	handler: async (ctx, { teamId }) => {
		try {
			const auth = await ctx.auth.getUserIdentity()

			if (auth === null) {
				throw new Error('Unauthenticated')
			}

			if (!teamId) {
				return
			}

			const team = await ctx.db.get(teamId)

			if (!team) {
				throw new Error('Team not found')
			}

			return team
		} catch (error) {
			console.log(error)
		}
	},
})

export const create = mutation({
	args: { name: v.string() },
	handler: async (ctx, args) => {
		const auth = await ctx.auth.getUserIdentity()

		if (auth === null) {
			throw new Error('Unauthenticated')
		}

		const user = await ctx.db
			.query('users')
			.filter((q) => q.eq(q.field('externalUserId'), auth.subject))
			.first()

		if (!user) {
			throw new Error('User not found')
		}

		const teamId = await ctx.db.insert('teams', {
			...args,
			ownerId: user._id,
			members: [
				{
					role: 'Admin',
					userId: user._id,
				},
			],
		})

		await ctx.db.patch(user._id, { teams: [...user.teams, teamId] })

		return teamId
	},
})

export const finalize = mutation({
	args: { teamId: v.id('teams') },
	handler: async (ctx, { teamId }) => {
		try {
			const auth = await ctx.auth.getUserIdentity()

			if (auth === null) {
				throw new Error('Unauthenticated')
			}

			const team = await ctx.db.get(teamId)

			if (!team) {
				throw new Error('Team not found')
			}

			const owner = await ctx.db.get(team.ownerId)

			if (owner?.externalUserId !== auth.subject) {
				throw new Error('Unauthorized')
			}

			await ctx.db.patch(owner._id, { onboardingToken: null })

			return true
		} catch (error) {
			console.log(error)
		}
	},
})
