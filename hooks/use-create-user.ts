'use client'

import { UserResource } from '@clerk/types'
import { useMutation } from 'convex/react'

import { api } from '@/convex/_generated/api'

export const useCreateUser = () => {
	const create = useMutation(api.users.create)

	const createUser = async (user: UserResource) => {
		return await create({
			externalUserId: user.id,
			name: user.firstName,
			fullName:
				!user.firstName && !user.lastName
					? null
					: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
			email: user.emailAddresses[0].emailAddress,
			imageUrl: user.imageUrl,
		})
	}

	return {
		createUser,
	}
}
