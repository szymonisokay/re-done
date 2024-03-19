'use client'

import { useSidebarState } from '@/hooks/use-sidebar-state'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type Props = {
	icon: LucideIcon
	text: string
	path: string
}

export const NavigationItem = ({ icon: Icon, text, path }: Props) => {
	const pathname = usePathname()
	const { isCollapsed } = useSidebarState()

	const isActive = pathname === path

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
