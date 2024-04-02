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
	}),
})
