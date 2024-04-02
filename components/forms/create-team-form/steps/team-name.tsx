import { zodResolver } from '@hookform/resolvers/zod'
import { UsersIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

import {
	FormValues,
	formSchema,
} from '@/components/forms/create-team-form/schema'
import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Doc } from '@/convex/_generated/dataModel'

type Props = {
	user: Doc<'users'>
	onSubmit: (values: FormValues) => void
}

export const StepTeamName = ({ user, onSubmit }: Props) => {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: user.name ? `${user.name}'s Team` : 'Your Team',
		},
	})

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col'
			>
				<Heading
					title="Choose your team's name"
					subtitle='You can always change the name later.'
					icon={UsersIcon}
					className='mb-10 text-center'
					classNameTitle='text-4xl'
				/>

				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem className='space-y-1'>
							<FormLabel>Team name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>

				<Button variant='accent' className='mt-5'>
					Create team
				</Button>
			</form>
		</Form>
	)
}
