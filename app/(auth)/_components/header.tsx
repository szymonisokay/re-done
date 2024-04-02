import { Heading } from '@/components/heading'
import { Logo } from '@/components/logo/logo'
import { useRouter } from 'next/navigation'

type Props = {
	title: string
	subtitle?: string
}

export const Header = ({ title, subtitle }: Props) => {
	const router = useRouter()

	return (
		<div className='flex items-center justify-between mb-4'>
			<Heading
				title={title}
				subtitle={subtitle}
				className='space-y-0'
				classNameTitle='text-xl'
			/>

			<div className='border border-border-secondary rounded-sm bg-background cursor-pointer'>
				<Logo.Collapsed
					className='h-[42px] p-3'
					onClick={() => router.push('/')}
				/>
			</div>
		</div>
	)
}
