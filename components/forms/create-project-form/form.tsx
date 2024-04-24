'use client'

import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import { ComponentProps } from 'react'
import { toast } from 'sonner'

import { FormDateField } from '@/components/forms/_elements/form-date-field/form-date-field'
import { FormFieldElement } from '@/components/forms/_elements/form-field/form-field-element'
import { FormGrid } from '@/components/forms/_elements/form-grid/form-grid'
import { FormSection } from '@/components/forms/_elements/form-section/form-section'
import {
	FormValues,
	defaultValues,
	formSchema,
} from '@/components/forms/create-project-form/validation'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/convex/_generated/api'
import { useCustomForm } from '@/hooks/use-custom-form'
import { useTeam } from '@/hooks/use-team'

type Props = ComponentProps<'form'>

export const CreateProjectForm = ({ ...props }: Props) => {
	const router = useRouter()
	const { team } = useTeam()
	const create = useMutation(api.projects.create)
	const form = useCustomForm<FormValues>(formSchema, {
		defaultValues,
	})

	const onSubmit = (values: FormValues) => {
		if (!team) return

		toast.promise(create({ ...values, teamId: team._id }), {
			loading: 'Creating project...',
			success: () => {
				const url = `/dashboard/projects/${values.symbol}`
				router.push(url)

				return 'Project created successfully'
			},
			error: 'Failed to create project',
		})
	}

	return (
		<Form {...form}>
			<form {...props} onSubmit={form.handleSubmit(onSubmit)}>
				<FormSection title='General'>
					<FormGrid>
						<FormFieldElement
							control={form.control}
							name='symbol'
							label='Symbol'
							description='Create short project symbol that will be reflected in every task.'
							render={({ field }) => (
								<Input
									{...field}
									onBlur={() => {
										form.setValue(
											'symbol',
											field.value
												.slice(0, 3)
												.toUpperCase()
										)

										field.onBlur()
									}}
								/>
							)}
						/>

						<FormFieldElement
							control={form.control}
							name='name'
							label='Name'
							render={({ field }) => <Input {...field} />}
						/>

						<FormFieldElement
							control={form.control}
							name='description'
							label='Description'
							render={({ field }) => (
								<Textarea {...field} rows={10} />
							)}
						/>
					</FormGrid>
				</FormSection>

				<FormSection title='Time management'>
					<FormGrid className='md:grid-cols-2'>
						<FormFieldElement
							control={form.control}
							name='startDate'
							label='Start date'
							render={({ field }) => (
								<FormDateField
									{...field}
									disabledDays={(date) =>
										date >
										new Date(
											form.getValues('endDate') || ''
										)
									}
								/>
							)}
						/>

						<FormFieldElement
							control={form.control}
							name='endDate'
							label='End date'
							render={({ field }) => (
								<FormDateField
									{...field}
									disabledDays={(date) =>
										date <
										new Date(form.getValues('startDate'))
									}
								/>
							)}
						/>
					</FormGrid>
				</FormSection>
				<Button variant='accent' className='px-4'>
					Submit
				</Button>
			</form>
		</Form>
	)
}
