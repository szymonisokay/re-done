import { defineTable } from 'convex/server'
import { v } from 'convex/values'

const sprintsTable = defineTable({
	name: v.optional(v.string()),
	startDate: v.optional(v.string()),
	endDate: v.optional(v.string()),
	sprintGoal: v.optional(v.string()),
	isActive: v.optional(v.boolean()),
	projectId: v.id('projects'),
	tasks: v.array(v.id('tasks')),
}).index('by_projectId', ['projectId'])

export default sprintsTable
