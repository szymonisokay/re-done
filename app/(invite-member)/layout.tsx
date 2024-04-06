import { AuthProvider } from '@/providers/auth-provider'
import { ReactNode } from 'react'

const InviteMemberLayout = ({ children }: { children: ReactNode }) => {
	return (
		<AuthProvider>
			<section className='w-full h-full flex items-center justify-center'>
				{children}
			</section>
		</AuthProvider>
	)
}

export default InviteMemberLayout
