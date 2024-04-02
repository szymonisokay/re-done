'use client'

import { redirect } from 'next/navigation'

import { CreateTeamForm } from '@/components/forms/create-team-form/create-team-form'
import { Spinner } from '@/components/spinner'
import { useGetUser } from '@/hooks/use-get-user'

const CreateTeamPage = () => {
	const { isLoading, user } = useGetUser()

	if (isLoading || user === undefined) {
		return <Spinner fullPage />
	}

	if (user === null) {
		return redirect('/')
	}

	return <CreateTeamForm user={user} />
}

export default CreateTeamPage
