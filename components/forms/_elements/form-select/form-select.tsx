import { ReactNode } from 'react'
import { ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

type Option = {
	label: string
	value: string
}

type Props<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
	field: ControllerRenderProps<TFieldValues, TName>
	placeholder?: ReactNode
	options: Option[]
}

export const FormSelect = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	field,
	placeholder,
	options,
}: Props<TFieldValues, TName>) => {
	return (
		<Select onValueChange={field.onChange} defaultValue={field.value}>
			<SelectTrigger>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{options?.map(({ label, value }) => (
					<SelectItem key={value} value={value}>
						{label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
