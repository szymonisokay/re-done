import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Dispatch, SetStateAction } from 'react'

type Props = {
	step: number
	setStep: Dispatch<SetStateAction<number>>
}

export const Buttons = ({ step, setStep }: Props) => {
	return (
		<div className='flex gap-4 items-center mt-5'>
			<Button
				type='button'
				className={cn('w-full', step === 0 && 'hidden')}
				onClick={() => setStep((_step) => _step - 1)}
			>
				Back
			</Button>

			<Button
				type={step === 1 ? 'submit' : 'button'}
				variant='accent'
				className='w-full'
				onClick={() => step < 1 && setStep((_step) => _step + 1)}
			>
				{step === 1 ? 'Create' : 'Next'}
			</Button>
		</div>
	)
}
