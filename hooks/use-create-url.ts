'use client'

import { createUrl } from '@/utils/create-url'
import { useParams } from 'next/navigation'

export const useCreateUrl = (
	url?: string,
	query?: string | Record<string, any>
) => {
	const projectId = useParams().projectId as string

	const replaceUrl = (url: string, query?: string | Record<string, any>) => {
		return createUrl(url.replace(':projectId', projectId), query)
	}

	return {
		url: replaceUrl(url ?? '', query),
		replaceUrl,
	}
}
