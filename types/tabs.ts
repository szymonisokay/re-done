export type TabsType = {
	value: string
	label: string
	href: string
	badge?: number
}

export enum ProjectTabs {
	overview = 'overview',
	boards = 'boards',
	backlog = 'backlog',
	members = 'members',
	settings = 'settings',
}

export const projectTabs = Object.values(ProjectTabs)
