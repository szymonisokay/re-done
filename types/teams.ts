import { v } from 'convex/values'

export enum TEAM_ROLES_ENUM {
	ADMIN = 'Admin',
	DEVELOPER = 'Developer',
	MEMBER = 'Member',
}

export const TEAM_ROLES = [
	TEAM_ROLES_ENUM.ADMIN,
	TEAM_ROLES_ENUM.DEVELOPER,
	TEAM_ROLES_ENUM.MEMBER,
] as const

export const TEAM_ROLES_CONVEX = v.union(
	v.literal(TEAM_ROLES_ENUM.ADMIN),
	v.literal(TEAM_ROLES_ENUM.DEVELOPER),
	v.literal(TEAM_ROLES_ENUM.MEMBER)
)
