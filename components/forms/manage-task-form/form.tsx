'use client'

import { FormFieldElement } from '@/components/forms/_elements/form-field/form-field-element'
import { FormGrid } from '@/components/forms/_elements/form-grid/form-grid'
import {
	FormValues,
	defaultValues,
	formSchema,
} from '@/components/forms/manage-task-form/schema'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCustomForm } from '@/hooks/use-custom-form'

export const ManageTaskForm = () => {
	const form = useCustomForm(formSchema, {
		defaultValues,
	})

	const onSubmit = (values: FormValues) => {
		console.log(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormGrid>
					<FormFieldElement
						control={form.control}
						name='name'
						render={({ field }) => (
							<Input {...field} placeholder='Task name' />
						)}
					/>

					<FormFieldElement
						control={form.control}
						name='description'
						render={({ field }) => (
							<Textarea {...field} placeholder='Description' />
						)}
					/>

					<Button>Create</Button>
				</FormGrid>
			</form>
		</Form>
	)
}
