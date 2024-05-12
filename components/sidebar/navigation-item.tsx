'use client'

import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'

import { useSidebarState } from '@/hooks/use-sidebar-state'
import { cn } from '@/lib/utils'

type Props = {
	icon: LucideIcon
	text: string
	path: string
}

export const NavigationItem = ({ icon: Icon, text, path }: Props) => {
	const segments = useSelectedLayoutSegments()
	const { isCollapsed } = useSidebarState()

	const isActive = path.includes(segments[1])

	return (
		<Link
			href={path}
			className={cn(
				'flex gap-4 items-center px-4 py-[10px] rounded-[6px] group duration-200',
				isActive && 'bg-muted',
				isCollapsed && 'gap-0'
			)}
		>
			<Icon
				className={cn(
					'w-5 h-5 text-secondary group-hover:text-foreground duration-200 shrink-0',
					isActive && 'text-foreground'
				)}
			/>
			<span
				className={cn(
					'text-sm text-secondary overflow-hidden group-hover:text-foreground duration-200',
					isActive && 'text-foreground',
					isCollapsed && 'hidden'
				)}
			>
				{text}
			</span>
		</Link>
	)
}
