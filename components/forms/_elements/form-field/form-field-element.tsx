import { InfoIcon } from 'lucide-react'
import { ReactElement } from 'react'
import {
	Control,
	ControllerFieldState,
	ControllerRenderProps,
	FieldPath,
	FieldValues,
	UseFormStateReturn,
} from 'react-hook-form'

import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { cn } from '@/lib/utils'

type Props<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	control: Control<TFieldValues>
	name: TName
	label: string | ReactElement
	description?: string
	containerClassName?: string
	render: ({
		field,
		fieldState,
		formState,
	}: {
		field: ControllerRenderProps<TFieldValues, TName>
		fieldState: ControllerFieldState
		formState: UseFormStateReturn<TFieldValues>
	}) => ReactElement
}

export const FormFieldElement = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	control,
	name,
	label,
	description,
	containerClassName,
	render,
}: Props<TFieldValues, TName>) => {
	return (
		<FormField
			control={control}
			name={name}
			render={(state) => (
				<FormItem className={cn('space-y-2', containerClassName)}>
					<FormLabel>{label}</FormLabel>
					<FormControl>{render(state)}</FormControl>
					{description && (
						<FormDescription className='flex text-secondary !mt-2'>
							<InfoIcon className='w-[14px] h-[14px] mr-[6px] shrink-0' />
							<span className='text-[12px] leading-tight'>
								{description}
							</span>
						</FormDescription>
					)}
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
