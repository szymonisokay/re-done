import { LucideIcon } from 'lucide-react'

import { Label } from '@/components/sidebar/label'
import { NavigationItem } from '@/components/sidebar/navigation-item'

type Props = {
	label: string
	items: {
		icon: LucideIcon
		text: string
		path: string
	}[]
}

export const NavigationGroup = ({ label, items }: Props) => {
	return (
		<div className='mb-[30px]'>
			<Label text={label} />

			<div className='flex flex-col gap-[5px] mt-[10px]'>
				{items.map((item) => (
					<NavigationItem key={item.path} {...item} />
				))}
			</div>
		</div>
	)
}
