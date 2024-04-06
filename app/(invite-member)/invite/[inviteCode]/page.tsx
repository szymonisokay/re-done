'use client'

import { useMutation } from 'convex/react'
import { ConvexError } from 'convex/values'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import Loading from '@/app/loading'
import { api } from '@/convex/_generated/api'
import { CustomErrorProps } from '@/types/common'

import { ErrorView } from './_components/error-view'
import { SuccessView } from './_components/success-view'

const InviteMemberIdPage = () => {
	const { inviteCode } = useParams()
	const acceptInvite = useMutation(api.teams.acceptInvite)

	const [error, setError] = useState<string | null | undefined>(undefined)

	useEffect(() => {
		const fetchInviteData = async () => {
			try {
				await acceptInvite({
					inviteCode: inviteCode as string,
				})

				setError(null)
			} catch (error) {
				if (error instanceof ConvexError) {
					setError((error.data as CustomErrorProps).code)
				}
			}
		}

		fetchInviteData()
	}, [])

	if (error === undefined) {
		return <Loading />
	}

	if (error === null) {
		return <SuccessView />
	}

	return <ErrorView message={error} />
}

export default InviteMemberIdPage
