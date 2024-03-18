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

	const isActive = pathname === path

	return (
		<Link
			href={path}
			className={cn(
				'flex gap-5 items-center px-[20px] py-[12px] rounded-[6px] group duration-200',
				isActive && 'bg-muted'
			)}
		>
			<Icon
				className={cn(
					'w-6 h-6 text-secondary group-hover:text-foreground duration-200',
					isActive && 'text-foreground'
				)}
			/>
			<span
				className={cn(
					'text-secondary group-hover:text-foreground duration-200',
					isActive && 'text-foreground'
				)}
			>
				{text}
			</span>
		</Link>
	)
}
