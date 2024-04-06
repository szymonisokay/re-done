import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'
import { MessageCircleWarningIcon } from 'lucide-react'

type Props = {
	message: string
}

export const ErrorView = ({ message }: Props) => {
	return (
		<div className='flex flex-col justify-center items-center'>
			<Heading
				title={`common.errors.${message}.label`}
				subtitle={`common.errors.${message}.description`}
				icon={MessageCircleWarningIcon}
				className='text-center space-y-2'
			/>

			{message === 'alreadyAMember' && (
				<Button variant='outline' className='mt-5'>
					Redirect to dashboard
				</Button>
			)}
		</div>
	)
}
