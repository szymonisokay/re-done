'use client'

import { createUrl } from '@/utils/create-url'
import { useParams } from 'next/navigation'

export const useCreateUrl = (
	url?: string,
	query?: string | Record<string, any>
) => {
	const teamId = useParams().teamId as string
	const projectId = useParams().projectId as string

	const replaceUrl = (url: string, query?: string | Record<string, any>) => {
		return createUrl(
			url.replace(':teamId', teamId).replace(':projectId', projectId),
			query
		)
	}

	return {
		url: replaceUrl(url ?? '', query),
		replaceUrl,
	}
}
