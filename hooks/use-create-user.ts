import { useUser } from '@clerk/clerk-react'
import { useMutation } from 'convex/react'
import { useEffect, useState } from 'react'

import { api } from '@/convex/_generated/api'

export const useCreateUser = () => {
	const { user, isLoaded } = useUser()
	const createUser = useMutation(api.users.create)

	const [url, setUrl] = useState<string | null>(null)

	useEffect(() => {
		const fetchUser = async () => {
			if (isLoaded && user) {
				const { redirectUrl } = await createUser({
					externalUserId: user.id,
					name: `${user.firstName} ${user.lastName}`,
					email: user.emailAddresses[0].emailAddress,
					imageUrl: user.imageUrl,
				})

				setUrl(redirectUrl)
			}
		}

		fetchUser()
	}, [user, isLoaded])

	return {
		isLoading: !isLoaded,
		url,
	}
}
