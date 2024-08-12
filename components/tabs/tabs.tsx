import { TabsBadge } from '@/components/tabs/tabs-bagde'
import {
	TabsList,
	Tabs as TabsPrimitive,
	TabsTrigger,
} from '@/components/ui/tabs'
import { TabsType } from '@/types/tabs'
import Link from 'next/link'

type Props = {
	tabs: TabsType[]
	value: string
}

export const Tabs = ({ tabs, value }: Props) => {
	return (
		<TabsPrimitive defaultValue={value} value={value}>
			<TabsList>
				{tabs.map(({ label, value, href, badge }) => (
					<TabsTrigger
						asChild
						key={value}
						value={value}
						className='capitalize'
					>
						<Link href={href}>
							{label}

							{badge && <TabsBadge value={badge} />}
						</Link>
					</TabsTrigger>
				))}
			</TabsList>
		</TabsPrimitive>
	)
}
