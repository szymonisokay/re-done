import { Button } from '@/components/ui/button'
import { getRemainingDays } from '@/utils/dates-helpers'
import { CalendarIcon, MoreHorizontalIcon } from 'lucide-react'

type Props = {
	startDate: string
	endDate?: string
}

export const ProjectCardHeader = ({ startDate, endDate }: Props) => {
	const daysLeft = getRemainingDays(startDate, endDate)

	return (
		<div className='flex justify-between mb-[10px]'>
			<div className='flex items-center text-secondary text-[14px] font-light'>
				<CalendarIcon className='w-4 h-4 mr-2 text-secondary' />
				<span className='pt-[2px]'>{daysLeft} days left</span>
			</div>

			<Button variant='unstyled' className='p-1'>
				<MoreHorizontalIcon className='w-4 h-4 text-secondary' />
			</Button>
		</div>
	)
}
