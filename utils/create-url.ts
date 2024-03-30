import qs from 'query-string'

export const createUrl = (url: string, query?: Record<string, any>) => {
	return qs.stringifyUrl({
		url,
		query,
	})
}
