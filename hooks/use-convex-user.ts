import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'

export const useConvexUser = () => {
	const user = useQuery(api.users.get)

	return {
		isLoading: user === undefined,
		user,
	}
}
