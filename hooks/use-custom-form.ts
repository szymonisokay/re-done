import { zodResolver } from '@hookform/resolvers/zod'
import { FieldValues, useForm, UseFormProps } from 'react-hook-form'
import * as z from 'zod'

export const useCustomForm = <T extends FieldValues>(
	formSchema: z.Schema<T>,
	options?: UseFormProps<T>
) => {
	const form = useForm<T>({
		resolver: zodResolver(formSchema),
		mode: 'onBlur',
		...options,
	})

	return form
}
