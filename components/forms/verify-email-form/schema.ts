import * as z from 'zod'

export const formSchema = z.object({
	code: z.string().min(6, {
		message: 'Invalid verification code',
	}),
})

export type FormValues = z.infer<typeof formSchema>
