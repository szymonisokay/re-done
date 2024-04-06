'use client'

import { UserButton } from '@clerk/clerk-react'
import Link from 'next/link'

const LandingPage = () => {
	return (
		<main>
			<UserButton afterSignOutUrl='/' />
			<Link href='/sign-in'>SignIn</Link>
			<Link href='/sign-up'>SignUp</Link>
		</main>
	)
}

export default LandingPage
