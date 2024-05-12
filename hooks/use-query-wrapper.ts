import { CustomErrorProps } from '@/types/common'
import { useQuery } from 'convex/react'
import { FunctionReference } from 'convex/server'

type EmptyObject = Record<string, never>

type OptionalRestArgsOrSkip<FuncRef extends FunctionReference<any>> =
	FuncRef['_args'] extends EmptyObject
		? [args?: EmptyObject | 'skip']
		: [args: FuncRef['_args'] | 'skip']

type QueryResult<Query extends FunctionReference<'query'>> =
	| {
			data: Query['_returnType'] | null
			error: CustomErrorProps | null
	  }
	| undefined

type QueryResultReturn<Query extends FunctionReference<'query'>> = {
	data: Query['_returnType']['data'] | null
	error: CustomErrorProps | null
	isLoading: boolean
}

export const useQueryWrapper = <Query extends FunctionReference<'query'>>(
	query: Query,
	...args: OptionalRestArgsOrSkip<Query>
): QueryResultReturn<Query> => {
	const result = useQuery(query, ...args) as QueryResult<Query>

	return {
		data: result?.data,
		error: result?.error ?? null,
		isLoading: result === undefined,
	}
}
