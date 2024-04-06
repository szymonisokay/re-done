import qs from 'query-string'

export const createUrl = (
	url: string,
	query?: string | Record<string, any>
) => {
	const { origin } = window.location
	const _query = typeof query === 'string' ? qs.parse(query) : query
	const _url = /(http(s?)):\/\//i.test(url) ? url : `${origin}${url}`

	return qs.stringifyUrl(
		{
			url: _url,
			query: _query,
		},
		{ skipEmptyString: true, skipNull: true }
	)
}
