import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { useEffect, useState } from 'react'

import { api } from '@/convex/_generated/api'
import { useConvexUser } from '@/hooks/use-convex-user'

export const useCreateUser = () => {
	const { user, isLoaded } = useUser()
	const create = useMutation(api.users.create)
	const { user: convexUser } = useConvexUser()

	const [token, setToken] = useState<string | null>(null)

	useEffect(() => {
		const fetchUser = async () => {
			if (isLoaded && user) {
				console.log(user, 'here')
				const { token } = await create({
					externalUserId: user.id,
					name: user.firstName,
					fullName:
						!user.firstName && !user.lastName
							? null
							: `${user.firstName ?? ''} ${
									user.lastName ?? ''
							  }`.trim(),
					email: user.emailAddresses[0].emailAddress,
					imageUrl: user.imageUrl,
				})

				setToken(token)
			}
		}

		fetchUser()
	}, [isLoaded, user])

	return {
		isLoading: !isLoaded,
		token,
		user: convexUser,
	}
}
