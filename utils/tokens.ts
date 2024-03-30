import { v4 as uuid } from 'uuid'

export const generateOnboardingToken = () => {
	return uuid()
}
