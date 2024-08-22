import { defineTable } from 'convex/server'
import { v } from 'convex/values'

const sprintsTable = defineTable({
	incrementalId: v.number(), // id 0 - for backlog
	projectId: v.id('projects'),
	startDate: v.optional(v.string()),
	endDate: v.optional(v.string()),
	sprintGoal: v.optional(v.string()),
	isActive: v.optional(v.boolean()),
	tasks: v.array(v.id('tasks')),
}).index('by_projectId', ['projectId'])

export default sprintsTable
