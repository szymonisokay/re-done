import { api } from '@/convex/_generated/api'
import { useQueryWithStatus } from '@/hooks/use-query-wrapper'

export const useGetUser = () => {
	const { data, error, isPending } = useQueryWithStatus(api.users.get)

	return {
		user: data,
		error,
		isLoading: isPending,
	}
}
