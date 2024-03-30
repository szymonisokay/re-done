'use client'

import { useQuery } from 'convex/react'
import { redirect, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

import { CreateTeamForm } from '@/components/forms/create-team-form/create-team-form'
import { Spinner } from '@/components/spinner'
import { api } from '@/convex/_generated/api'
import { useConvexUser } from '@/hooks/use-convex-user'

const OnbardingPage = () => {
	const searchParams = useSearchParams()
	const { isLoading, user } = useConvexUser()
	const token = searchParams.get('token')
	const validatedToken = useQuery(api.users.validateOnboardingToken, {
		token,
	})

	if (!token || user === null) {
		toast.error('Unauthenticated')
		return redirect('/')
	}

	if (isLoading || validatedToken === undefined || user === undefined) {
		return <Spinner />
	}

	if (!validatedToken) {
		toast.error('Invalid token')
		return redirect('/')
	}

	return (
		<main className='flex flex-col max-w-[440px] w-full pb-[120px] px-5'>
			<CreateTeamForm user={user} token={token} />
		</main>
	)
}

export default OnbardingPage
