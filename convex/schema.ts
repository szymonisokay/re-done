import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
	users: defineTable({
		externalUserId: v.string(),
		name: v.string(),
		email: v.string(),
		imageUrl: v.optional(v.string()),
		onboardingToken: v.union(v.string(), v.null()),
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
