import { defineTable } from 'convex/server'
import { v } from 'convex/values'

import { TEAM_ROLES_CONVEX } from '@/types/teams'

const teamsTable = defineTable({
	name: v.string(),
	ownerId: v.id('users'),
	members: v.array(
		v.object({
			userId: v.id('users'),
			role: TEAM_ROLES_CONVEX,
		})
	),
	inviteCode: v.string(),
	projects: v.array(v.id('projects')),
})

export default teamsTable
