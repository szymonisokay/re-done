import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { CircleCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const SuccessView = () => {
	const router = useRouter()

	useEffect(() => {
		const timeoutId = setTimeout(() => router.replace('/dashboard'), 3000)

		return () => clearTimeout(timeoutId)
	}, [])

	return (
		<div className='flex flex-col items-center'>
			<Heading
				title='common.messages.inviteAccepted.label'
				subtitle='common.messages.inviteAccepted.description'
				icon={CircleCheck}
				className='text-center space-y-2'
			/>

			<Button variant='accent' className='mt-5'>
				Redirect to dashboard
			</Button>
		</div>
	)
}
