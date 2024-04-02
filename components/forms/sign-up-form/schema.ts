import * as z from 'zod'

export const formSchema = z.object({
	firstName: z.string().optional(),
	emailAddress: z.string().email('Please enter a valid email address'),
	password: z.string(),
})

export type FormValues = z.infer<typeof formSchema>
