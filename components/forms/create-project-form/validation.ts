import * as z from 'zod'

export const formSchema = z.object({
	name: z.string().min(3),
	symbol: z.string().min(2).max(3),
	description: z.string().max(500).optional(),
	startDate: z.string(),
	endDate: z.string().optional(),
	isPrivate: z.boolean(),
})

export type FormValues = z.infer<typeof formSchema>

export const defaultValues: FormValues = {
	name: '',
	symbol: '',
	description: '',
	startDate: new Date().toISOString(),
	endDate: '',
	isPrivate: false,
}
