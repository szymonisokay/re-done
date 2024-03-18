'use client'

import {
	BookCopyIcon,
	CalendarCheck2Icon,
	CalendarDaysIcon,
	LayoutGridIcon,
	PanelLeftClose,
	UsersIcon,
} from 'lucide-react'
import { useParams } from 'next/navigation'

import { Logo } from '@/components/logo/logo'
import { NavigationGroup } from '@/components/sidebar/navigation-group'
import { Button } from '@/components/ui/button'

export const Sidebar = () => {
	const params = useParams()
	// const BASE_PATH = `dashboard/${params.teamId}`
	const BASE_PATH = '/dashboard'

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

	return (
		<aside className='w-[300px] border-r border-r-border relative'>
			<div className='p-5 border-b border-b-border h-[80px] flex items-center'>
				<Logo />
			</div>

			<Button
				variant='outline'
				className='absolute top-[17.5px] -right-[22.5px]'
			>
				<PanelLeftClose className='w-6 h-6' />
			</Button>

			<div className='p-5'>
				{navigationGroups.map(({ label, items }) => (
					<NavigationGroup key={label} label={label} items={items} />
				))}
			</div>
		</aside>
	)
}
