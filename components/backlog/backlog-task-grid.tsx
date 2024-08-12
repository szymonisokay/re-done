import { Heading } from '@/components/heading'
import { Button } from '@/components/ui/button'

type Props = {
	title: string
	action: () => void
}

export const BacklogTaskGrid = ({ title, action }: Props) => {
	return (
		<>
			<div className='flex justify-between items-center'>
				<Heading
					title={title}
					classNameTitle='text-xl tracking-normal'
				/>

				<Button
					variant='unstyled'
					className='py-1 hover:bg-muted'
					onClick={action}
				>
					Add new task
				</Button>
			</div>
		</>
	)
}
