import { defineTable } from 'convex/server'
import { v } from 'convex/values'

const projectsTable = defineTable({
	name: v.string(),
	symbol: v.string(),
	description: v.optional(v.string()),
	startDate: v.string(),
	endDate: v.optional(v.string()),
	isPrivate: v.boolean(),
	isDeleted: v.boolean(),
	teamId: v.id('teams'),
	members: v.array(v.id('users')),
})

export default projectsTable
