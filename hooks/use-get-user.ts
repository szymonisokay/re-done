import { useQuery } from 'convex/react'

import { api } from '@/convex/_generated/api'

export const useGetUser = () => {
	const user = useQuery(api.users.get)

	return {
		user,
	}
}
