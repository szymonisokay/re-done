import { defineSchema } from 'convex/server'

import {
	projectsTable,
	sprintsTable,
	tasksTable,
	teamsTable,
	userConfigurationTable,
	userTable,
} from './tables'

export default defineSchema({
	users: userTable,
	userConfiguration: userConfigurationTable,
	teams: teamsTable,
	projects: projectsTable,
	sprints: sprintsTable,
	tasks: tasksTable,
})
