import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
	users: defineTable({
		externalUserId: v.string(),
		name: v.union(v.string(), v.null()),
		fullName: v.union(v.string(), v.null()),
		email: v.string(),
		imageUrl: v.optional(v.string()),
		teams: v.array(v.id('teams')),
		configurationId: v.union(v.id('userConfiguration'), v.null()),
	}),
	userConfiguration: defineTable({
		userId: v.id('users'),
		currentTeamId: v.union(v.id('teams'), v.null()),
		theme: v.union(
			v.literal('dark'),
			v.literal('light'),
			v.literal('system')
		),
		language: v.union(v.string(), v.null()),
	}),
	teams: defineTable({
		name: v.string(),
		ownerId: v.id('users'),
		members: v.array(
			v.object({
				userId: v.id('users'),
				role: v.union(
					v.literal('Admin'),
					v.literal('Developer'),
					v.literal('Member')
				),
			})
		),
		inviteCode: v.string(),
		projects: v.array(v.id('projects')),
	}),
	projects: defineTable({
		name: v.string(),
		symbol: v.string(),
		description: v.optional(v.string()),
		startDate: v.string(),
		endDate: v.optional(v.string()),
		isPrivate: v.boolean(),
		isDeleted: v.boolean(),
		teamId: v.id('teams'),
		members: v.array(v.id('users')),
	}),
	sprints: defineTable({
		incrementalId: v.number(), // id 0 - for backlog
		projectId: v.id('projects'),
		startDate: v.optional(v.string()),
		endDate: v.optional(v.string()),
		sprintGoal: v.optional(v.string()),
		isActive: v.optional(v.boolean()),
		tasks: v.array(v.id('tasks')),
	}).index('by_projectId', ['projectId']),
	tasks: defineTable({
		name: v.string(),
		description: v.string(),
		status: v.union(
			v.literal('Unassigned'),
			v.literal('To Do'),
			v.literal('In Progress'),
			v.literal('Code Review'),
			v.literal('Testing'),
			v.literal('Done')
		),
		estimatedTime: v.string(),
		sprintId: v.id('sprints'),
		creatorId: v.id('users'),
		assigneeId: v.union(v.id('users'), v.null()),
	}),
})
