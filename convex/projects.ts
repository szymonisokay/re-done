import { v } from 'convex/values'

import { CustomConvexError } from '@/utils/error'
import { internal } from './_generated/api'
import { mutation, query } from './_generated/server'

export const get = query({
	args: { projectSymbol: v.string() },
	handler: async (ctx, { projectSymbol }) => {
		const auth = await ctx.auth.getUserIdentity()

		if (auth === null) {
			throw new CustomConvexError('Unauthenticated')
		}

		// get user
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

		// check if user is a member of the project
		const isMember = project.members.some(
			(memberId) => memberId === user._id
		)

		if (!isMember) {
			throw new CustomConvexError('Unauthorized access')
		}

		return project
	},
})

export const getAll = query({
	args: { teamId: v.id('teams') },
	handler: async (ctx, { teamId }) => {
		const auth = await ctx.auth.getUserIdentity()

		if (auth === null) {
			throw new CustomConvexError('Unauthenticated')
		}

		// check if team exists
		const team = await ctx.db.get(teamId)

		if (!team) {
			throw new CustomConvexError('Team not found')
		}

		if (team.projects.length === 0) {
			return []
		}

		//  map through all projects and populate each project with members
		const projects = team.projects.map(async (projectId) => {
			const project = await ctx.db.get(projectId)

			const members = []
			for (const memberId of project?.members ?? []) {
				const member = await ctx.db.get(memberId)

				if (member) {
					members.push(member)
				}
			}

			return { ...project!, members }
		})

		return Promise.all(projects)
	},
})

export const create = mutation({
	args: {
		name: v.string(),
		symbol: v.string(),
		description: v.optional(v.string()),
		startDate: v.string(),
		endDate: v.optional(v.string()),
		isPrivate: v.boolean(),
		teamId: v.id('teams'),
	},
	handler: async (ctx, args) => {
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
			throw new CustomConvexError('Unauthorized access')
		}

		// check if team exists
		const team = await ctx.db.get(args.teamId)

		if (!team) {
			throw new CustomConvexError('Team not found')
		}

		// check if user has permission to create a project
		const isUserAnAdmin = team.members.some(
			(member) => member.userId === user._id && member.role === 'Admin'
		)

		if (!isUserAnAdmin) {
			throw new CustomConvexError('Unauthorized access')
		}

		// create project
		const projectId = await ctx.db.insert('projects', {
			...args,
			isDeleted: false,
			members: [user._id],
		})

		// populate project array in team with project id
		await ctx.db.patch(team._id, {
			projects: [...team.projects, projectId],
		})

		// create backlog
		await ctx.scheduler.runAfter(0, internal.sprints.createBacklog, {
			projectId,
		})

		return projectId
	},
})
