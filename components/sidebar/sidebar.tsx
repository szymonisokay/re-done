'use client'

import {
	BookCopyIcon,
	CalendarCheck2Icon,
	CalendarDaysIcon,
	LayoutGridIcon,
	PanelLeftClose,
	UsersIcon,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { Logo } from '@/components/logo/logo'
import { NavigationGroup } from '@/components/sidebar/navigation-group'
import { Button } from '@/components/ui/button'
import { useSidebarState } from '@/hooks/use-sidebar-state'
import { cn } from '@/lib/utils'

export const Sidebar = () => {
	const router = useRouter()

	const { isCollapsed, toggleCollapsed } = useSidebarState()

	const BASE_PATH = `/dashboard`

	const navigationGroups = [
		{
			label: 'Overview',
			items: [
				{
					icon: LayoutGridIcon,
					text: 'Dashboard',
					path: `${BASE_PATH}`,
				},
				{
					icon: CalendarDaysIcon,
					text: 'Calendar',
					path: `${BASE_PATH}/calendar`,
				},
				{
					icon: UsersIcon,
					text: 'Teams',
					path: `${BASE_PATH}/teams`,
				},
				{
					icon: BookCopyIcon,
					text: 'Projects',
					path: `${BASE_PATH}/projects`,
				},
				{
					icon: CalendarCheck2Icon,
					text: 'Time Reports',
					path: `${BASE_PATH}/time-reports`,
				},
			],
		},
		{
			label: 'Management',
			items: [
				{
					icon: LayoutGridIcon,
					text: 'User Settings',
					path: `${BASE_PATH}/user-settings`,
				},
				{
					icon: CalendarDaysIcon,
					text: 'Team Settings',
					path: `${BASE_PATH}/team-settings`,
				},
			],
		},
	]

	const onSidebarCollapse = useCallback(() => {
		toggleCollapsed(isCollapsed)
	}, [isCollapsed])

	return (
		<aside
			className={cn(
				'w-[300px] border-r border-r-border duration-200 relative',
				isCollapsed && 'w-[93px]'
			)}
		>
			<div className='p-5 border-b border-b-border h-[80px] flex items-center'>
				{!isCollapsed ? (
					<Logo
						className='w-[120px] cursor-pointer'
						onClick={() => router.push(BASE_PATH)}
					/>
				) : (
					<Logo.Collapsed
						className='w-[35px] cursor-pointer'
						onClick={() => router.push(BASE_PATH)}
					/>
				)}
			</div>

			<Button
				variant='outline'
				size='icon'
				className='absolute top-[17.5px] -right-[22.5px] border-border'
				onClick={onSidebarCollapse}
			>
				<PanelLeftClose
					className={cn(
						'w-[22px] h-[22px] duration-200',
						isCollapsed && 'rotate-180'
					)}
				/>
			</Button>

			<div className='p-5'>
				{navigationGroups.map(({ label, items }) => (
					<NavigationGroup key={label} label={label} items={items} />
				))}
			</div>
		</aside>
	)
}
