import { useEffect, useState } from 'react'

export const useOrigin = () => {
	const [origin, setOrigin] = useState<string>('')

	useEffect(() => {
		const { origin } = window.location

		setOrigin(origin)
	}, [])

	return origin
}
