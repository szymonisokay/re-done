'use client'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useGetUser } from '@/hooks/use-get-user'
import { useQueryWithStatus } from '@/hooks/use-query-wrapper'

export const useConfiguration = () => {
	const { user } = useGetUser()
	const { data, error, isPending } = useQueryWithStatus(
		api.userConfiguration.get,
		!!user
			? {
					configurationId:
						user.configurationId as Id<'userConfiguration'>,
				}
			: 'skip'
	)

	return {
		configuration: data,
		error,
		isLoading: isPending,
	}
}
