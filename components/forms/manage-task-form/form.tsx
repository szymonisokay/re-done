'use client'

import { FormFieldElement } from '@/components/forms/_elements/form-field/form-field-element'
import { FormGrid } from '@/components/forms/_elements/form-grid/form-grid'
import { FormSelect } from '@/components/forms/_elements/form-select/form-select'
import {
	FormValues,
	defaultValues,
	formSchema,
} from '@/components/forms/manage-task-form/schema'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useCustomForm } from '@/hooks/use-custom-form'
import { useGetUser } from '@/hooks/use-get-user'
import { TASK_STATUSES } from '@/types/task'
import { useMutation } from 'convex/react'

const SPRINT_OPTIONS = [{ label: 'Sprint 1', value: 'sprint-1' }]
const ASSIGNEE_OPTIONS = [{ label: 'Assignee 1', value: 'assignee-1' }]
const STATUS_OPTIONS = TASK_STATUSES.map((status) => ({
	label: status,
	value: status,
}))

export const ManageTaskForm = () => {
	const { user } = useGetUser()
	const createTask = useMutation(api.tasks.create)
	const form = useCustomForm(formSchema, {
		defaultValues,
	})

	const onSubmit = async (values: FormValues) => {
		console.log(values)
		await createTask({
			...values,
			creatorId: user?._id as Id<'users'>,
			sprintId: values.sprintId as Id<'sprints'>,
			assigneeId: values.assigneeId as Id<'users'>,
		})
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

					<FormFieldElement
						control={form.control}
						name='status'
						render={({ field }) => (
							<FormSelect
								field={field}
								placeholder='Select status'
								options={STATUS_OPTIONS}
							/>
						)}
					/>

					<FormFieldElement
						control={form.control}
						name='sprintId'
						render={({ field }) => (
							<FormSelect
								field={field}
								placeholder='Select sprint'
								options={SPRINT_OPTIONS}
							/>
						)}
					/>

					<FormFieldElement
						control={form.control}
						name='assigneeId'
						render={({ field }) => (
							<FormSelect
								field={field}
								placeholder='Select assignee'
								options={ASSIGNEE_OPTIONS}
							/>
						)}
					/>

					<Button>Create</Button>
				</FormGrid>
			</form>
		</Form>
	)
}
