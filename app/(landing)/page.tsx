'use client'

import { UserButton } from '@clerk/clerk-react'

const LandingPage = () => {
	return (
		<main>
			Landing
			<UserButton afterSignOutUrl='/' />
		</main>
	)
}

export default LandingPage
