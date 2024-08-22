import { defineTable } from 'convex/server'
import { v } from 'convex/values'

import { THEME_CONVEX } from '@/types/configuration'

const userConfigurationTable = defineTable({
	userId: v.id('users'),
	currentTeamId: v.union(v.id('teams'), v.null()),
	theme: THEME_CONVEX,
	language: v.union(v.string(), v.null()),
})

export default userConfigurationTable
