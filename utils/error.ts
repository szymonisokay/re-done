import { ConvexError } from 'convex/values'

import { toCamelCase } from '@/lib/utils'
import { CustomErrorProps } from '../types/common'

export class CustomConvexError extends ConvexError<CustomErrorProps> {
	constructor(message: string, longMessage?: string) {
		const data = {
			code: toCamelCase(message),
			message,
			longMessage,
		} as CustomErrorProps

		super(data)
	}
}
