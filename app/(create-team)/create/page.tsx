'use client'

import { redirect } from 'next/navigation'

import { CreateTeamFormWrapper } from '@/components/forms/create-team-form/wrapper'
import { Spinner } from '@/components/spinner'
import { useGetUser } from '@/hooks/use-get-user'

const CreateTeamPage = () => {
	const { user } = useGetUser()

	if (user === undefined) {
		return <Spinner fullPage />
	}

	if (user === null) {
		return redirect('/')
	}

	return <CreateTeamFormWrapper user={user} />
}

export default CreateTeamPage
