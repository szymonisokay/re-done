'use client'

import { Fragment, ReactNode, useEffect, useState } from 'react'

export const ClientProvider = ({ children }: { children: ReactNode }) => {
	const [mounted, setMounted] = useState<boolean>(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return <Fragment>{children}</Fragment>
}
