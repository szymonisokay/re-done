'use client'

import { CustomErrorProps } from '@/types/common'
import { makeUseQueryWithStatus } from 'convex-helpers/react'
import { OptionalRestArgsOrSkip, useQueries } from 'convex/react'
import { FunctionReference, FunctionReturnType } from 'convex/server'
import { ConvexError } from 'convex/values'

type UseQueryWithStatusFunc = <Query extends FunctionReference<'query'>>(
	query: Query,
	...queryArgs: OptionalRestArgsOrSkip<Query>
) =>
	| {
			status: 'success'
			data: FunctionReturnType<Query>
			error: undefined
			isSuccess: true
			isPending: false
			isError: false
	  }
	| {
			status: 'pending'
			data: undefined
			error: undefined
			isSuccess: false
			isPending: true
			isError: false
	  }
	| {
			status: 'error'
			data: undefined
			error: ConvexError<CustomErrorProps>
			isSuccess: false
			isPending: false
			isError: true
	  }

export const useQueryWithStatus = makeUseQueryWithStatus(
	useQueries
) as UseQueryWithStatusFunc
