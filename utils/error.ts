import { ConvexError } from 'convex/values'

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
