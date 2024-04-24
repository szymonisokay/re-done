import { format } from 'date-fns'
import { CalendarIcon, XIcon } from 'lucide-react'
import { forwardRef } from 'react'
import { FieldPath, FieldPathValue, FieldValues, Noop } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type Props<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	onChange: (...event: any[]) => void
	onBlur: Noop
	value: FieldPathValue<TFieldValues, TName>
	disabled?: boolean
	name: TName
	disabledDays?: (date: Date) => boolean
}

export const FormDateField = forwardRef<
	HTMLButtonElement,
	Props<FieldValues, FieldPath<FieldValues>>
>(
	(
		{ disabledDays, ...field }: Props<FieldValues, FieldPath<FieldValues>>,
		ref
	) => {
		return (
			<Popover>
				<PopoverTrigger asChild>
					<Button
						{...field}
						ref={ref}
						variant={'outline'}
						className={cn(
							'w-full pl-3 text-left justify-start font-normal h-10 hover:bg-transparent hover:border-border-secondary',
							!field.value && 'text-secondary'
						)}
					>
						<CalendarIcon className='mr-2 h-4 w-4 text-secondary' />

						{field.value ? (
							format(field.value, 'PPP')
						) : (
							<span>Pick a date</span>
						)}

						<XIcon
							tabIndex={0}
							className='ml-auto h-4 w-4 text-secondary rounded-sm focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 focus-visible:ring-offset-shad'
							onClick={(e) => {
								e.stopPropagation()
								field.onChange('')
							}}
						/>
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-auto p-0' align='start'>
					<Calendar
						mode='single'
						selected={new Date(field.value)}
						onSelect={(date) => field.onChange(date?.toISOString())}
						disabled={disabledDays}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
		)
	}
)
