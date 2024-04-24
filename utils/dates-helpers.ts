import { differenceInDays } from 'date-fns'

export const getRemainingDays = (from: string, to?: string) => {
	if (!to) {
		return 0
	}

	return differenceInDays(new Date(to), new Date(from))
}
