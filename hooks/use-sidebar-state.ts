import { create } from 'zustand'

type SidebarStore = {
	isCollapsed: boolean
	toggleCollapsed: (collapsed: boolean) => void
}

export const useSidebarState = create<SidebarStore>((set) => ({
	isCollapsed: false,
	toggleCollapsed: (collapsed) => set({ isCollapsed: !collapsed }),
}))
