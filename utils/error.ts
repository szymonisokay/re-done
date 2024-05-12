import { ConvexError } from 'convex/values'

import { toCamelCase } from '@/lib/utils'
import { CustomErrorProps } from '../types/common'

export class CustomConvexError extends ConvexError<CustomErrorProps> {
	constructor({ code, message, longMessage }: CustomErrorProps) {
		super({
			code,
			message,
			longMessage,
		})
	}
}

export const normalizeError = (error: string) => {
	const errorData = {
		code: toCamelCase(error),
		message: error,
	} as CustomErrorProps

	return {
		error: errorData,
		data: null,
	}
}
