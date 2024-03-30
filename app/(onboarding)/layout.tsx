import { AuthProvider } from '@/providers/auth-provider'
import { ReactNode } from 'react'

const OnboardingLayout = ({ children }: { children: ReactNode }) => {
	return (
		<AuthProvider>
			<section className='h-full flex justify-center items-center'>
				{children}
			</section>
		</AuthProvider>
	)
}

export default OnboardingLayout
