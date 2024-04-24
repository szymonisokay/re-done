'use client'

import { useQuery } from 'convex/react'

import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useGetUser } from '@/hooks/use-get-user'

export const useConfiguration = () => {
	const { user } = useGetUser()
	const configuration = useQuery(
		api.userConfiguration.get,
		!!user
			? {
					configurationId:
						user.configurationId as Id<'userConfiguration'>,
			  }
			: 'skip'
	)

	return {
		configuration,
	}
}
