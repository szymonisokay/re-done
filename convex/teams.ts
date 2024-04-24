import { v } from 'convex/values'

import { internal } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { mutation, query } from '@/convex/_generated/server'
import { CustomConvexError } from '@/utils/error'

export const get = query({
	args: { teamId: v.union(v.id('teams'), v.null()) },
	handler: async (ctx, { teamId }) => {
		const auth = await ctx.auth.getUserIdentity()

		if (auth === null) {
			throw new CustomConvexError({
				code: 'unathenticated',
				message: 'Unauthenticated',
			})
		}

		if (!teamId) {
			return
		}

		const team = await ctx.db.get(teamId)

		if (!team) {
			throw new CustomConvexError({
				code: 'teamNotFound',
				message: 'Team not found',
			})
		}

		return team
	},
})

export const getLatestTeam = query({
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

		if (!user) {
			throw new CustomConvexError({
				code: 'userNotFound',
				message: 'User not found',
			})
		}

		return user.teams[0]
	},
})

export const create = mutation({
	args: { name: v.string(), inviteCode: v.string() },
	handler: async (ctx, args) => {
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

		const teamId = await ctx.db.insert('teams', {
			...args,
			ownerId: user._id,
			members: [
				{
					role: 'Admin',
					userId: user._id,
				},
			],
			projects: [],
		})

		await ctx.db.patch(user._id, { teams: [...user.teams, teamId] })
		await ctx.db.patch(user.configurationId as Id<'userConfiguration'>, {
			currentTeamId: teamId,
		})

		return teamId
	},
})

export const invite = mutation({
	args: { id: v.string(), email: v.string() },
	handler: async (ctx, { id, email }) => {
		const auth = await ctx.auth.getUserIdentity()

		if (auth === null) {
			throw new CustomConvexError({
				code: 'unathenticated',
				message: 'Unauthenticated',
			})
		}

		if (!email) {
			throw new CustomConvexError({
				code: 'invalidEmail',
				message: 'Please enter a valid email address',
			})
		}

		const teamId = ctx.db.normalizeId('teams', id)
		const team = await ctx.db.get(teamId as Id<'teams'>)

		if (!team) {
			throw new CustomConvexError({
				code: 'teamNotFound',
				message: 'Team not found',
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

		await ctx.scheduler.runAfter(0, internal.resend.sendInviteEmail, {
			userEmail: email,
			invitedBy: {
				name: user.name ?? '',
				email: user.email,
			},
			teamName: team.name,
			inviteLink: `${process.env.BASE_URL}/invite/${team.inviteCode}`,
		})

		return true
	},
})

export const acceptInvite = mutation({
	args: { inviteCode: v.string() },
	handler: async (ctx, { inviteCode }) => {
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

		const team = await ctx.db
			.query('teams')
			.filter((q) => q.eq(q.field('inviteCode'), inviteCode))
			.first()

		if (!team) {
			throw new CustomConvexError({
				code: 'invalidCode',
				message: 'The invite code is invalid',
			})
		}

		if (team.members.some((m) => m.userId === user._id)) {
			throw new CustomConvexError({
				code: 'alreadyAMember',
				message: 'You are already a member of this team',
			})
		}

		await ctx.db.patch(user._id, { teams: [...user.teams, team._id] })

		await ctx.db.patch(team._id, {
			members: [...team.members, { userId: user._id, role: 'Member' }],
		})

		return true
	},
})
