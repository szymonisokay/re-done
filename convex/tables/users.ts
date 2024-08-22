import { defineTable } from 'convex/server'
import { v } from 'convex/values'

const userTable = defineTable({
	externalUserId: v.string(),
	name: v.union(v.string(), v.null()),
	fullName: v.union(v.string(), v.null()),
	email: v.string(),
	imageUrl: v.optional(v.string()),
	teams: v.array(v.id('teams')),
	configurationId: v.union(v.id('userConfiguration'), v.null()),
})

export default userTable
