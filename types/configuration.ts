import { v } from 'convex/values'

export enum THEME_ENUM {
	DARK = 'dark',
	LIGHT = 'light',
	SYSTEM = 'system',
}

export const THEME = [
	THEME_ENUM.DARK,
	THEME_ENUM.LIGHT,
	THEME_ENUM.SYSTEM,
] as const

export const THEME_CONVEX = v.union(
	v.literal(THEME_ENUM.DARK),
	v.literal(THEME_ENUM.LIGHT),
	v.literal(THEME_ENUM.SYSTEM)
)
